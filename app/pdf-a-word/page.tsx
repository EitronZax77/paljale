import type { Metadata } from "next";
import DocumentToolsClient from "@/components/tools/DocumentToolsClient";
export const metadata:Metadata={title:"PDF a Word Editable Gratis",description:"Extrae texto de documentos PDF y descarga archivos DOCX editables gratis; ideal para documentos PDF con texto.",alternates:{canonical:"/pdf-a-word"}};
export default function Page(){return <DocumentToolsClient mode="pdf-word"/>;}
