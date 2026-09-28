"use client"; 

import { useState } from "react";
import QRCode from "react-qr-code";

export default function QrPage() {
  const [texto, setTexto] = useState("");

  const obtenerImagenQR = (): Promise<Blob | null> => {
    return new Promise((resolve) => {
      const svg = document.querySelector("#qr-contenedor svg");
      if (!svg) return resolve(null);
      
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();
      
      img.onload = () => {
        canvas.width = 1000;
        canvas.height = 1000;
        if (ctx) {
          ctx.fillStyle = "#ffffff"; 
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 100, 100, 800, 800); 
          canvas.toBlob((blob) => resolve(blob), "image/png", 1.0);
        }
      };
      img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
    });
  };

  const descargarQR = async () => {
    const blob = await obtenerImagenQR();
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "PALJALE_QR.png";
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  };

  const compartirQR = async () => {
    const blob = await obtenerImagenQR();
    if (!blob) return;
    
    const file = new File([blob], "PALJALE_QR.png", { type: "image/png" });
    
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          files: [file],
          title: "Código QR",
          text: "Generado con PALJALE",
        });
      } catch (error) {
        console.log("Compartir cancelado");
      }
    } else {
      alert("Tu navegador no soporta compartir directamente, pero puedes descargarlo.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 text-gray-900 font-sans selection:bg-purple-600 selection:text-white">
      
      {/* Barra superior */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-purple-100">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="text-sm font-bold text-purple-600 hover:text-purple-800 transition flex items-center gap-2">
            ← Volver al inicio
          </a>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-purple-100 text-purple-700">
            100% Gratis
          </span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-14 flex flex-col items-center">
        
        {/* Icono colorido con brillo */}
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-purple-400 rounded-3xl blur-xl opacity-40 animate-pulse"></div>
          <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-tr from-purple-600 to-indigo-500 text-white flex items-center justify-center text-4xl shadow-lg shadow-purple-500/30">
            📱
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-4 text-center">
          Generador de Código QR
        </h1>
        <p className="text-gray-600 mb-10 text-center text-lg max-w-lg">
          Escribe un enlace o texto y tu código QR se creará al instante.
        </p>
        
        {/* Tarjeta interactiva */}
        <div className="w-full max-w-xl bg-white/90 backdrop-blur-xl border border-purple-100 rounded-[32px] p-8 md:p-12 shadow-xl shadow-purple-900/5 flex flex-col items-center">
          
          <label className="w-full text-left font-bold text-gray-700 mb-3 text-sm uppercase tracking-wider">
            Ingresa tu enlace o texto:
          </label>
          <input 
            type="text" 
            placeholder="Ejemplo: https://mi-sitio.com" 
            className="w-full text-lg py-4 px-6 mb-8 rounded-2xl border-2 border-purple-100 focus:border-purple-600 focus:outline-none transition-all bg-purple-50/30 placeholder-gray-400 font-medium"
            onChange={(e) => setTexto(e.target.value)}
            value={texto}
          />
          
          {/* Contenedor del QR */}
          <div className="relative mb-8">
            <div id="qr-contenedor" className={`p-6 rounded-3xl bg-white transition-all duration-500 ${texto ? 'shadow-2xl shadow-purple-600/10 border-2 border-purple-100' : 'border-2 border-dashed border-gray-200'}`}>
              {texto ? (
                <QRCode value={texto} size={220} className="h-auto max-w-full" level="H" />
              ) : (
                <div className="w-[220px] h-[220px] flex flex-col items-center justify-center text-gray-400 text-center p-4">
                  <svg className="w-10 h-10 mb-2 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" /></svg>
                  <span className="text-sm font-medium">Escribe algo para ver tu código QR aquí</span>
                </div>
              )}
            </div>
          </div>

          {/* Botones de acción vibrantes */}
          {texto && (
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <button 
                onClick={descargarQR}
                className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-4 px-6 rounded-2xl hover:opacity-90 transition-all shadow-lg shadow-purple-600/25 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                Descargar PNG
              </button>
              
              <button 
                onClick={compartirQR}
                className="flex-1 bg-purple-50 text-purple-700 font-bold py-4 px-6 rounded-2xl hover:bg-purple-100 transition-all border border-purple-200 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                Compartir
              </button>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}