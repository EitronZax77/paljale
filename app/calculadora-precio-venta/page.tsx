import type { Metadata } from "next";
import CommercialCalculator from "@/components/CommercialCalculator";
export const metadata: Metadata = { title: "Calculadora de precio de venta gratis | PALJALE", description: "Calcula el precio de venta con el margen deseado y el IVA.", alternates: { canonical: "/calculadora-precio-venta" } };
export default function Page() { return <CommercialCalculator kind="precio"/>; }
