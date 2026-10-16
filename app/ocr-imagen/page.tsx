import type { Metadata } from "next";
import DocumentToolsClient from "@/components/tools/DocumentToolsClient";
export const metadata:Metadata={title:"OCR Gratis: Extraer Texto de Imágenes",description:"Reconoce y extrae texto en español e inglés de imágenes JPG, PNG y WebP en tu navegador.",alternates:{canonical:"/ocr-imagen"}};
export default function Page(){return <DocumentToolsClient mode="ocr"/>;}
