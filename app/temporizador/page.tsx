import type {Metadata} from 'next';
import Lot04Page from '@/components/lot04/Lot04Page';
export const metadata:Metadata={title:'Temporizador online | PALJALE',description:'Temporizador en línea con cuenta regresiva, pausa y reinicio.',alternates:{canonical:'/temporizador'}};
export default function Page(){return <Lot04Page kind='timer'/>;}
