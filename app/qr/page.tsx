"use client"; 

import { useState } from "react";
import QRCode from "react-qr-code";

export default function QrPage() {
  const [texto, setTexto] = useState("");

  // Esta es la nueva "magia" que descarga la imagen
  const descargarQR = () => {
    const svg = document.querySelector("#qr-contenedor svg");
    if (!svg) return;
    
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    
    img.onload = () => {
      canvas.width = 300;
      canvas.height = 300;
      if (ctx) {
        ctx.fillStyle = "white"; // Le ponemos fondo blanco
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 22, 22, 256, 256); // Centramos el QR
        
        // Creamos el archivo PNG y forzamos la descarga
        const pngFile = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.download = "QR_PALJALE.png";
        downloadLink.href = pngFile;
        downloadLink.click();
      }
    };
    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <header className="bg-white shadow-sm py-4 px-6">
        <a href="/" className="text-sm font-bold text-blue-600 hover:text-blue-800 transition flex items-center gap-2">
          ← Volver a PALJALE
        </a>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12 flex flex-col items-center">
        <div className="bg-purple-200 w-16 h-16 rounded-2xl flex items-center justify-center text-purple-700 text-3xl mb-6">
          📱
        </div>
        
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 text-center">
          Generador de Código QR
        </h1>
        <p className="text-gray-500 mb-10 text-center text-lg">
          Escribe un enlace o texto, genera tu código y descárgalo gratis.
        </p>
        
        <div className="w-full max-w-xl bg-white border border-gray-200 rounded-3xl p-8 md:p-10 shadow-sm flex flex-col items-center">
          
          <label className="w-full text-left font-bold text-gray-700 mb-2">Ingresa tu enlace o texto:</label>
          <input 
            type="text" 
            placeholder="Ejemplo: https://mi-sitio.com" 
            className="w-full py-4 px-6 mb-8 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            onChange={(e) => setTexto(e.target.value)}
            value={texto}
          />
          
          {/* Aquí le pusimos un "ID" al contenedor para que el botón sepa a quién tomarle la foto */}
          <div id="qr-contenedor" className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center min-h-[256px] min-w-[256px]">
            {texto ? (
              <QRCode value={texto} size={256} className="h-auto max-w-full" />
            ) : (
              <p className="text-gray-400 text-sm text-center px-4">
                El código QR aparecerá aquí cuando empieces a escribir.
              </p>
            )}
          </div>

          {/* Botón de descarga que solo aparece si hay texto escrito */}
          {texto && (
            <button 
              onClick={descargarQR}
              className="mt-8 bg-purple-600 text-white font-bold py-3 px-8 rounded-full hover:bg-purple-700 transition shadow-md w-full md:w-auto"
            >
              Descargar Imagen (PNG)
            </button>
          )}

        </div>
      </main>
    </div>
  );
}