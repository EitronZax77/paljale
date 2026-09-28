"use client"; 

import { useState } from "react";
import imageCompression from "browser-image-compression";

export default function ImagenesPage() {
  const [archivoOriginal, setArchivoOriginal] = useState<File | null>(null);
  const [imagenUrl, setImagenUrl] = useState<string | null>(null);
  const [imagenOptimizadaUrl, setImagenOptimizadaUrl] = useState<string | null>(null);
  const [tamanoOriginal, setTamanoOriginal] = useState<string>("");
  const [tamanoNuevo, setTamanoNuevo] = useState<string>("");
  const [formatoDestino, setFormatoDestino] = useState<string>("image/jpeg");
  const [procesando, setProcesando] = useState(false);
  const [arrastrando, setArrastrando] = useState(false);

  const procesarArchivo = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      setArchivoOriginal(file);
      setImagenUrl(URL.createObjectURL(file));
      setTamanoOriginal((file.size / 1024 / 1024).toFixed(2) + " MB");
      setImagenOptimizadaUrl(null);
    } else {
      alert("Por favor, selecciona un archivo de imagen válido.");
    }
  };

  const manejarSubida = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) procesarArchivo(file);
  };

  // Eventos para arrastrar y soltar de forma correcta
  const manejarDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setArrastrando(true);
  };

  const manejarDragLeave = () => {
    setArrastrando(false);
  };

  const manejarDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setArrastrando(false);
    const file = e.dataTransfer.files?.[0];
    if (file) procesarArchivo(file);
  };

  const comprimirYConvertirImagen = async () => {
    if (!archivoOriginal) return;

    setProcesando(true);

    try {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        fileType: formatoDestino,
      };

      const compressedFile = await imageCompression(archivoOriginal, options);
      
      setImagenOptimizadaUrl(URL.createObjectURL(compressedFile));
      setTamanoNuevo((compressedFile.size / 1024 / 1024).toFixed(2) + " MB");
    } catch (error) {
      console.error("Error al procesar la imagen:", error);
      alert("Hubo un error al procesar la imagen.");
    } finally {
      setProcesando(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 text-gray-900 font-sans selection:bg-emerald-600 selection:text-white">
      
      {/* Barra superior */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-emerald-100">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="text-sm font-bold text-emerald-600 hover:text-emerald-800 transition flex items-center gap-2">
            ← Volver al inicio
          </a>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-100 text-emerald-700">
            100% Gratis y Seguro
          </span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-14 flex flex-col items-center">
        
        {/* Icono colorido con brillo */}
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-emerald-400 rounded-3xl blur-xl opacity-40 animate-pulse"></div>
          <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center text-4xl shadow-lg shadow-emerald-500/30">
            🖼️
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-4 text-center">
          Editor y Compresor de Imágenes
        </h1>
        <p className="text-gray-600 mb-10 text-center text-lg max-w-lg">
          Reduce el peso de tus fotos y cámbialas de formato al instante.
        </p>
        
        {/* Tarjeta interactiva */}
        <div className="w-full max-w-xl bg-white/90 backdrop-blur-xl border border-emerald-100 rounded-[32px] p-8 md:p-12 shadow-xl shadow-emerald-900/5 flex flex-col items-center">
          
          {!imagenUrl ? (
            <label 
              onDragOver={manejarDragOver}
              onDragLeave={manejarDragLeave}
              onDrop={manejarDrop}
              className={`w-full flex flex-col items-center justify-center border-2 border-dashed rounded-3xl p-10 cursor-pointer transition-all group ${
                arrastrando ? 'border-emerald-600 bg-emerald-100/50 scale-[1.02]' : 'border-emerald-200 bg-emerald-50/30 hover:bg-emerald-50/60'
              }`}
            >
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              </div>
              <span className="text-lg font-bold text-gray-800 mb-1">Arrastra tu imagen o haz clic aquí</span>
              <span className="text-sm text-gray-400">JPG, PNG o WebP</span>
              <input type="file" className="hidden" accept="image/*" onChange={manejarSubida} />
            </label>
          ) : (
            <div className="w-full flex flex-col items-center">
              <div className="relative mb-4 rounded-2xl overflow-hidden border border-emerald-100 shadow-md max-h-48 bg-gray-50 p-2">
                <img src={imagenUrl} alt="Vista previa" className="max-h-40 object-contain rounded-xl" />
              </div>
              
              <div className="w-full bg-emerald-50/60 p-4 rounded-2xl mb-6 text-sm text-gray-700 flex justify-between items-center">
                <span>Archivo: <strong className="text-gray-900">{archivoOriginal?.name}</strong></span>
                <span className="bg-emerald-200/60 px-2.5 py-1 rounded-lg font-semibold text-emerald-800">{tamanoOriginal}</span>
              </div>

              {/* Selector de formato de salida */}
              <div className="w-full mb-6">
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
                  Convertir a formato:
                </label>
                <select 
                  value={formatoDestino} 
                  onChange={(e) => setFormatoDestino(e.target.value)}
                  className="w-full py-3 px-4 rounded-xl border border-emerald-200 bg-white font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="image/jpeg">JPG / JPEG (Ideal para fotos)</option>
                  <option value="image/png">PNG (Ideal para gráficos y transparencias)</option>
                  <option value="image/webp">WebP (Formato moderno ultraligero)</option>
                </select>
              </div>

              {!imagenOptimizadaUrl ? (
                <button 
                  onClick={comprimirYConvertirImagen}
                  disabled={procesando}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold py-4 px-6 rounded-2xl hover:opacity-95 transition-all shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {procesando ? "Procesando y comprimiendo..." : "Comprimir y Convertir Ahora"}
                </button>
              ) : (
                <div className="w-full flex flex-col gap-3">
                  <div className="bg-emerald-100/70 border border-emerald-300 text-emerald-900 text-center py-3 rounded-2xl font-bold text-sm">
                    ✨ ¡Listo! Nuevo tamaño: {tamanoNuevo}
                  </div>
                  
                  <a 
                    href={imagenOptimizadaUrl} 
                    download={`optimizado.${formatoDestino.split('/')[1]}`}
                    className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold py-4 px-6 rounded-2xl hover:opacity-95 transition-all shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 text-center"
                  >
                    Descargar Imagen Procesada
                  </a>

                  <button 
                    onClick={() => { setImagenUrl(null); setImagenOptimizadaUrl(null); setArchivoOriginal(null); }}
                    className="text-sm font-medium text-gray-500 hover:text-gray-800 transition mt-2"
                  >
                    Procesar otra imagen
                  </button>
                </div>
              )}
            </div>
          )}

        </div>
      </main>
    </div>
  );
}