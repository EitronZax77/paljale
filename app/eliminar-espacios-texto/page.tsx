import type {Metadata} from "next";
import TextToolPage from "@/components/text/TextToolPage";
export const metadata:Metadata={title:'Eliminar espacios de texto gratis | PALJALE',description:'Quita espacios de tu texto al instante con distintos modos de limpieza.',alternates:{canonical:'/eliminar-espacios-texto'}};
export default function Page(){return <TextToolPage kind='spaces' title='Eliminar espacios de texto' description='Quita espacios de tu texto al instante con distintos modos de limpieza.' help='Pega el texto y selecciona el modo que necesites: eliminar todos los espacios, solo espacios repetidos, espacios al inicio y al final de cada línea o líneas vacías.'/>;}
