import type { Metadata } from "next";
import PdfToolPage from "@/components/pdf/PdfToolPage";

export const metadata: Metadata = {
  title: "Extraer páginas PDF gratis",
  alternates: { canonical: "/extraer-paginas-pdf" },
};
export default function Page() { return <PdfToolPage mode="extract" />; }
