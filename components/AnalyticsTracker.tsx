"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/analytics";

const CONSENT_KEY = "paljale_cookie_consent";
const ANALYTICS_READY_EVENT = "paljale-analytics-ready";

function obtenerNombreHerramienta(
  pathname: string
): string | null {
  switch (pathname) {
    case "/pdf":
      return "pdf";

    case "/imagenes":
      return "imagenes";

    case "/conversores":
      return "conversores";

    case "/qr":
      return "qr";

    default:
      return null;
  }
}

function analyticsPermitido(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  return (
    window.localStorage.getItem(CONSENT_KEY) ===
    "accepted"
  );
}

export default function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const registrarApertura = () => {
      if (!analyticsPermitido()) {
        return;
      }

      const herramienta =
        obtenerNombreHerramienta(pathname);

      if (!herramienta) {
        return;
      }

      trackEvent("tool_open", {
        tool: herramienta,
        path: pathname,
      });
    };

    registrarApertura();

    window.addEventListener(
      ANALYTICS_READY_EVENT,
      registrarApertura
    );

    return () => {
      window.removeEventListener(
        ANALYTICS_READY_EVENT,
        registrarApertura
      );
    };
  }, [pathname]);

  useEffect(() => {
    const manejarCambioArchivo = (
      event: Event
    ) => {
      if (!analyticsPermitido()) {
        return;
      }

      const target = event.target;

      if (
        !(target instanceof HTMLInputElement) ||
        target.type !== "file"
      ) {
        return;
      }

      const archivo = target.files?.[0];

      if (!archivo) {
        return;
      }

      const herramienta =
        obtenerNombreHerramienta(
          window.location.pathname
        );

      if (!herramienta) {
        return;
      }

      trackEvent("file_upload", {
        tool: herramienta,
        file_type:
          archivo.type || "unknown",
        file_size_bytes: archivo.size,
      });
    };

    const manejarClick = (
      event: MouseEvent
    ) => {
      if (!analyticsPermitido()) {
        return;
      }

      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      const enlace =
        target.closest<HTMLAnchorElement>(
          "a[download]"
        );

      if (!enlace) {
        return;
      }

      const herramienta =
        obtenerNombreHerramienta(
          window.location.pathname
        );

      if (!herramienta) {
        return;
      }

      trackEvent("file_download", {
        tool: herramienta,
        file_name:
          enlace.getAttribute("download") ||
          "download",
      });
    };

    document.addEventListener(
      "change",
      manejarCambioArchivo
    );

    document.addEventListener(
      "click",
      manejarClick
    );

    return () => {
      document.removeEventListener(
        "change",
        manejarCambioArchivo
      );

      document.removeEventListener(
        "click",
        manejarClick
      );
    };
  }, []);

  return null;
}