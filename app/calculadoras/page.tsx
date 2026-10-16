import type { Metadata } from 'next';
import SiteHeader from '@/components/SiteHeader';
import StudioLanding from '@/components/decision/StudioLanding';
import StudioFrame from '@/components/decision/StudioFrame';
export const metadata:Metadata={title:'Calculadoras y simuladores comerciales | PALJALE',description:'Calculadoras gratis de margen, precio de venta, IVA México, descuentos y punto de equilibrio. Calcula, comprende y compara decisiones.',alternates:{canonical:'/calculadoras'}};
export default function Page(){return <><SiteHeader/><StudioFrame><StudioLanding/></StudioFrame></>}
