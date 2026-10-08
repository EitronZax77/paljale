import type { ReactNode } from "react";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import BarraEfemeride from "@/components/BarraEfemeride";
import AnimatedSpriteParade from "@/components/theme/AnimatedSpriteParade";
import FloatingFeedbackButton from "@/components/FloatingFeedbackButton";

interface InstitutionalShellProps {
  eyebrow: string;
  title: string;
  introduction: string;
  updatedAt?: string;
  children: ReactNode;
}

export default function InstitutionalShell({
  eyebrow,
  title,
  introduction,
  updatedAt,
  children,
}: InstitutionalShellProps) {
  return (
    <div className="flex min-h-screen flex-col text-[var(--pal-text)]">
      <SiteHeader />
      <main className="mx-auto w-full max-w-[1200px] flex-1 px-4 py-7 sm:px-6 sm:py-10 lg:px-8">
        <div className="overflow-hidden rounded-[32px] border border-[var(--pal-border)] bg-white shadow-[var(--pal-shadow)]">
          <div className="relative overflow-hidden border-b border-[var(--pal-border)] bg-gradient-to-r from-[var(--pal-tint)] via-white to-white px-6 py-9 sm:px-10 sm:py-11">
            <Link href="/" className="mb-6 inline-flex items-center gap-2 rounded-xl border border-[var(--pal-border)] bg-white/85 px-4 py-2.5 text-sm font-bold text-[var(--pal-accent)] transition hover:shadow-md">
              <span aria-hidden="true">←</span> Volver a inicio
            </Link>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.23em] text-[var(--pal-accent)]">{eyebrow}</p>
            <h1 className="mt-3 text-3xl font-black tracking-[-0.05em] text-[var(--pal-text)] sm:text-[44px]">{title}</h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">{introduction}</p>
            {updatedAt ? (
              <p className="mt-4 text-xs font-semibold text-slate-500">Última actualización: {updatedAt}</p>
            ) : null}
          </div>
          <div className="px-5 py-7 sm:px-10 sm:py-10">
            <div className="institutional-content mx-auto max-w-[880px] space-y-6 text-[15px] leading-7 text-slate-600 sm:text-base sm:leading-8">
              {children}
            </div>
          </div>
        </div>
      </main>
      <BarraEfemeride />
      <AnimatedSpriteParade />
      <footer className="border-t border-[var(--pal-border)] bg-white px-5 py-5 text-center text-sm font-bold text-slate-700">
        PALJALE © 2026 — Todos los derechos reservados.
      </footer>
      <FloatingFeedbackButton />
    </div>
  );
}
