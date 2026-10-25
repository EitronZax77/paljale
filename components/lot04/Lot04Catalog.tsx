import Link from 'next/link';
import StudioIcon from '@/components/decision/StudioIcon';
import styles from '@/components/decision/Studio.module.css';

export const catalog = [
 {kind:'color',href:'/conversor-colores',title:'Conversor de colores',desc:'Convierte HEX, RGB y HSL con vista previa.',icon:'compare',color:'#7c3aed',category:'utilidades'},
 {kind:'timer',href:'/temporizador',title:'Temporizador',desc:'Cuenta regresiva con pausa, reinicio y alerta.',icon:'info',color:'#ea580c',category:'utilidades'},
 {kind:'quote',href:'/generador-cotizaciones',title:'Generador de cotizaciones',desc:'Calcula conceptos, cantidades, impuestos y total; imprime.',icon:'business',color:'#2563eb',category:'plantillas'},
] as const;
export type Kind=typeof catalog[number]['kind'];

export default function Lot04Catalog({category}:{category:'utilidades'|'plantillas'}){
 const items=catalog.filter(x=>x.category===category);
 return <section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8" aria-labelledby="lot04-title">
 <h2 id="lot04-title" className="mb-4 text-2xl font-black text-slate-900">{category==='utilidades'?'Más utilidades':'Plantillas para negocios'}</h2>
 <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
 {items.map(x=><article key={x.href} className={`${styles.tile} flex min-h-[242px] flex-col p-5 sm:p-6`}>
 <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-[18px]" style={{color:x.color,backgroundColor:`${x.color}14`}}><StudioIcon name={x.icon} size={28}/></span>
 <h3 className="text-xl font-extrabold text-slate-900">{x.title}</h3><p className="mt-2 flex-1 text-sm leading-6 text-slate-600">{x.desc}</p>
 <Link href={x.href} className={`${styles.action} mt-5 self-start`}>Abrir herramienta <StudioIcon name="arrow" size={17}/></Link>
 </article>)}
 </div></section>
}
