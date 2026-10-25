import Link from 'next/link';
import StudioIcon from '@/components/decision/StudioIcon';
import styles from '@/components/decision/Studio.module.css';
import {tools} from './catalog';
export default function Lote05Cards({category}:{category:'cripto'|'plantillas'}){
 const entries=tools.filter(x=>x.category===category);
 return <section aria-label={`Herramientas de ${category}`} className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{entries.map(t=><article key={t.href} className={`${styles.tile} flex min-h-[242px] flex-col p-5 sm:p-6`}><div className="mb-5 flex items-start justify-between"><span className="flex h-14 w-14 items-center justify-center rounded-[18px]" style={{color:t.color,backgroundColor:`${t.color}14`}}><StudioIcon name={t.icon} size={28}/></span><span className="rounded-full border border-slate-200 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">{category==='cripto'?'CRIPTO':'PLANTILLAS'}</span></div><h2 className="text-[20px] font-extrabold tracking-tight text-slate-900">{t.title}</h2><p className="mt-2 flex-1 text-[13px] leading-6 text-slate-600">{t.desc}</p><Link href={t.href} className={`${styles.action} mt-5 self-start`} aria-label={`Abrir ${t.title}`}>Abrir herramienta <StudioIcon name="arrow" size={17}/></Link></article>)}</section>;
}
