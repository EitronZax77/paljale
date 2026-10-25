import {NextRequest,NextResponse} from 'next/server';
export const runtime='nodejs';
type Quote={id:string;name:string;symbol:string;usd:number;mxn:number;change24h:number;cap:number;rank:number|null;image:null;source:string};
type Payload={coins:Quote[];fetchedAt:string;source:string;page:number;total:number;stale?:boolean;notice?:string};
const CACHE=new Map<string,{value:Payload;expires:number}>();
const inflight=new Map<string,Promise<Payload>>();
const failures=new Map<string,number>();
const ttl=10*60_000;
const good=(x:unknown)=>typeof x==='number'&&Number.isFinite(x)&&x>0;
const numeric=(x:unknown)=>typeof x==='number'?x:typeof x==='string'&&x.trim()?Number(x):NaN;
async function json(url:string){const r=await fetch(url,{cache:'no-store',signal:AbortSignal.timeout(12000),headers:{'accept':'application/json'}});if(!r.ok)throw Error(`HTTP ${r.status}`);return r.json() as Promise<unknown>}
async function fx(){const r=await json('https://api.frankfurter.dev/v2/rate/USD/MXN') as {rate?:number};if(!good(r?.rate))throw Error('Tipo USD/MXN no disponible');return r.rate!}
async function coinlore(page:number,term:string):Promise<Payload>{
 // CoinLore provides at most 100 assets per page; when searching fetch a bounded prefix.
 const starts=term?Array.from({length:8},(_,i)=>i*100):[(page-1)*100];
 const lists=await Promise.all(starts.map(async start=>{
  const obj=await json(`https://api.coinlore.net/api/tickers/?start=${start}&limit=100`) as {data?:unknown[];info?:{coins_num?:number}};
  if(!Array.isArray(obj.data))throw Error('Catálogo incompleto');return obj;
 }));
 const total=lists[0]?.info?.coins_num||0;
 const raw=lists.flatMap(x=>x.data||[]);
 const matches=raw.filter(v=>{if(!term)return true;if(!v||typeof v!=='object')return false;const x=v as Record<string,unknown>;return String(x.name||'').toLowerCase().startsWith(term)||String(x.symbol||'').toLowerCase().startsWith(term)||String(x.name||'').toLowerCase().includes(term);}).slice(0,100);
 let rate=NaN;try{rate=await fx()}catch{/* MXN not shown unless confirmed. */}
 const coins=matches.map((v):Quote|null=>{if(!v||typeof v!=='object')return null;const x=v as Record<string,unknown>;const usd=numeric(x.price_usd);if(!good(usd)||typeof x.id!=='string'||typeof x.name!=='string'||typeof x.symbol!=='string')return null;const p=numeric(x.percent_change_24h),cap=numeric(x.market_cap_usd),rank=numeric(x.rank);return {id:`cl:${x.id}`,name:x.name,symbol:x.symbol.toUpperCase(),usd,mxn:good(rate)?usd*rate:0,change24h:Number.isFinite(p)?p:0,cap:Number.isFinite(cap)?cap:0,rank:Number.isFinite(rank)?rank:null,image:null,source:'CoinLore'};}).filter((x):x is Quote=>x!==null);
 return {coins,fetchedAt:new Date().toISOString(),source:'CoinLore + Frankfurter',page,total,notice:!good(rate)?'MXN no disponible temporalmente. Los precios USD siguen disponibles.':term?'Búsqueda entre los primeros 800 activos por capitalización.':'Precios indicativos de mercado.'};
}
async function gecko(page:number,term:string):Promise<Payload>{
 const url=new URL('https://api.coingecko.com/api/v3/coins/markets');url.searchParams.set('vs_currency','usd');url.searchParams.set('order','market_cap_desc');url.searchParams.set('per_page','100');url.searchParams.set('page',String(page));url.searchParams.set('sparkline','false');
 const raw=await json(url.toString());if(!Array.isArray(raw))throw Error('Formato alternativo inválido');let rate=NaN;try{rate=await fx()}catch{}
 const coins=raw.flatMap((v):Quote[]=>{if(!v||typeof v!=='object')return [];const x=v as Record<string,unknown>;const usd=numeric(x.current_price);if(!good(usd)||typeof x.id!=='string'||typeof x.name!=='string'||typeof x.symbol!=='string')return [];const percent=numeric(x.price_change_percentage_24h);const cap=numeric(x.market_cap);const rank=numeric(x.market_cap_rank);return [{id:`cg:${x.id}`,name:x.name,symbol:x.symbol.toUpperCase(),usd,mxn:good(rate)?usd*rate:0,change24h:Number.isFinite(percent)?percent:0,cap:Number.isFinite(cap)?cap:0,rank:Number.isFinite(rank)?rank:null,image:null,source:'CoinGecko'}]});
 return {coins:term?coins.filter(x=>x.name.toLowerCase().includes(term)||x.symbol.toLowerCase().startsWith(term)):coins,fetchedAt:new Date().toISOString(),source:'CoinGecko + Frankfurter',page,total:0,notice:'Fuente alternativa; cobertura de búsqueda limitada a esta página.'};
}
async function getData(page:number,term:string){try{return await coinlore(page,term)}catch(e){try{return await gecko(page,term)}catch{throw e}}}
export async function GET(req:NextRequest){
 const p=Number(req.nextUrl.searchParams.get('page')||1);const page=Number.isSafeInteger(p)&&p>0&&p<=1000?p:1;
 const q=(req.nextUrl.searchParams.get('q')||'').trim().toLowerCase().slice(0,60);
 const key=`${page}:${q}`;const t=Date.now();const entry=CACHE.get(key);
 if(entry&&entry.expires>t)return NextResponse.json(entry.value,{headers:{'Cache-Control':'public, s-maxage=120'}});
 if((failures.get(key)||0)>t)return entry?NextResponse.json({...entry.value,stale:true,notice:'Última consulta válida; actualización no disponible.'}):NextResponse.json({error:'Fuentes temporalmente no disponibles. Reintenta más tarde.'},{status:503});
 try{if(!inflight.has(key))inflight.set(key,getData(page,q).finally(()=>inflight.delete(key)));const value=await inflight.get(key)!;CACHE.set(key,{value,expires:Date.now()+ttl});if(CACHE.size>90)CACHE.delete(CACHE.keys().next().value!);failures.delete(key);return NextResponse.json(value,{headers:{'Cache-Control':'public, s-maxage=120'}})}
 catch(e){failures.set(key,Date.now()+120_000);return entry?NextResponse.json({...entry.value,stale:true,notice:'Datos anteriores; fuentes temporalmente inaccesibles.'}):NextResponse.json({error:'No fue posible consultar precios reales. Reintenta más tarde.',detail:e instanceof Error?e.message:''},{status:503})}
}
