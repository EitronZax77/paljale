import type {Metadata} from 'next';
import CryptoToolPage from '@/components/lote05/CryptoToolPage';
export const metadata:Metadata={title:'Conversor de criptomonedas | PALJALE',description:'Convierte BTC, ETH y otras criptomonedas a USD, MXN y entre sí con cotizaciones consultadas.',alternates:{canonical:'/conversor-criptomonedas'}};
export default function Page(){return <CryptoToolPage mode="convert"/>}
