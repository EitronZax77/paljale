import Link from 'next/link';
import StudioIcon from '@/components/decision/StudioIcon';
import styles from '@/components/decision/Studio.module.css';
export const financeTools=[
 {kind:'compound',href:'/interes-compuesto',name:'Interés compuesto',desc:'Proyecta cómo crece un capital mediante la capitalización de intereses.',symbol:'%',accent:'#0d9488'},
 {kind:'savings',href:'/calculadora-ahorro',name:'Plan de ahorro',desc:'Calcula el resultado de ahorrar cada mes y conoce el interés acumulado.',symbol:'$',accent:'#2563eb'},
 {kind:'tip',href:'/calculadora-propinas',name:'Calculadora de propinas',desc:'Obtén la propina, el total y cuánto paga cada persona.',symbol:'÷',accent:'#7c3aed'},
 {kind:'loan',href:'/calculadora-prestamos',name:'Calculadora de préstamos',desc:'Estima la mensualidad fija, el pago total y los intereses.',symbol:'↗',accent:'#ea580c'},
] as const;
export type FinanceKind=(typeof financeTools)[number]['kind'];
export default function Finance03Catalog(){return <section aria-labelledby="finance03-heading" className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8"><h2 id="finance03-heading" className="mb-4 text-2xl font-black tracking-tight text-slate-900">Finanzas cotidianas</h2><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{financeTools.map(item=><article key={item.href} className={`${styles.tile} flex min-h-[242px] flex-col p-5 sm:p-6`}><div className="mb-5 flex items-start justify-between"><span className="flex h-14 w-14 items-center justify-center rounded-[18px] text-2xl font-black" style={{color:item.accent,backgroundColor:`${item.accent}14`}} aria-hidden="true">{item.symbol}</span><span className="rounded-full border border-slate-200 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">Finanzas</span></div><h3 className="text-[20px] font-extrabold tracking-tight text-slate-900">{item.name}</h3><p className="mt-2 flex-1 text-[13px] leading-6 text-slate-600">{item.desc}</p><Link href={item.href} className={`${styles.action} mt-5 self-start`}>Abrir calculadora <StudioIcon name="arrow" size={17}/></Link></article>)}</div></section>}
