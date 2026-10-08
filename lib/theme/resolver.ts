import {
  getEditorialFallback,
  getMexicoFallbackCandidate,
} from "./fallback";

import {
  fetchMexicoOfficialCandidates,
  fetchUNCandidates,
  fetchWikimediaCandidates,
} from "./sources";

import {
  selectBestCandidate,
} from "./scoring";

import {
  getSpriteSet,
  inferTheme,
} from "./themes";

import type {
  ThemeCandidate,
  ThemeContext,
  ThemeDateParts,
} from "./types";

function getMexicoDateParts(
  referenceDate:
    Date = new Date()
): ThemeDateParts {
  const formatter =
    new Intl.DateTimeFormat(
      "en-CA",
      {
        timeZone:
          "America/Mexico_City",

        year:
          "numeric",

        month:
          "2-digit",

        day:
          "2-digit",
      }
    );

  const parts =
    formatter.formatToParts(
      referenceDate
    );

  const get =
    (type: string) =>
      Number(
        parts.find(
          (part) =>
            part.type ===
            type
        )?.value
      );

  return {
    year:
      get("year"),

    month:
      get("month"),

    day:
      get("day"),
  };
}

function formatDate(
  date: ThemeDateParts
): string {
  return `${date.year}-${String(
    date.month
  ).padStart(
    2,
    "0"
  )}-${String(
    date.day
  ).padStart(
    2,
    "0"
  )}`;
}

function deduplicateCandidates(
  candidates:
    ThemeCandidate[]
): ThemeCandidate[] {
  const map =
    new Map<
      string,
      ThemeCandidate
    >();

  for (
    const candidate
    of candidates
  ) {
    const key =
      candidate.title
        .normalize("NFD")
        .replace(
          /[\u0300-\u036f]/g,
          ""
        )
        .toLocaleLowerCase(
          "es"
        )
        .replace(
          /\s+/g,
          " "
        )
        .trim();

    const existing =
      map.get(key);

    if (
      !existing ||
      candidate.baseScore >
        existing.baseScore
    ) {
      map.set(
        key,
        candidate
      );
    }
  }

  return Array.from(
    map.values()
  );
}

export async function resolveThemeContext(
  referenceDate:
    Date = new Date()
): Promise<ThemeContext> {
  const date =
    getMexicoDateParts(
      referenceDate
    );

  const [
    mexicoOnline,
    unOnline,
    wikimediaOnline,
  ] =
    await Promise.all([
      fetchMexicoOfficialCandidates(
        date
      ),

      fetchUNCandidates(
        date
      ),

      fetchWikimediaCandidates(
        date
      ),
    ]);

  const mexicoFallback =
    getMexicoFallbackCandidate(
      date
    );

  const editorialFallback =
    getEditorialFallback(
      date
    );

  const candidates =
    deduplicateCandidates([
      ...mexicoOnline,

      ...(mexicoFallback
        ? [
            mexicoFallback,
          ]
        : []),

      ...unOnline,

      ...wikimediaOnline,

      editorialFallback,
    ]);

  const selected =
    selectBestCandidate(
      candidates
    );

  const winner =
    selected?.candidate ??
    editorialFallback;

  const priority =
    selected?.score ??
    10;

  const theme =
    inferTheme(
      winner
    );

  let reason =
    "Tema editorial semanal de PALJALE.";

  if (
    winner.scope ===
    "mexico"
  ) {
    reason =
      "Se encontró una conmemoración mexicana relevante, por lo que tiene prioridad sobre los acontecimientos mundiales.";
  } else if (
    winner.scope ===
    "world"
  ) {
    reason =
      "No se encontró una celebración mexicana de mayor prioridad y se seleccionó una conmemoración mundial relevante.";
  }

  return {
    date:
      formatDate(date),

    theme,

    spriteSet:
      getSpriteSet(
        theme
      ),

    title:
      winner.title,

    subtitle:
      winner.description,

    scope:
      winner.scope,

    tone:
      winner.tone,

    priority,

    reason,

    source:
      winner.source,

    candidatesEvaluated:
      candidates.length,
  };
}