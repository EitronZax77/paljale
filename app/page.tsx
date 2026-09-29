"use client";

import { useState, useEffect } from "react";
import ContadorVisitas from "@/components/ContadorVisitas";

export default function Home() {
  const [visitasTotales, setVisitasTotales] = useState<number>(128);

  useEffect(() => {
    try {
      const visitasGuardadas = localStorage.getItem("paljale_visitas_totales");
      const numVisitas = visitasGuardadas ? parseInt(visitasGuardadas, 10) + 1 : 128;
      localStorage.setItem("paljale_visitas_totales", numVisitas.toString());
      setVisitasTotales(numVisitas);
    } catch (e) {}
  }, []);

  return (
    <div className="min-h-screen bg-[#060D14] text-gray-100 font-sans selection:bg-cyan-500 selection:text-black flex flex-col justify-between overflow-x-hidden">
      
      {/* Barra superior */}
      <header className="sticky top-0 z-50 bg-[#060D14]/90 backdrop-blur-xl border-b border-cyan-900/40">
        <div className="w-full px-6 md:px-12 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl md:text-3xl font-black tracking-wider bg-gradient-to-r from-rose-500 via-orange-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(244,63,94,0.3)]">
              PALJALE
            </span>
          </div>
        </div>
      </header>

      {/* Banner con la configuración anterior exacta */}
      <section 
        className="relative w-full h-[240px] md:h-[380px] bg-contain md:bg-cover bg-center bg-no-repeat bg-[#060D14] border-b border-cyan-900/50 shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
        style={{ backgroundImage: "url('/PALJALE_BANNER.jpeg')" }}
      >
        <h1 className="sr-only">PALJALE Herramientas Digitales</h1>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#060D14] pointer-events-none"></div>
      </section>

      {/* Contenido Principal */}
      <main className="w-full max-w-7xl mx-auto px-6 md:px-12 py-16 flex flex-col items-center text-center my-auto">
        
        <div className="mb-16 max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4 drop-shadow-[0_0_15px_rgba(6,182,212,0.6)] text-cyan-300">
            Ingeniería Digital de Alto Rendimiento
          </h2>
          <p className="text-gray-200 text-base md:text-xl font-bold leading-relaxed">
            Gestiona, une, comprime y convierte tus documentos PDF, imágenes y códigos QR al instante, con velocidad cuántica, absoluta seguridad y cero fricción.
          </p>
        </div>

        {/* Tarjetas de Módulos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
          
          <a 
            href="/pdf" 
            className="relative group bg-[#0a1622]/80 backdrop-blur-2xl border border-cyan-500/20 rounded-3xl p-8 shadow-[0_0_30px_rgba(0,0,0,0.5)] hover:border-cyan-400 hover:shadow-[0_0_35px_rgba(6,182,212,0.25)] hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
            <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center text-3xl mb-6 group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all shadow-[0_0_15px_rgba(6,182,212,0.2)]">
              📄
            </div>
            <h3 className="text-2xl font-bold text-white mb-3 tracking-wide">Herramientas PDF</h3>
            <p className="text-sm text-gray-300 font-bold leading-relaxed">Une, extrae páginas, rota y comprime tus archivos con precisión corporativa.</p>
            <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-widest opacity-80 group-hover:opacity-100">
              <span>Explorar módulo</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </a>

          <a 
            href="/imagenes" 
            className="relative group bg-[#0a1622]/80 backdrop-blur-2xl border border-cyan-500/20 rounded-3xl p-8 shadow-[0_0_30px_rgba(0,0,0,0.5)] hover:border-cyan-400 hover:shadow-[0_0_35px_rgba(6,182,212,0.25)] hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
            <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center text-3xl mb-6 group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all shadow-[0_0_15px_rgba(6,182,212,0.2)]">
              🖼️
            </div>
            <h3 className="text-2xl font-bold text-white mb-3 tracking-wide">Editor de Imágenes</h3>
            <p className="text-sm text-gray-300 font-bold leading-relaxed">Optimiza el peso y transforma el formato de tus gráficos con algoritmos seguros.</p>
            <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-widest opacity-80 group-hover:opacity-100">
              <span>Explorar módulo</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </a>

          <a 
            href="/qr" 
            className="relative group bg-[#0a1622]/80 backdrop-blur-2xl border border-cyan-500/20 rounded-3xl p-8 shadow-[0_0_30px_rgba(0,0,0,0.5)] hover:border-cyan-400 hover:shadow-[0_0_35px_rgba(6,182,212,0.25)] hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
            <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center text-3xl mb-6 group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all shadow-[0_0_15px_rgba(6,182,212,0.2)]">
              🔲
            </div>
            <h3 className="text-2xl font-bold text-white mb-3 tracking-wide">Generador QR</h3>
            <p className="text-sm text-gray-300 font-bold leading-relaxed">Diseña códigos QR dinámicos y personalizados con alta velocidad de lectura.</p>
            <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-widest opacity-80 group-hover:opacity-100">
              <span>Explorar módulo</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </a>

        </div>

      </main>

      {/* Pie de página */}
      <footer className="w-full border-t border-cyan-900/40 py-8 text-center text-xs text-gray-500 flex flex-col sm:flex-row items-center justify-center gap-2 bg-[#04080c]">
        <span>PALJALE © 2026 — Todos los derechos reservados.</span>
        <span className="hidden sm:inline text-cyan-800">|</span>
        <ContadorVisitas />
      </footer>

    </div>
  );
}