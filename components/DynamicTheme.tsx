"use client";

import { useEffect } from "react";
import { obtenerTemaPaljale } from "@/lib/theme";

import type {
  ThemeContext,
  ThemeId,
} from "@/lib/theme/types";

const THEME_CHANGE_EVENT = "paljale-theme-change";

const REFRESH_INTERVAL = 60 * 60 * 1000;

const THEME_TO_VISUAL: Record<ThemeId, string> = {
  mexico: "septiembre",
  muertos: "muertos",
  invierno: "invierno",
  espacial: "espacial",
  naturaleza: "naturaleza",
  ciencia: "ciencia",
  arte: "arte",
  tecnologia: "tecnologia",
  oceano: "oceano",
  primavera: "primavera",
  verano: "verano",
  paz: "oceano",
  educacion: "ciencia",
};

function esContextoValido(
  value: unknown
): value is ThemeContext {
  if (
    typeof value !== "object" ||
    value === null
  ) {
    return false;
  }

  const context = value as Partial<ThemeContext>;

  return (
    typeof context.theme === "string" &&
    Object.prototype.hasOwnProperty.call(
      THEME_TO_VISUAL,
      context.theme
    ) &&
    typeof context.title === "string" &&
    typeof context.scope === "string" &&
    typeof context.tone === "string"
  );
}

function aplicarTema(
  temaVisual: string,
  contexto?: ThemeContext
): void {
  const root = document.documentElement;

  root.setAttribute(
    "data-paljale-theme",
    temaVisual
  );

  if (contexto) {
    root.setAttribute(
      "data-paljale-theme-id",
      contexto.theme
    );

    root.setAttribute(
      "data-paljale-tone",
      contexto.tone
    );

    root.setAttribute(
      "data-paljale-scope",
      contexto.scope
    );
  } else {
    root.removeAttribute(
      "data-paljale-theme-id"
    );

    root.removeAttribute(
      "data-paljale-tone"
    );

    root.removeAttribute(
      "data-paljale-scope"
    );
  }

  window.dispatchEvent(
    new CustomEvent(THEME_CHANGE_EVENT, {
      detail: {
        theme: contexto?.theme ?? temaVisual,
        visualTheme: temaVisual,
        context: contexto ?? null,
      },
    })
  );
}

export default function DynamicTheme() {
  useEffect(() => {
    let mounted = true;
    let requestController: AbortController | null = null;

    const obtenerYAplicarTema = async () => {
      if (requestController) {
        requestController.abort();
      }

      const controller = new AbortController();
      requestController = controller;

      try {
        const response = await fetch(
          "/api/theme-context",
          {
            method: "GET",
            signal: controller.signal,
            cache: "no-cache",
            headers: {
              Accept: "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            `Theme API: ${response.status}`
          );
        }

        const data: unknown = await response.json();

        if (!esContextoValido(data)) {
          throw new Error(
            "La API devolvió un tema no reconocido."
          );
        }

        if (!mounted || controller.signal.aborted) {
          return;
        }

        const temaVisual = THEME_TO_VISUAL[data.theme];

        aplicarTema(temaVisual, data);
      } catch (error) {
        if (
          !mounted ||
          controller.signal.aborted
        ) {
          return;
        }

        console.warn(
          "PALJALE: utilizando tema visual de respaldo.",
          error
        );

        const fallback = obtenerTemaPaljale(
          new Date()
        );

        aplicarTema(fallback);
      }
    };

    void obtenerYAplicarTema();

    const interval = window.setInterval(() => {
      void obtenerYAplicarTema();
    }, REFRESH_INTERVAL);

    const handleVisibilityChange = () => {
      if (
        document.visibilityState === "visible"
      ) {
        void obtenerYAplicarTema();
      }
    };

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    return () => {
      mounted = false;

      requestController?.abort();

      window.clearInterval(interval);

      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );
    };
  }, []);

  return null;
}