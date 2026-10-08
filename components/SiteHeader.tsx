"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function SiteHeader() {
  const pathname = usePathname();
  const goHome = () => {
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  return (
    <header className="relative z-50 border-b border-[var(--pal-border)] bg-white/95 backdrop-blur-xl">
      <div className="relative mx-auto grid h-28 w-full max-w-[1600px] grid-cols-[1fr_auto] items-center px-4 sm:px-6 md:h-32 md:grid-cols-[1fr_auto_1fr] lg:px-8">
        <div className="hidden md:block" />

        <Link
          href="/"
          onClick={goHome}
          aria-label="PALJALE - Inicio"
          className="group flex items-center gap-5 md:justify-self-center"
        >
          <div className="flex h-[68px] w-[68px] items-center justify-center overflow-hidden rounded-[22px] border border-[var(--pal-border)] bg-white shadow-[0_12px_30px_rgba(15,23,42,0.10)] transition duration-300 group-hover:-translate-y-1 md:h-[86px] md:w-[86px]">
            <Image
              src="/icon.jpeg"
              alt="PALJALE"
              width={86}
              height={86}
              priority
              className="h-full w-full object-contain p-1"
            />
          </div>

          <div>
            <div className="text-[28px] font-black tracking-[-0.055em] text-[var(--pal-text)] md:text-[42px]">
              PALJALE
            </div>

            <div className="mt-1 text-[10px] font-extrabold uppercase tracking-[0.24em] text-[var(--pal-accent)] md:text-[12px]">
              Herramientas digitales
            </div>
          </div>
        </Link>

        <nav
          className="justify-self-end"
          aria-label="Navegación principal"
        >
          <div className="hidden items-center gap-2 md:flex">
            <Link
              href="/"
          onClick={goHome}
              className="rounded-2xl px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-[var(--pal-tint)]"
            >
              Inicio
            </Link>

            <Link
              href="/contacto"
              className="rounded-2xl px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-[var(--pal-tint)]"
            >
              Contacto
            </Link>

            <Link
              href="/acerca-de"
              className="rounded-2xl px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-[var(--pal-tint)]"
            >
              Acerca de
            </Link>
          </div>

          <details className="relative md:hidden">
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
                Inicio
              </Link>

              <Link
                href="/contacto"
                className="block rounded-xl px-4 py-3 text-sm font-bold text-[var(--pal-text)] hover:bg-[var(--pal-tint)]"
              >
                Contacto
              </Link>

              <Link
                href="/acerca-de"
                className="block rounded-xl px-4 py-3 text-sm font-bold text-[var(--pal-text)] hover:bg-[var(--pal-tint)]"
              >
                Acerca de
              </Link>

            </div>
          </details>
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
