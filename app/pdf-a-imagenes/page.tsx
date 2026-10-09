import type { Metadata } from "next";
import PdfConversionClient from "@/components/pdf/PdfConversionClient";
export const metadata: Metadata = {
  title: "Convertir PDF a imágenes JPG y PNG gratis",
  description: "Convierte páginas PDF en imágenes JPG o PNG, previsualiza el resultado y descarga todo en ZIP.",
  alternates: { canonical: "/pdf-a-imagenes" },
};
export default function Page() { return <PdfConversionClient mode="pdf-to-images" />; }
