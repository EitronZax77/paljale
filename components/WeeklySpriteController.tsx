"use client";

import { useEffect } from "react";

// Ciclo global ISO UTC: el mismo personaje durante cada semana ISO.
const scenes = ["tecnologia", "naturaleza", "espacial", "arte", "oceano", "ciencia", "primavera", "verano", "invierno", "septiembre", "muertos"];

function isoWeekIndex(now: Date): number {
  const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  const day = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - day);
  const isoYear = d.getUTCFullYear();
  const yearStart = new Date(Date.UTC(isoYear, 0, 1));
  const week = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  return isoYear * 53 + week;
}

export default function WeeklySpriteController() {
  useEffect(() => {
    const refresh = () => {
      const root = document.documentElement;
      root.setAttribute("data-paljale-weekly-sprite", scenes[isoWeekIndex(new Date()) % scenes.length]);
    };
    refresh();
    const timer = window.setInterval(refresh, 60 * 60 * 1000);
    document.addEventListener("visibilitychange", refresh);
    return () => { window.clearInterval(timer); document.removeEventListener("visibilitychange", refresh); document.documentElement.removeAttribute("data-paljale-weekly-sprite"); };
  }, []);
  return null;
}
