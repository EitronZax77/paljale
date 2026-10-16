"use client";
import type { ReactNode } from "react";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import BarraEfemeride from "@/components/BarraEfemeride";
import AnimatedSpriteParade from "@/components/theme/AnimatedSpriteParade";
import FloatingFeedbackButton from "@/components/FloatingFeedbackButton";
import LocalizedText from "@/components/LocalizedText";
import { useLanguage } from "@/components/LanguageProvider";

export default function ToolShell({title, description, category, children, note}: {
  title:[string,string]; description:[string,string]; category:[string,string]; children:ReactNode; note?:[string,string]
}) {
  const { language }=useLanguage(); const en=language === "en";
  return <div className="flex min-h-screen flex-col text-[var(--pal-text)]">
    <SiteHeader />
    <main className="mx-auto w-full max-w-[1600px] flex-1 px-4 py-7 sm:px-6 sm:py-10 lg:px-8">
      <section className="mx-auto max-w-5xl">
        <Link href="/" className="mb-5 inline-flex min-h-11 items-center rounded-2xl border border-[var(--pal-border)] bg-white px-5 py-3 text-sm font-bold text-[var(--pal-accent)] shadow-sm transition hover:bg-[var(--pal-tint)]">← {en ? "Back to library" : "Volver a la biblioteca"}</Link>
        <div className="overflow-hidden rounded-[32px] border border-[var(--pal-border)] bg-white shadow-[var(--pal-shadow)]">
          <header className="border-b border-[var(--pal-border)] bg-gradient-to-r from-[var(--pal-tint)] to-white px-6 py-8 sm:px-10">
            <p className="text-xs font-extrabold uppercase tracking-widest text-[var(--pal-accent)]">PALJALE · {category[en ? 1 : 0]}</p>
            <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">{title[en ? 1 : 0]}</h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">{description[en ? 1 : 0]}</p>
          </header>
          <div className="space-y-6 px-5 py-7 sm:px-10 sm:py-9">{children}
            {note && <p className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-xs leading-6 text-slate-600">{note[en ? 1 : 0]}</p>}
          </div>
        </div>
      </section>
    </main>
    <BarraEfemeride /><AnimatedSpriteParade />
    <footer className="border-t border-[var(--pal-border)] bg-white px-5 py-5 text-center text-sm font-bold text-slate-700">PALJALE © 2026 — <LocalizedText es="Todos los derechos reservados." en="All rights reserved." /></footer>
    <FloatingFeedbackButton />
  </div>;
}

export const inputClass="min-h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-800 outline-offset-2 focus:border-[var(--pal-accent)]";
export const buttonClass="min-h-12 rounded-2xl bg-[var(--pal-accent)] px-6 py-3 text-sm font-extrabold text-white transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-50";
export const secondaryClass="min-h-12 rounded-2xl border border-slate-300 bg-white px-6 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50";

export function downloadBlob(blob:Blob, name:string) {
  const url=URL.createObjectURL(blob); const link=document.createElement("a");
  link.href=url; link.download=name; document.body.appendChild(link); link.click(); link.remove();
  window.setTimeout(()=>URL.revokeObjectURL(url),30000);
}
