import LocalizedText from "@/components/LocalizedText";
import SiteHeader from "@/components/SiteHeader";
import BarraEfemeride from "@/components/BarraEfemeride";
import AnimatedSpriteParade from "@/components/theme/AnimatedSpriteParade";
import FloatingFeedbackButton from "@/components/FloatingFeedbackButton";
import PdfToolWorkspace from "@/components/pdf/PdfToolWorkspace";

type Mode = "merge" | "compress" | "rotate" | "extract";
export default function PdfToolPage({ mode }: { mode: Mode }) {
  return (
    <div className="flex min-h-screen flex-col text-[var(--pal-text)]">
      <SiteHeader />
      <main className="mx-auto w-full max-w-[1600px] flex-1 px-4 py-7 sm:px-6 sm:py-10 lg:px-8"><PdfToolWorkspace mode={mode} /></main>
      <BarraEfemeride />
      <AnimatedSpriteParade />
      <footer className="border-t border-[var(--pal-border)] bg-white px-5 py-5 text-center text-sm font-bold text-slate-700">PALJALE © 2026 — <LocalizedText es="Todos los derechos reservados." en="All rights reserved." /></footer>
      <FloatingFeedbackButton />
    </div>
  );
}
