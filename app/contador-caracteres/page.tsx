import type {Metadata} from "next";
import TextToolPage from "@/components/text/TextToolPage";
export const metadata:Metadata={title:'Contador de caracteres gratis | PALJALE',description:'Cuenta caracteres de tu texto al instante, sin subirlo a un servidor.',alternates:{canonical:'/contador-caracteres'}};
export default function Page(){return <TextToolPage kind='characters' title='Contador de caracteres' description='Cuenta caracteres de tu texto al instante, sin subirlo a un servidor.' help='Escribe o pega tu texto para medir caracteres totales, caracteres sin espacios y espacios o saltos de línea.'/>;}
