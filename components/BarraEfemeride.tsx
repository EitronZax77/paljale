"use client";

import { useState, useEffect, useRef } from "react";

export default function BarraEfemeride() {
  const [posX, setPosX] = useState<number>(10);
  const [velX, setVelX] = useState<number>(1.2);
  const barraRef = useRef<HTMLDivElement>(null);
  const contenidoRef = useRef<HTMLDivElement>(null);

  const [efemerideTexto, setEfemerideTexto] = useState({
    icono1: "☕",
    icono2: "🌍",
    fecha: "01 OCT 2026",
    titulo: "DÍA INTERNACIONAL DEL CAFÉ",
    frase: "Cultura, energía y tradición global en cada taza.",
  });

  useEffect(() => {
    // Generar la fecha y efeméride tomando el día actual del dispositivo en tiempo real
    const hoy = new Date();
    const dia = hoy.getDate();
    const mes = hoy.getMonth() + 1;
    const anio = hoy.getFullYear();

    const mesesNombres = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];
    const nombreMes = mesesNombres[mes - 1];
    const fechaFormateada = `${dia < 10 ? '0' + dia : dia} ${nombreMes} ${anio}`;

    if (mes === 10 && dia === 1) {
      setEfemerideTexto({
        icono1: "☕",
        icono2: "🏛️",
        fecha: fechaFormateada,
        titulo: "DÍA INTERNACIONAL DEL CAFÉ Y DEL ARQUITECTO",
        frase: "Celebrando la innovación, el diseño urbano y la cultura cafetera.",
      });
    } else {
      setEfemerideTexto({
        icono1: "⚡",
        icono2: "🚀",
        fecha: fechaFormateada,
        titulo: "EFEMÉRIDE DEL DÍA",
        frase: "Innovación, tecnología y alto rendimiento sin límites.",
      });
    }
  }, []);

  useEffect(() => {
    let animacionId: number;

    const actualizarMovimiento = () => {
      if (barraRef.current && contenidoRef.current) {
        const anchoContenedor = barraRef.current.clientWidth;
        const anchoContenido = contenidoRef.current.clientWidth;
        const limiteMaximo = anchoContenedor - anchoContenido - 10;

        setPosX((prevX) => {
          let siguienteX = prevX + velX;
          if (siguienteX >= limiteMaximo) {
            setVelX(-Math.abs(velX));
            return limiteMaximo;
          } else if (siguienteX <= 10) {
            setVelX(Math.abs(velX));
            return 10;
          }
          return siguienteX;
        });
      }

      animacionId = requestAnimationFrame(actualizarMovimiento);
    };

    animacionId = requestAnimationFrame(actualizarMovimiento);
    return () => cancelAnimationFrame(animacionId);
  }, [velX]);

  return (
    <div ref={barraRef} className="w-full bg-[#03070b] border-t border-cyan-500/30 py-4 overflow-hidden relative shadow-[inset_0_0_25px_rgba(6,182,212,0.1)]">
      <div className="w-full relative h-14 flex items-center">
        <div 
          ref={contenidoRef}
          className="flex items-center gap-3 text-3xl select-none absolute whitespace-nowrap"
          style={{ transform: `translateX(${posX}px)` }}
        >
          <div className="relative filter drop-shadow-[0_0_15px_rgba(6,182,212,0.8)] animate-bounce">
            {efemerideTexto.icono1}
          </div>
          <div className="text-cyan-400 font-black text-xs md:text-sm uppercase tracking-wider bg-cyan-500/10 border border-cyan-500/30 px-5 py-2 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.25)] flex items-center gap-2">
            <span className="text-rose-400 font-extrabold">📅 {efemerideTexto.fecha}</span>
            <span className="text-cyan-300 font-extrabold">| 📌 {efemerideTexto.titulo}:</span>
            <span className="text-gray-200 font-medium">{efemerideTexto.frase}</span>
          </div>
          <div className="relative filter drop-shadow-[0_0_15px_rgba(244,63,94,0.8)] animate-bounce">
            {efemerideTexto.icono2}
          </div>
        </div>
      </div>
    </div>
  );
}