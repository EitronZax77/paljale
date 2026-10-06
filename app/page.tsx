"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import BarraEfemeride from "@/components/BarraEfemeride";

interface Figura {
  id: number;
  simbolo: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  tamano: string;
  color: string;
  intensidad: number;
}

const COLORES_NEON = [
  "shadow-[0_0_30px_rgba(6,182,212,0.8),inset_0_0_20px_rgba(6,182,212,0.5)] border-cyan-400",
  "shadow-[0_0_30px_rgba(244,63,94,0.8),inset_0_0_20px_rgba(244,63,94,0.5)] border-rose-500",
  "shadow-[0_0_30px_rgba(168,85,247,0.8),inset_0_0_20px_rgba(168,85,247,0.5)] border-purple-500",
  "shadow-[0_0_30px_rgba(234,179,8,0.8),inset_0_0_20px_rgba(234,179,8,0.5)] border-yellow-400",
];

const FIGURAS_IZQ_INICIALES: Figura[] = [
  {
    id: 1,
    simbolo: "⚡",
    x: 15,
    y: 25,
    vx: 0.7,
    vy: 0.6,
    tamano: "text-5xl",
    color: "text-cyan-400",
    intensidad: 1,
  },
  {
    id: 2,
    simbolo: "⬡",
    x: 50,
    y: 65,
    vx: -0.6,
    vy: 0.7,
    tamano: "text-6xl",
    color: "text-cyan-300",
    intensidad: 1,
  },
  {
    id: 3,
    simbolo: "⚙️",
    x: 30,
    y: 40,
    vx: 0.5,
    vy: -0.6,
    tamano: "text-5xl",
    color: "text-rose-400",
    intensidad: 1,
  },
  {
    id: 4,
    simbolo: "💻",
    x: 70,
    y: 30,
    vx: -0.5,
    vy: -0.5,
    tamano: "text-5xl",
    color: "text-amber-400",
    intensidad: 1,
  },
  {
    id: 5,
    simbolo: "🚀",
    x: 40,
    y: 80,
    vx: 0.8,
    vy: -0.7,
    tamano: "text-5xl",
    color: "text-cyan-400",
    intensidad: 1,
  },
];

const FIGURAS_DER_INICIALES: Figura[] = [
  {
    id: 1,
    simbolo: "◈",
    x: 25,
    y: 35,
    vx: -0.7,
    vy: 0.6,
    tamano: "text-5xl",
    color: "text-rose-400",
    intensidad: 1,
  },
  {
    id: 2,
    simbolo: "⚡",
    x: 65,
    y: 20,
    vx: 0.6,
    vy: -0.5,
    tamano: "text-6xl",
    color: "text-cyan-400",
    intensidad: 1,
  },
  {
    id: 3,
    simbolo: "⟡",
    x: 45,
    y: 55,
    vx: -0.5,
    vy: -0.7,
    tamano: "text-5xl",
    color: "text-cyan-300",
    intensidad: 1,
  },
  {
    id: 4,
    simbolo: "🔥",
    x: 35,
    y: 75,
    vx: 0.7,
    vy: 0.5,
    tamano: "text-5xl",
    color: "text-orange-400",
    intensidad: 1,
  },
  {
    id: 5,
    simbolo: "⚙️",
    x: 75,
    y: 60,
    vx: -0.6,
    vy: -0.6,
    tamano: "text-5xl",
    color: "text-rose-500",
    intensidad: 1,
  },
];

function actualizarFiguras(figuras: Figura[]): Figura[] {
  return figuras.map((figura) => {
    const nuevoX = figura.x + figura.vx;
    const nuevoY = figura.y + figura.vy;

    let nuevoVx = figura.vx;
    let nuevoVy = figura.vy;
    let nuevaIntensidad = figura.intensidad;

    if (nuevoX <= 5 || nuevoX >= 85) {
      nuevoVx *= -1;
      nuevaIntensidad = 2.5;
    } else {
      nuevaIntensidad = Math.max(1, figura.intensidad - 0.02);
    }

    if (nuevoY <= 10 || nuevoY >= 80) {
      nuevoVy *= -1;
      nuevaIntensidad = 2.5;
    }

    return {
      ...figura,
      x: nuevoX,
      y: nuevoY,
      vx: nuevoVx,
      vy: nuevoVy,
      intensidad: nuevaIntensidad,
    };
  });
}

