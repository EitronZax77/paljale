import type {
  ThemeCandidate,
  ThemeDateParts,
  ThemeId,
} from "./types";

const INEHRM_BASE_URL =
  "https://www.constitucion1917.gob.mx/es/inehrm/Expedientes_Digitales";

interface MexicoFallbackDefinition {
  title: string;
  description: string;
  theme: ThemeId;
}

const MEXICO_DATES: Record<
  string,
  MexicoFallbackDefinition
> = {
  "02-05": {
    title:
      "Aniversario de la Constitución Mexicana",
    description:
      "México conmemora la promulgación de la Constitución Política de 1917.",
    theme: "mexico",
  },

  "02-24": {
    title:
      "Día de la Bandera de México",
    description:
      "México celebra uno de sus principales símbolos nacionales.",
    theme: "mexico",
  },

  "03-21": {
    title:
      "Natalicio de Benito Juárez",
    description:
      "México conmemora el natalicio de Benito Juárez.",
    theme: "mexico",
  },

  "05-05": {
    title:
      "Batalla de Puebla",
    description:
      "México conmemora la victoria del Ejército de Oriente en la Batalla de Puebla.",
    theme: "mexico",
  },

  "09-13": {
    title:
      "Conmemoración de los Niños Héroes",
    description:
      "México recuerda la defensa del Castillo de Chapultepec.",
    theme: "mexico",
  },

  "09-15": {
    title:
      "Conmemoración de la Independencia de México",
    description:
      "México inicia las celebraciones nacionales de su Independencia.",
    theme: "mexico",
  },

  "09-16": {
    title:
      "Día de la Independencia de México",
    description:
      "México conmemora el inicio de su movimiento de Independencia.",
    theme: "mexico",
  },

  "10-07": {
    title:
      "Conmemoración de Belisario Domínguez",
    description:
      "México recuerda al senador Belisario Domínguez y su legado cívico.",
    theme: "mexico",
  },

  "11-01": {
    title:
      "Día de Muertos",
    description:
      "México celebra una de sus tradiciones culturales más representativas.",
    theme: "muertos",
  },

  "11-02": {
    title:
      "Día de Muertos",
    description:
      "México honra la memoria de sus difuntos mediante una tradición reconocida internacionalmente.",
    theme: "muertos",
  },

  "11-20": {
    title:
      "Aniversario de la Revolución Mexicana",
    description:
      "México conmemora el inicio de la Revolución Mexicana de 1910.",
    theme: "mexico",
  },
};

export function getMexicoFallbackCandidate(
  date: ThemeDateParts
): ThemeCandidate | null {
  const key =
    `${String(date.month).padStart(
      2,
      "0"
    )}-${String(date.day).padStart(
      2,
      "0"
    )}`;

  const definition =
    MEXICO_DATES[key];

  if (!definition) {
    return null;
  }

  return {
    id: `mx-fallback-${key}`,

    title:
      definition.title,

    description:
      definition.description,

    scope: "mexico",

    tone:
      key === "10-07" ||
      key === "09-13"
        ? "commemoration"
        : "celebration",

    source: {
      id: "fallback",
      name:
        "Calendario cívico mexicano — respaldo local",
      url:
        INEHRM_BASE_URL,
    },

    baseScore: 88,

    keywords: [
      "México",
      "historia",
      "conmemoración",
    ],

    themeHint:
      definition.theme,
  };
}

const EDITORIAL_THEMES: Array<{
  title: string;
  description: string;
  theme: ThemeId;
  keywords: string[];
}> = [
  {
    title:
      "Semana de tecnología",
    description:
      "PALJALE adopta una atmósfera inspirada en circuitos, innovación y herramientas digitales.",
    theme:
      "tecnologia",
    keywords: [
      "tecnología",
      "digital",
    ],
  },

  {
    title:
      "Semana espacial",
    description:
      "PALJALE explora una identidad visual inspirada en órbitas, estrellas y exploración espacial.",
    theme:
      "espacial",
    keywords: [
      "espacio",
      "astronomía",
    ],
  },

  {
    title:
      "Semana de ciencia",
    description:
      "PALJALE adopta una identidad visual inspirada en ciencia, investigación y descubrimiento.",
    theme:
      "ciencia",
    keywords: [
      "ciencia",
      "investigación",
    ],
  },

  {
    title:
      "Semana de arte",
    description:
      "PALJALE incorpora una atmósfera visual inspirada en creatividad, color y arte.",
    theme:
      "arte",
    keywords: [
      "arte",
      "creatividad",
    ],
  },

  {
    title:
      "Semana de naturaleza",
    description:
      "PALJALE adopta una estética inspirada en hojas, formas orgánicas y naturaleza.",
    theme:
      "naturaleza",
    keywords: [
      "naturaleza",
      "ambiental",
    ],
  },

  {
    title:
      "Semana del océano",
    description:
      "PALJALE utiliza una atmósfera inspirada en agua, movimiento y tonos oceánicos.",
    theme:
      "oceano",
    keywords: [
      "océano",
      "agua",
    ],
  },

  {
    title:
      "Semana de primavera",
    description:
      "PALJALE presenta una atmósfera ligera inspirada en crecimiento y primavera.",
    theme:
      "primavera",
    keywords: [
      "primavera",
      "flores",
    ],
  },

  {
    title:
      "Semana de verano",
    description:
      "PALJALE utiliza una identidad luminosa inspirada en verano y energía.",
    theme:
      "verano",
    keywords: [
      "verano",
      "energía",
    ],
  },
];

function obtenerSemana(
  date: ThemeDateParts
): number {
  const current =
    Date.UTC(
      date.year,
      date.month - 1,
      date.day
    );

  const start =
    Date.UTC(
      date.year,
      0,
      1
    );

  return Math.floor(
    (current - start) /
      (7 *
        24 *
        60 *
        60 *
        1000)
  );
}

export function getEditorialFallback(
  date: ThemeDateParts
): ThemeCandidate {
  const semana =
    obtenerSemana(date);

  const definition =
    EDITORIAL_THEMES[
      semana %
        EDITORIAL_THEMES.length
    ];

  return {
    id:
      `editorial-${definition.theme}-${semana}`,

    title:
      definition.title,

    description:
      definition.description,

    scope:
      "editorial",

    tone:
      "editorial",

    source: {
      id:
        "fallback",

      name:
        "PALJALE — tema editorial semanal",

      url:
        "/",
    },

    baseScore: 10,

    keywords:
      definition.keywords,

    themeHint:
      definition.theme,
  };
}