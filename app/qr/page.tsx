"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { QRCodeCanvas } from "qrcode.react";
import BarraEfemeride from "@/components/BarraEfemeride";

export default function QrPage() {
  const [textoQr, setTextoQr] = useState<string>("");
  const qrRef = useRef<HTMLDivElement>(null);

  const descargarQr = () => {
    if (!qrRef.current) return;

    const canvas = qrRef.current.querySelector("canvas");
    if (!canvas) return;

    const url = canvas.toDataURL("image/png");
    const enlace = document.createElement("a");

    enlace.href = url;
    enlace.download = "PALJALE_Codigo_QR.png";
    enlace.click();
  };

  const compartirQr = async () => {
    if (!qrRef.current) return;

    const canvas = qrRef.current.querySelector("canvas");
    if (!canvas) return;

    try {
      const blob = await new Promise<Blob | null>((resolve) => {
        canvas.toBlob(resolve, "image/png");
      });

      if (!blob) {
        throw new Error("No se pudo generar la imagen del código QR.");
      }

      const archivo = new File(
        [blob],
        "PALJALE_Codigo_QR.png",
        { type: "image/png" }
      );

      if (
        navigator.share &&
        navigator.canShare?.({ files: [archivo] })
      ) {
        await navigator.share({
          title: "Código QR de PALJALE",
          text: "Código QR generado con PALJALE.",
          files: [archivo],
        });

        return;
      }

      if (navigator.share) {
        await navigator.share({
          title: "Código QR de PALJALE",
          text: `Código QR generado para: ${
            textoQr.trim() || "PALJALE"
          }`,
          url: window.location.href,
        });

        return;
      }

      if (navigator.clipboard) {
        await navigator.clipboard.writeText(
          textoQr.trim() || window.location.href
        );

        alert("Contenido copiado al portapapeles.");
        return;
      }

      alert("Tu navegador no permite compartir este código QR.");
    } catch (error) {
      console.error("Error al compartir código QR:", error);
      alert("No se pudo compartir el código QR.");
    }
  };

  const valorQr =
    textoQr.trim() !== ""
      ? textoQr.trim()
      : "https://paljale.vercel.app/";

  return (
    <div className="min-h-screen bg-[#060D14] text-gray-100 font-sans selection:bg-cyan-500 selection:text-black flex flex-col justify-between overflow-x-hidden">
      <header className="sticky top-0 z-50 bg-[#060D14]/90 backdrop-blur-xl border-b border-cyan-900/40">
        <div className="w-full px-6 md:px-12 h-20 flex items-center justify-between">
          <Link
            href="/"
            className="text-2xl md:text-3xl font-black tracking-wider bg-gradient-to-r from-rose-500 via-orange-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(244,63,94,0.3)]"
          >
            PALJALE
          </Link>

          <Link
            href="/"
            className="text-sm font-semibold text-cyan-400 hover:underline"
          >
            ← Volver al inicio
          </Link>
        </div>
      </header>

      <main className="w-full max-w-4xl mx-auto px-6 py-16 flex flex-col items-center my-auto">
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-cyan-500 rounded-3xl blur-xl opacity-20 animate-pulse" />

          <div className="relative w-20 h-20 rounded-3xl bg-[#0a1622] border border-cyan-500/30 text-cyan-400 flex items-center justify-center text-4xl shadow-[0_0_20px_rgba(6,182,212,0.2)]">
            🔲
          </div>
        </div>

        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4 text-center drop-shadow-[0_0_15px_rgba(6,182,212,0.6)] text-cyan-300">
          Generador de Código QR
        </h1>

        <p className="text-gray-300 font-bold mb-10 text-center text-base md:text-lg max-w-lg">
          Escribe un enlace o texto y genera un código QR listo para
          descargar o compartir.
        </p>

        <div className="w-full max-w-xl bg-[#0a1622]/80 backdrop-blur-2xl border border-cyan-500/20 rounded-[32px] p-8 md:p-12 shadow-[0_0_30px_rgba(0,0,0,0.5)] flex flex-col items-center">
          <div className="w-full mb-6">
            <label
              htmlFor="qr-content"
              className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2"
            >
              Ingresa tu enlace o texto
            </label>

            <input
              id="qr-content"
              type="text"
              value={textoQr}
              onChange={(event) => setTextoQr(event.target.value)}
              placeholder="Ejemplo: https://mi-sitio.com"
              className="w-full py-3.5 px-4 rounded-2xl border border-cyan-900/50 bg-[#060D14] font-medium text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-sm"
            />
          </div>

          <div
            ref={qrRef}
            className="p-6 bg-white rounded-3xl border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.15)] mb-6 flex items-center justify-center min-h-[224px] min-w-[224px]"
          >
            <QRCodeCanvas
              value={valorQr}
              size={200}
              level="H"
              marginSize={1}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
            <button
              type="button"
              onClick={descargarQr}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold py-4 px-6 rounded-2xl shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:opacity-90 transition"
            >
              Descargar Código QR
            </button>

            <button
              type="button"
              onClick={compartirQr}
              className="w-full bg-[#060D14] border border-cyan-500/30 text-cyan-400 font-bold py-4 px-6 rounded-2xl hover:bg-cyan-500/10 transition shadow-sm"
            >
              Compartir QR 🔗
            </button>
          </div>
        </div>
      </main>

      <BarraEfemeride />

      <footer className="w-full border-t border-cyan-900/40 py-8 text-center text-xs text-gray-500 flex items-center justify-center bg-[#04080c]">
        <span>PALJALE © 2026 — Todos los derechos reservados.</span>
      </footer>
    </div>
  );
}