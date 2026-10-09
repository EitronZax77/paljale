import type { Metadata } from "next";
import PdfConversionClient from "@/components/pdf/PdfConversionClient";
export const metadata: Metadata = {
  title: "Convertir imágenes JPG y PNG a PDF gratis",
  description: "Convierte imágenes JPG y PNG a PDF en tu navegador, gratis y sin subir archivos.",
  alternates: { canonical: "/imagenes-a-pdf" },
};
export default function Page() { return <PdfConversionClient mode="images-to-pdf" />; }
