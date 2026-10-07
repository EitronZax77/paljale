"use client";

import Link from "next/link";

const COOKIE_PREFERENCES_EVENT =
  "paljale-open-cookie-preferences";

export default function LegalBar() {
  const abrirPreferencias = () => {
    window.dispatchEvent(
      new Event(COOKIE_PREFERENCES_EVENT)
    );
  };

  return (
    <div className="w-full border-t border-cyan-900/40 bg-[#04080c] px-6 py-5">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-3 text-center text-xs text-gray-500 sm:flex-row sm:flex-wrap sm:gap-x-5">
        <Link
          href="/privacidad"
          className="transition hover:text-cyan-400"
        >
          Privacidad
        </Link>

        <span
          className="hidden text-gray-700 sm:inline"
          aria-hidden="true"
        >
          •
        </span>

        <Link
          href="/terminos"
          className="transition hover:text-cyan-400"
        >
          Términos de Uso
        </Link>

        <span
          className="hidden text-gray-700 sm:inline"
          aria-hidden="true"
        >
          •
        </span>

        <Link
          href="/contacto"
          className="transition hover:text-cyan-400"
        >
          Contacto
        </Link>

        <span
          className="hidden text-gray-700 sm:inline"
          aria-hidden="true"
        >
          •
        </span>

        <button
          type="button"
          onClick={abrirPreferencias}
          className="transition hover:text-cyan-400"
        >
          Preferencias de cookies
        </button>
      </div>
    </div>
  );
}