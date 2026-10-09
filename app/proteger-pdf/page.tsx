import type { Metadata } from "next";
import ProtectPdfClient from "@/components/pdf/ProtectPdfClient";
export const metadata:Metadata={title:"Proteger PDF con contraseña",alternates:{canonical:"/proteger-pdf"}};
export default function Page(){return <ProtectPdfClient/>}
