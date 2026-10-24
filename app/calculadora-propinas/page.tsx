import type {Metadata} from 'next';
import Finance03Page from '@/components/finance/Finance03Page';
export const metadata:Metadata={title:'Calculadora de propinas gratis | PALJALE',description:'Calcula propina, total y reparto de cuenta entre varias personas.',alternates:{canonical:'/calculadora-propinas'}};
export default function Page(){return <Finance03Page kind='tip' title='Calculadora de propinas' description='Calcula propina, total y reparto de cuenta entre varias personas.'/>;}
