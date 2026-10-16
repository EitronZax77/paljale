/** PALJALE Decision Studio: funciones puras, sin red, redondeo solo al mostrar. */
export const money = (value: number, locale = "es-MX") =>
  new Intl.NumberFormat(locale, { style: "currency", currency: "MXN", maximumFractionDigits: 2, minimumFractionDigits: 2 }).format(value);
export const number = (value: number, locale = "es-MX", digits = 2) =>
  new Intl.NumberFormat(locale, { maximumFractionDigits: digits }).format(value);

export type Calculation = { ok: true } | { ok: false; reason: string };
const ok = (n: number) => Number.isFinite(n) && n >= 0 && n <= 1e12;
const percent = (n: number) => ok(n) && n <= 100;
const fail = (reason: string) => ({ ok: false as const, reason });

export function calcMargin(cost: number, price: number, units = 0) {
  if (!ok(cost) || !ok(price) || !ok(units) || price <= 0) return fail("invalid");
  const profit = price - cost;
  return { ok: true as const, cost, price, profit, margin: profit / price * 100,
    markup: cost > 0 ? profit / cost * 100 : null,
    units, total: profit * units, costShare: cost / price * 100 };
}
export function calcPrice(cost: number, targetMargin: number, vatRate = 0) {
  if (!ok(cost) || !percent(targetMargin) || targetMargin >= 100 || !percent(vatRate)) return fail("invalid");
  const price = cost / (1 - targetMargin / 100);
  if (!Number.isFinite(price) || price > 1e15) return fail("invalid");
  const vat = price * vatRate / 100;
  return { ok: true as const, price, profit: price - cost, priceWithVat: price + vat,
    vat, targetMargin, cost, vatRate, markup: cost > 0 ? (price-cost)/cost*100 : null };
}
export function calcVat(amount: number, rate: number, mode: "add" | "extract") {
  if (!ok(amount) || !percent(rate)) return fail("invalid");
  const base = mode === "extract" ? amount / (1 + rate / 100) : amount;
  const vat = base * rate / 100;
  return { ok: true as const, base, vat, total: base + vat, rate, mode };
}
export function calcDiscount(price: number, first: number, second = 0, cost?: number) {
  if (!ok(price) || !percent(first) || !percent(second) || (cost !== undefined && !ok(cost))) return fail("invalid");
  const afterFirst = price * (1 - first / 100);
  const final = afterFirst * (1 - second / 100);
  const savings = price - final;
  return { ok: true as const, price, afterFirst, final, savings,
    effective: price > 0 ? savings / price * 100 : 0,
    first, second, profit: cost === undefined ? null : final - cost,
    finalMargin: cost === undefined || final <= 0 ? null : (final-cost)/final*100 };
}
export function calcBreakEven(fixed: number, price: number, variable: number, quantity?: number, targetProfit = 0) {
  if (!ok(fixed) || !ok(price) || !ok(variable) || price <= 0 || !ok(targetProfit) || (quantity !== undefined && (!ok(quantity) || !Number.isInteger(quantity)))) return fail("invalid");
  const contribution = price - variable;
  if (contribution <= 0) return fail("no-contribution");
  const rawUnits = fixed / contribution;
  const units = Math.max(0, Math.ceil(rawUnits - 1e-10));
  const targetUnits = Math.max(0, Math.ceil((fixed + targetProfit) / contribution - 1e-10));
  if (units > 1e12 || targetUnits > 1e12) return fail("invalid");
  const profit = quantity === undefined ? null : quantity * contribution - fixed;
  return { ok: true as const, units, targetUnits, contribution, revenue: units*price, costs: fixed + units*variable,
    fixed, price, variable, targetProfit, quantity, profit, marginOfContribution: contribution / price * 100 };
}
