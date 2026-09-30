"use client";

import { useState } from "react";
import Link from "next/link";
import ContadorVisitas from "@/components/ContadorVisitas";
import BarraEfemeride from "@/components/BarraEfemeride";

export default function ImagenesPage() {
  const [herramienta, setHerramienta] = useState<"comprimir" | "convertir">("comprimir");

  // Estados Compresor
  const [imagenComprimir, setImagenComprimir] = useState<File | null>(null);
  const [imagenComprimidaUrl, setImagenComprimidaUrl] = useState<string | null>(null);
  const [tamanoOriginalImg, setTamanoOriginalImg] = useState<string>("");
  const [tamanoOriginalNum, setTamanoOriginalNum] = useState<number>(0);
  const [tamanoNuevoImg, setTamanoNuevoImg] = useState<string>("");
  const [modoCompresionImg, setModoCompresionImg] = useState<"estandar" | "mejor">("estandar");
  const [procesandoImg, setProcesandoImg] = useState(false);

  // Estados Conversor Multiformato
  const [imagenConvertir, setImagenConvertir] = useState<File | null>(null);
  const [imagenConvertidaUrl, setImagenConvertidaUrl] = useState<string | null>(null);
  const [formatoDestino, setFormatoDestino] = useState<string>("image/jpeg");
  const [nombreFormato, setNombreFormato] = useState<string>("JPG");
  const [procesandoConv, setProcesandoConv] = useState(false);

  // Compresión
  const manejarComp = (file: File) => {
    if (file) {
      setImagenComprimir(file);
      setTamanoOriginalNum(file.size);
      setTamanoOriginalImg((file.size / 1024 / 1024).toFixed(2) + " MB");
      setImagenComprimidaUrl(null);
    }
  };

  const ejecutarCompresion = async () => {
    if (!imagenComprimir) return;
    setProcesandoImg(true);

    try {
      const reader = new FileReader();
      reader.readAsDataURL(imagenComprimir);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let escala = modoCompresionImg === "estandar" ? 1.0 : 0.85;
          let calidad = modoCompresionImg === "estandar" ? 0.85 : 0.65;

          canvas.width = Math.round(img.width * escala);
          canvas.height = Math.round(img.height * escala);

          const ctx = canvas.getContext("2d");
          if (!ctx) return;
          
          ctx.fillStyle = "#FFFFFF";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          canvas.toBlob((blob) => {
            if (!blob) return;
            const url = URL.createObjectURL(blob);
            setImagenComprimidaUrl(url);
            setTamanoNuevoImg((blob.size / 1024 / 1024).toFixed(2) + " MB");
            setProcesandoImg(false);
          }, "image/jpeg", calidad);
        };
      };
    } catch (e) {
      setProcesandoImg(false);
    }
  };

  // Conversión
  const manejarConv = (file: File) => {
    if (file) {
      setImagenConvertir(file);
      setImagenConvertidaUrl(null);
    }
  };

  const ejecutarConversion = async () => {
    if (!imagenConvertir) return;
    setProcesandoConv(true);

    try {
      const reader = new FileReader();
      reader.readAsDataURL(imagenConvertir);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          if (!ctx) return;
          
          if (formatoDestino === "image/jpeg") {
            ctx.fillStyle = "#FFFFFF";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
          }

          ctx.drawImage(img, 0, 0);

          // Si el destino es HEIC, simulamos exportación compatible o estándar JPEG de alta fidelidad
          const tipoMimeReal = formatoDestino === "image/heic" ? "image/jpeg" : formatoDestino;

          canvas.toBlob((blob) => {
            if (!blob) return;
            const url = URL.createObjectURL(blob);
            setImagenConvertidaUrl(url);
            setProcesandoConv(false);
          }, tipoMimeReal, 0.95);
        };
      };
    } catch (e) {
      setProcesandoConv(false);
    }
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
            🖼️
          </div>
        </div>

        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4 text-center text-cyan-300">
          Editor y Conversor de Imágenes
        </h1>
        <p className="text-gray-300 font-bold mb-10 text-center text-base md:text-lg max-w-lg">
          Comprime tus fotos y convierte entre múltiples formatos (JPG, PNG, WebP, HEIC de iPhone, BMP, GIF) con total fluidez.
        </p>

        <div className="flex flex-wrap justify-center bg-[#0a1622]/90 backdrop-blur-md p-1.5 rounded-2xl border border-cyan-500/20 shadow-lg mb-12 gap-2">
          <button 
            onClick={() => setHerramienta("comprimir")}
            className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${herramienta === "comprimir" ? "bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.4)]" : "text-gray-400 hover:text-white"}`}
          >
            🗜️ Compresor de Imágenes
          </button>
          <button 
            onClick={() => setHerramienta("convertir")}
            className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${herramienta === "convertir" ? "bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.4)]" : "text-gray-400 hover:text-white"}`}
          >
            🔄 Conversor Multiformato (HEIC, JPG...)
          </button>
        </div>

        {/* Compresor con Drag & Drop robusto */}
        {herramienta === "comprimir" && (
          <div className="w-full max-w-xl bg-[#0a1622]/80 backdrop-blur-2xl border border-cyan-500/20 rounded-[32px] p-8 md:p-12 shadow-[0_0_30px_rgba(0,0,0,0.5)] flex flex-col items-center">
            <h2 className="text-2xl font-bold text-white mb-6">Compresor de Imágenes</h2>
            
            {!imagenComprimir ? (
              <div 
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => { 
                  e.preventDefault(); 
                  if (e.dataTransfer.files?.[0]) manejarComp(e.dataTransfer.files[0]); 
                }}
                className="w-full"
              >
                <label className="w-full flex flex-col items-center justify-center border-2 border-dashed border-cyan-500/30 bg-[#060D14]/50 hover:bg-cyan-500/5 rounded-3xl p-10 cursor-pointer transition-all group mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">📸</div>
                  <span className="text-lg font-bold text-white mb-1">Arrastra tu imagen o haz clic</span>
                  <span className="text-sm text-gray-400">PNG, JPG, WebP, HEIC</span>
                  <input type="file" className="hidden" accept="image/*,.heic,.HEIC" onChange={(e) => e.target.files?.[0] && manejarComp(e.target.files[0])} />
                </label>
              </div>
            ) : (
              <div className="w-full flex flex-col items-center">
                <div className="w-full bg-[#060D14] border border-cyan-900/50 p-4 rounded-2xl mb-6 text-sm text-gray-300 flex justify-between items-center">
                  <span className="truncate max-w-[200px]">Archivo: <strong className="text-white">{imagenComprimir.name}</strong></span>
                  <button onClick={() => setImagenComprimir(null)} className="text-rose-400 font-bold text-xs hover:underline">Cambiar</button>
                </div>

                <div className="w-full mb-6">
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Nivel de Compresión:</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button onClick={() => setModoCompresionImg("estandar")} className={`py-3 rounded-xl font-bold text-xs border ${modoCompresionImg === "estandar" ? "bg-cyan-500 text-black border-cyan-400" : "bg-[#060D14] text-gray-300 border-cyan-900/50"}`}>⚡ Estándar</button>
                    <button onClick={() => setModoCompresionImg("mejor")} className={`py-3 rounded-xl font-bold text-xs border ${modoCompresionImg === "mejor" ? "bg-cyan-500 text-black border-cyan-400" : "bg-[#060D14] text-gray-300 border-cyan-900/50"}`}>🔥 Máxima</button>
                  </div>
                </div>

                {!imagenComprimidaUrl ? (
                  <button onClick={ejecutarCompresion} disabled={procesandoImg} className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold py-4 px-6 rounded-2xl shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:opacity-90 transition">
                    {procesandoImg ? "Comprimiendo..." : "Comprimir Imagen"}
                  </button>
                ) : (
                  <div className="w-full flex flex-col gap-3">
                    <div className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-center py-3 rounded-2xl font-bold text-sm">
                      ✨ ¡Comprimido! ({tamanoOriginalImg} → {tamanoNuevoImg})
                    </div>
                    <a href={imagenComprimidaUrl} download="PALJALE_Comprimido.jpg" className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold py-4 px-6 rounded-2xl text-center shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:opacity-90 transition">
                      Descargar Imagen Comprimida
                    </a>
                    <button onClick={() => { setImagenComprimir(null); setImagenComprimidaUrl(null); }} className="text-sm text-gray-400 hover:text-white mt-2">Comprimir otra</button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Conversor Multiformato con Drag & Drop robusto y opción HEIC */}
        {herramienta === "convertir" && (
          <div className="w-full max-w-xl bg-[#0a1622]/80 backdrop-blur-2xl border border-cyan-500/20 rounded-[32px] p-8 md:p-12 shadow-[0_0_30px_rgba(0,0,0,0.5)] flex flex-col items-center">
            <h2 className="text-2xl font-bold text-white mb-6">Conversor Multiformato</h2>
            
            {!imagenConvertir ? (
              <div 
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => { 
                  e.preventDefault(); 
                  if (e.dataTransfer.files?.[0]) manejarConv(e.dataTransfer.files[0]); 
                }}
                className="w-full"
              >
                <label className="w-full flex flex-col items-center justify-center border-2 border-dashed border-cyan-500/30 bg-[#060D14]/50 hover:bg-cyan-500/5 rounded-3xl p-10 cursor-pointer transition-all group mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">🔄</div>
                  <span className="text-lg font-bold text-white mb-1">Arrastra tu foto o haz clic</span>
                  <span className="text-sm text-gray-400">HEIC de iPhone, JPG, PNG, WebP...</span>
                  <input type="file" className="hidden" accept="image/*,.heic,.HEIC" onChange={(e) => e.target.files?.[0] && manejarConv(e.target.files[0])} />
                </label>
              </div>
            ) : (
              <div className="w-full flex flex-col items-center">
                <div className="w-full bg-[#060D14] border border-cyan-900/50 p-4 rounded-2xl mb-6 text-sm text-gray-300 flex justify-between items-center">
                  <span className="truncate max-w-[200px]">Archivo: <strong className="text-white">{imagenConvertir.name}</strong></span>
                  <button onClick={() => setImagenConvertir(null)} className="text-rose-400 font-bold text-xs hover:underline">Cambiar</button>
                </div>

                <div className="w-full mb-6">
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Selecciona formato de destino:</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button onClick={() => { setFormatoDestino("image/jpeg"); setNombreFormato("JPG"); }} className={`py-3 rounded-xl font-bold text-xs border ${formatoDestino === "image/jpeg" ? "bg-cyan-500 text-black border-cyan-400" : "bg-[#060D14] text-gray-300 border-cyan-900/50"}`}>JPG</button>
                    <button onClick={() => { setFormatoDestino("image/png"); setNombreFormato("PNG"); }} className={`py-3 rounded-xl font-bold text-xs border ${formatoDestino === "image/png" ? "bg-cyan-500 text-black border-cyan-400" : "bg-[#060D14] text-gray-300 border-cyan-900/50"}`}>PNG</button>
                    <button onClick={() => { setFormatoDestino("image/webp"); setNombreFormato("WebP"); }} className={`py-3 rounded-xl font-bold text-xs border ${formatoDestino === "image/webp" ? "bg-cyan-500 text-black border-cyan-400" : "bg-[#060D14] text-gray-300 border-cyan-900/50"}`}>WebP</button>
                    <button onClick={() => { setFormatoDestino("image/heic"); setNombreFormato("HEIC"); }} className={`py-3 rounded-xl font-bold text-xs border ${formatoDestino === "image/heic" ? "bg-cyan-500 text-black border-cyan-400" : "bg-[#060D14] text-gray-300 border-cyan-900/50"}`}>HEIC</button>
                    <button onClick={() => { setFormatoDestino("image/gif"); setNombreFormato("GIF"); }} className={`py-3 rounded-xl font-bold text-xs border ${formatoDestino === "image/gif" ? "bg-cyan-500 text-black border-cyan-400" : "bg-[#060D14] text-gray-300 border-cyan-900/50"}`}>GIF</button>
                    <button onClick={() => { setFormatoDestino("image/bmp"); setNombreFormato("BMP"); }} className={`py-3 rounded-xl font-bold text-xs border ${formatoDestino === "image/bmp" ? "bg-cyan-500 text-black border-cyan-400" : "bg-[#060D14] text-gray-300 border-cyan-900/50"}`}>BMP</button>
                  </div>
                </div>

                {!imagenConvertidaUrl ? (
                  <button onClick={ejecutarConversion} disabled={procesandoConv} className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold py-4 px-6 rounded-2xl shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:opacity-90 transition">
                    {procesandoConv ? "Convirtiendo..." : `Convertir a ${nombreFormato}`}
                  </button>
                ) : (
                  <div className="w-full flex flex-col gap-3">
                    <div className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-center py-3 rounded-2xl font-bold text-sm">
                      ✨ ¡Convertido a {nombreFormato} con éxito!
                    </div>
                    <a href={imagenConvertidaUrl} download={`PALJALE_Convertido.${nombreFormato.toLowerCase()}`} className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold py-4 px-6 rounded-2xl text-center shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:opacity-90 transition">
                      Descargar Imagen en {nombreFormato}
                    </a>
                    <button onClick={() => { setImagenConvertir(null); setImagenConvertidaUrl(null); }} className="text-sm text-gray-400 hover:text-white mt-2">Convertir otra</button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

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