import LocalizedText from "@/components/LocalizedText";
import SiteHeader from "@/components/SiteHeader";
import ToolExplorer from "@/components/ToolExplorer";
import BarraEfemeride from "@/components/BarraEfemeride";
import AnimatedSpriteParade from "@/components/theme/AnimatedSpriteParade";
import FloatingFeedbackButton from "@/components/FloatingFeedbackButton";

export default function Home() {
  return (
    <div className="min-h-screen text-slate-950">
      <SiteHeader />

      <main className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">
        <ToolExplorer />
      </main>

      <BarraEfemeride />

      <AnimatedSpriteParade />

      <footer className="border-t border-[var(--pal-border)] bg-white px-5 py-5 text-center text-sm font-bold text-slate-700">
        PALJALE © 2026 — <LocalizedText es="Todos los derechos reservados." en="All rights reserved." />
      </footer>

      <FloatingFeedbackButton />
    </div>
  );
}
