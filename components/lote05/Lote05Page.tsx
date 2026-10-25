import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import StudioIcon from '@/components/decision/StudioIcon';
import BarraEfemeride from '@/components/BarraEfemeride';
import AnimatedSpriteParade from '@/components/theme/AnimatedSpriteParade';
import LegalBar from '@/components/LegalBar';
import {tools,type Kind} from './catalog';
import Lote05Client from './Lote05Client';
import PurchaseOrderPro from './PurchaseOrderPro';
export default function Lote05Page({kind}:{kind:Kind}){
 const tool=tools.find(x=>x.kind===kind)!;const siblings=tools.filter(x=>x.category===tool.category&&x.kind!==kind);const back=tool.category==='cripto'?'/cripto':'/plantillas';
 return <><SiteHeader/><main className="mx-auto max-w-7xl space-y-6 px-4 py-7 sm:px-6 lg:px-8">
 <nav><Link href={back} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 no-underline transition hover:-translate-y-0.5 hover:bg-teal-50"><StudioIcon name="back" size={17}/> Todas las {tool.category==='cripto'?'herramientas cripto':'plantillas'}</Link></nav>
 <header className="rounded-[27px] border border-slate-200 bg-white p-7 sm:p-10"><span className="inline-flex h-14 w-14 items-center justify-center rounded-xl" style={{color:tool.color,backgroundColor:`${tool.color}14`}}><StudioIcon name={tool.icon} size={28}/></span><h1 className="mt-5 text-[34px] font-black tracking-tight text-slate-900 sm:text-[42px]">{tool.title}</h1><p className="mt-3 text-sm leading-7 text-slate-600">{tool.desc}</p></header>
 {kind==='order'?<PurchaseOrderPro/>:<Lote05Client kind={kind}/>}
 {siblings.length>0&&<section className="rounded-[25px] border border-slate-200 bg-white p-6 sm:p-7"><h2 className="text-xl font-black text-slate-900">Explora otras herramientas cripto</h2><div className="mt-4 grid gap-3 sm:grid-cols-2">{siblings.map(s=><Link href={s.href} key={s.href} className="flex items-center gap-3 rounded-xl border border-slate-200 p-4 text-sm font-bold text-slate-700 no-underline transition hover:-translate-y-0.5 hover:border-teal-200 hover:bg-teal-50"><StudioIcon name={s.icon} size={21}/>{s.title}<span className="ml-auto">→</span></Link>)}</div></section>}
 </main><div className="paljale-section-footer"><BarraEfemeride/><AnimatedSpriteParade/><footer className="paljale-shared-footer border-t border-[var(--pal-border)] bg-white text-center text-sm text-slate-700"><div className="px-5 pt-4 pb-1 font-bold">PALJALE © 2026 — Todos los derechos reservados.</div><div className="[&>div>div]:!py-2"><LegalBar/></div></footer></div></>;
}
