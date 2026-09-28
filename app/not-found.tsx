"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-orange-50 text-gray-900 font-sans selection:bg-rose-600 selection:text-white flex flex-col justify-between">
      
      {/* Header Estándar */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-rose-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-black bg-gradient-to-r from-rose-600 to-orange-500 bg-clip-text text-transparent">
            PALJALE
          </Link>

          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-rose-100 text-rose-700 hidden sm:inline-block">
              100% Gratis y Seguro
            </span>
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

      {/* Contenido principal 404 */}
      <main className="max-w-md mx-auto px-6 py-16 flex flex-col items-center text-center my-auto">
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-rose-400 rounded-3xl blur-xl opacity-40 animate-pulse"></div>
          <div className="relative w-24 h-24 rounded-3xl bg-gradient-to-tr from-rose-600 to-orange-500 text-white flex items-center justify-center text-4xl font-extrabold shadow-xl shadow-rose-500/30">
            404
          </div>
        </div>

        <h1 className="text-3xl font-extrabold text-gray-900 mb-3">
          Página no encontrada
        </h1>
        <p className="text-gray-600 text-sm mb-8">
          La ruta a la que intentas acceder no existe o ha sido movida.
        </p>

        <Link
          href="/"
          className="w-full bg-gradient-to-r from-rose-600 to-orange-600 text-white font-bold py-3.5 px-6 rounded-2xl shadow-lg shadow-rose-600/25 hover:opacity-95 transition"
        >
          ← Volver al Inicio
        </Link>
      </main>

      {/* Footer Estándar */}
      <footer className="w-full border-t border-rose-100 py-6 text-center text-xs text-gray-500 flex flex-col sm:flex-row items-center justify-center gap-2">
        <span>PALJALE © 2026 — Todos los derechos reservados.</span>
        <span className="hidden sm:inline text-rose-300">|</span>
        <span className="bg-rose-50 px-2.5 py-1 rounded-full border border-rose-100 text-rose-700 font-semibold">
          Visitas totales: 128
        </span>
      </footer>

    </div>
  );
}