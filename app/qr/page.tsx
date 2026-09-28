"use client";

import { useState, useEffect, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";

export default function QrPage() {
  const [textoQr, setTextoQr] = useState<string>("");
  const [montado, setMontado] = useState<boolean>(false);
  const qrRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMontado(true);
  }, []);

  const descargarQr = () => {
    if (!qrRef.current) return;
    const canvas = qrRef.current.querySelector("canvas");
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = "PALJALE_Codigo_QR.png";
    a.click();
  };

  const compartirQr = async () => {
    if (!qrRef.current) return;
    const canvas = qrRef.current.querySelector("canvas");
    if (!canvas) return;

    try {
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        const archivo = new File([blob], "PALJALE_Codigo_QR.png", { type: "image/png" });

        if (navigator.share && navigator.canShare && navigator.canShare({ files: [archivo] })) {
          await navigator.share({
            title: "Código QR de PALJALE",
            text: "Aquí tienes tu código QR generado con PALJALE:",
            files: [archivo],
          });
        } else if (navigator.share) {
          await navigator.share({
            title: "Código QR de PALJALE",
            text: `Código QR generado para: ${textoQr || "PALJALE"}`,
            url: window.location.href,
          });
        } else {
          await navigator.clipboard.writeText(textoQr || window.location.href);
          alert("Enlace copiado al portapapeles.");
        }
      });
    } catch (e) {
      console.error(e);
      alert("No se pudo compartir el código QR.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-orange-50 text-gray-900 font-sans selection:bg-rose-600 selection:text-white flex flex-col justify-between">
      
      {/* Barra superior homologada */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-rose-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="text-sm font-bold text-rose-600 hover:text-rose-800 transition flex items-center gap-2">
            ← Volver al inicio
          </a>

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

      <main className="max-w-4xl mx-auto px-6 py-14 flex flex-col items-center my-auto">
        
        {/* Icono decorativo */}
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-rose-400 rounded-3xl blur-xl opacity-40 animate-pulse"></div>
          <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-tr from-rose-600 to-orange-500 text-white flex items-center justify-center text-4xl shadow-lg shadow-rose-500/30">
            🔲
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-4 text-center">
          Generador de Código QR
        </h1>
        <p className="text-gray-600 mb-8 text-center text-lg max-w-lg">
          Escribe un enlace o texto y tu código QR se creará al instante.
        </p>

        <div className="w-full max-w-xl bg-white/90 backdrop-blur-xl border border-rose-100 rounded-[32px] p-8 md:p-12 shadow-xl shadow-rose-900/5 flex flex-col items-center">
          <div className="w-full mb-6">
            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
              INGRESA TU ENLACE O TEXTO:
            </label>
            <input 
              type="text" 
              value={textoQr} 
              onChange={(e) => setTextoQr(e.target.value)}
              placeholder="Ejemplo: https://mi-sitio.com"
              className="w-full py-3.5 px-4 rounded-2xl border border-rose-200 bg-white font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-rose-500 shadow-sm"
            />
          </div>

          {/* Vista previa en tiempo real del código QR */}
          <div ref={qrRef} className="p-6 bg-white rounded-3xl border border-rose-100 shadow-md mb-6 flex items-center justify-center min-h-[224px] min-w-[224px]">
            {montado && (
              <QRCodeCanvas 
                value={textoQr.trim() !== "" ? textoQr : "https://paljale.com"} 
                size={200} 
                level="H" 
              />
            )}
          </div>

          {/* Botones de Descargar y Compartir */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
            <button 
              onClick={descargarQr} 
              className="w-full bg-gradient-to-r from-rose-600 to-orange-600 text-white font-bold py-4 px-6 rounded-2xl shadow-lg shadow-rose-600/25 hover:opacity-95 transition"
            >
              Descargar Código QR
            </button>
            <button 
              onClick={compartirQr} 
              className="w-full bg-white border border-rose-200 text-rose-700 font-bold py-4 px-6 rounded-2xl hover:bg-rose-50 transition shadow-sm"
            >
              Compartir QR 🔗
            </button>
          </div>
        </div>

      </main>

      {/* Pie de página homologado */}
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