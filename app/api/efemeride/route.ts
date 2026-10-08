import { NextRequest, NextResponse } from "next/server";

type Language = "es" | "en";
type Scope = "national" | "world";
interface WikipediaPage { content_urls?: { desktop?: { page?: string } }; }
interface WikipediaEvent { text?: string; year?: number; pages?: WikipediaPage[]; }
interface WikipediaResponse { events?: WikipediaEvent[]; }
interface DailyEvent { text: string; year: number | null; source: string; scope: Scope; }

const MEXICO = /\b(méxico|mexico|mexican[oa]s?|azteca|tlaxcala|puebla|oaxaca|yucatán|yucatan|guadalajara|veracruz|tlatelolco|juárez|juarez|zapata|morelos|hidalgo|cdmx)\b/i;
const UNITED_STATES = /\b(united states|american|americans|u\.s\.|u\.s\.a\.|usa|new york|california|texas|florida|congress|lincoln|roosevelt|kennedy|boston|philadelphia|chicago)\b/i;

function validNumber(value: string | null, min: number, max: number): number | null {
  if (!value || !/^\d+$/.test(value)) return null;
  const n = Number(value);
  return Number.isInteger(n) && n >= min && n <= max ? n : null;
}

async function getEvents(language: Language, month: string, day: string): Promise<WikipediaEvent[]> {
  const url = `https://${language}.wikipedia.org/api/rest_v1/feed/onthisday/events/${month}/${day}`;
  const response = await fetch(url, {
    headers: { Accept: "application/json", "Api-User-Agent": "PALJALE/1.0 (https://paljale.vercel.app)" },
    next: { revalidate: 86400 },
  });
  if (!response.ok) return [];
  const data = (await response.json()) as WikipediaResponse;
  return Array.isArray(data.events) ? data.events : [];
}

export async function GET(request: NextRequest) {
  const month = validNumber(request.nextUrl.searchParams.get("month"), 1, 12);
  const day = validNumber(request.nextUrl.searchParams.get("day"), 1, 31);
  if (month === null || day === null || new Date(Date.UTC(2024, month - 1, day)).getUTCDate() !== day) {
    return NextResponse.json({ error: "Invalid date" }, { status: 400 });
  }
  const language: Language = request.nextUrl.searchParams.get("lang") === "en" ? "en" : "es";
  const monthString = String(month).padStart(2, "0");
  const dayString = String(day).padStart(2, "0");
  try {
    const entries = await getEvents(language, monthString, dayString);
    const nationalMatcher = language === "es" ? MEXICO : UNITED_STATES;
    const unique = new Set<string>();
    const candidates: DailyEvent[] = [];
    for (const entry of entries) {
      const text = typeof entry.text === "string" ? entry.text.replace(/\s+/g, " ").trim() : "";
      if (text.length < 30 || text.length > 380) continue;
      const normalized = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
      const key = `${entry.year ?? ""}:${normalized}`;
      if (unique.has(key)) continue;
      unique.add(key);
      candidates.push({
        text,
        year: typeof entry.year === "number" ? entry.year : null,
        scope: nationalMatcher.test(text) ? "national" : "world",
        source: entry.pages?.[0]?.content_urls?.desktop?.page ?? `https://${language}.wikipedia.org/`,
      });
    }
    // Orden estable: primero acontecimientos asociados al país, después mundiales.
    const ranked = [
      ...candidates.filter((item) => item.scope === "national"),
      ...candidates.filter((item) => item.scope === "world"),
    ];
    // Select up to 15 unique historical events from the selected day.
    // When fewer than 10 qualifying events exist, show the available records; never invent events.
    const events = ranked.slice(0, 15);
    if (events.length === 0) {
      return NextResponse.json({ error: "No events available in selected language", language, events: [] }, { status: 503 });
    }
    return NextResponse.json({ language, date: `${monthString}-${dayString}`, events, count: events.length });
  } catch {
    return NextResponse.json({ error: "Unable to load daily events", language, events: [] }, { status: 503 });
  }
}
