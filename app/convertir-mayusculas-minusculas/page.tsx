import type {Metadata} from "next";
import TextToolPage from "@/components/text/TextToolPage";
export const metadata:Metadata={title:'Convertidor de mayúsculas y minúsculas gratis | PALJALE',description:'Convierte texto a mayúsculas, minúsculas o estilo título en tu navegador.',alternates:{canonical:'/convertir-mayusculas-minusculas'}};
export default function Page(){return <TextToolPage kind='case' title='Convertidor de mayúsculas y minúsculas' description='Convierte texto a mayúsculas, minúsculas o estilo título en tu navegador.' help='Pega tu texto, elige el formato de salida y copia el resultado procesado. El texto original permanece intacto en el cuadro de entrada.'/>;}
