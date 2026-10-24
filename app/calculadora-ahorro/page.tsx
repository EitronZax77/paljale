import type {Metadata} from 'next';
import Finance03Page from '@/components/finance/Finance03Page';
export const metadata:Metadata={title:'Calculadora de ahorro gratis | PALJALE',description:'Proyecta tu ahorro con aportaciones mensuales, capital inicial y rendimiento anual.',alternates:{canonical:'/calculadora-ahorro'}};
export default function Page(){return <Finance03Page kind='savings' title='Calculadora de ahorro' description='Proyecta tu ahorro con aportaciones mensuales, capital inicial y rendimiento anual.'/>;}
