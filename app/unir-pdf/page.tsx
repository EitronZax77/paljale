import type { Metadata } from "next";
import PdfToolPage from "@/components/pdf/PdfToolPage";

export const metadata: Metadata = {
  title: "Unir PDF gratis",
  alternates: { canonical: "/unir-pdf" },
};
export default function Page() { return <PdfToolPage mode="merge" />; }
