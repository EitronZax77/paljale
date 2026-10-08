import {
  inferTone,
} from "./themes";

import type {
  ThemeCandidate,
  ThemeDateParts,
} from "./types";

const MONTH_NAMES_ES = [
  "",
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];

const MONTH_ABBR_ES = [
  "",
  "ene",
  "feb",
  "mar",
  "abr",
  "may",
  "jun",
  "jul",
  "ago",
  "sep",
  "oct",
  "nov",
  "dic",
];

const MEXICO_MONTH_SLUGS: Record<
  number,
  string
> = {
  1:
    "ENERO_fechas_civ",

  2:
    "FEBRERO_civicas",

  3:
    "MARZO_civicas",

  4:
    "ABRIL_civicas",

  5:
    "MAYO_civicas",

  6:
    "JUNIO_civicas",

  7:
    "JULIO_civicas",

  8:
    "AGOSTO_fechas_civ",

  9:
    "SEPTIEMBRE_civicas",

  10:
    "OCTUBRE_civicas",

  11:
    "NOVIEMBRE_civicas",

  12:
    "DICIEMBRE_civicas",
};

interface WikimediaPage {
  content_urls?: {
    desktop?: {
      page?: string;
    };
  };
}

interface WikimediaItem {
  text?: string;

  year?: number;

  pages?: WikimediaPage[];
}

type WikimediaKind =
  | "selected"
  | "holidays"
  | "events";

function normalizar(
  value: string
): string {
  return value
    .normalize("NFD")
    .replace(
      /[\u0300-\u036f]/g,
      ""
    )
    .toLocaleLowerCase("es");
}

function crearId(
  prefix: string,
  title: string
): string {
  return `${prefix}-${normalizar(
    title
  )
    .replace(
      /[^a-z0-9]+/g,
      "-"
    )
    .replace(
      /^-|-$/g,
      ""
    )
    .slice(0, 70)}`;
}

function decodeHtml(
  value: string
): string {
  return value
    .replace(
      /&nbsp;/gi,
      " "
    )
    .replace(
      /&amp;/gi,
      "&"
    )
    .replace(
      /&quot;/gi,
      '"'
    )
    .replace(
      /&#39;/gi,
      "'"
    )
    .replace(
      /&aacute;/gi,
      "á"
    )
    .replace(
      /&eacute;/gi,
      "é"
    )
    .replace(
      /&iacute;/gi,
      "í"
    )
    .replace(
      /&oacute;/gi,
      "ó"
    )
    .replace(
      /&uacute;/gi,
      "ú"
    )
    .replace(
      /&ntilde;/gi,
      "ñ"
    )
    .replace(
      /&#(\d+);/g,
      (_, code: string) =>
        String.fromCharCode(
          Number(code)
        )
    );
}

function htmlToLines(
  html: string
): string[] {
  const limpio = html
    .replace(
      /<script[\s\S]*?<\/script>/gi,
      " "
    )
    .replace(
      /<style[\s\S]*?<\/style>/gi,
      " "
    )
    .replace(
      /<(br|hr)\s*\/?>/gi,
      "\n"
    )
    .replace(
      /<\/(li|p|div|h1|h2|h3|h4|h5|h6|tr|td|a)>/gi,
      "\n"
    )
    .replace(
      /<[^>]+>/g,
      " "
    );

  return decodeHtml(limpio)
    .split(/\r?\n/)
    .map(
      (line) =>
        line
          .replace(
            /\s+/g,
            " "
          )
          .trim()
    )
    .filter(Boolean);
}

