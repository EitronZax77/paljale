import type {Metadata} from 'next';
import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import StudioFrame from '@/components/decision/StudioFrame';
import StudioIcon from '@/components/decision/StudioIcon';
export const metadata:Metadata={title:'Cripto | PALJALE',description:'Cripto en PALJALE Decision Studio.',alternates:{canonical:'/cripto'}};
export default function Page(){return <><SiteHeader/><StudioFrame><main className="w-full space-y-5"><div className="rounded-[27px] border border-slate-200 bg-white p-7 sm:p-10"><span className="inline-flex rounded-xl bg-teal-50 p-3 text-teal-700"><StudioIcon name="crypto" size={30}/></span><h1 className="mt-5 text-[34px] font-black tracking-tight text-slate-900">Cripto</h1><p className="mt-3 max-w-xl text-sm leading-7 text-slate-600">Herramientas informativas en planificación. No se muestran cotizaciones sin una fuente confiable.</p></div></main></StudioFrame></>}
