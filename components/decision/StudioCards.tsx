"use client";
import Link from 'next/link';
import {useState} from 'react';
import {useLanguage} from '@/components/LanguageProvider';
import {info,kinds,pick,type Kind} from '@/lib/decision-studio';
import StudioIcon from './StudioIcon';
import styles from './Studio.module.css';
const intent:Record<Kind,string[]>={
 margen:['cuanto gano','cuanto gano por venta','tengo perdidas','rentabilidad','utilidad','markup','profit'],
 precio:['cuanto cobrar','que precio poner','fijar precio','precio sugerido','pricing','selling price'],
 iva:['agregar iva','calcular impuesto','ya incluye iva','quitar iva','separar impuesto','vat'],
 descuento:['poner oferta','hacer promocion','rebajas','ahorro','coupon','discount'],
 equilibrio:['cuanto debo vender','cubrir costos','ventas necesarias','cuantas unidades','break even']
};
const normalize=(s:string)=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase().trim();
export function StudioTile({kind}:{kind:Kind}){
 const {language}=useLanguage();const en=language==='en';const t=info[kind];
 return <article className={`${styles.tile} flex min-h-[242px] flex-col p-5 sm:p-6`}>
  <div className="mb-5 flex items-start justify-between"><span className="flex h-14 w-14 items-center justify-center rounded-[18px]" style={{color:t.accent,backgroundColor:`${t.accent}14`}}><StudioIcon name={t.icon} size={28}/></span><span className="rounded-full border border-slate-200 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">{en?'Business':'Negocios'}</span></div>
  <h3 className="text-[20px] font-extrabold tracking-tight text-slate-900">{pick(t.title,en)}</h3><p className="mt-2 flex-1 text-[13px] leading-6 text-slate-600">{pick(t.short,en)}</p>
  <Link href={t.href} className={`${styles.action} mt-5 self-start`} aria-label={`${en?'Open':'Abrir'} ${pick(t.title,en)}`}>{en?'Open calculator':'Abrir calculadora'} <StudioIcon name="arrow" size={17}/></Link>
 </article>
}
export default function StudioCards({showSearch=true}:{showSearch?:boolean}){
 const {language}=useLanguage();const en=language==='en';const[query,setQuery]=useState('');const filtered=kinds.filter(k=>{const t=info[k],q=normalize(query);return !showSearch||!q||normalize([...t.title,...t.short,...t.subtitle].join(' ')).includes(q)||intent[k].some(term=>q.includes(normalize(term)))});
 return <section aria-label={en?'Business calculators':'Calculadoras comerciales'}>
 {showSearch&&<div className="mb-5 flex flex-wrap items-center justify-between gap-3"><h2 className="text-2xl font-black tracking-tight text-slate-900">{en?'Choose your next decision':'Elige tu próximo análisis'}</h2><label className="w-full sm:max-w-[300px]"><span className="sr-only">{en?'Filter tools':'Filtrar herramientas'}</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder={en?'Search tools...':'Buscar herramienta...'} className={styles.field} type="search"/></label></div>}
 <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{filtered.map(kind=><StudioTile kind={kind} key={kind}/>)}</div>
 {filtered.length===0&&<p role="status" className="rounded-xl border border-slate-200 bg-white p-5 text-sm text-slate-600">{en?'No matching tool. Try another keyword.':'No encontramos coincidencias. Prueba otra palabra.'}</p>}
 </section>
}
