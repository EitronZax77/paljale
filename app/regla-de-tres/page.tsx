import type {Metadata} from 'next';
import Math02Page from '@/components/math/Math02Page';
export const metadata:Metadata={title:'Regla de tres gratis | PALJALE',description:'Calcula proporciones directas con tres datos y obtiene el cuarto valor.',alternates:{canonical:'/regla-de-tres'}};
export default function Page(){return <Math02Page kind='rule' title='Regla de tres' description='Calcula proporciones directas con tres datos y obtiene el cuarto valor.'/>;}
