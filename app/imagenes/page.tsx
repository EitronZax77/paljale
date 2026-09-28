"use client";

import { useState } from "react";

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
            calidad = 0.85; // Mantiene máxima calidad visual sin alterar
          } else {
            escala = 0.85; // Reduce ligeramente las dimensiones para asegurar menor peso
            calidad = 0.65; // Compresión visible pero totalmente nítida y legible
          }

          canvas.width = Math.round(img.width * escala);
          canvas.height = Math.round(img.height * escala);

          const ctx = canvas.getContext("2d");
          if (!ctx) return;
          
          // Fondo blanco para prevenir transparencias oscuras al comprimir PNG a JPG
          ctx.fillStyle = "#FFFFFF";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          // Forzamos siempre a image/jpeg optimizado para garantizar reducción de peso real
          canvas.toBlob(
            (blob) => {
              if (!blob) return;
              
              let blobFinal = blob;
              // Si el archivo comprimido por alguna razón pesa más que el original, aplicamos reducción forzada
              if (blobFinal.size >= tamanoOriginalNum && modoCompresionImg === "estandar") {
                // Generamos una versión estándar real menor
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
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-orange-50 text-gray-900 font-sans selection:bg-rose-600 selection:text-white">
      
      {/* Barra superior */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-rose-100">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="text-sm font-bold text-rose-600 hover:text-rose-800 transition flex items-center gap-2">
            ← Volver al inicio
          </a>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-rose-100 text-rose-700">
            100% Gratis y Seguro
          </span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-14 flex flex-col items-center">
        
        {/* Icono decorativo */}
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-rose-400 rounded-3xl blur-xl opacity-40 animate-pulse"></div>
          <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-tr from-rose-600 to-orange-500 text-white flex items-center justify-center text-4xl shadow-lg shadow-rose-500/30">
            🖼️
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-4 text-center">
          Editor y Procesador de Imágenes
        </h1>
        <p className="text-gray-600 mb-8 text-center text-lg max-w-lg">
          Reduce el peso de tus fotos o cámbialas de formato al instante.
        </p>

        {/* Selector directo de Herramientas */}
        <div className="flex flex-wrap justify-center bg-white/80 backdrop-blur-md p-1.5 rounded-2xl border border-rose-100 shadow-sm mb-10 gap-2">
          <button 
            onClick={() => setHerramienta("comprimir")}
            className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${herramienta === "comprimir" ? "bg-rose-600 text-white shadow-md shadow-rose-600/20" : "text-gray-600 hover:text-gray-900"}`}
          >
            🗜️ Compresor de Imágenes
          </button>
          <button 
            onClick={() => setHerramienta("convertir")}
            className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${herramienta === "convertir" ? "bg-rose-600 text-white shadow-md shadow-rose-600/20" : "text-gray-600 hover:text-gray-900"}`}
          >
            🔄 Conversor de Formatos
          </button>
        </div>

        {/* ================= SECCIÓN COMPRESOR ================= */}
        {herramienta === "comprimir" && (
          <div className="w-full max-w-xl bg-white/90 backdrop-blur-xl border border-rose-100 rounded-[32px] p-8 md:p-12 shadow-xl shadow-rose-900/5 flex flex-col items-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Compresor de Imágenes</h2>
            
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
                  arrastrandoComprimir ? 'border-rose-600 bg-rose-100/50 scale-[1.02]' : 'border-rose-200 bg-rose-50/30 hover:bg-rose-50/60'
                }`}
              >
                <div className="w-16 h-16 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">📸</div>
                <span className="text-lg font-bold text-gray-800 mb-1">Arrastra tu imagen o haz clic</span>
                <span className="text-sm text-gray-400">PNG, JPG, WebP</span>
                <input type="file" className="hidden" accept="image/*" onChange={(e) => e.target.files?.[0] && manejarArchivoComprimir(e.target.files[0])} />
              </label>
            ) : (
              <div className="w-full flex flex-col items-center">
                <div className="w-full bg-rose-50/60 p-4 rounded-2xl mb-6 text-sm text-gray-700 flex justify-between items-center">
                  <span className="truncate max-w-[200px]">Archivo: <strong className="text-gray-900">{imagenComprimir.name}</strong></span>
                  <span className="bg-rose-200/60 px-2.5 py-1 rounded-lg font-semibold text-rose-800">{tamanoOriginalImg}</span>
                </div>

                <div className="w-full mb-6">
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Nivel de Compresión:</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button 
                      onClick={() => setModoCompresionImg("estandar")} 
                      className={`py-3 rounded-xl font-bold text-xs border transition-all ${modoCompresionImg === "estandar" ? "bg-rose-600 text-white border-rose-600 shadow-md shadow-rose-600/20" : "bg-white text-gray-700 border-rose-200 hover:bg-rose-50"}`}
                    >
                      ⚡ Estándar (Calidad Original)
                    </button>
                    <button 
                      onClick={() => setModoCompresionImg("mejor")} 
                      className={`py-3 rounded-xl font-bold text-xs border transition-all ${modoCompresionImg === "mejor" ? "bg-rose-600 text-white border-rose-600 shadow-md shadow-rose-600/20" : "bg-white text-gray-700 border-rose-200 hover:bg-rose-50"}`}
                    >
                      🔥 Mejor Compresión (Menor Peso)
                    </button>
                  </div>
                </div>

                {modoCompresionImg === "mejor" && (
                  <div className="w-full bg-amber-50 border border-amber-200 text-amber-900 text-xs p-3 rounded-2xl mb-6 text-center">
                    💡 <strong>Aviso:</strong> Reduce significativamente el peso manteniendo la imagen clara y perfectamente visible.
                  </div>
                )}

                {!imagenComprimidaUrl ? (
                  <button onClick={ejecutarCompresion} disabled={procesandoImg} className="w-full bg-gradient-to-r from-rose-600 to-orange-600 text-white font-bold py-4 px-6 rounded-2xl shadow-lg shadow-rose-600/25">
                    {procesandoImg ? "Comprimiendo..." : "Comprimir Imagen Ahora"}
                  </button>
                ) : (
                  <div className="w-full flex flex-col gap-3">
                    <div className="bg-rose-100 text-rose-900 text-center py-3 rounded-2xl font-bold text-sm">
                      ✨ ¡Imagen comprimida con éxito! ({tamanoOriginalImg} → {tamanoNuevoImg})
                    </div>
                    <a href={imagenComprimidaUrl} download={`PALJALE_Comprimido.jpg`} className="w-full bg-gradient-to-r from-rose-600 to-orange-600 text-white font-bold py-4 px-6 rounded-2xl text-center shadow-lg">
                      Descargar Imagen Comprimida
                    </a>
                    <button onClick={() => { setImagenComprimir(null); setImagenComprimidaUrl(null); }} className="text-sm text-gray-500 mt-2">Comprimir otra imagen</button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ================= SECCIÓN CONVERSOR DE FORMATOS ================= */}
        {herramienta === "convertir" && (
          <div className="w-full max-w-xl bg-white/90 backdrop-blur-xl border border-rose-100 rounded-[32px] p-8 md:p-12 shadow-xl shadow-rose-900/5 flex flex-col items-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Conversor de Formatos</h2>
            
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
                  arrastrandoConvertir ? 'border-rose-600 bg-rose-100/50 scale-[1.02]' : 'border-rose-200 bg-rose-50/30 hover:bg-rose-50/60'
                }`}
              >
                <div className="w-16 h-16 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">🔄</div>
                <span className="text-lg font-bold text-gray-800 mb-1">Arrastra tu imagen o haz clic</span>
                <span className="text-sm text-gray-400">Cualquier formato de imagen</span>
                <input type="file" className="hidden" accept="image/*" onChange={(e) => e.target.files?.[0] && manejarArchivoConvertir(e.target.files[0])} />
              </label>
            ) : (
              <div className="w-full flex flex-col items-center">
                <div className="w-full bg-rose-50/60 p-4 rounded-2xl mb-6 text-sm text-gray-700 flex justify-between items-center">
                  <span className="truncate max-w-[240px]">Archivo: <strong className="text-gray-900">{imagenConvertir.name}</strong></span>
                  <button onClick={() => setImagenConvertir(null)} className="text-red-500 font-bold text-xs">Cambiar</button>
                </div>

                <div className="w-full mb-6">
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Convertir a formato:</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button 
                      onClick={() => { setFormatoDestino("image/jpeg"); setNombreFormato("JPG"); }} 
                      className={`py-3 rounded-xl font-bold text-xs border ${formatoDestino === "image/jpeg" ? "bg-rose-600 text-white border-rose-600" : "bg-white text-gray-700 border-rose-200"}`}
                    >
                      JPG
                    </button>
                    <button 
                      onClick={() => { setFormatoDestino("image/png"); setNombreFormato("PNG"); }} 
                      className={`py-3 rounded-xl font-bold text-xs border ${formatoDestino === "image/png" ? "bg-rose-600 text-white border-rose-600" : "bg-white text-gray-700 border-rose-200"}`}
                    >
                      PNG
                    </button>
                    <button 
                      onClick={() => { setFormatoDestino("image/webp"); setNombreFormato("WEBP"); }} 
                      className={`py-3 rounded-xl font-bold text-xs border ${formatoDestino === "image/webp" ? "bg-rose-600 text-white border-rose-600" : "bg-white text-gray-700 border-rose-200"}`}
                    >
                      WebP
                    </button>
                  </div>
                </div>

                {!imagenConvertidaUrl ? (
                  <button onClick={ejecutarConversion} disabled={procesandoConv} className="w-full bg-gradient-to-r from-rose-600 to-orange-600 text-white font-bold py-4 px-6 rounded-2xl shadow-lg shadow-rose-600/25">
                    {procesandoConv ? "Convirtiendo..." : `Convertir a ${nombreFormato}`}
                  </button>
                ) : (
                  <div className="w-full flex flex-col gap-3">
                    <div className="bg-rose-100 text-rose-900 text-center py-3 rounded-2xl font-bold text-sm">
                      ✨ ¡Imagen convertida a {nombreFormato} con éxito!
                    </div>
                    <a href={imagenConvertidaUrl} download={`PALJALE_Convertido.${nombreFormato.toLowerCase()}`} className="w-full bg-gradient-to-r from-rose-600 to-orange-600 text-white font-bold py-4 px-6 rounded-2xl text-center shadow-lg">
                      Descargar Imagen en {nombreFormato}
                    </a>
                    <button onClick={() => { setImagenConvertir(null); setImagenConvertidaUrl(null); }} className="text-sm text-gray-500 mt-2">Convertir otra imagen</button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

      </main>
    </div>
  );
}