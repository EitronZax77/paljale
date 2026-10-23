"use client";
import {useLanguage} from '@/components/LanguageProvider';
import StudioCards from './StudioCards';
import StudioIcon from './StudioIcon';
import styles from './Studio.module.css';
export default function StudioLanding(){const {language}=useLanguage();const en=language==='en';return <main className="mx-auto max-w-7xl space-y-9 px-4 py-8 sm:px-6 lg:px-8">
 <section className={`${styles.glass} bg-white p-7 sm:p-10`}><div className="relative z-10 max-w-3xl"><span className="inline-flex rounded-xl bg-teal-50 p-3 text-teal-700"><StudioIcon name="calculator" size={30}/></span><h1 className="mt-3 text-[34px] font-black tracking-tight sm:text-[42px]">{en?'Calculators':'Calculadoras'}</h1><p className="mt-4 max-w-2xl text-[15px] leading-7 text-slate-700">{en?'Explore free calculators for business, mathematics and dates. Get clear and instant results.':'Explora calculadoras gratuitas de negocios, matematicas y fechas. Realiza calculos practicos y consulta resultados claros al instante.'}</p></div></section>
 <h2 className="mb-4 text-2xl font-black tracking-tight text-slate-900">{en?'Business':'Negocios'}</h2>
 
 <StudioCards showSearch={false}/>
 
 </main>}
