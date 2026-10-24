import type {Metadata} from 'next';
import Finance03Page from '@/components/finance/Finance03Page';
export const metadata:Metadata={title:'Calculadora de préstamos gratis | PALJALE',description:'Estima mensualidades, intereses y costo total de un préstamo a tasa fija.',alternates:{canonical:'/calculadora-prestamos'}};
export default function Page(){return <Finance03Page kind='loan' title='Calculadora de préstamos' description='Estima mensualidades, intereses y costo total de un préstamo a tasa fija.'/>;}
