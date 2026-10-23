import type {Metadata} from 'next';
import Math02Page from '@/components/math/Math02Page';
export const metadata:Metadata={title:'Calculadora de edad gratis | PALJALE',description:'Calcula la edad cumplida a partir de la fecha de nacimiento.',alternates:{canonical:'/calculadora-edad'}};
export default function Page(){return <Math02Page kind='age' title='Calculadora de edad' description='Calcula la edad cumplida a partir de la fecha de nacimiento.'/>;}
