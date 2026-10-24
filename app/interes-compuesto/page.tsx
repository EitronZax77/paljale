import type {Metadata} from 'next';
import Finance03Page from '@/components/finance/Finance03Page';
export const metadata:Metadata={title:'Interés compuesto gratis | PALJALE',description:'Calcula el crecimiento de tu capital con interés compuesto, capitalización mensual y resultados instantáneos.',alternates:{canonical:'/interes-compuesto'}};
export default function Page(){return <Finance03Page kind='compound' title='Interés compuesto' description='Calcula el crecimiento de tu capital con interés compuesto, capitalización mensual y resultados instantáneos.'/>;}
