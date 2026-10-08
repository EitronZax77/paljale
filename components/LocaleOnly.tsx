"use client";
import { useLanguage, type Language } from "@/components/LanguageProvider";
import type { ReactNode } from "react";
export default function LocaleOnly({ language, children }: { language: Language; children: ReactNode }) {
  const active = useLanguage().language === language;
  if (!active) return null;
  return <div lang={language === "es" ? "es-MX" : "en-US"} hidden={!active} style={active ? undefined : { display: "none" }}>{children}</div>;
}
