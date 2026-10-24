import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import StudioIcon from '@/components/decision/StudioIcon';
import Finance03Client from './Finance03Client';
import {financeTools,type FinanceKind} from './Finance03Catalog';
export default function Finance03Page({kind,title,description}:{kind:FinanceKind;title:string;description:string}){
 const current=financeTools.find(t=>t.kind===kind)!;
 const others=financeTools.filter(t=>t.kind!==kind);
 return <><SiteHeader/><main className="mx-auto w-full max-w-7xl space-y-6 px-4 py-7 sm:px-6 lg:px-8">
  <nav aria-label="Volver a calculadoras"><Link href="/calculadoras" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 no-underline transition-all duration-200 hover:-translate-y-0.5 hover:border-teal-200 hover:bg-teal-50 hover:text-teal-800 hover:no-underline">← Todas las calculadoras</Link></nav>
  <header className="rounded-[27px] border border-slate-200 bg-white p-7 sm:p-10"><span className="inline-flex h-14 w-14 items-center justify-center rounded-xl text-2xl font-black" style={{color:current.accent,backgroundColor:`${current.accent}14`}} aria-hidden="true">{current.symbol}</span><h1 className="mt-5 text-[34px] font-black tracking-tight text-slate-900 sm:text-[42px]">{title}</h1><p className="mt-3 max-w-3xl text-[15px] leading-7 text-slate-600">{description}</p></header>
  <Finance03Client kind={kind}/>
  <section aria-labelledby="finance03-related" className="rounded-[25px] border border-slate-200 bg-white p-6 sm:p-7"><h2 id="finance03-related" className="text-lg font-black text-slate-900">Explora otras calculadoras de finanzas</h2><div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{others.map(t=><Link key={t.href} href={t.href} className="flex min-h-16 items-center gap-3 rounded-xl border border-slate-200 p-3 text-sm font-bold text-slate-700 no-underline transition-all duration-200 hover:-translate-y-0.5 hover:border-teal-200 hover:bg-teal-50 hover:shadow-md hover:no-underline"><span className="flex h-10 w-10 items-center justify-center rounded-xl text-lg font-black" style={{color:t.accent,backgroundColor:`${t.accent}14`}}>{t.symbol}</span><span className="flex-1">{t.name}</span><StudioIcon name="arrow" size={16}/></Link>)}</div></section>
 </main></>;
}
