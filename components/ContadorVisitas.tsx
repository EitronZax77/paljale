"use client";

import { useEffect, useState } from "react";

export default function ContadorVisitas() {
  const [visitas, setVisitas] = useState<number | null>(null);

  useEffect(() => {
    async function obtenerVisitas() {
      try {
        const res = await fetch("https://counterapi.com/api/paljale.vercel.app/visits/up");
        if (!res.ok) throw new Error("Error en la respuesta de la API");
        const data = await res.json();
        
        if (data && typeof data.value === "number") {
          setVisitas(data.value);
        } else {
          setVisitas(1);
        }
      } catch (err) {
        setVisitas(1);
      }
    }

    obtenerVisitas();
  }, []);

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-rose-50 to-orange-50 border border-rose-200/80 shadow-sm text-xs font-semibold text-gray-700">
      <span className="flex items-center justify-center w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
      <span className="text-gray-500 font-medium">Visitas totales:</span>
      <span className="font-extrabold bg-gradient-to-r from-rose-600 to-orange-600 bg-clip-text text-transparent">
        {visitas !== null ? visitas.toLocaleString() : "..."}
      </span>
    </div>
  );
}