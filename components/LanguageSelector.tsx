"use client";
import { useLanguage, type Language } from "@/components/LanguageProvider";
export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  return <label className="inline-flex items-center gap-1 rounded-xl border border-[var(--pal-border)] bg-white px-2 py-2 text-sm font-semibold text-[var(--pal-text)] shadow-sm">
    <span aria-hidden="true">{language === "es" ? "🇲🇽" : "🇺🇸"}</span>
    <span className="sr-only">{language === "es" ? "Seleccionar idioma" : "Select language"}</span>
    <select aria-label={language === "es" ? "Idioma" : "Language"} value={language} onChange={e => setLanguage(e.target.value as Language)} className="w-[65px] cursor-pointer sm:w-[90px] bg-transparent outline-none">
      <option value="es">Español</option><option value="en">English</option>
    </select>
  </label>;
}
