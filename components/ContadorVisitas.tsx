"use client";
import { useState, useEffect } from "react";

export default function ContadorVisitas() {
  const [visitas, setVisitas] = useState<number>(128);

  useEffect(() => {
    try {
      const guardadas = localStorage.getItem("paljale_visitas_totales");
      const num = guardadas ? parseInt(guardadas, 10) : 128;
      setVisitas(num);
    } catch (e) {}
  }, []);

  return (
    <span className="bg-cyan-950/50 px-3 py-1 rounded-full border border-cyan-900/50 text-cyan-400 font-semibold">
      Visitas totales: {visitas}
    </span>
  );
}