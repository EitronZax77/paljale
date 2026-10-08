"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";

type Language = "es" | "en";
interface DailyEvent { text: string; year: number | null; source: string; scope: "national" | "world"; }
interface ApiResponse { language?: Language; events?: DailyEvent[]; }
interface DailyResult { language: Language; dateKey: string; events: DailyEvent[]; }

const ROTATION_MS = 13000;
const FADE_MS = 320;

export default function BarraEfemeride() {
  const { language } = useLanguage();
  const en = language === "en";
  const [date, setDate] = useState<Date | null>(null);
  const [result, setResult] = useState<DailyResult | null>(null);
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const update = () => setDate(new Date());
    const start = window.setTimeout(update, 0);
    const interval = window.setInterval(update, 60000);
    return () => { window.clearTimeout(start); window.clearInterval(interval); };
  }, []);

  const dateKey = date ? `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}` : "";
  useEffect(() => {
    if (!dateKey) return;
    const controller = new AbortController();
    const parts = dateKey.split("-");
    const load = async () => {
      try {
        const response = await fetch(`/api/efemeride?month=${parts[1]}&day=${parts[2]}&lang=${language}`, { signal: controller.signal });
        if (!response.ok) throw new Error("Unavailable");
        const body = (await response.json()) as ApiResponse;
        if (body.language !== language || !Array.isArray(body.events)) throw new Error("Language mismatch");
        if (!controller.signal.aborted) setResult({ language, dateKey, events: body.events });
      } catch {
        if (!controller.signal.aborted) setResult({ language, dateKey, events: [] });
      }
    };
    void load();
    return () => controller.abort();
  }, [dateKey, language]);

  const current = result?.language === language && result.dateKey === dateKey ? result.events : null;
  const count = current?.length ?? 0;
  const safeIndex = count > 0 ? index % count : 0;
  const event = current?.[safeIndex];

  useEffect(() => {
    if (count < 2 || paused) return;
    const id = window.setInterval(() => {
      setVisible(false);
      window.setTimeout(() => {
        setIndex((old) => (old + 1) % count);
        setVisible(true);
      }, FADE_MS);
    }, ROTATION_MS);
    return () => window.clearInterval(id);
  }, [count, paused, language, dateKey]);

  const formatted = date ? new Intl.DateTimeFormat(en ? "en-US" : "es-MX", { day: "numeric", month: "long" }).format(date) : "";
  return (
    <section className="border-t border-slate-200 bg-[#eef4fb]" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocusCapture={() => setPaused(true)} onBlurCapture={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false); }}>
      <div className="mx-auto flex min-h-24 w-full max-w-7xl flex-col gap-4 px-5 py-5 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div className="flex shrink-0 items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-cyan-600 shadow-sm">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5"><rect x="4" y="5.5" width="16" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.6"/><path d="M8 3.5v4M16 3.5v4M4 9.5h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
          </div>
          <div><p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-cyan-700">{en ? "ON THIS DAY" : "UN DÍA COMO HOY"}</p><p className="mt-1 text-base font-bold capitalize text-slate-950">{formatted}</p></div>
        </div>
        <div className="min-w-0 flex-1 md:max-w-4xl md:text-right">
          {current === null ? <p className="text-base text-slate-500">{en ? "Looking up today's events…" : "Consultando efemérides…"}</p> : event ? (
            <div>
              <div className={`transition-opacity duration-300 motion-reduce:transition-none ${visible ? "opacity-100" : "opacity-0"}`} aria-live="off">
                <p className="text-[15px] leading-7 text-slate-700 md:text-base">{event.year !== null && <strong className="mr-1 text-slate-950">{event.year}.</strong>}{event.text}</p>
                <div className="mt-1 flex flex-wrap items-center gap-2 md:justify-end"><span className="text-[11px] font-medium text-slate-500">{event.scope === "national" ? (en ? "United States event" : "Acontecimiento de México") : (en ? "World event" : "Acontecimiento mundial")}</span><a href={event.source} target="_blank" rel="noreferrer" className="text-[11px] font-bold text-cyan-700 hover:underline">Wikipedia ↗</a></div>
              </div>
            </div>
          ) : <p className="text-base text-slate-500">{en ? "No events are available in English at this time." : "No hay efemérides disponibles en español por el momento."}</p>}
        </div>
      </div>
    </section>
  );
}