export default function Home() {
  const [colorNeonIndex, setColorNeonIndex] = useState(0);
  const [figurasIzq, setFigurasIzq] = useState<Figura[]>(
    FIGURAS_IZQ_INICIALES
  );
  const [figurasDer, setFigurasDer] = useState<Figura[]>(
    FIGURAS_DER_INICIALES
  );

  useEffect(() => {
    let animacionId = 0;
    let contadorFrames = 0;

    const actualizarMovimiento = () => {
      contadorFrames += 1;

      if (contadorFrames % 90 === 0) {
        setColorNeonIndex(
          (indiceActual) => (indiceActual + 1) % COLORES_NEON.length
        );
      }

      setFigurasIzq(actualizarFiguras);
      setFigurasDer(actualizarFiguras);

      animacionId = requestAnimationFrame(actualizarMovimiento);
    };

    animacionId = requestAnimationFrame(actualizarMovimiento);

    return () => {
      cancelAnimationFrame(animacionId);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#060D14] text-gray-100 font-sans selection:bg-cyan-500 selection:text-black flex flex-col justify-between overflow-x-hidden">
      <header className="sticky top-0 z-50 bg-[#060D14]/90 backdrop-blur-xl border-b border-cyan-900/40">
        <div className="w-full px-6 md:px-12 h-20 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="text-2xl md:text-3xl font-black tracking-wider bg-gradient-to-r from-rose-500 via-orange-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(244,63,94,0.3)]">
              PALJALE
            </span>

            <span className="hidden md:inline text-cyan-300 font-black text-xl md:text-2xl tracking-wider uppercase border-l border-cyan-500/40 pl-6 drop-shadow-[0_0_15px_rgba(6,182,212,0.7)]">
              INGENIERÍA DIGITAL DE ALTO RENDIMIENTO
            </span>
          </div>
        </div>
      </header>

      <section className="relative w-full h-[220px] md:h-[300px] bg-[#04080c] border-b border-cyan-900/50 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden flex items-center justify-between">
        <div className="hidden lg:block w-[32%] h-full bg-gradient-to-r from-[#020508] via-[#060D14] to-transparent border-r border-cyan-500/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.12)_0,transparent_100%)]" />

          {figurasIzq.map((figura) => (
            <div
              key={figura.id}
              className={`absolute transition-transform duration-75 select-none ${figura.tamano} ${figura.color}`}
              style={{
                left: `${figura.x}%`,
                top: `${figura.y}%`,
                filter: `drop-shadow(0 0 ${
                  figura.intensidad * 12
                }px currentColor)`,
                transform: `scale(${
                  figura.intensidad > 1.5 ? 1.25 : 1
                })`,
              }}
              aria-hidden="true"
            >
              {figura.simbolo}
            </div>
          ))}
        </div>

        <div className="w-full lg:w-[36%] h-full flex items-center justify-center px-4 relative">
          <div className="absolute inset-0 bg-cyan-500/15 blur-3xl rounded-full pointer-events-none animate-pulse" />

          <div
            className={`p-1.5 rounded-2xl border-2 transition-all duration-700 animate-pulse bg-[#060D14] ${COLORES_NEON[colorNeonIndex]}`}
          >
            <Image
              src="/PALJALE_BANNER.jpeg"
              alt="PALJALE, herramientas digitales online"
              width={900}
              height={500}
              priority
              sizes="(max-width: 1024px) 90vw, 36vw"
              className="max-h-[160px] md:max-h-[240px] w-auto h-auto object-contain rounded-xl relative z-10"
            />
          </div>
        </div>

        <div className="hidden lg:block w-[32%] h-full bg-gradient-to-l from-[#020508] via-[#060D14] to-transparent border-l border-cyan-500/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.12)_0,transparent_100%)]" />

          {figurasDer.map((figura) => (
            <div
              key={figura.id}
              className={`absolute transition-transform duration-75 select-none ${figura.tamano} ${figura.color}`}
              style={{
                left: `${figura.x}%`,
                top: `${figura.y}%`,
                filter: `drop-shadow(0 0 ${
                  figura.intensidad * 12
                }px currentColor)`,
                transform: `scale(${
                  figura.intensidad > 1.5 ? 1.25 : 1
                })`,
              }}
              aria-hidden="true"
            >
              {figura.simbolo}
            </div>
          ))}
        </div>
      </section>

      <main className="w-full max-w-7xl mx-auto px-6 md:px-12 py-16 flex flex-col items-center text-center my-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-7xl">
          <Link
            href="/pdf"
            className="relative group bg-[#0a1622]/80 backdrop-blur-2xl border border-cyan-500/20 rounded-3xl p-8 shadow-[0_0_30px_rgba(0,0,0,0.5)] hover:border-cyan-400 hover:shadow-[0_0_35px_rgba(6,182,212,0.25)] hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

            <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center text-3xl mb-6 group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all shadow-[0_0_15px_rgba(6,182,212,0.2)]">
              📄
            </div>

            <h2 className="text-xl font-bold text-white mb-3 tracking-wide">
              Herramientas PDF
            </h2>

            <p className="text-sm text-gray-300 font-bold leading-relaxed">
              Une, extrae páginas, rota y comprime tus archivos con precisión
              corporativa.
            </p>

            <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-widest opacity-80 group-hover:opacity-100">
              <span>Explorar módulo</span>
              <span className="group-hover:translate-x-1 transition-transform">
                →
              </span>
            </div>
          </Link>

          <Link
            href="/imagenes"
            className="relative group bg-[#0a1622]/80 backdrop-blur-2xl border border-cyan-500/20 rounded-3xl p-8 shadow-[0_0_30px_rgba(0,0,0,0.5)] hover:border-cyan-400 hover:shadow-[0_0_35px_rgba(6,182,212,0.25)] hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

            <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center text-3xl mb-6 group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all shadow-[0_0_15px_rgba(6,182,212,0.2)]">
              🖼️
            </div>

            <h2 className="text-xl font-bold text-white mb-3 tracking-wide">
              Editor de Imágenes
            </h2>

            <p className="text-sm text-gray-300 font-bold leading-relaxed">
              Optimiza el peso y transforma el formato de tus gráficos con
              algoritmos seguros.
            </p>

            <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-widest opacity-80 group-hover:opacity-100">
              <span>Explorar módulo</span>
              <span className="group-hover:translate-x-1 transition-transform">
                →
              </span>
            </div>
          </Link>

          <Link
            href="/conversores"
            className="relative group bg-[#0a1622]/80 backdrop-blur-2xl border border-cyan-500/20 rounded-3xl p-8 shadow-[0_0_30px_rgba(0,0,0,0.5)] hover:border-cyan-400 hover:shadow-[0_0_35px_rgba(6,182,212,0.25)] hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

            <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center text-3xl mb-6 group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all shadow-[0_0_15px_rgba(6,182,212,0.2)]">
              🎵
            </div>

            <h2 className="text-xl font-bold text-white mb-3 tracking-wide">
              Conversor de Audio
            </h2>

            <p className="text-sm text-gray-300 font-bold leading-relaxed">
              Extrae y transforma pistas de audio y multimedia con velocidad y
              seguridad.
            </p>

            <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-widest opacity-80 group-hover:opacity-100">
              <span>Explorar módulo</span>
              <span className="group-hover:translate-x-1 transition-transform">
                →
              </span>
            </div>
          </Link>

          <Link
            href="/qr"
            className="relative group bg-[#0a1622]/80 backdrop-blur-2xl border border-cyan-500/20 rounded-3xl p-8 shadow-[0_0_30px_rgba(0,0,0,0.5)] hover:border-cyan-400 hover:shadow-[0_0_35px_rgba(6,182,212,0.25)] hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

            <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center text-3xl mb-6 group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all shadow-[0_0_15px_rgba(6,182,212,0.2)]">
              🔲
            </div>

            <h2 className="text-xl font-bold text-white mb-3 tracking-wide">
              Generador QR
            </h2>

            <p className="text-sm text-gray-300 font-bold leading-relaxed">
              Diseña códigos QR personalizados con alta velocidad de lectura.
            </p>

            <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-widest opacity-80 group-hover:opacity-100">
              <span>Explorar módulo</span>
              <span className="group-hover:translate-x-1 transition-transform">
                →
              </span>
            </div>
          </Link>
        </div>
      </main>

      <BarraEfemeride />

      <footer className="w-full border-t border-cyan-900/40 py-8 text-center text-xs text-gray-500 flex flex-col sm:flex-row items-center justify-center gap-2 bg-[#04080c]">
        <span>PALJALE © 2026 — Todos los derechos reservados.</span>
      </footer>
    </div>
  );
}