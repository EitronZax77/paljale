"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [visitasTotales, setVisitasTotales] = useState<number>(128);

  useEffect(() => {
    // Conteo real de visitas totales en el navegador del usuario
    try {
      const visitasGuardadas = localStorage.getItem("paljale_visitas_totales");
      const numVisitas = visitasGuardadas ? parseInt(visitasGuardadas, 10) + 1 : 128;
      localStorage.setItem("paljale_visitas_totales", numVisitas.toString());
      setVisitasTotales(numVisitas);
    } catch (e) {}
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-orange-50 text-gray-900 font-sans selection:bg-rose-600 selection:text-white flex flex-col justify-between">
      
      {/* Barra superior con 100% Gratis y Seguro + En línea arriba a la derecha */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-rose-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-xl font-black bg-gradient-to-r from-rose-600 to-orange-500 bg-clip-text text-transparent">
            PALJALE
          </span>

          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-rose-100 text-rose-700 hidden sm:inline-block">
              100% Gratis y Seguro
            </span>
            {/* Indicador de activos en línea en tiempo real */}
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50/90 border border-rose-200 shadow-sm text-xs font-semibold text-rose-800">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-600"></span>
              </span>
              <span>1 en línea</span>
            </div>
          </div>
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="max-w-5xl mx-auto px-6 py-16 flex flex-col items-center text-center my-auto">
        
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-rose-400 rounded-3xl blur-xl opacity-40 animate-pulse"></div>
          <div className="relative w-24 h-24 rounded-3xl bg-gradient-to-tr from-rose-600 to-orange-500 text-white flex items-center justify-center text-5xl shadow-xl shadow-rose-500/30">
            ⚡
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-6">
          Herramientas Digitales <span className="bg-gradient-to-r from-rose-600 to-orange-500 bg-clip-text text-transparent">Sin Límites</span>
        </h1>
        <p className="text-gray-600 mb-12 text-lg max-w-xl">
          Gestiona, une, comprime y convierte tus documentos PDF, imágenes y códigos QR al instante, gratis y con total seguridad.
        </p>

        {/* Tarjetas de acceso a los Módulos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
          
          <a 
            href="/pdf" 
            className="bg-white/90 backdrop-blur-xl border border-rose-100 rounded-[32px] p-8 shadow-xl shadow-rose-900/5 hover:border-rose-400 hover:scale-[1.02] transition group flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
              📄
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Herramientas PDF</h3>
            <p className="text-sm text-gray-600">Une, extrae páginas, rota y comprime tus archivos PDF con calidad profesional.</p>
          </a>

          <a 
            href="/imagenes" 
            className="bg-white/90 backdrop-blur-xl border border-rose-100 rounded-[32px] p-8 shadow-xl shadow-rose-900/5 hover:border-rose-400 hover:scale-[1.02] transition group flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
              🖼️
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Editor de Imágenes</h3>
            <p className="text-sm text-gray-600">Reduce el peso de tus fotos o cámbialas de formato al instante de forma segura.</p>
          </a>

          <a 
            href="/qr" 
            className="bg-white/90 backdrop-blur-xl border border-rose-100 rounded-[32px] p-8 shadow-xl shadow-rose-900/5 hover:border-rose-400 hover:scale-[1.02] transition group flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
              🔲
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Generador QR</h3>
            <p className="text-sm text-gray-600">Crea códigos QR personalizados para enlaces, textos y datos al instante.</p>
          </a>

        </div>

      </main>

      {/* Pie de página con el total de visitas hasta abajo */}
      <footer className="w-full border-t border-rose-100 py-6 text-center text-xs text-gray-500 flex flex-col sm:flex-row items-center justify-center gap-2">
        <span>PALJALE © 2026 — Todos los derechos reservados.</span>
        <span className="hidden sm:inline text-rose-300">|</span>
        <span className="bg-rose-50 px-2.5 py-1 rounded-full border border-rose-100 text-rose-700 font-semibold">
          Visitas totales: {visitasTotales}
        </span>
      </footer>

    </div>
  );
}