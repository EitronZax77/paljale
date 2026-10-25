import type {Metadata} from 'next';
import Lot04Page from '@/components/lot04/Lot04Page';
export const metadata:Metadata={title:'Generador de cotizaciones | PALJALE',description:'Prepara cotizaciones con conceptos, IVA y total, listas para imprimir.',alternates:{canonical:'/generador-cotizaciones'}};
export default function Page(){return <Lot04Page kind='quote'/>;}
