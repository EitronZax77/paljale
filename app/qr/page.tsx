"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { QRCodeCanvas } from "qrcode.react";
import ContadorVisitas from "@/components/ContadorVisitas";

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
    <div className="min-h-screen bg-[#060D14] text-gray-100 font-sans selection:bg-cyan-500 selection:text-black flex flex-col justify-between overflow-x-hidden">
      
      {/* Barra superior homologada al estilo Tesla/Apple */}
      <header className="sticky top-0 z-50 bg-[#060D14]/90 backdrop-blur-xl border-b border-cyan-900/40">
        <div className="w-full px-6 md:px-12 h-20 flex items-center justify-between">
          <Link href="/" className="text-2xl md:text-3xl font-black tracking-wider bg-gradient-to-r from-rose-500 via-orange-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(244,63,94,0.3)]">
            PALJALE
          </Link>
          <Link href="/" className="text-sm font-semibold text-cyan-400 hover:underline">
            ← Volver al inicio
          </Link>
        </div>
      </header>

      <main className="w-full max-w-4xl mx-auto px-6 py-16 flex flex-col items-center my-auto">
        
        {/* Icono decorativo futurista */}
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-cyan-500 rounded-3xl blur-xl opacity-20 animate-pulse"></div>
          <div className="relative w-20 h-20 rounded-3xl bg-[#0a1622] border border-cyan-500/30 text-cyan-400 flex items-center justify-center text-4xl shadow-[0_0_20px_rgba(6,182,212,0.2)]">
            🔲
          </div>
        </div>

        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4 text-center drop-shadow-[0_0_15px_rgba(6,182,212,0.6)] text-cyan-300">
          Generador de Código QR
        </h1>
        <p className="text-gray-300 font-bold mb-10 text-center text-base md:text-lg max-w-lg">
          Escribe un enlace o texto y tu código QR se creará al instante con alta velocidad de lectura.
        </p>

        <div className="w-full max-w-xl bg-[#0a1622]/80 backdrop-blur-2xl border border-cyan-500/20 rounded-[32px] p-8 md:p-12 shadow-[0_0_30px_rgba(0,0,0,0.5)] flex flex-col items-center">
          <div className="w-full mb-6">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
              INGRESA TU ENLACE O TEXTO:
            </label>
            <input 
              type="text" 
              value={textoQr} 
              onChange={(e) => setTextoQr(e.target.value)}
              placeholder="Ejemplo: https://mi-sitio.com"
              className="w-full py-3.5 px-4 rounded-2xl border border-cyan-900/50 bg-[#060D14] font-medium text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-sm"
            />
          </div>

          {/* Vista previa en tiempo real del código QR */}
          <div ref={qrRef} className="p-6 bg-white rounded-3xl border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.15)] mb-6 flex items-center justify-center min-h-[224px] min-w-[224px]">
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
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold py-4 px-6 rounded-2xl shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:opacity-90 transition"
            >
              Descargar Código QR
            </button>
            <button 
              onClick={compartirQr} 
              className="w-full bg-[#060D14] border border-cyan-500/30 text-cyan-400 font-bold py-4 px-6 rounded-2xl hover:bg-cyan-500/10 transition shadow-sm"
            >
              Compartir QR 🔗
            </button>
          </div>
        </div>

      </main>

      {/* Pie de página tecnológico corregido y limpio */}
      <footer className="w-full border-t border-cyan-900/40 py-8 text-center text-xs text-gray-500 flex flex-col sm:flex-row items-center justify-center gap-2 bg-[#04080c]">
        <span>PALJALE © 2026 — Todos los derechos reservados.</span>
        <span className="hidden sm:inline text-cyan-800">|</span>
        <ContadorVisitas />
      </footer>

    </div>
  );
}