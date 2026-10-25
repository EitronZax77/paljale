import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import StudioIcon from '@/components/decision/StudioIcon';
import Lot04Client from './Lot04Client';
import {catalog,type Kind} from './Lot04Catalog';
import BarraEfemeride from '@/components/BarraEfemeride';
import AnimatedSpriteParade from '@/components/theme/AnimatedSpriteParade';
import LegalBar from '@/components/LegalBar';
export default function Lot04Page({kind}:{kind:Kind}){
 const current=catalog.find(x=>x.kind===kind)!;
 const others=catalog.filter(x=>x.kind!==kind && x.category===current.category);
 const parent=current.category==='plantillas'?'/plantillas':'/utilidades';
 return <><SiteHeader/><main className="mx-auto w-full max-w-7xl space-y-6 px-4 py-7 sm:px-6 lg:px-8">
 <nav><Link href={parent} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 no-underline transition hover:-translate-y-0.5 hover:bg-teal-50 hover:text-teal-800">← Todas las {current.category}</Link></nav>
 <header className="rounded-[27px] border border-slate-200 bg-white p-7 sm:p-10">
 <span className="inline-flex h-14 w-14 items-center justify-center rounded-xl" style={{color:current.color,backgroundColor:`${current.color}14`}}><StudioIcon name={current.icon} size={28}/></span>
 <h1 className="mt-5 text-[34px] font-black text-slate-900 sm:text-[42px]">{current.title}</h1><p className="mt-3 text-slate-600">{current.desc}</p></header>
 <Lot04Client kind={kind}/>
 {others.length>0 && <section className="rounded-[25px] border border-slate-200 bg-white p-6 sm:p-7"><h2 className="text-xl font-black text-slate-900">Explora otras {current.category}</h2>
 <div className="mt-4 grid gap-3 sm:grid-cols-2">{others.map(x=><Link key={x.href} href={x.href} className="flex items-center gap-3 rounded-xl border border-slate-200 p-4 text-sm font-bold text-slate-700 no-underline transition hover:-translate-y-0.5 hover:border-teal-200 hover:bg-teal-50"><StudioIcon name={x.icon} size={22}/>{x.title}<span className="ml-auto">→</span></Link>)}</div></section>}
 </main>
 {kind==='quote'&&<div className="paljale-section-footer"><BarraEfemeride/><AnimatedSpriteParade/><footer className="paljale-shared-footer border-t border-[var(--pal-border)] bg-white text-center text-sm text-slate-700"><div className="px-5 pt-4 pb-1 font-bold">PALJALE © 2026 — Todos los derechos reservados.</div><div className="[&>div>div]:!py-2"><LegalBar/></div></footer></div>}
 </>;
}
