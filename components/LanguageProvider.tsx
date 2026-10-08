"use client";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
export type Language = "es" | "en";
const KEY = "paljale_language";
const LanguageContext = createContext<{ language: Language; setLanguage: (language: Language) => void }>({ language: "es", setLanguage: () => {} });
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, updateLanguage] = useState<Language>("es");
  useEffect(() => {
    const stored = window.localStorage.getItem(KEY);
    if (stored === "en") {
      const timer = window.setTimeout(() => updateLanguage("en"), 0);
      return () => window.clearTimeout(timer);
    }
  }, []);
  useEffect(() => {
    document.documentElement.lang = language === "es" ? "es-MX" : "en-US";
    document.documentElement.dataset.paljaleLanguage = language;
  }, [language]);
  function setLanguage(next: Language) {
    updateLanguage(next);
    window.localStorage.setItem(KEY, next);
  }
  return <LanguageContext.Provider value={{ language, setLanguage }}>{children}</LanguageContext.Provider>;
}
export function useLanguage() { return useContext(LanguageContext); }
export function Bilingual({ es, en }: { es: ReactNode; en: ReactNode }) { const { language } = useLanguage(); return <>{language === "es" ? es : en}</>; }
