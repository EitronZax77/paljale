import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import QrToolClient from "./QrToolClient";

export const metadata: Metadata = {
  title: "Generador de Código QR Gratis",

  description:
    "Genera códigos QR gratis para enlaces y textos. Crea, descarga y comparte códigos QR directamente desde tu navegador con PALJALE.",

  alternates: {
    canonical: "/qr",
  },

  openGraph: {
    title: "Generador de Código QR Gratis | PALJALE",
    description:
      "Crea códigos QR para enlaces y textos de forma gratuita directamente desde tu navegador.",
    url: `${siteConfig.url}/qr`,
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Generador de Código QR Gratis | PALJALE",
    description:
      "Crea y descarga códigos QR gratis directamente desde tu navegador.",
  },
};

export default function QrPage() {
  return <QrToolClient />;
}