import type { Metadata } from "next";
import SignPdfClient from "@/components/pdf/SignPdfClient";
export const metadata:Metadata={title:"Firmar PDF gratis",alternates:{canonical:"/firmar-pdf"}};
export default function Page(){return <SignPdfClient/>}
