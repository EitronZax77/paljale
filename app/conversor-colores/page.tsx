import type {Metadata} from 'next';
import Lot04Page from '@/components/lot04/Lot04Page';
export const metadata:Metadata={title:'Conversor HEX, RGB y HSL | PALJALE',description:'Convierte colores HEX, RGB y HSL con vista previa gratis.',alternates:{canonical:'/conversor-colores'}};
export default function Page(){return <Lot04Page kind='color'/>;}
