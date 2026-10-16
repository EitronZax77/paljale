import type { Metadata } from "next";
import DocumentToolsClient from "@/components/tools/DocumentToolsClient";
export const metadata:Metadata={title:"Word a PDF Gratis",description:"Convierte archivos DOCX a PDF con texto seleccionable de forma sencilla y privada.",alternates:{canonical:"/word-a-pdf"}};
export default function Page(){return <DocumentToolsClient mode="word-pdf"/>;}
