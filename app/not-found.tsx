"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-orange-50 text-gray-900 font-sans selection:bg-rose-600 selection:text-white flex flex-col justify-between">
      {/* Header Estándar */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-rose-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="text-2xl md:text-3xl font-black tracking-wider bg-gradient-to-r from-rose-600 via-rose-500 to-orange-500 bg-clip-text text-transparent drop-shadow-sm hover:opacity-90 transition"
          >
            PALJALE
          </Link>
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
      <footer className="w-full border-t border-rose-100 py-6 text-center text-xs text-gray-500">
        <span>
          PALJALE © 2026 — Todos los derechos reservados.
        </span>
      </footer>
    </div>
  );
}