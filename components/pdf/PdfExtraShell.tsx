"use client";
import type { ReactNode } from "react";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import BarraEfemeride from "@/components/BarraEfemeride";
import AnimatedSpriteParade from "@/components/theme/AnimatedSpriteParade";
import FloatingFeedbackButton from "@/components/FloatingFeedbackButton";
import LocalizedText from "@/components/LocalizedText";
import { useLanguage } from "@/components/LanguageProvider";
export default function PdfExtraShell({title,description,children}:{title:[string,string];description:[string,string];children:ReactNode}){
const {language}=useLanguage(), en=language==="en";
return <div className="flex min-h-screen flex-col text-[var(--pal-text)]"><SiteHeader/><main className="mx-auto w-full max-w-[1600px] flex-1 px-4 py-7 sm:px-6 sm:py-10 lg:px-8"><section className="mx-auto max-w-5xl"><Link href="/pdf" className="mb-5 inline-flex min-h-11 items-center gap-2 rounded-2xl border border-[var(--pal-border)] bg-white px-5 py-3 text-sm font-bold text-[var(--pal-accent)] shadow-sm transition hover:-translate-y-0.5 hover:bg-[var(--pal-tint)] hover:shadow-md">← {en?"Back to PDF tools":"Volver a herramientas PDF"}</Link><div className="overflow-hidden rounded-[32px] border border-[var(--pal-border)] bg-white shadow-[var(--pal-shadow)]"><div className="border-b border-[var(--pal-border)] bg-gradient-to-r from-[var(--pal-tint)] to-white px-6 py-8 sm:px-10"><p className="text-xs font-extrabold uppercase tracking-widest text-[var(--pal-accent)]">PALJALE · PDF</p><h1 className="mt-2 text-3xl font-black tracking-tight text-[var(--pal-text)] sm:text-4xl">{title[en?1:0]}</h1><p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">{description[en?1:0]}</p></div><div className="space-y-6 px-5 py-7 sm:px-10 sm:py-9">{children}</div></div></section></main><BarraEfemeride/><AnimatedSpriteParade/><footer className="border-t border-[var(--pal-border)] bg-white px-5 py-5 text-center text-sm font-bold text-slate-700">PALJALE © 2026 — <LocalizedText es="Todos los derechos reservados." en="All rights reserved."/></footer><FloatingFeedbackButton/></div>;
}
