import type {Metadata} from 'next';
import Lote05Page from '@/components/lote05/Lote05Page';
export const metadata:Metadata={title:'Orden de compra online | PALJALE',description:'Prepara una orden de compra empresarial imprimible con detalle e impuestos.',alternates:{canonical:'/orden-de-compra'}};
export default function Page(){return <Lote05Page kind='order'/>;}
