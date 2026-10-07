import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import ImagenesToolClient from "./ImagenesToolClient";

export const metadata: Metadata = {
  title: "Comprimir y Convertir Imágenes Gratis",

  description:
    "Comprime imágenes y convierte archivos JPG, PNG y WebP gratis directamente desde tu navegador con PALJALE.",

  alternates: {
    canonical: "/imagenes",
  },

  openGraph: {
    title: "Comprimir y Convertir Imágenes Gratis | PALJALE",
    description:
      "Reduce el peso de imágenes y convierte entre JPG, PNG y WebP directamente desde tu navegador.",
    url: `${siteConfig.url}/imagenes`,
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Comprimir y Convertir Imágenes Gratis | PALJALE",
    description:
      "Comprime y convierte imágenes JPG, PNG y WebP gratis con PALJALE.",
  },
};

export default function ImagenesPage() {
  return <ImagenesToolClient />;
}