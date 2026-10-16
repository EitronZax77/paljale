import type { Metadata } from "next";
import CalculatorToolsClient from "@/components/tools/CalculatorToolsClient";
export const metadata:Metadata={title:"Conversor de Unidades Gratis",description:"Convierte longitud, masa, temperatura, área, volumen, tiempo y velocidad gratis.",alternates:{canonical:"/conversor-unidades"}};
export default function Page(){return <CalculatorToolsClient mode="units"/>;}
