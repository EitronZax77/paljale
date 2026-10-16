import type { Metadata } from "next";
import CommercialCalculator from "@/components/CommercialCalculator";
export const metadata: Metadata = { title: "Calculadora de descuentos gratis | PALJALE", description: "Calcula descuentos acumulados y precio final.", alternates: { canonical: "/calculadora-descuentos" } };
export default function Page() { return <CommercialCalculator kind="descuento"/>; }
