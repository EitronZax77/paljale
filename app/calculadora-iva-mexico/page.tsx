import type { Metadata } from "next";
import CommercialCalculator from "@/components/CommercialCalculator";
export const metadata: Metadata = { title: "Calculadora de IVA México gratis | PALJALE", description: "Calcula IVA incluido y precio antes o después de impuestos.", alternates: { canonical: "/calculadora-iva-mexico" } };
export default function Page() { return <CommercialCalculator kind="iva"/>; }
