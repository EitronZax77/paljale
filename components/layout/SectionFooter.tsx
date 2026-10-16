"use client";

import { useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";
import BarraEfemeride from "@/components/BarraEfemeride";
import AnimatedSpriteParade from "@/components/theme/AnimatedSpriteParade";
import LegalBar from "@/components/LegalBar";
import FloatingFeedbackButton from "@/components/FloatingFeedbackButton";

export const sectionPaths = new Set(["/", "/calculadoras", "/utilidades", "/plantillas", "/cripto", "/texto-idiomas"]);

const subscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

function FloatingControls() {
  const ready = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);
  if (!ready) return null;
  // Evita que un contenedor animado o transformado desplace los botones fixed.
  return createPortal(<FloatingFeedbackButton />, document.body);
}

export default function SectionFooter() {
  const path = usePathname();
  const { language } = useLanguage();
  if (!sectionPaths.has(path)) return null;
  return (
    <div className="paljale-section-footer">
      <BarraEfemeride />
      <AnimatedSpriteParade />
      <footer className="paljale-shared-footer border-t border-[var(--pal-border)] bg-white text-center text-sm text-slate-700">
        <div className="px-5 pt-4 pb-1 font-bold">
          PALJALE © 2026 — {language === "en" ? "All rights reserved." : "Todos los derechos reservados."}
        </div>
        <div className="[&>div>div]:!py-2"><LegalBar /></div>
      </footer>
      <FloatingControls />
    </div>
  );
}
