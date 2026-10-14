import type { Metadata } from "next";
import RemoveBackgroundClient from "@/components/images/RemoveBackgroundClient";

export const metadata: Metadata = {
  title: "Quitar fondo de imágenes",
  description: "Elimina fondos con una vista comparativa de la imagen original y el resultado.",
  alternates: { canonical: "/quitar-fondo-imagen" },
};
export default function Page() {
  return <RemoveBackgroundClient />;
}
