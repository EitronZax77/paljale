import { NextRequest, NextResponse } from "next/server";
export const runtime="nodejs";
const allowed=new Set(["USD","MXN","EUR","GBP","CAD","JPY","CHF","BRL","AUD","CNY","INR","KRW","COP","CLP","ARS","SEK","NOK","DKK","PLN"]);
export async function GET(req:NextRequest) {
  const base=(req.nextUrl.searchParams.get("base") ?? "USD").toUpperCase();
  if (!allowed.has(base)) return NextResponse.json({error:"INVALID_CURRENCY"},{status:400});
  try {
    const r=await fetch(`https://api.frankfurter.dev/v1/latest?base=${encodeURIComponent(base)}`, {next:{revalidate:3600},signal:AbortSignal.timeout(12000)});
    if (!r.ok) throw new Error("RATES_UNAVAILABLE");
    const body:unknown=await r.json();
    if (!body || typeof body!=="object" || !("rates" in body) || !("date" in body)) throw new Error("INVALID_RESPONSE");
    const record=body as {rates:Record<string,unknown>;date:unknown};
    if (typeof record.date!=="string" || !record.rates || typeof record.rates!=="object") throw new Error("INVALID_RESPONSE");
    const rates:Record<string,number>={[base]:1};
    for (const [code,value] of Object.entries(record.rates)) if (allowed.has(code) && typeof value==="number" && Number.isFinite(value) && value>0) rates[code]=value;
    return NextResponse.json({base,date:record.date,rates,source:"Frankfurter / ECB and supporting central banks"}, {headers:{"Cache-Control":"public, max-age=300, s-maxage=3600"}});
  } catch { return NextResponse.json({error:"RATES_UNAVAILABLE"}, {status:503,headers:{"Cache-Control":"no-store"}}); }
}
