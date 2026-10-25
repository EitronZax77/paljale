import type {Metadata} from 'next';
import CryptoToolPage from '@/components/lote05/CryptoToolPage';
export const metadata:Metadata={title:'Precios de criptomonedas | PALJALE',description:'Consulta precios indicativos en USD y MXN y variación de 24 horas con datos de CoinGecko.',alternates:{canonical:'/precios-criptomonedas'}};
export default function Page(){return <CryptoToolPage mode="prices"/>}
