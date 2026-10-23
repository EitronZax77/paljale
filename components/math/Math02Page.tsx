import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import StudioIcon from '@/components/decision/StudioIcon';
import Math02Client,{type Math02Kind} from './Math02Client';
const tools=[
 {kind:'rule',href:'/regla-de-tres',label:'Regla de tres',symbol:'∝',color:'#0d9488'},
 {kind:'age',href:'/calculadora-edad',label:'Calculadora de edad',symbol:'◷',color:'#2563eb'},
 {kind:'dates',href:'/diferencia-entre-fechas',label:'Diferencia entre fechas',symbol:'31',color:'#7c3aed'}
] as const;
export default function Math02Page({kind,title,description}:{kind:Math02Kind;title:string;description:string}){
 const others=tools.filter(t=>t.kind!==kind);
 return <><SiteHeader/><main className="mx-auto w-full max-w-7xl space-y-6 px-4 py-7 sm:px-6 lg:px-8">
  <nav aria-label="Volver a calculadoras"><Link href="/calculadoras" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 no-underline transition-all duration-200 hover:-translate-y-0.5 hover:border-teal-200 hover:bg-teal-50 hover:text-teal-800 hover:no-underline">← Todas las calculadoras</Link></nav>
  <header className="rounded-[27px] border border-slate-200 bg-white p-7 sm:p-10"><span className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-teal-50 text-2xl font-black text-teal-700" aria-hidden="true">{tools.find(t=>t.kind===kind)?.symbol}</span><h1 className="mt-5 text-[34px] font-black tracking-tight text-slate-900 sm:text-[42px]">{title}</h1><p className="mt-3 max-w-3xl text-[15px] leading-7 text-slate-600">{description}</p></header>
  <Math02Client kind={kind}/>
  <section aria-labelledby="math02-related" className="rounded-[25px] border border-slate-200 bg-white p-6 sm:p-7"><h2 id="math02-related" className="text-lg font-black text-slate-900">Explora otras calculadoras</h2><div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{others.map(t=><Link key={t.href} href={t.href} className="flex min-h-16 items-center gap-3 rounded-xl border border-slate-200 p-3 text-sm font-bold text-slate-700 no-underline transition-all duration-200 hover:-translate-y-0.5 hover:border-teal-200 hover:bg-teal-50 hover:shadow-md hover:no-underline"><span className="flex h-10 w-10 items-center justify-center rounded-xl text-lg font-black" style={{color:t.color,backgroundColor:`${t.color}14`}}>{t.symbol}</span><span className="flex-1">{t.label}</span><StudioIcon name="arrow" size={16}/></Link>)}</div></section>
 </main></>
}
