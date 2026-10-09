import type { Metadata } from "next";
import PdfToolPage from "@/components/pdf/PdfToolPage";

export const metadata: Metadata = {
  title: "Rotar PDF gratis",
  alternates: { canonical: "/rotar-pdf" },
};
export default function Page() { return <PdfToolPage mode="rotate" />; }
