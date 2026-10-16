import type {Metadata} from 'next';
import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import StudioFrame from '@/components/decision/StudioFrame';
import StudioIcon from '@/components/decision/StudioIcon';
export const metadata:Metadata={title:'Texto e idiomas | PALJALE',description:'Texto e idiomas en PALJALE Decision Studio.',alternates:{canonical:'/texto-idiomas'}};
export default function Page(){return <><SiteHeader/><StudioFrame><main className="w-full space-y-5"><div className="rounded-[27px] border border-slate-200 bg-white p-7 sm:p-10"><span className="inline-flex rounded-xl bg-teal-50 p-3 text-teal-700"><StudioIcon name="text" size={30}/></span><h1 className="mt-5 text-[34px] font-black tracking-tight text-slate-900">Texto e idiomas</h1><p className="mt-3 max-w-xl text-sm leading-7 text-slate-600">Próximamente: utilidades de texto y lenguaje de calidad comprobada.</p></div></main></StudioFrame></>}
