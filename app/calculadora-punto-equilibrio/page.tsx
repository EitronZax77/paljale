import type { Metadata } from "next";
import CommercialCalculator from "@/components/CommercialCalculator";
export const metadata: Metadata = { title: "Calculadora de punto de equilibrio gratis | PALJALE", description: "Calcula unidades para cubrir costos fijos y variables.", alternates: { canonical: "/calculadora-punto-equilibrio" } };
export default function Page() { return <CommercialCalculator kind="equilibrio"/>; }
