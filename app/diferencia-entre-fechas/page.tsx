import type {Metadata} from 'next';
import Math02Page from '@/components/math/Math02Page';
export const metadata:Metadata={title:'Diferencia entre fechas gratis | PALJALE',description:'Calcula los días entre dos fechas con opción de incluir ambos extremos.',alternates:{canonical:'/diferencia-entre-fechas'}};
export default function Page(){return <Math02Page kind='dates' title='Diferencia entre fechas' description='Calcula los días entre dos fechas con opción de incluir ambos extremos.'/>;}
