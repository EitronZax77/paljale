"use client";

import Link from "next/link";

export default function FloatingFeedbackButton() {
  return (
    <div className="fixed bottom-6 right-6 z-[90]">
      <Link
        href="/contacto#opiniones"
        aria-label="Enviar opinión o sugerencia"
        title="Opiniones y sugerencias"
        className="group flex h-14 w-14 items-center justify-center rounded-full bg-[#07152c] text-white shadow-[0_14px_35px_rgba(7,21,44,0.28)] transition duration-200 hover:-translate-y-1 hover:bg-[#0b2949] hover:shadow-[0_18px_45px_rgba(7,21,44,0.32)]"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className="h-6 w-6"
        >
          <path
            d="M5 6.75A2.75 2.75 0 0 1 7.75 4h8.5A2.75 2.75 0 0 1 19 6.75v6.5A2.75 2.75 0 0 1 16.25 16H12l-3.9 3.05c-.61.48-1.5.04-1.5-.73V16A2.67 2.67 0 0 1 5 13.5V6.75Z"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />

          <path
            d="M8.5 9.25h7M8.5 12h4.5"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
        </svg>

        <span className="pointer-events-none absolute right-16 whitespace-nowrap rounded-xl bg-[#07152c] px-3 py-2 text-xs font-bold text-white opacity-0 shadow-lg transition duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
          Opiniones y sugerencias
        </span>
      </Link>
    </div>
  );
}