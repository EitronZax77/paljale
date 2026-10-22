import type {Metadata} from "next";
import TextToolPage from "@/components/text/TextToolPage";
export const metadata:Metadata={title:'Eliminar líneas duplicadas gratis | PALJALE',description:'Elimina líneas repetidas conservando el orden original.',alternates:{canonical:'/eliminar-lineas-duplicadas'}};
export default function Page(){return <TextToolPage kind='duplicates' title='Eliminar líneas duplicadas' description='Elimina líneas repetidas conservando el orden original.' help='Introduce una entrada por línea. La herramienta conserva la primera aparición de cada línea y elimina repeticiones; también puedes ignorar mayúsculas y minúsculas al comparar.'/>;}
