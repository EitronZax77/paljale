"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLanguage, type Language } from "@/components/LanguageProvider";

type MenuPosition = { top: number; left: number };

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<MenuPosition>({ top: 0, left: 0 });
  const trigger = useRef<HTMLButtonElement>(null);
  const popup = useRef<HTMLDivElement>(null);

  function place() {
    const rect = trigger.current?.getBoundingClientRect();
    if (!rect) return;
    const width = 184;
    const left = Math.max(8, Math.min(rect.right - width, window.innerWidth - width - 8));
    setPosition({ top: rect.bottom + 8, left });
  }

  function toggle() {
    if (!open) place();
    setOpen(!open);
  }

  useEffect(() => {
    if (!open) return;
    const outside = (event: PointerEvent) => {
      const target = event.target as Node;
      if (!trigger.current?.contains(target) && !popup.current?.contains(target)) setOpen(false);
    };
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); trigger.current?.focus(); }
    };
    const closeOnScroll = () => setOpen(false);
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", keydown);
    window.addEventListener("scroll", closeOnScroll, true);
    window.addEventListener("resize", closeOnScroll);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", keydown);
      window.removeEventListener("scroll", closeOnScroll, true);
      window.removeEventListener("resize", closeOnScroll);
    };
  }, [open]);

  const options: { value: Language; label: string; flag: string }[] = [
    { value: "es", label: "Español", flag: "🇲🇽" },
    { value: "en", label: "English", flag: "🇺🇸" },
  ];
  const current = options.find(item => item.value === language) ?? options[0];

  return <>
    <button ref={trigger} type="button" onClick={toggle} aria-expanded={open}
      aria-haspopup="menu" aria-label={language === "es" ? "Cambiar idioma" : "Change language"}
      className="inline-flex items-center gap-1.5 rounded-2xl px-4 py-2.5 text-sm font-bold text-slate-700 transition duration-200 hover:bg-[var(--pal-tint)] hover:text-[var(--pal-accent)] hover:underline active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--pal-accent)]">
      <span aria-hidden="true">{current.flag}</span>
      <span>{current.label}</span>
      <svg aria-hidden="true" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={open ? "rotate-180 transition-transform" : "transition-transform"}><path d="m6 9 6 6 6-6" /></svg>
    </button>
    {open && typeof document !== "undefined" && createPortal(
      <div ref={popup} role="menu" aria-label={language === "es" ? "Idioma" : "Language"}
        style={{ position: "fixed", top: position.top, left: position.left, width: 184, maxWidth: "calc(100vw - 16px)", zIndex: 2147483000, boxSizing: "border-box", background: "white", border: "1px solid #dbe4ee", borderRadius: 16, padding: 6, boxShadow: "0 16px 40px rgba(15,23,42,.17)", fontFamily: "inherit" }}>
        {options.map(item => <button key={item.value} type="button" role="menuitemradio"
          aria-checked={language === item.value}
          onClick={() => { setLanguage(item.value); setOpen(false); }}
          className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm font-bold text-slate-700 transition hover:bg-[var(--pal-tint)] hover:text-[var(--pal-accent)] focus-visible:outline-2 focus-visible:outline-[var(--pal-accent)]">
          <span aria-hidden="true">{item.flag}</span><span className="flex-1">{item.label}</span>
          {language === item.value && <span aria-hidden="true">✓</span>}
        </button>)}
      </div>, document.body)}
  </>;
}
