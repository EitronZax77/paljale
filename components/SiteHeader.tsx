"use client";

import { useLanguage } from "@/components/LanguageProvider";
import LanguageSelector from "@/components/LanguageSelector";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function SiteHeader() {
  const pathname = usePathname();
  const { language } = useLanguage();
  const goHome = () => {
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  return (
    <header className="relative z-50 border-b border-[var(--pal-border)] bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex h-24 w-full max-w-[1600px] items-center justify-between gap-3 px-3 sm:gap-5 sm:px-6 md:h-32 lg:px-8">

        <Link
          href="/"
          onClick={goHome}
          aria-label="PALJALE - Inicio"
          className="group flex min-w-0 shrink-0 items-center gap-2.5 sm:gap-4 md:gap-5"
        >
          <div className="flex h-[66px] w-[66px] shrink-0 items-center justify-center overflow-hidden rounded-[18px] border border-[var(--pal-border)] bg-white shadow-[0_12px_30px_rgba(15,23,42,0.10)] transition duration-300 group-hover:-translate-y-1 sm:h-[80px] sm:w-[80px] md:h-[102px] md:w-[102px] md:rounded-[24px]">
            <Image
              src="/icon.jpeg"
              alt="PALJALE"
              width={120}
              height={120}
              priority
              className="h-full w-full object-contain p-0.5"
            />
          </div>

          <div>
            <div className="text-[24px] font-black tracking-[-0.055em] text-[var(--pal-text)] sm:text-[32px] md:text-[42px]">
              PALJALE
            </div>

            <div className="mt-1 text-[9px] font-extrabold uppercase tracking-[0.03em] text-[var(--pal-accent)] sm:text-[10px] sm:tracking-[0.1em] md:text-[12px] md:tracking-[0.19em]">
              {language === "es" ? "Herramientas digitales" : "Digital tools"}
            </div>
          </div>
        </Link>

        <nav
          className="ml-auto shrink-0"
          aria-label="Navegación principal"
        >
          <div className="hidden items-center gap-1 lg:gap-2 md:flex">
            <Link
              href="/"
          onClick={goHome}
              className="rounded-2xl px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-[var(--pal-tint)]"
            >
              {language === "es" ? "Inicio" : "Home"}
            </Link>

            <Link
              href="/contacto"
              className="rounded-2xl px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-[var(--pal-tint)]"
            >
              {language === "es" ? "Contacto" : "Contact"}
            </Link>

            <Link
              href="/acerca-de"
              className="rounded-2xl px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-[var(--pal-tint)]"
            >
              {language === "es" ? "Acerca de" : "About"}
            </Link>
            <LanguageSelector />
          </div>

          <div className="flex items-center gap-2 md:hidden"><LanguageSelector />
          <details className="relative">
            <summary
              className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-xl border border-[var(--pal-border)] bg-white text-[var(--pal-text)] shadow-sm"
              aria-label="Abrir menú"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                className="h-5 w-5"
              >
                <path
                  d="M5 7h14M5 12h14M5 17h14"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </summary>

            <div className="absolute right-0 top-[calc(100%+10px)] w-48 rounded-2xl border border-[var(--pal-border)] bg-white p-2 shadow-[0_20px_60px_rgba(15,23,42,0.14)]">
              <Link
                href="/"
          onClick={goHome}
                className="block rounded-xl px-4 py-3 text-sm font-bold text-[var(--pal-text)] hover:bg-[var(--pal-tint)]"
              >
                {language === "es" ? "Inicio" : "Home"}
              </Link>

              <Link
                href="/contacto"
                className="block rounded-xl px-4 py-3 text-sm font-bold text-[var(--pal-text)] hover:bg-[var(--pal-tint)]"
              >
                {language === "es" ? "Contacto" : "Contact"}
              </Link>

              <Link
                href="/acerca-de"
                className="block rounded-xl px-4 py-3 text-sm font-bold text-[var(--pal-text)] hover:bg-[var(--pal-tint)]"
              >
                {language === "es" ? "Acerca de" : "About"}
              </Link>

            </div>
          </details></div>
        </nav>
      </div>

      <div
        className="h-[3px] w-full"
        style={{
          background:
            "linear-gradient(90deg, var(--pal-accent), var(--pal-accent-3), var(--pal-accent-2))",
        }}
      />
    </header>
  );
}
