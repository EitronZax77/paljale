"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import ContadorVisitas from "@/components/ContadorVisitas";

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

export default function Home() {
  const [visitasTotales, setVisitasTotales] = useState<number>(128);

  const [colorNeonIndex, setColorNeonIndex] = useState<number>(0);
  const coloresNeon = [
    "shadow-[0_0_30px_rgba(6,182,212,0.8),inset_0_0_20px_rgba(6,182,212,0.5)] border-cyan-400",
    "shadow-[0_0_30px_rgba(244,63,94,0.8),inset_0_0_20px_rgba(244,63,94,0.5)] border-rose-500",
    "shadow-[0_0_30px_rgba(168,85,247,0.8),inset_0_0_20px_rgba(168,85,247,0.5)] border-purple-500",
    "shadow-[0_0_30px_rgba(234,179,8,0.8),inset_0_0_20px_rgba(234,179,8,0.5)] border-yellow-400",
  ];

  const [figurasIzq, setFigurasIzq] = useState<Figura[]>([
    { id: 1, simbolo: "⚡", x: 15, y: 25, vx: 0.7, vy: 0.6, tamano: "text-5xl", color: "text-cyan-400", intensidad: 1 },
    { id: 2, simbolo: "⬡", x: 50, y: 65, vx: -0.6, vy: 0.7, tamano: "text-6xl", color: "text-cyan-300", intensidad: 1 },
    { id: 3, simbolo: "⚙️", x: 30, y: 40, vx: 0.5, vy: -0.6, tamano: "text-5xl", color: "text-rose-400", intensidad: 1 },
    { id: 4, simbolo: "💻", x: 70, y: 30, vx: -0.5, vy: -0.5, tamano: "text-5xl", color: "text-amber-400", intensidad: 1 },
    { id: 5, simbolo: "🚀", x: 40, y: 80, vx: 0.8, vy: -0.7, tamano: "text-5xl", color: "text-cyan-400", intensidad: 1 },
  ]);

  const [figurasDer, setFigurasDer] = useState<Figura[]>([
    { id: 1, simbolo: "◈", x: 25, y: 35, vx: -0.7, vy: 0.6, tamano: "text-5xl", color: "text-rose-400", intensidad: 1 },
    { id: 2, simbolo: "⚡", x: 65, y: 20, vx: 0.6, vy: -0.5, tamano: "text-6xl", color: "text-cyan-400", intensidad: 1 },
    { id: 3, simbolo: "⟡", x: 45, y: 55, vx: -0.5, vy: -0.7, tamano: "text-5xl", color: "text-cyan-300", intensidad: 1 },
    { id: 4, simbolo: "🔥", x: 35, y: 75, vx: 0.7, vy: 0.5, tamano: "text-5xl", color: "text-orange-400", intensidad: 1 },
    { id: 5, simbolo: "⚙️", x: 75, y: 60, vx: -0.6, vy: -0.6, tamano: "text-5xl", color: "text-rose-500", intensidad: 1 },
  ]);

  const [posX, setPosX] = useState<number>(10);
  const [velX, setVelX] = useState<number>(1.2);
  const barraRef = useRef<HTMLDivElement>(null);
  const contenidoRef = useRef<HTMLDivElement>(null);

  const [efemerideTexto, setEfemerideTexto] = useState({
    icono1: "🌽",
    icono2: "🌾",
    fecha: "29 SEP 2026",
    titulo: "DÍA NACIONAL DEL MAÍZ",
    frase: "Raíz, cultura y sustento milenario de México.",
  });

  useEffect(() => {
    try {
      const visitasGuardadas = localStorage.getItem("paljale_visitas_totales");
      const numVisitas = visitasGuardadas ? parseInt(visitasGuardadas, 10) + 1 : 128;
      localStorage.setItem("paljale_visitas_totales", numVisitas.toString());
      setVisitasTotales(numVisitas);
    } catch (e) {}
  }, []);

  useEffect(() => {
    let animacionId: number;
    let contadorFrames = 0;

    const actualizarMovimiento = () => {
      contadorFrames++;
      if (contadorFrames % 90 === 0) {
        setColorNeonIndex((prev) => (prev + 1) % coloresNeon.length);
      }

      setFigurasIzq((prev) =>
        prev.map((f) => {
          let nuevoX = f.x + f.vx;
          let nuevoY = f.y + f.vy;
          let nuevoVx = f.vx;
          let nuevoVy = f.vy;
          let nuevoBrillo = f.intensidad;

          if (nuevoX <= 5 || nuevoX >= 85) {
            nuevoVx *= -1;
            nuevoBrillo = 2.5;
          } else {
            nuevoBrillo = Math.max(1, f.intensidad - 0.02);
          }

          if (nuevoY <= 10 || nuevoY >= 80) {
            nuevoVy *= -1;
            nuevoBrillo = 2.5;
          }

          return { ...f, x: nuevoX, y: nuevoY, vx: nuevoVx, vy: nuevoVy, intensidad: nuevoBrillo };
        })
      );

      setFigurasDer((prev) =>
        prev.map((f) => {
          let nuevoX = f.x + f.vx;
          let nuevoY = f.y + f.vy;
          let nuevoVx = f.vx;
          let nuevoVy = f.vy;
          let nuevoBrillo = f.intensidad;

          if (nuevoX <= 5 || nuevoX >= 85) {
            nuevoVx *= -1;
            nuevoBrillo = 2.5;
          } else {
            nuevoBrillo = Math.max(1, f.intensidad - 0.02);
          }

          if (nuevoY <= 10 || nuevoY >= 80) {
            nuevoVy *= -1;
            nuevoBrillo = 2.5;
          }

          return { ...f, x: nuevoX, y: nuevoY, vx: nuevoVx, vy: nuevoVy, intensidad: nuevoBrillo };
        })
      );

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
    <div className="min-h-screen bg-[#060D14] text-gray-100 font-sans selection:bg-cyan-500 selection:text-black flex flex-col justify-between overflow-x-hidden">
      
      {/* Barra superior con texto principal en MAYÚSCULAS y mayor tamaño */}
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

      {/* Banner panorámico */}
      <section className="relative w-full h-[220px] md:h-[300px] bg-[#04080c] border-b border-cyan-900/50 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden flex items-center justify-between">
        
        {/* Costado Izquierdo */}
        <div className="hidden lg:block w-[32%] h-full bg-gradient-to-r from-[#020508] via-[#060D14] to-transparent border-r border-cyan-500/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.12)_0,transparent_100%)]"></div>
          {figurasIzq.map((fig) => (
            <div
              key={fig.id}
              className={`absolute transition-transform duration-75 select-none ${fig.tamano} ${fig.color}`}
              style={{
                left: `${fig.x}%`,
                top: `${fig.y}%`,
                filter: `drop-shadow(0 0 ${fig.intensidad * 12}px currentColor)`,
                transform: `scale(${fig.intensidad > 1.5 ? 1.25 : 1})`,
              }}
            >
              {fig.simbolo}
            </div>
          ))}
        </div>

        {/* Imagen Central con Contorno Neón Itinerante y Parpadeante */}
        <div className="w-full lg:w-[36%] h-full flex items-center justify-center px-4 relative">
          <div className="absolute inset-0 bg-cyan-500/15 blur-3xl rounded-full pointer-events-none animate-pulse"></div>
          <div className={`p-1.5 rounded-2xl border-2 transition-all duration-700 animate-pulse bg-[#060D14] ${coloresNeon[colorNeonIndex]}`}>
            <img 
              src="/PALJALE_BANNER.jpeg" 
              alt="PALJALE Banner" 
              className="max-h-[160px] md:max-h-[240px] w-auto object-contain rounded-xl relative z-10"
            />
          </div>
        </div>

        {/* Costado Derecho */}
        <div className="hidden lg:block w-[32%] h-full bg-gradient-to-l from-[#020508] via-[#060D14] to-transparent border-l border-cyan-500/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.12)_0,transparent_100%)]"></div>
          {figurasDer.map((fig) => (
            <div
              key={fig.id}
              className={`absolute transition-transform duration-75 select-none ${fig.tamano} ${fig.color}`}
              style={{
                left: `${fig.x}%`,
                top: `${fig.y}%`,
                filter: `drop-shadow(0 0 ${fig.intensidad * 12}px currentColor)`,
                transform: `scale(${fig.intensidad > 1.5 ? 1.25 : 1})`,
              }}
            >
              {fig.simbolo}
            </div>
          ))}
        </div>

      </section>

      {/* Contenido Principal (Solo Tarjetas sin texto descriptivo) */}
      <main className="w-full max-w-7xl mx-auto px-6 md:px-12 py-16 flex flex-col items-center text-center my-auto">

        {/* Tarjetas de Módulos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-7xl">
          
          {/* Tarjeta PDF */}
          <Link 
            href="/pdf" 
            className="relative group bg-[#0a1622]/80 backdrop-blur-2xl border border-cyan-500/20 rounded-3xl p-8 shadow-[0_0_30px_rgba(0,0,0,0.5)] hover:border-cyan-400 hover:shadow-[0_0_35px_rgba(6,182,212,0.25)] hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
            <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center text-3xl mb-6 group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all shadow-[0_0_15px_rgba(6,182,212,0.2)]">
              📄
            </div>
            <h3 className="text-xl font-bold text-white mb-3 tracking-wide">Herramientas PDF</h3>
            <p className="text-sm text-gray-300 font-bold leading-relaxed">Une, extrae páginas, rota y comprime tus archivos con precisión corporativa.</p>
            <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-widest opacity-80 group-hover:opacity-100">
              <span>Explorar módulo</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </Link>

          {/* Tarjeta Imágenes */}
          <Link 
            href="/imagenes" 
            className="relative group bg-[#0a1622]/80 backdrop-blur-2xl border border-cyan-500/20 rounded-3xl p-8 shadow-[0_0_30px_rgba(0,0,0,0.5)] hover:border-cyan-400 hover:shadow-[0_0_35px_rgba(6,182,212,0.25)] hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
            <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center text-3xl mb-6 group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all shadow-[0_0_15px_rgba(6,182,212,0.2)]">
              🖼️
            </div>
            <h3 className="text-xl font-bold text-white mb-3 tracking-wide">Editor de Imágenes</h3>
            <p className="text-sm text-gray-300 font-bold leading-relaxed">Optimiza el peso y transforma el formato de tus gráficos con algoritmos seguros.</p>
            <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-widest opacity-80 group-hover:opacity-100">
              <span>Explorar módulo</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </Link>

          {/* Tarjeta Conversor de Audio */}
          <Link 
            href="/conversores" 
            className="relative group bg-[#0a1622]/80 backdrop-blur-2xl border border-cyan-500/20 rounded-3xl p-8 shadow-[0_0_30px_rgba(0,0,0,0.5)] hover:border-cyan-400 hover:shadow-[0_0_35px_rgba(6,182,212,0.25)] hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
            <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center text-3xl mb-6 group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all shadow-[0_0_15px_rgba(6,182,212,0.2)]">
              🎵
            </div>
            <h3 className="text-xl font-bold text-white mb-3 tracking-wide">Conversor de Audio</h3>
            <p className="text-sm text-gray-300 font-bold leading-relaxed">Extrae y transforma pistas de audio y multimedia con velocidad y seguridad.</p>
            <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-widest opacity-80 group-hover:opacity-100">
              <span>Explorar módulo</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </Link>

          {/* Tarjeta QR */}
          <Link 
            href="/qr" 
            className="relative group bg-[#0a1622]/80 backdrop-blur-2xl border border-cyan-500/20 rounded-3xl p-8 shadow-[0_0_30px_rgba(0,0,0,0.5)] hover:border-cyan-400 hover:shadow-[0_0_35px_rgba(6,182,212,0.25)] hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
            <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center text-3xl mb-6 group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all shadow-[0_0_15px_rgba(6,182,212,0.2)]">
              🔲
            </div>
            <h3 className="text-xl font-bold text-white mb-3 tracking-wide">Generador QR</h3>
            <p className="text-sm text-gray-300 font-bold leading-relaxed">Diseña códigos QR dinámicos y personalizados con alta velocidad de lectura.</p>
            <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-widest opacity-80 group-hover:opacity-100">
              <span>Explorar módulo</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </Link>

        </div>

      </main>

      {/* Barra Inferior con Fecha, Efeméride Dinámica y Rebote Perfecto */}
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

      {/* Pie de página */}
      <footer className="w-full border-t border-cyan-900/40 py-8 text-center text-xs text-gray-500 flex flex-col sm:flex-row items-center justify-center gap-2 bg-[#04080c]">
        <span>PALJALE © 2026 — Todos los derechos reservados.</span>
        <span className="hidden sm:inline text-cyan-800">|</span>
        <ContadorVisitas />
      </footer>

    </div>
  );
}