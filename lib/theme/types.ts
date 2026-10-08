export type ThemeId =
  | "mexico"
  | "muertos"
  | "invierno"
  | "espacial"
  | "naturaleza"
  | "ciencia"
  | "arte"
  | "tecnologia"
  | "oceano"
  | "primavera"
  | "verano"
  | "paz"
  | "educacion";

export type ThemeScope =
  | "mexico"
  | "world"
  | "editorial";

export type ThemeTone =
  | "celebration"
  | "commemoration"
  | "awareness"
  | "editorial";

export type ThemeSourceId =
  | "inehrm"
  | "un"
  | "wikimedia"
  | "fallback";

export interface ThemeSource {
  id: ThemeSourceId;
  name: string;
  url: string;
}

export interface ThemeDateParts {
  year: number;
  month: number;
  day: number;
}

export interface ThemeCandidate {
  id: string;

  title: string;

  description: string;

  scope: ThemeScope;

  tone: ThemeTone;

  source: ThemeSource;

  baseScore: number;

  keywords: string[];

  themeHint?: ThemeId;
}

export interface ThemeContext {
  date: string;

  theme: ThemeId;

  spriteSet: ThemeId;

  title: string;

  subtitle: string;

  scope: ThemeScope;

  tone: ThemeTone;

  priority: number;

  reason: string;

  source: ThemeSource;

  candidatesEvaluated: number;
}