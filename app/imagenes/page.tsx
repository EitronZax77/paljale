"use client";

import { useState } from "react";
import Link from "next/link";

export default function ImagenesPage() {
  const [herramienta, setHerramienta] = useState<"comprimir" | "convertir">("comprimir");

  // Estados para Compresor de Imágenes
  const [imagenComprimir, setImagenComprimir] = useState<File | null>(null);
  const [imagenComprimidaUrl, setImagenComprimidaUrl] = useState<string | null>(null);
  const [tamanoOriginalImg, setTamanoOriginalImg] = useState<string>("");
  const [tamanoOriginalNum, setTamanoOriginalNum] = useState<number>(0);
  const [tamanoNuevoImg, setTamanoNuevoImg] = useState<string>("");
  const [modoCompresionImg, setModoCompresionImg] = useState<"estandar" | "mejor">("estandar");
  const [procesandoImg, setProcesandoImg] = useState(false);
  const [arrastrandoComprimir, setArrastrandoComprimir] = useState(false);

  // Estados para Conversor de Formatos
  const [imagenConvertir, setImagenConvertir] = useState<File | null>(null);
  const [imagenConvertidaUrl, setImagenConvertidaUrl] = useState<string | null>(null);
  const [formatoDestino, setFormatoDestino] = useState<string>("image/jpeg");
  const [nombreFormato, setNombreFormato] = useState<string>("JPG");
  const [procesandoConv, setProcesandoConv] = useState(false);
  const [arrastrandoConvertir, setArrastrandoConvertir] = useState(false);

  // --- LÓGICA COMPRESOR ---
  const manejarArchivoComprimir = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      setImagenComprimir(file);
      setTamanoOriginalNum(file.size);
      setTamanoOriginalImg((file.size / 1024 / 1024).toFixed(2) + " MB");
      setImagenComprimidaUrl(null);
    } else {
      alert("Por favor selecciona un archivo de imagen válido.");
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
          let escala = 1.0;
          let calidad = 0.85;

          if (modoCompresionImg === "estandar") {
            escala = 1.0;
            calidad = 0.85;
          } else {
            escala = 0.85;
            calidad = 0.65;
          }

          canvas.width = Math.round(img.width * escala);
          canvas.height = Math.round(img.height * escala);

          const ctx = canvas.getContext("2d");
          if (!ctx) return;
          
          ctx.fillStyle = "#FFFFFF";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          canvas.toBlob(
            (blob) => {
              if (!blob) return;
              
              let blobFinal = blob;
              if (blobFinal.size >= tamanoOriginalNum && modoCompresionImg === "estandar") {
                canvas.toBlob((b2) => {
                  if (b2) blobFinal = b2;
                  finalizarCompresion(blobFinal);
                }, "image/jpeg", 0.75);
                return;
              }

              finalizarCompresion(blobFinal);
            },
            "image/jpeg",
            calidad
          );
        };
      };
    } catch (e) {
      console.error(e);
      alert("Error al comprimir la imagen.");
      setProcesandoImg(false);
    }
  };

  const finalizarCompresion = (blob: Blob) => {
    const url = URL.createObjectURL(blob);
    setImagenComprimidaUrl(url);
    setTamanoNuevoImg((blob.size / 1024 / 1024).toFixed(2) + " MB");
    setProcesandoImg(false);
  };

  // --- LÓGICA CONVERSOR DE FORMATOS ---
  const manejarArchivoConvertir = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      setImagenConvertir(file);
      setImagenConvertidaUrl(null);
    } else {
      alert("Por favor selecciona un archivo de imagen válido.");
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

          canvas.toBlob(
            (blob) => {
              if (!blob) return;
              const url = URL.createObjectURL(blob);
              setImagenConvertidaUrl(url);
              setProcesandoConv(false);
            },
            formatoDestino,
            0.92
          );
        };
      };
    } catch (e) {
      console.error(e);
      alert("Error al convertir la imagen.");
      setProcesandoConv(false);
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
            🖼️
          </div>
        </div>

        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4 text-center drop-shadow-[0_0_15px_rgba(6,182,212,0.6)] text-cyan-300">
          Editor y Procesador de Imágenes
        </h1>
        <p className="text-gray-300 font-bold mb-10 text-center text-base md:text-lg max-w-lg">
          Reduce el peso de tus fotos o cámbialas de formato al instante con precisión corporativa.
        </p>

        {/* Selector directo de Herramientas */}
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
            🔄 Conversor de Formatos
          </button>
        </div>

        {/* ================= SECCIÓN COMPRESOR ================= */}
        {herramienta === "comprimir" && (
          <div className="w-full max-w-xl bg-[#0a1622]/80 backdrop-blur-2xl border border-cyan-500/20 rounded-[32px] p-8 md:p-12 shadow-[0_0_30px_rgba(0,0,0,0.5)] flex flex-col items-center">
            <h2 className="text-2xl font-bold text-white mb-6">Compresor de Imágenes</h2>
            
            {!imagenComprimir ? (
              <label 
                onDragOver={(e) => { e.preventDefault(); setArrastrandoComprimir(true); }}
                onDragLeave={() => setArrastrandoComprimir(false)}
                onDrop={(e) => { 
                  e.preventDefault(); 
                  setArrastrandoComprimir(false); 
                  if (e.dataTransfer.files?.[0]) manejarArchivoComprimir(e.dataTransfer.files[0]); 
                }}
                className={`w-full flex flex-col items-center justify-center border-2 border-dashed rounded-3xl p-10 cursor-pointer transition-all group mb-6 ${
                  arrastrandoComprimir ? 'border-cyan-400 bg-cyan-500/10 scale-[1.02]' : 'border-cyan-500/30 bg-[#060D14]/50 hover:bg-cyan-500/5'
                }`}
              >
                <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">📸</div>
                <span className="text-lg font-bold text-white mb-1">Arrastra tu imagen o haz clic</span>
                <span className="text-sm text-gray-400">PNG, JPG, WebP</span>
                <input type="file" className="hidden" accept="image/*" onChange={(e) => e.target.files?.[0] && manejarArchivoComprimir(e.target.files[0])} />
              </label>
            ) : (
              <div className="w-full flex flex-col items-center">
                <div className="w-full bg-[#060D14] border border-cyan-900/50 p-4 rounded-2xl mb-6 text-sm text-gray-300 flex justify-between items-center">
                  <span className="truncate max-w-[200px]">Archivo: <strong className="text-white">{imagenComprimir.name}</strong></span>
                  <span className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 px-2.5 py-1 rounded-lg font-semibold">{tamanoOriginalImg}</span>
                </div>

                <div className="w-full mb-6">
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Nivel de Compresión:</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button 
                      onClick={() => setModoCompresionImg("estandar")} 
                      className={`py-3 rounded-xl font-bold text-xs border transition-all ${modoCompresionImg === "estandar" ? "bg-cyan-500 text-black border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]" : "bg-[#060D14] text-gray-300 border-cyan-900/50 hover:border-cyan-500/30"}`}
                    >
                      ⚡ Estándar (Calidad Original)
                    </button>
                    <button 
                      onClick={() => setModoCompresionImg("mejor")} 
                      className={`py-3 rounded-xl font-bold text-xs border transition-all ${modoCompresionImg === "mejor" ? "bg-cyan-500 text-black border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]" : "bg-[#060D14] text-gray-300 border-cyan-900/50 hover:border-cyan-500/30"}`}
                    >
                      🔥 Mejor Compresión (Menor Peso)
                    </button>
                  </div>
                </div>

                {modoCompresionImg === "mejor" && (
                  <div className="w-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs p-3 rounded-2xl mb-6 text-center">
                    💡 <strong>Aviso:</strong> Reduce significativamente el peso manteniendo la imagen clara y perfectamente visible.
                  </div>
                )}

                {!imagenComprimidaUrl ? (
                  <button onClick={ejecutarCompresion} disabled={procesandoImg} className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold py-4 px-6 rounded-2xl shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:opacity-90 transition">
                    {procesandoImg ? "Comprimiendo..." : "Comprimir Imagen Ahora"}
                  </button>
                ) : (
                  <div className="w-full flex flex-col gap-3">
                    <div className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-center py-3 rounded-2xl font-bold text-sm">
                      ✨ ¡Imagen comprimida con éxito! ({tamanoOriginalImg} → {tamanoNuevoImg})
                    </div>
                    <a href={imagenComprimidaUrl} download={`PALJALE_Comprimido.jpg`} className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold py-4 px-6 rounded-2xl text-center shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:opacity-90 transition">
                      Descargar Imagen Comprimida
                    </a>
                    <button onClick={() => { setImagenComprimir(null); setImagenComprimidaUrl(null); }} className="text-sm text-gray-400 hover:text-white mt-2">Comprimir otra imagen</button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ================= SECCIÓN CONVERSOR DE FORMATOS ================= */}
        {herramienta === "convertir" && (
          <div className="w-full max-w-xl bg-[#0a1622]/80 backdrop-blur-2xl border border-cyan-500/20 rounded-[32px] p-8 md:p-12 shadow-[0_0_30px_rgba(0,0,0,0.5)] flex flex-col items-center">
            <h2 className="text-2xl font-bold text-white mb-6">Conversor de Formatos</h2>
            
            {!imagenConvertir ? (
              <label 
                onDragOver={(e) => { e.preventDefault(); setArrastrandoConvertir(true); }}
                onDragLeave={() => setArrastrandoConvertir(false)}
                onDrop={(e) => { 
                  e.preventDefault(); 
                  setArrastrandoConvertir(false); 
                  if (e.dataTransfer.files?.[0]) manejarArchivoConvertir(e.dataTransfer.files[0]); 
                }}
                className={`w-full flex flex-col items-center justify-center border-2 border-dashed rounded-3xl p-10 cursor-pointer transition-all group mb-6 ${
                  arrastrandoConvertir ? 'border-cyan-400 bg-cyan-500/10 scale-[1.02]' : 'border-cyan-500/30 bg-[#060D14]/50 hover:bg-cyan-500/5'
                }`}
              >
                <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">🔄</div>
                <span className="text-lg font-bold text-white mb-1">Arrastra tu imagen o haz clic</span>
                <span className="text-sm text-gray-400">Cualquier formato de imagen</span>
                <input type="file" className="hidden" accept="image/*" onChange={(e) => e.target.files?.[0] && manejarArchivoConvertir(e.target.files[0])} />
              </label>
            ) : (
              <div className="w-full flex flex-col items-center">
                <div className="w-full bg-[#060D14] border border-cyan-900/50 p-4 rounded-2xl mb-6 text-sm text-gray-300 flex justify-between items-center">
                  <span className="truncate max-w-[240px]">Archivo: <strong className="text-white">{imagenConvertir.name}</strong></span>
                  <button onClick={() => setImagenConvertir(null)} className="text-rose-400 font-bold text-xs hover:underline">Cambiar</button>
                </div>

                <div className="w-full mb-6">
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Convertir a formato:</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button 
                      onClick={() => { setFormatoDestino("image/jpeg"); setNombreFormato("JPG"); }} 
                      className={`py-3 rounded-xl font-bold text-xs border ${formatoDestino === "image/jpeg" ? "bg-cyan-500 text-black border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]" : "bg-[#060D14] text-gray-300 border-cyan-900/50"}`}
                    >
                      JPG
                    </button>
                    <button 
                      onClick={() => { setFormatoDestino("image/png"); setNombreFormato("PNG"); }} 
                      className={`py-3 rounded-xl font-bold text-xs border ${formatoDestino === "image/png" ? "bg-cyan-500 text-black border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]" : "bg-[#060D14] text-gray-300 border-cyan-900/50"}`}
                    >
                      PNG
                    </button>
                    <button 
                      onClick={() => { setFormatoDestino("image/webp"); setNombreFormato("WEBP"); }} 
                      className={`py-3 rounded-xl font-bold text-xs border ${formatoDestino === "image/webp" ? "bg-cyan-500 text-black border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]" : "bg-[#060D14] text-gray-300 border-cyan-900/50"}`}
                    >
                      WebP
                    </button>
                  </div>
                </div>

                {!imagenConvertidaUrl ? (
                  <button onClick={ejecutarConversion} disabled={procesandoConv} className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold py-4 px-6 rounded-2xl shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:opacity-90 transition">
                    {procesandoConv ? "Convirtiendo..." : `Convertir a ${nombreFormato}`}
                  </button>
                ) : (
                  <div className="w-full flex flex-col gap-3">
                    <div className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-center py-3 rounded-2xl font-bold text-sm">
                      ✨ ¡Imagen convertida a {nombreFormato} con éxito!
                    </div>
                    <a href={imagenConvertidaUrl} download={`PALJALE_Convertido.${nombreFormato.toLowerCase()}`} className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold py-4 px-6 rounded-2xl text-center shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:opacity-90 transition">
                      Descargar Imagen en {nombreFormato}
                    </a>
                    <button onClick={() => { setImagenConvertir(null); setImagenConvertidaUrl(null); }} className="text-sm text-gray-400 hover:text-white mt-2">Convertir otra imagen</button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

      </main>

      {/* Pie de página tecnológico */}
      <footer className="w-full border-t border-cyan-900/40 py-8 text-center text-xs text-gray-500 flex flex-col sm:flex-row items-center justify-center gap-2 bg-[#04080c]">
        <span>PALJALE © 2026 — Todos los derechos reservados.</span>
        <span className="hidden sm:inline text-cyan-800">|</span>
        <span className="bg-cyan-950/50 px-3 py-1 rounded-full border border-cyan-900/50 text-cyan-400 font-semibold">
          Visitas totales: 128
        </span>
      </footer>

    </div>
  );
}