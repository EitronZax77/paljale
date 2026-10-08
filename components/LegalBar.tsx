"use client";

import Link from "next/link";

const COOKIE_PREFERENCES_EVENT =
  "paljale-open-cookie-preferences";

export default function LegalBar() {
  const abrirPreferencias = () => {
    window.dispatchEvent(
      new Event(
        COOKIE_PREFERENCES_EVENT
      )
    );
  };

  return (
    <div className="border-t border-[var(--pal-border)] bg-white">
      <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-center gap-x-5 gap-y-2 px-5 py-5 text-sm font-medium text-slate-700">
        <Link
          href="/privacidad"
          className="transition hover:text-[var(--pal-accent)]"
        >
          Privacidad
        </Link>

        <span className="text-slate-300">
          •
        </span>

        <Link
          href="/terminos"
          className="transition hover:text-[var(--pal-accent)]"
        >
          Términos de uso
        </Link>

        <span className="text-slate-300">
          •
        </span>

        <Link
          href="/contacto"
          className="transition hover:text-[var(--pal-accent)]"
        >
          Contacto
        </Link>

        <span className="text-slate-300">
          •
        </span>

        <button
          type="button"
          onClick={
            abrirPreferencias
          }
          className="transition hover:text-[var(--pal-accent)]"
        >
          Preferencias de cookies
        </button>
      </div>
    </div>
  );
}