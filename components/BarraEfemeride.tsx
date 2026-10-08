"use client";

import {
  useEffect,
  useState,
} from "react";

interface EfemerideResponse {
  text?: string;
  year?: number | null;
  language?: "es" | "en";
  source?: string;
  error?: string;
}

interface EfemerideState {
  text: string;
  year: number | null;
  language: "es" | "en" | null;
  source: string | null;
}

function formatearFecha(
  fecha: Date
): string {
  return new Intl.DateTimeFormat(
    "es-MX",
    {
      day: "numeric",
      month: "long",
    }
  ).format(fecha);
}

export default function BarraEfemeride() {
  const [efemeride, setEfemeride] =
    useState<EfemerideState | null>(
      null
    );

  const [cargando, setCargando] =
    useState(true);

  useEffect(() => {
    const controller =
      new AbortController();

    const timer =
      window.setTimeout(
        async () => {
          const hoy = new Date();

          try {
            const response =
              await fetch(
                `/api/efemeride?month=${
                  hoy.getMonth() + 1
                }&day=${hoy.getDate()}`,
                {
                  signal:
                    controller.signal,
                }
              );

            if (!response.ok) {
              throw new Error(
                "No disponible"
              );
            }

            const data =
              (await response.json()) as EfemerideResponse;

            if (!data.text) {
              throw new Error(
                "Sin contenido"
              );
            }

            setEfemeride({
              text: data.text,
              year:
                data.year ?? null,
              language:
                data.language ?? null,
              source:
                data.source ?? null,
            });
          } catch (error) {
            if (
              error instanceof DOMException &&
              error.name === "AbortError"
            ) {
              return;
            }

            setEfemeride(null);
          } finally {
            setCargando(false);
          }
        },
        0
      );

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, []);

  const hoy = new Date();

  return (
    <section className="border-t border-slate-200 bg-[#eef4fb]">
      <div className="mx-auto flex min-h-24 w-full max-w-7xl flex-col gap-4 px-5 py-5 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div className="flex shrink-0 items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-cyan-600 shadow-sm">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              className="h-5 w-5"
            >
              <rect
                x="4"
                y="5.5"
                width="16"
                height="14"
                rx="2.5"
                stroke="currentColor"
                strokeWidth="1.6"
              />
              <path
                d="M8 3.5v4M16 3.5v4M4 9.5h16"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-cyan-700">
              Un día como hoy
            </p>

            <p className="mt-1 text-base font-bold capitalize text-slate-950">
              {formatearFecha(hoy)}
            </p>
          </div>
        </div>

        <div className="min-w-0 md:max-w-4xl md:text-right">
          {cargando ? (
            <p className="text-base text-slate-500">
              Consultando efeméride mundial…
            </p>
          ) : efemeride ? (
            <>
              <p className="text-[15px] leading-7 text-slate-700 md:text-base">
                {efemeride.year !== null && (
                  <strong className="mr-1 text-slate-950">
                    {efemeride.year}.
                  </strong>
                )}

                {efemeride.text}
              </p>

              <div className="mt-2 flex items-center gap-2 md:justify-end">
                {efemeride.language ===
                  "en" && (
                  <span className="text-[11px] font-medium text-slate-400">
                    Fuente disponible en inglés
                  </span>
                )}

                {efemeride.source && (
                  <a
                    href={
                      efemeride.source
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] font-bold text-cyan-700 hover:underline"
                  >
                    Wikipedia
                  </a>
                )}
              </div>
            </>
          ) : (
            <p className="text-base text-slate-500">
              La efeméride de hoy no está disponible temporalmente.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}