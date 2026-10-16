"use client";
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useLanguage} from '@/components/LanguageProvider';
import StudioIcon from './StudioIcon';
const sections = [
 {href:'/',es:'Inicio',en:'Home',icon:'home'},
 {href:'/calculadoras',es:'Calculadoras',en:'Calculators',icon:'calculator'},
 {href:'/utilidades',es:'Utilidades',en:'Utilities',icon:'tools'},
 {href:'/plantillas',es:'Plantillas',en:'Templates',icon:'business'},
 {href:'/cripto',es:'Cripto',en:'Crypto',icon:'crypto'},
 {href:'/texto-idiomas',es:'Texto e idiomas',en:'Text & languages',icon:'text'},
];
export default function StudioSidebar(){
 const pathname=usePathname();const {language}=useLanguage();const en=language==='en';
 const isCalc=pathname.startsWith('/calculadora-');
 return <aside aria-label={en?'Main sections':'Secciones principales'} className="w-full shrink-0 lg:w-[238px]">
  <div className="rounded-[22px] border border-slate-200 bg-white p-3 shadow-[0_12px_36px_rgba(15,23,42,0.045)] lg:sticky lg:top-5">
   <p className="px-3 pb-3 pt-2 text-[10px] font-extrabold uppercase tracking-[0.2em] text-slate-400">PALJALE · {en?'NAVIGATION':'NAVEGACIÓN'}</p>
   <nav className="grid grid-cols-2 gap-1 sm:grid-cols-3 lg:grid-cols-1">{sections.map(x=>{
     const selected=pathname===x.href||(x.href==='/calculadoras'&&isCalc);
     return <Link key={x.href} href={x.href} aria-current={selected?'page':undefined} className={`flex min-h-12 items-center gap-3 rounded-xl px-3 py-3 text-[13px] font-bold no-underline hover:no-underline transition-all duration-200 ${selected?'bg-[#e6f6f4] text-teal-900 ring-1 ring-teal-100':'text-slate-600 hover:bg-[#e6f6f4] hover:text-teal-900 hover:ring-1 hover:ring-teal-100'}`}><span className={selected?'text-teal-700':'text-slate-500'}><StudioIcon name={x.icon} size={20}/></span><span>{en?x.en:x.es}</span></Link>;
   })}</nav>
   <div className="mt-4 hidden border-t border-slate-100 px-3 pt-4 lg:block"><p className="text-[11px] leading-5 text-slate-500">{en?'Free, no account required. Tools designed for practical decisions.':'Gratis, sin registro. Herramientas para decisiones prácticas.'}</p></div>
  </div>
 </aside>;
}
