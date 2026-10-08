import { NextRequest, NextResponse } from "next/server";

interface WikipediaPage {
  content_urls?: {
    desktop?: {
      page?: string;
    };
  };
}

interface WikipediaEvent {
  text?: string;
  year?: number;
  pages?: WikipediaPage[];
}

interface WikipediaResponse {
  events?: WikipediaEvent[];
}

function validarNumero(
  value: string | null,
  min: number,
  max: number
): number | null {
  if (!value) {
    return null;
  }

  const parsed = Number(value);

  if (
    !Number.isInteger(parsed) ||
    parsed < min ||
    parsed > max
  ) {
    return null;
  }

  return parsed;
}

async function obtenerEventos(
  idioma: "es" | "en",
  mes: string,
  dia: string
): Promise<WikipediaEvent[]> {
  const url =
    `https://${idioma}.wikipedia.org/api/rest_v1/feed/onthisday/events/${mes}/${dia}`;

  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      "Api-User-Agent":
        "PALJALE/1.0 (https://paljale.vercel.app)",
    },
    next: {
      revalidate: 60 * 60 * 24,
    },
  });

  if (!response.ok) {
    return [];
  }

  const data =
    (await response.json()) as WikipediaResponse;

  return Array.isArray(data.events)
    ? data.events
    : [];
}

export async function GET(
  request: NextRequest
) {
  const month = validarNumero(
    request.nextUrl.searchParams.get("month"),
    1,
    12
  );

  const day = validarNumero(
    request.nextUrl.searchParams.get("day"),
    1,
    31
  );

  if (month === null || day === null) {
    return NextResponse.json(
      {
        error: "Fecha no válida.",
      },
      {
        status: 400,
      }
    );
  }

  const mes = String(month).padStart(2, "0");
  const dia = String(day).padStart(2, "0");

  try {
    let idioma: "es" | "en" = "es";

    let eventos =
      await obtenerEventos(
        idioma,
        mes,
        dia
      );

    if (eventos.length === 0) {
      idioma = "en";

      eventos =
        await obtenerEventos(
          idioma,
          mes,
          dia
        );
    }

    const candidatos =
      eventos.filter(
        (evento) =>
          typeof evento.text === "string" &&
          evento.text.length >= 25 &&
          evento.text.length <= 260
      );

    const seleccion =
      candidatos[0] ??
      eventos.find(
        (evento) =>
          typeof evento.text === "string"
      );

    if (!seleccion?.text) {
      throw new Error(
        "No hay efemérides disponibles."
      );
    }

    return NextResponse.json({
      text: seleccion.text,
      year:
        typeof seleccion.year === "number"
          ? seleccion.year
          : null,
      language: idioma,
      source:
        seleccion.pages?.[0]?.content_urls
          ?.desktop?.page ??
        `https://${idioma}.wikipedia.org/`,
    });
  } catch {
    return NextResponse.json(
      {
        error:
          "No fue posible obtener la efeméride.",
      },
      {
        status: 503,
      }
    );
  }
}