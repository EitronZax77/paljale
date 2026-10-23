import Link from 'next/link';
import StudioIcon from '@/components/decision/StudioIcon';
import styles from '@/components/decision/Studio.module.css';
const items=[
 {href:'/regla-de-tres',name:'Regla de tres',desc:'Resuelve proporciones directas con tres datos.',icon:'∝',accent:'#0d9488'},
 {href:'/calculadora-edad',name:'Calculadora de edad',desc:'Conoce la edad cumplida en una fecha concreta.',icon:'◷',accent:'#2563eb'},
 {href:'/diferencia-entre-fechas',name:'Diferencia entre fechas',desc:'Obtén el número exacto de días entre dos fechas.',icon:'31',accent:'#7c3aed'}
];
export default function Math02Catalog(){return <section aria-labelledby="math02-catalog-heading" className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8"><h2 id="math02-catalog-heading" className="mb-4 text-2xl font-black tracking-tight text-slate-900">Matemáticas y fechas</h2><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{items.map(item=><article key={item.href} className={`${styles.tile} flex min-h-[242px] flex-col p-5 sm:p-6`}><div className="mb-5 flex items-start justify-between"><span className="flex h-14 w-14 items-center justify-center rounded-[18px] text-2xl font-black" style={{color:item.accent,backgroundColor:`${item.accent}14`}}>{item.icon}</span><span className="rounded-full border border-slate-200 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">Cálculo</span></div><h3 className="text-[20px] font-extrabold tracking-tight text-slate-900">{item.name}</h3><p className="mt-2 flex-1 text-[13px] leading-6 text-slate-600">{item.desc}</p><Link href={item.href} className={`${styles.action} mt-5 self-start`}>Abrir herramienta <StudioIcon name="arrow" size={17}/></Link></article>)}</div></section>}
