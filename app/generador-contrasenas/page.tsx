import type { Metadata } from "next";
import CalculatorToolsClient from "@/components/tools/CalculatorToolsClient";
export const metadata:Metadata={title:"Generador de Contraseñas Seguras Gratis",description:"Crea contraseñas aleatorias y seguras con la API criptográfica de tu navegador.",alternates:{canonical:"/generador-contrasenas"}};
export default function Page(){return <CalculatorToolsClient mode="password"/>;}
