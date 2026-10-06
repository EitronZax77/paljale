"use client";

import { useEffect, useRef, useState } from "react";

interface Efemeride {
  icono1: string;
  icono2: string;
  fecha: string;
  titulo: string;
  frase: string;
}

function obtenerEfemerideActual(): Efemeride {
  const hoy = new Date();

  const dia = hoy.getDate();
  const mes = hoy.getMonth() + 1;
  const anio = hoy.getFullYear();

  const mesesNombres = [
    "ENE",
    "FEB",
    "MAR",
    "ABR",
    "MAY",
    "JUN",
    "JUL",
    "AGO",
    "SEP",
    "OCT",
    "NOV",
    "DIC",
  ];

  const nombreMes = mesesNombres[mes - 1];
  const diaFormateado = String(dia).padStart(2, "0");
  const fechaFormateada = `${diaFormateado} ${nombreMes} ${anio}`;

  if (mes === 10 && dia === 1) {
    return {
      icono1: "☕",
      icono2: "🏛️",
      fecha: fechaFormateada,
      titulo: "DÍA INTERNACIONAL DEL CAFÉ Y DEL ARQUITECTO",
      frase:
        "Celebrando la innovación, el diseño urbano y la cultura cafetera.",
    };
  }

  return {
    icono1: "⚡",
    icono2: "🚀",
    fecha: fechaFormateada,
    titulo: "EFEMÉRIDE DEL DÍA",
    frase: "Innovación, tecnología y alto rendimiento sin límites.",
  };
}

export default function BarraEfemeride() {
  const [posX, setPosX] = useState<number>(10);

  const barraRef = useRef<HTMLDivElement>(null);
  const contenidoRef = useRef<HTMLDivElement>(null);
  const velocidadRef = useRef<number>(1.2);

  const efemerideTexto = obtenerEfemerideActual();

  useEffect(() => {
    let animacionId = 0;

    const actualizarMovimiento = () => {
      const barra = barraRef.current;
      const contenido = contenidoRef.current;

      if (barra && contenido) {
        const anchoContenedor = barra.clientWidth;
        const anchoContenido = contenido.clientWidth;

        const limiteMinimo = 10;
        const limiteMaximo = Math.max(
          limiteMinimo,
          anchoContenedor - anchoContenido - 10
        );

        setPosX((posicionAnterior) => {
          const siguienteX =
            posicionAnterior + velocidadRef.current;

          if (siguienteX >= limiteMaximo) {
            velocidadRef.current =
              -Math.abs(velocidadRef.current);

            return limiteMaximo;
          }

          if (siguienteX <= limiteMinimo) {
            velocidadRef.current =
              Math.abs(velocidadRef.current);

            return limiteMinimo;
          }

          return siguienteX;
        });
      }

      animacionId =
        requestAnimationFrame(actualizarMovimiento);
    };

    animacionId =
      requestAnimationFrame(actualizarMovimiento);

    return () => {
      cancelAnimationFrame(animacionId);
    };
  }, []);

  return (
    <div
      ref={barraRef}
      className="w-full bg-[#03070b] border-t border-cyan-500/30 py-4 overflow-hidden relative shadow-[inset_0_0_25px_rgba(6,182,212,0.1)]"
    >
      <div className="w-full relative h-14 flex items-center">
        <div
          ref={contenidoRef}
          className="flex items-center gap-3 text-3xl select-none absolute whitespace-nowrap"
          style={{
            transform: `translateX(${posX}px)`,
          }}
        >
          <div
            className="relative filter drop-shadow-[0_0_15px_rgba(6,182,212,0.8)] animate-bounce"
            aria-hidden="true"
          >
            {efemerideTexto.icono1}
          </div>

          <div className="text-cyan-400 font-black text-xs md:text-sm uppercase tracking-wider bg-cyan-500/10 border border-cyan-500/30 px-5 py-2 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.25)] flex items-center gap-2">
            <span className="text-rose-400 font-extrabold">
              📅 {efemerideTexto.fecha}
            </span>

            <span className="text-cyan-300 font-extrabold">
              | 📌 {efemerideTexto.titulo}:
            </span>

            <span className="text-gray-200 font-medium">
              {efemerideTexto.frase}
            </span>
          </div>

          <div
            className="relative filter drop-shadow-[0_0_15px_rgba(244,63,94,0.8)] animate-bounce"
            aria-hidden="true"
          >
            {efemerideTexto.icono2}
          </div>
        </div>
      </div>
    </div>
  );
}