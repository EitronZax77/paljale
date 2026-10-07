"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useState,
} from "react";
import { siteConfig } from "@/lib/site";

const CONSENT_KEY = "paljale_cookie_consent";

const ANALYTICS_SCRIPT_ID =
  "paljale-google-analytics";

const ANALYTICS_READY_EVENT =
  "paljale-analytics-ready";

const COOKIE_PREFERENCES_EVENT =
  "paljale-open-cookie-preferences";

type ConsentStatus =
  | "accepted"
  | "rejected"
  | null
  | undefined;

type GtagFunction = (
  ...args: unknown[]
) => void;

type AnalyticsWindow = Window &
  typeof globalThis & {
    dataLayer?: unknown[];
    gtag?: GtagFunction;
  };

function borrarCookie(nombre: string) {
  const hostname = window.location.hostname;

  const dominios = [
    "",
    hostname,
    `.${hostname}`,
  ];

  for (const dominio of dominios) {
    const domainPart = dominio
      ? `; domain=${dominio}`
      : "";

    document.cookie =
      `${nombre}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domainPart}`;

    document.cookie =
      `${nombre}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax${domainPart}`;
  }
}

function borrarCookiesAnalytics() {
  const cookies = document.cookie
    .split(";")
    .map((cookie) => cookie.trim())
    .map((cookie) => cookie.split("=")[0])
    .filter(Boolean);

  for (const nombre of cookies) {
    if (
      nombre === "_ga" ||
      nombre.startsWith("_ga_")
    ) {
      borrarCookie(nombre);
    }
  }
}

function cargarGoogleAnalytics() {
  const analyticsWindow =
    window as AnalyticsWindow;

  if (
    document.getElementById(
      ANALYTICS_SCRIPT_ID
    )
  ) {
    window.dispatchEvent(
      new Event(ANALYTICS_READY_EVENT)
    );

    return;
  }

  analyticsWindow.dataLayer =
    analyticsWindow.dataLayer || [];

  analyticsWindow.gtag = (
    ...args: unknown[]
  ) => {
    analyticsWindow.dataLayer?.push(args);
  };

  analyticsWindow.gtag(
    "js",
    new Date()
  );

  analyticsWindow.gtag(
    "config",
    siteConfig.googleAnalyticsId,
    {
      anonymize_ip: true,
    }
  );

  const script =
    document.createElement("script");

  script.id = ANALYTICS_SCRIPT_ID;
  script.async = true;
  script.src =
    `https://www.googletagmanager.com/gtag/js?id=${siteConfig.googleAnalyticsId}`;

  document.head.appendChild(script);

  window.dispatchEvent(
    new Event(ANALYTICS_READY_EVENT)
  );
}

export default function CookieConsent() {
  const [
    consent,
    setConsent,
  ] = useState<ConsentStatus>(
    undefined
  );

  const [
    preferenciasAbiertas,
    setPreferenciasAbiertas,
  ] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const guardado =
        window.localStorage.getItem(
          CONSENT_KEY
        );

      if (guardado === "accepted") {
        setConsent("accepted");
        cargarGoogleAnalytics();
        return;
      }

      if (guardado === "rejected") {
        setConsent("rejected");
        return;
      }

      setConsent(null);
    }, 0);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const abrirPreferencias = () => {
      setPreferenciasAbiertas(true);
    };

    window.addEventListener(
      COOKIE_PREFERENCES_EVENT,
      abrirPreferencias
    );

    return () => {
      window.removeEventListener(
        COOKIE_PREFERENCES_EVENT,
        abrirPreferencias
      );
    };
  }, []);

  const aceptar = useCallback(() => {
    window.localStorage.setItem(
      CONSENT_KEY,
      "accepted"
    );

    setConsent("accepted");
    setPreferenciasAbiertas(false);

    cargarGoogleAnalytics();
  }, []);

  const rechazar = useCallback(() => {
    const analyticsEstabaActivo =
      consent === "accepted";

    window.localStorage.setItem(
      CONSENT_KEY,
      "rejected"
    );

    borrarCookiesAnalytics();

    setConsent("rejected");
    setPreferenciasAbiertas(false);

    if (analyticsEstabaActivo) {
      window.location.reload();
    }
  }, [consent]);

  if (consent === undefined) {
    return null;
  }

  const mostrarPanel =
    consent === null ||
    preferenciasAbiertas;

  if (!mostrarPanel) {
    return null;
  }

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[100] px-4 pb-4 sm:px-6 sm:pb-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-description"
    >
      <div className="mx-auto max-w-5xl rounded-2xl border border-cyan-500/20 bg-[#08111a]/95 p-5 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <h2
              id="cookie-consent-title"
              className="text-lg font-bold text-white"
            >
              Privacidad y analítica
            </h2>

            <p
              id="cookie-consent-description"
              className="mt-2 text-sm leading-6 text-gray-300"
            >
              PALJALE utiliza Google Analytics
              únicamente si lo autorizas. Nos
              ayuda a conocer qué herramientas
              se utilizan y mejorar el sitio.
              Si rechazas, Google Analytics no
              se cargará.
            </p>

            <p className="mt-2 text-sm text-gray-400">
              Puedes cambiar tu decisión
              posteriormente.{" "}
              <Link
                href="/privacidad"
                className="font-semibold text-cyan-400 hover:underline"
              >
                Política de Privacidad
              </Link>
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:flex-shrink-0">
            <button
              type="button"
              onClick={rechazar}
              className="rounded-xl border border-gray-600 px-5 py-3 text-sm font-bold text-gray-200 transition hover:border-gray-400 hover:bg-white/5"
            >
              Rechazar
            </button>

            <button
              type="button"
              onClick={aceptar}
              className="rounded-xl bg-cyan-400 px-5 py-3 text-sm font-black text-[#041018] transition hover:bg-cyan-300"
            >
              Aceptar Analytics
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}