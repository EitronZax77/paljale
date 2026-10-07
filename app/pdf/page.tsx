import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import PdfToolClient from "./PdfToolClient";

export const metadata: Metadata = {
  title: "Herramientas PDF Gratis",

  description:
    "Une PDFs, extrae páginas, rota documentos y comprime archivos PDF gratis directamente desde tu navegador con PALJALE.",

  alternates: {
    canonical: "/pdf",
  },

  openGraph: {
    title: "Herramientas PDF Gratis | PALJALE",
    description:
      "Une, extrae, rota y comprime archivos PDF directamente desde tu navegador.",
    url: `${siteConfig.url}/pdf`,
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Herramientas PDF Gratis | PALJALE",
    description:
      "Une, extrae, rota y comprime PDFs gratis con PALJALE.",
  },
};

export default function PdfPage() {
  return <PdfToolClient />;
}