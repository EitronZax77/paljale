import type {
  ThemeCandidate,
} from "./types";

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

export function scoreCandidate(
  candidate: ThemeCandidate
): number {
  let score =
    candidate.baseScore;

  if (
    candidate.scope ===
    "mexico"
  ) {
    score += 12;
  }

  if (
    candidate.tone ===
    "celebration"
  ) {
    score += 4;
  }

  const text =
    normalizar(
      `${candidate.title} ${candidate.description}`
    );

  const majorMexico = [
    "independencia",
    "dia de muertos",
    "revolucion mexicana",
    "constitucion",
    "bandera",
    "batalla de puebla",
  ];

  if (
    majorMexico.some(
      (term) =>
        text.includes(term)
    )
  ) {
    score += 8;
  }

  const majorWorld = [
    "paz",
    "tierra",
    "medio ambiente",
    "espacio",
    "derechos humanos",
    "educacion",
    "salud",
  ];

  if (
    candidate.scope ===
      "world" &&
    majorWorld.some(
      (term) =>
        text.includes(term)
    )
  ) {
    score += 5;
  }

  return Math.min(
    100,
    score
  );
}

export function selectBestCandidate(
  candidates: ThemeCandidate[]
): {
  candidate:
    ThemeCandidate;

  score: number;
} | null {
  const scored =
    candidates.map(
      (candidate) => ({
        candidate,

        score:
          scoreCandidate(
            candidate
          ),
      })
    );

  const mexico =
    scored
      .filter(
        (item) =>
          item.candidate
            .scope ===
            "mexico" &&
          item.score >= 70
      )
      .sort(
        (a, b) =>
          b.score -
          a.score
      );

  if (mexico[0]) {
    return mexico[0];
  }

  const world =
    scored
      .filter(
        (item) =>
          item.candidate
            .scope ===
            "world" &&
          item.score >= 55
      )
      .sort(
        (a, b) =>
          b.score -
          a.score
      );

  if (world[0]) {
    return world[0];
  }

  const editorial =
    scored
      .filter(
        (item) =>
          item.candidate
            .scope ===
          "editorial"
      )
      .sort(
        (a, b) =>
          b.score -
          a.score
      );

  return (
    editorial[0] ??
    null
  );
}