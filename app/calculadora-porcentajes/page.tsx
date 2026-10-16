import type { Metadata } from "next";
import CalculatorToolsClient from "@/components/tools/CalculatorToolsClient";
export const metadata:Metadata={title:"Calculadora de Porcentajes Gratis",description:"Calcula porcentajes, variación porcentual y proporciones en segundos.",alternates:{canonical:"/calculadora-porcentajes"}};
export default function Page(){return <CalculatorToolsClient mode="percent"/>;}
