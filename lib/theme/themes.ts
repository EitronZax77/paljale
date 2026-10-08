import type {
  ThemeCandidate,
  ThemeId,
  ThemeTone,
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

function contieneAlguno(
  text: string,
  terms: string[]
): boolean {
  return terms.some(
    (term) =>
      text.includes(
        normalizar(term)
      )
  );
}

export function inferTheme(
  candidate: ThemeCandidate
): ThemeId {
  if (candidate.themeHint) {
    return candidate.themeHint;
  }

  const text = normalizar(
    [
      candidate.title,
      candidate.description,
      ...candidate.keywords,
    ].join(" ")
  );

  if (
    contieneAlguno(text, [
      "dia de muertos",
      "muertos",
      "difuntos",
      "cempasuchil",
    ])
  ) {
    return "muertos";
  }

  if (
    candidate.scope === "mexico"
  ) {
    return "mexico";
  }

  if (
    contieneAlguno(text, [
      "espacio",
      "astronomia",
      "astronomico",
      "cosmos",
      "satellite",
      "satelite",
      "space",
      "astronaut",
    ])
  ) {
    return "espacial";
  }

  if (
    contieneAlguno(text, [
      "paz",
      "no violencia",
      "peace",
      "non-violence",
      "derechos humanos",
    ])
  ) {
    return "paz";
  }

  if (
    contieneAlguno(text, [
      "docente",
      "educacion",
      "alfabetizacion",
      "escuela",
      "teachers",
      "education",
      "literacy",
    ])
  ) {
    return "educacion";
  }

  if (
    contieneAlguno(text, [
      "ciencia",
      "cientifico",
      "tecnologia",
      "innovacion",
      "science",
      "technology",
      "innovation",
      "salud",
      "health",
    ])
  ) {
    return "ciencia";
  }

  if (
    contieneAlguno(text, [
      "oceano",
      "ocean",
      "mar",
      "agua",
      "water",
    ])
  ) {
    return "oceano";
  }

  if (
    contieneAlguno(text, [
      "tierra",
      "medio ambiente",
      "naturaleza",
      "habitat",
      "hábitat",
      "aves",
      "biodiversidad",
      "environment",
      "bird",
      "cotton",
      "algodon",
    ])
  ) {
    return "naturaleza";
  }

  if (
    contieneAlguno(text, [
      "arte",
      "cultura",
      "libro",
      "musica",
      "patrimonio",
      "art",
      "culture",
      "book",
      "music",
      "heritage",
    ])
  ) {
    return "arte";
  }

  return "tecnologia";
}

export function inferTone(
  title: string
): ThemeTone {
  const text =
    normalizar(title);

  if (
    contieneAlguno(text, [
      "muerte",
      "muere",
      "asesinato",
      "aniversario luctuoso",
      "caidos",
      "conmemoracion",
      "memoria",
    ])
  ) {
    return "commemoration";
  }

  if (
    contieneAlguno(text, [
      "concienciacion",
      "concientizacion",
      "awareness",
      "prevencion",
      "erradicacion",
      "reduccion",
    ])
  ) {
    return "awareness";
  }

  return "celebration";
}

export function getSpriteSet(
  theme: ThemeId
): ThemeId {
  return theme;
}