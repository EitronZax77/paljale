"use client";
import Link from 'next/link';
import {useState} from 'react';
import {useLanguage} from '@/components/LanguageProvider';
import StudioCards from './StudioCards';
import StudioIcon from './StudioIcon';
import styles from './Studio.module.css';
export default function StudioHome(){
 const {language}=useLanguage();const en=language==='en';const [cost,setCost]=useState('');const[margin,setMargin]=useState('');
 const c=cost.trim()?Number(cost):NaN,m=margin.trim()?Number(margin):NaN;
 const valid=Number.isFinite(c)&&c>=0&&Number.isFinite(m)&&m>=0&&m<100;
 const price=valid?c/(1-m/100):0;
 return <div className="space-y-9">
  <section className={`${styles.hero} p-6 sm:p-10 lg:p-12`}>
   <div className="relative z-10 grid items-center gap-9 lg:grid-cols-[1.2fr_0.8fr]">
    <div className="space-y-5">
     <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold tracking-widest text-teal-200"><StudioIcon name="spark" size={15}/> PALJALE · DECISION STUDIO</span>
     <h1 className="max-w-[680px] text-[36px] font-black leading-[1.07] tracking-[-0.055em] text-white sm:text-[54px]">{en?'Make every business number count.':'Que cada número te ayude a decidir.'}</h1>
     <p className="max-w-xl text-[15px] leading-7 text-slate-200">{en?'Explore visual calculators that explain your margin, prices, discounts and break-even — instantly and without sign-up.':'Calcula, compara y entiende tus márgenes, precios, descuentos y punto de equilibrio. Resultados claros, al instante y sin registro.'}</p>
     <div className="flex flex-wrap gap-3"><Link href="/calculadoras" className={`${styles.action} !bg-[#35d0bb] !text-[#092d3b]`}>{en?'Explore calculators':'Explorar calculadoras'}<StudioIcon name="arrow" size={18}/></Link><Link href="/calculadora-precio-venta" className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-white/30 px-5 text-sm font-bold text-white transition hover:bg-white/10">{en?'Calculate a price':'Calcular un precio'}</Link></div>
     <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2 text-xs text-slate-300"><span className="flex items-center gap-2"><StudioIcon name="check" size={15}/>{en?'Instant results':'Resultados instantáneos'}</span><span className="flex items-center gap-2"><StudioIcon name="lock" size={15}/>{en?'Local calculations':'Cálculos en tu navegador'}</span><span className="flex items-center gap-2"><StudioIcon name="bookmark" size={15}/>{en?'Optional saved scenarios':'Escenarios opcionales'}</span></div>
    </div>
    <aside className="relative rounded-[24px] border border-white/20 bg-white p-5 text-slate-900 shadow-[0_28px_75px_rgba(0,0,0,0.25)] sm:p-6" aria-label={en?'Price simulation':'Demostración de precio'}>
     <div className="flex items-center gap-3"><div className="rounded-xl bg-teal-50 p-3 text-teal-700"><StudioIcon name="calculator"/></div><div><p className="text-sm font-black">{en?'Instant price preview':'Vista rápida de precio'}</p><p className="text-xs text-slate-500">{en?'Try your own numbers':'Prueba tus propios datos'}</p></div></div>
     <div className="mt-5 grid grid-cols-2 gap-3"><label className="block"><span className="mb-2 block text-xs font-semibold text-slate-600">{en?'Cost (MXN)':'Costo (MXN)'}</span><input type="number" inputMode="decimal" step="any" min="0" className={styles.field} placeholder="0.00" value={cost} onChange={e=>setCost(e.target.value)}/></label><label className="block"><span className="mb-2 block text-xs font-semibold text-slate-600">{en?'Target margin %':'Margen objetivo %'}</span><input type="number" inputMode="decimal" step="any" min="0" max="99.99" className={styles.field} placeholder="0" value={margin} onChange={e=>setMargin(e.target.value)}/></label></div>
     <div className="mt-5 rounded-2xl bg-slate-900 p-5 text-white"><p className="text-xs font-medium text-slate-300">{en?'Suggested price before VAT':'Precio sugerido sin IVA'}</p><p className="mt-2 text-[31px] font-black tracking-tight tabular-nums">{valid?new Intl.NumberFormat(en?'en-US':'es-MX',{style:'currency',currency:'MXN'}).format(price):'—'}</p><p className="mt-2 text-xs text-slate-300">{valid?(en?'Based on your chosen margin.':'Calculado según tu margen objetivo.'):(en?'Enter your figures to start.':'Introduce tus datos para comenzar.')}</p></div>
     <Link href="/calculadora-precio-venta" className="mt-4 inline-flex items-center gap-2 text-xs font-extrabold text-teal-700 hover:underline">{en?'Open the full pricing tool':'Abrir simulador completo'} <StudioIcon name="arrow" size={15}/></Link>
    </aside>
   </div>
  </section>
  <section className="space-y-5"><div><p className="text-[11px] font-bold uppercase tracking-[0.23em] text-teal-700">{en?'YOUR BUSINESS TOOLKIT':'TU CENTRO DE DECISIONES'}</p><h2 className="mt-2 text-[27px] font-black tracking-tight text-slate-900 sm:text-[34px]">{en?'Professional tools, made simple.':'Herramientas profesionales, sin complicaciones.'}</h2><p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">{en?'Each calculator explains the meaning of its results and offers next steps.':'Cada calculadora explica qué significan tus resultados y cómo continuar con tu análisis.'}</p></div><StudioCards/></section>
  <section className="grid gap-4 md:grid-cols-3">
   {[{icon:'calculator',title:en?'Understand':'Comprende',detail:en?'Clear concepts and labeled fields.':'Campos claros, conceptos y pasos de uso.'},{icon:'compare',title:en?'Explore':'Compara',detail:en?'Simulate alternate pricing decisions.':'Simula cambios antes de tomar decisiones.'},{icon:'save',title:en?'Continue':'Continúa',detail:en?'Save scenarios on this browser if you choose.':'Guarda escenarios en este navegador si lo deseas.'}].map(x=><div key={x.title} className={`${styles.glass} p-5`}><div className="mb-3 inline-flex rounded-xl bg-teal-50 p-3 text-teal-700"><StudioIcon name={x.icon}/></div><h3 className="font-extrabold text-slate-900">{x.title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{x.detail}</p></div>)}
  </section>
  <section className="space-y-5"><div><p className="text-[11px] font-bold uppercase tracking-[0.2em] text-teal-700">PALJALE · {en?'MORE OPTIONS':'OTRAS ÁREAS'}</p><h2 className="mt-2 text-[25px] font-black tracking-tight text-slate-900">{en?'Explore the library':'Explora la biblioteca'}</h2><p className="mt-2 text-sm leading-6 text-slate-600">{en?'Utilities are available now. Templates, crypto and language tools will grow as they pass quality review.':'Utilidades disponibles ahora. Plantillas, cripto y herramientas de texto crecerán conforme pasen nuestras pruebas de calidad.'}</p></div><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{[
   {icon:'tools',es:'Utilidades',en:'Utilities',description:en?'QR and secure passwords.':'QR y contraseñas seguras.',href:'/qr',available:true},
   {icon:'business',es:'Plantillas',en:'Templates',description:en?'Formats for everyday work.':'Formatos para el trabajo diario.',href:'',available:false},
   {icon:'crypto',es:'Cripto',en:'Crypto',description:en?'Informational tools in planning.':'Herramientas informativas en planeación.',href:'',available:false},
   {icon:'text',es:'Texto e idiomas',en:'Text & language',description:en?'Writing utilities in planning.':'Utilidades lingüísticas en planeación.',href:'',available:false}
  ].map((x)=><div key={x.es} className={`${styles.tile} flex flex-col p-5`}><div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-700"><StudioIcon name={x.icon} size={22}/></div><h3 className="font-extrabold text-slate-900">{en?x.en:x.es}</h3><p className="mt-2 flex-1 text-xs leading-6 text-slate-600">{x.description}</p>{x.available?<Link href={x.href} className={`${styles.secondary} mt-4 !justify-start`}>{en?'Explore utilities':'Explorar utilidades'} <StudioIcon name="arrow" size={15}/></Link>:<span className="mt-4 inline-block text-xs font-semibold text-slate-400">{en?'In preparation':'En preparación'}</span>}</div>)}</div></section>
 </div>
}
