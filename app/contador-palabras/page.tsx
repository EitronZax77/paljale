import type {Metadata} from "next";
import TextToolPage from "@/components/text/TextToolPage";
export const metadata:Metadata={title:'Contador de palabras gratis | PALJALE',description:'Cuenta palabras de un texto en tiempo real, gratis y sin registro.',alternates:{canonical:'/contador-palabras'}};
export default function Page(){return <TextToolPage kind='words' title='Contador de palabras' description='Cuenta palabras de un texto en tiempo real, gratis y sin registro.' help='Pega o escribe tu texto para conocer inmediatamente cuántas palabras, párrafos y minutos estimados de lectura tiene.'/>;}
