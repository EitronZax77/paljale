import type { Metadata } from "next";
import CommercialCalculator from "@/components/CommercialCalculator";
export const metadata: Metadata = { title: "Calculadora de margen de ganancia gratis | PALJALE", description: "Calcula utilidad, margen sobre ventas y recargo sobre costo.", alternates: { canonical: "/calculadora-margen-ganancia" } };
export default function Page() { return <CommercialCalculator kind="margen"/>; }
