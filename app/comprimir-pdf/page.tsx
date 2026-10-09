import type { Metadata } from "next";
import PdfToolPage from "@/components/pdf/PdfToolPage";

export const metadata: Metadata = {
  title: "Comprimir PDF gratis",
  alternates: { canonical: "/comprimir-pdf" },
};
export default function Page() { return <PdfToolPage mode="compress" />; }
