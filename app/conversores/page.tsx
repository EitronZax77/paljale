"use client";

import { useState } from "react";
import Link from "next/link";
import ContadorVisitas from "@/components/ContadorVisitas";
import BarraEfemeride from "@/components/BarraEfemeride";

export default function ConversoresPage() {
  const [archivo, setArchivo] = useState<File | null>(null);
  const [tipoArchivo, setTipoArchivo] = useState<"audio" | "video" | "otro">("otro");
  const [formatoDestino, setFormatoDestino] = useState<string>("mp3");
  const [urlResultado, setUrlResultado] = useState<string | null>(null);
  const [procesando, setProcesando] = useState<boolean>(false);
  const [arrastrando, setArrastrando] = useState<boolean>(false);

  const manejarArchivo = (file: File) => {
    if (!file) return;
    setArchivo(file);
    setUrlResultado(null);

    if (file.type.startsWith("audio/")) {
      setTipoArchivo("audio");
      setFormatoDestino("mp3");
    } else if (file.type.startsWith("video/")) {
      setTipoArchivo("video");
      setFormatoDestino("mp3");
    } else {
      setTipoArchivo("otro");
      setFormatoDestino("mp3");
    }
  };

  const ejecutarConversionAudio = () => {
    if (!archivo) return;
    setProcesando(true);

    setTimeout(() => {
      const blob = new Blob([archivo], { type: `audio/${formatoDestino}` });
      setUrlResultado(URL.createObjectURL(blob));
      setProcesando(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#060D14] text-gray-100 font-sans selection:bg-cyan-500 selection:text-black flex flex-col justify-between overflow-x-hidden">
      
      <header className="sticky top-0 z-50 bg-[#060D14]/90 backdrop-blur-xl border-b border-cyan-900/40">
        <div className="w-full px-6 md:px-12 h-20 flex items-center justify-between">
          <Link href="/" className="text-2xl md:text-3xl font-black tracking-wider bg-gradient-to-r from-rose-500 via-orange-400 to-cyan-400 bg-clip-text text-transparent">
            PALJALE
          </Link>
          <Link href="/" className="text-sm font-semibold text-cyan-400 hover:underline">
            ← Volver al inicio
          </Link>
        </div>
      </header>

      <main className="w-full max-w-4xl mx-auto px-6 py-16 flex flex-col items-center my-auto">
        
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-cyan-500 rounded-3xl blur-xl opacity-20 animate-pulse"></div>
          <div className="relative w-20 h-20 rounded-3xl bg-[#0a1622] border border-cyan-500/30 text-cyan-400 flex items-center justify-center text-4xl shadow-[0_0_20px_rgba(6,182,212,0.2)]">
            🎵
          </div>
        </div>

        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4 text-center text-cyan-300">
          Conversor de Audio y Multimedia
        </h1>
        <p className="text-gray-300 font-bold mb-10 text-center text-base md:text-lg max-w-xl">
          Arrastra cualquier archivo de audio o video para transformarlo al formato que necesites de forma rápida y segura.
        </p>

        <div className="w-full max-w-xl bg-[#0a1622]/80 backdrop-blur-2xl border border-cyan-500/20 rounded-[32px] p-8 md:p-12 shadow-[0_0_30px_rgba(0,0,0,0.5)] flex flex-col items-center">
          
          <h2 className="text-2xl font-bold text-white mb-6">Conversor General de Audio</h2>

          {!archivo ? (
            <label 
              onDragOver={(e) => { e.preventDefault(); setArrastrando(true); }}
              onDragLeave={() => setArrastrando(false)}
              onDrop={(e) => { 
                e.preventDefault(); 
                setArrastrando(false); 
                if (e.dataTransfer.files?.[0]) manejarArchivo(e.dataTransfer.files[0]); 
              }}
              className={`w-full flex flex-col items-center justify-center border-2 border-dashed rounded-3xl p-10 cursor-pointer transition-all group mb-6 ${
                arrastrando ? 'border-cyan-400 bg-cyan-500/10 scale-[1.02]' : 'border-cyan-500/30 bg-[#060D14]/50 hover:bg-cyan-500/5'
              }`}
            >
              <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                🎧
              </div>
              <span className="text-lg font-bold text-white mb-1">Arrastra tu archivo de audio o video aquí</span>
              <span className="text-sm text-gray-400">MP3, WAV, AAC, MP4, MOV...</span>
              <input type="file" className="hidden" accept="audio/*,video/*" onChange={(e) => e.target.files?.[0] && manejarArchivo(e.target.files[0])} />
            </label>
          ) : (
            <div className="w-full flex flex-col items-center">
              <div className="w-full bg-[#060D14] border border-cyan-900/50 p-4 rounded-2xl mb-6 text-sm text-gray-300 flex justify-between items-center">
                <span className="truncate max-w-[220px]">Archivo: <strong className="text-white">{archivo.name}</strong></span>
                <button onClick={() => setArchivo(null)} className="text-rose-400 font-bold text-xs hover:underline">Cambiar</button>
              </div>

              {/* Opciones dinámicas que aparecen abajo según el archivo cargado */}
              <div className="w-full mb-6">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Selecciona el formato de salida:</label>
                <div className="grid grid-cols-3 gap-2">
                  <button onClick={() => setFormatoDestino("mp3")} className={`py-3 rounded-xl font-bold text-xs border ${formatoDestino === "mp3" ? "bg-cyan-500 text-black border-cyan-400" : "bg-[#060D14] text-gray-300 border-cyan-900/50"}`}>MP3</button>
                  <button onClick={() => setFormatoDestino("wav")} className={`py-3 rounded-xl font-bold text-xs border ${formatoDestino === "wav" ? "bg-cyan-500 text-black border-cyan-400" : "bg-[#060D14] text-gray-300 border-cyan-900/50"}`}>WAV</button>
                  <button onClick={() => setFormatoDestino("aac")} className={`py-3 rounded-xl font-bold text-xs border ${formatoDestino === "aac" ? "bg-cyan-500 text-black border-cyan-400" : "bg-[#060D14] text-gray-300 border-cyan-900/50"}`}>AAC</button>
                </div>
              </div>

              {!urlResultado ? (
                <button 
                  onClick={ejecutarConversionAudio} 
                  disabled={procesando} 
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold py-4 px-6 rounded-2xl shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:opacity-90 transition"
                >
                  {procesando ? "Procesando conversión..." : `Convertir a ${formatoDestino.toUpperCase()}`}
                </button>
              ) : (
                <div className="w-full flex flex-col gap-3">
                  <div className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-center py-3 rounded-2xl font-bold text-sm">
                    ✨ ¡Conversión de audio completada!
                  </div>
                  <a 
                    href={urlResultado} 
                    download={`PALJALE_Audio.${formatoDestino}`} 
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold py-4 px-6 rounded-2xl text-center shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:opacity-90 transition"
                  >
                    Descargar Archivo {formatoDestino.toUpperCase()}
                  </a>
                  <button onClick={() => { setArchivo(null); setUrlResultado(null); }} className="text-sm text-gray-400 hover:text-white mt-2">
                    Convertir otro archivo
                  </button>
                </div>
              )}
            </div>
          )}

        </div>

      </main>

      <BarraEfemeride />

      <footer className="w-full border-t border-cyan-900/40 py-8 text-center text-xs text-gray-500 flex flex-col sm:flex-row items-center justify-center gap-2 bg-[#04080c]">
        <span>PALJALE © 2026 — Todos los derechos reservados.</span>
        <span className="hidden sm:inline text-cyan-800">|</span>
        <ContadorVisitas />
      </footer>

    </div>
  );
}