async function fetchText(
  url: string,
  timeoutMs = 3500
): Promise<string | null> {
  const controller =
    new AbortController();

  const timer =
    setTimeout(
      () =>
        controller.abort(),
      timeoutMs
    );

  try {
    const response =
      await fetch(url, {
        signal:
          controller.signal,

        headers: {
          Accept:
            "text/html,application/json",

          "User-Agent":
            "PALJALE/1.0 (https://paljale.vercel.app)",
        },

        next: {
          revalidate:
            60 * 60 * 12,
        },
      });

    if (!response.ok) {
      return null;
    }

    return await response.text();
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

export async function fetchMexicoOfficialCandidates(
  date: ThemeDateParts
): Promise<ThemeCandidate[]> {
  const slug =
    MEXICO_MONTH_SLUGS[
      date.month
    ];

  if (!slug) {
    return [];
  }

  const url =
    `https://www.constitucion1917.gob.mx/es/inehrm/${slug}`;

  const html =
    await fetchText(
      url,
      3000
    );

  if (!html) {
    return [];
  }

  const lines =
    htmlToLines(html);

  const monthName =
    MONTH_NAMES_ES[
      date.month
    ];

  const datePattern =
    new RegExp(
      `\\b0?${date.day}\\s+(?:de\\s+)?${monthName}\\b`,
      "i"
    );

  const matches =
    lines.filter(
      (line) =>
        datePattern.test(
          normalizar(line)
        ) &&
        line.length >= 12 &&
        line.length <= 240
    );

  return matches
    .slice(0, 4)
    .map((line) => {
      const cleanTitle =
        line
          .replace(
            new RegExp(
              `^\\s*0?${date.day}\\s+(?:de\\s+)?${monthName}\\s*[-–—:]?\\s*`,
              "i"
            ),
            ""
          )
          .trim();

      const title =
        cleanTitle ||
        line;

      return {
        id:
          crearId(
            "inehrm",
            title
          ),

        title,

        description:
          `Fecha cívica mexicana identificada para el ${date.day} de ${monthName}.`,

        scope:
          "mexico",

        tone:
          inferTone(title),

        source: {
          id:
            "inehrm",

          name:
            "INEHRM — Fechas cívicas",

          url,
        },

        baseScore:
          92,

        keywords: [
          "México",
          "fecha cívica",
          monthName,
        ],
      };
    });
}

export async function fetchUNCandidates(
  date: ThemeDateParts
): Promise<ThemeCandidate[]> {
  const url =
    "https://www.un.org/es/observances/list-days-weeks";

  const html =
    await fetchText(
      url,
      4000
    );

  if (!html) {
    return [];
  }

  const lines =
    htmlToLines(html);

  const day =
    String(date.day).padStart(
      2,
      "0"
    );

  const month =
    MONTH_ABBR_ES[
      date.month
    ];

  const target =
    `${day} ${month}`;

  const candidates:
    ThemeCandidate[] = [];

  for (
    let index = 0;
    index < lines.length;
    index += 1
  ) {
    const current =
      normalizar(
        lines[index]
      )
        .replace(
          /\./g,
          ""
        )
        .trim();

    if (
      current !== target
    ) {
      continue;
    }

    let title:
      string | null = null;

    for (
      let offset = 1;
      offset <= 5;
      offset += 1
    ) {
      const previous =
        lines[
          index - offset
        ];

      if (!previous) {
        continue;
      }

      const normalizedPrevious =
        normalizar(
          previous
        );

      if (
        normalizedPrevious.startsWith(
          "dia "
        ) ||
        normalizedPrevious.startsWith(
          "semana "
        )
      ) {
        title =
          previous;

        break;
      }
    }

    if (!title) {
      continue;
    }

    candidates.push({
      id:
        crearId(
          "un",
          title
        ),

      title,

      description:
        "Conmemoración internacional reconocida por Naciones Unidas o por uno de sus organismos especializados.",

      scope:
        "world",

      tone:
        inferTone(title),

      source: {
        id:
          "un",

        name:
          "Naciones Unidas — Días y Semanas Internacionales",

        url,
      },

      baseScore:
        72,

      keywords: [
        "internacional",
        "Naciones Unidas",
      ],
    });
  }

  return candidates;
}

const MEXICO_KEYWORDS = [
  "mexico",
  "méxico",
  "mexican",
  "mexicana",
  "mexicano",
  "belisario dominguez",
  "belisario domínguez",
  "benito juarez",
  "benito juárez",
  "revolucion mexicana",
  "revolución mexicana",
  "independencia de mexico",
  "independencia de méxico",
];

function esMexico(
  text: string
): boolean {
  const normalized =
    normalizar(text);

  return MEXICO_KEYWORDS.some(
    (keyword) =>
      normalized.includes(
        normalizar(keyword)
      )
  );
}

async function fetchWikimediaKind(
  kind: WikimediaKind,
  date: ThemeDateParts
): Promise<WikimediaItem[]> {
  const month =
    String(date.month).padStart(
      2,
      "0"
    );

  const day =
    String(date.day).padStart(
      2,
      "0"
    );

  const url =
    `https://api.wikimedia.org/feed/v1/wikipedia/es/onthisday/${kind}/${month}/${day}`;

  const raw =
    await fetchText(
      url,
      3500
    );

  if (!raw) {
    return [];
  }

  try {
    const data =
      JSON.parse(
        raw
      ) as Record<
        string,
        WikimediaItem[]
      >;

    return Array.isArray(
      data[kind]
    )
      ? data[kind]
      : [];
  } catch {
    return [];
  }
}

export async function fetchWikimediaCandidates(
  date: ThemeDateParts
): Promise<ThemeCandidate[]> {
  const results =
    await Promise.all([
      fetchWikimediaKind(
        "holidays",
        date
      ),

      fetchWikimediaKind(
        "selected",
        date
      ),

      fetchWikimediaKind(
        "events",
        date
      ),
    ]);

  const items =
    results.flat();

  const candidates:
    ThemeCandidate[] = [];

  for (
    const item of items.slice(
      0,
      25
    )
  ) {
    if (
      !item.text ||
      item.text.length < 15
    ) {
      continue;
    }

    const mexico =
      esMexico(
        item.text
      );

    const sourceUrl =
      item.pages?.[0]
        ?.content_urls
        ?.desktop
        ?.page ??
      "https://es.wikipedia.org/";

    candidates.push({
      id:
        crearId(
          "wikimedia",
          item.text
        ),

      title:
        item.text,

      description:
        item.year
          ? `Acontecimiento registrado para esta fecha en ${item.year}.`
          : "Celebración o acontecimiento registrado para esta fecha.",

      scope:
        mexico
          ? "mexico"
          : "world",

      tone:
        inferTone(
          item.text
        ),

      source: {
        id:
          "wikimedia",

        name:
          "Wikimedia — On This Day",

        url:
          sourceUrl,
      },

      baseScore:
        mexico
          ? 76
          : 48,

      keywords: [
        mexico
          ? "México"
          : "mundo",
        "efeméride",
      ],
    });
  }

  return candidates;
}