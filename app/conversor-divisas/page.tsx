import type { Metadata } from "next";
import CalculatorToolsClient from "@/components/tools/CalculatorToolsClient";
export const metadata:Metadata={title:"Conversor de Divisas MXN USD EUR",description:"Convierte monedas con tasas fechadas de referencia, sin cotizaciones inventadas.",alternates:{canonical:"/conversor-divisas"}};
export default function Page(){return <CalculatorToolsClient mode="currency"/>;}
