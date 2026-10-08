import type { Metadata } from "next";

import SiteHeader from "@/components/SiteHeader";
import ToolExplorer from "@/components/ToolExplorer";
import BarraEfemeride from "@/components/BarraEfemeride";
import AnimatedSpriteParade from "@/components/theme/AnimatedSpriteParade";
import FloatingFeedbackButton from "@/components/FloatingFeedbackButton";

import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Herramientas PDF Gratis",

  description:
    "Herramientas gratuitas para unir, comprimir, rotar y extraer páginas PDF directamente desde tu navegador.",

  alternates: {
    canonical: "/pdf",
  },

  openGraph: {
    title: "Herramientas PDF Gratis | PALJALE",
    description:
      "Explora herramientas individuales para trabajar con documentos PDF.",
    url: `${siteConfig.url}/pdf`,
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Herramientas PDF Gratis | PALJALE",
    description:
      "Une, comprime, rota y extrae páginas PDF con PALJALE.",
  },
};

export default function PdfPage() {
  return (
    <div className="min-h-screen text-slate-950">
      <SiteHeader />

      <main className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">
        <ToolExplorer category="PDF" />
      </main>

      <BarraEfemeride />

      <AnimatedSpriteParade />

      <footer className="border-t border-[var(--pal-border)] bg-white px-5 py-5 text-center text-sm font-bold text-slate-700">
        PALJALE © 2026 — Todos los derechos reservados.
      </footer>

      <FloatingFeedbackButton />
    </div>
  );
}