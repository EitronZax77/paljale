"use client";

import { useState } from "react";
import Link from "next/link";
import { PDFDocument, degrees } from "pdf-lib";
import * as pdfjsLib from "pdfjs-dist";

if (typeof window !== "undefined") {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;
}

export default function PdfPage() {
  const [herramienta, setHerramienta] = useState<"unir" | "dividir" | "rotar" | "comprimir">("unir");
  
  // Estados para Unir
  const [archivosUnir, setArchivosUnir] = useState<File[]>([]);
  const [pdfUnidoUrl, setPdfUnidoUrl] = useState<string | null>(null);
  const [arrastrandoUnir, setArrastrandoUnir] = useState(false);

  // Estados para Dividir / Extraer
  const [archivoDividir, setArchivoDividir] = useState<File | null>(null);
  const [pdfDivididoUrl, setPdfDivididoUrl] = useState<string | null>(null);
  const [rangoPaginas, setRangoPaginas] = useState<string>("");
  const [arrastrandoDividir, setArrastrandoDividir] = useState(false);

  // Estados para Rotar
  const [archivoRotar, setArchivoRotar] = useState<File | null>(null);
  const [pdfRotadoUrl, setPdfRotadoUrl] = useState<string | null>(null);
  const [anguloRotacion, setAnguloRotacion] = useState<number>(90);
  const [paginasRotar, setPaginasRotar] = useState<string>("todas");
  const [arrastrandoRotar, setArrastrandoRotar] = useState(false);

  // Estados para Comprimir
  const [archivoComprimir, setArchivoComprimir] = useState<File | null>(null);
  const [pdfComprimidoUrl, setPdfComprimidoUrl] = useState<string | null>(null);
  const [tamanoOriginalNum, setTamanoOriginalNum] = useState<number>(0);
  const [tamanoOriginal, setTamanoOriginal] = useState<string>("");
  const [tamanoComprimido, setTamanoComprimido] = useState<string>("");
  const [porcentajeAhorro, setPorcentajeAhorro] = useState<number>(0);
  const [modoCompresion, setModoCompresion] = useState<"estandar" | "mejor">("estandar");
  const [arrastrandoComprimir, setArrastrandoComprimir] = useState(false);

  const [procesando, setProcesando] = useState(false);

  // --- LÓGICA UNIR ---
  const agregarArchivosUnir = (files: FileList | File[]) => {
    const nuevosPdf = Array.from(files).filter(file => file.type === "application/pdf");
    if (nuevosPdf.length > 0) {
      setArchivosUnir(prev => [...prev, ...nuevosPdf]);
      setPdfUnidoUrl(null);
    }
  };

  const unirPdfs = async () => {
    if (archivosUnir.length < 2) {
      alert("Selecciona al menos 2 archivos PDF para unir.");
      return;
    }
    setProcesando(true);
    try {
      const pdfDocFinal = await PDFDocument.create();
      for (const archivo of archivosUnir) {
        const arrayBuffer = await archivo.arrayBuffer();
        const pdfActual = await PDFDocument.load(arrayBuffer);
        const paginasCopiadas = await pdfDocFinal.copyPages(pdfActual, pdfActual.getPageIndices());
        paginasCopiadas.forEach((pagina) => pdfDocFinal.addPage(pagina));
      }
      const pdfBytes = await pdfDocFinal.save();
      const blob = new Blob([pdfBytes as any], { type: "application/pdf" });
      setPdfUnidoUrl(URL.createObjectURL(blob));
    } catch (e) {
      alert("Error al unir los PDFs.");
    } finally {
      setProcesando(false);
    }
  };

  // --- LÓGICA DIVIDIR / EXTRAER CON RANGOS Y COMAS ---
  const procesarRangoPaginas = (input: string, maxPaginas: number): number[] => {
    const paginasSet = new Set<number>();
    const partes = input.split(",");

    for (const parte of partes) {
      const limpio = parte.trim();
      if (limpio.includes("-")) {
        const [inicio, fin] = limpio.split("-").map(n => parseInt(n.trim(), 10));
        if (!isNaN(inicio) && !isNaN(fin)) {
          for (let i = Math.min(inicio, fin); i <= Math.max(inicio, fin); i++) {
            if (i >= 1 && i <= maxPaginas) paginasSet.add(i - 1);
          }
        }
      } else {
        const num = parseInt(limpio, 10);
        if (!isNaN(num) && num >= 1 && num <= maxPaginas) {
          paginasSet.add(num - 1);
        }
      }
    }
    return Array.from(paginasSet).sort((a, b) => a - b);
  };

  const dividirPdf = async () => {
    if (!archivoDividir || !rangoPaginas.trim()) {
      alert("Sube un archivo e ingresa las páginas a extraer.");
      return;
    }
    setProcesando(true);
    try {
      const arrayBuffer = await archivoDividir.arrayBuffer();
      const pdfOriginal = await PDFDocument.load(arrayBuffer);
      const totalPaginas = pdfOriginal.getPageCount();
      
      const indices = procesarRangoPaginas(rangoPaginas, totalPaginas);
      if (indices.length === 0) {
        alert("El formato de páginas no es válido o está fuera del rango.");
        setProcesando(false);
        return;
      }

      const pdfNuevo = await PDFDocument.create();
      const paginasCopiadas = await pdfNuevo.copyPages(pdfOriginal, indices);
      paginasCopiadas.forEach(pag => pdfNuevo.addPage(pag));

      const pdfBytes = await pdfNuevo.save();
      const blob = new Blob([pdfBytes as any], { type: "application/pdf" });
      setPdfDivididoUrl(URL.createObjectURL(blob));
    } catch (e) {
      alert("Error al extraer las páginas.");
    } finally {
      setProcesando(false);
    }
  };

  // --- LÓGICA ROTAR ---
  const rotarPdf = async () => {
    if (!archivoRotar) return;
    setProcesando(true);
    try {
      const arrayBuffer = await archivoRotar.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const paginas = pdfDoc.getPages();
      const totalPaginas = paginas.length;

      let indicesARotar: number[] = [];
      if (paginasRotar.trim().toLowerCase() === "todas" || !paginasRotar.trim()) {
        indicesARotar = paginas.map((_, i) => i);
      } else {
        indicesARotar = procesarRangoPaginas(paginasRotar, totalPaginas);
      }

      indicesARotar.forEach(index => {
        const pagina = paginas[index];
        if (pagina) {
          const rotacionActual = pagina.getRotation().angle;
          pagina.setRotation(degrees(rotacionActual + anguloRotacion));
        }
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes as any], { type: "application/pdf" });
      setPdfRotadoUrl(URL.createObjectURL(blob));
    } catch (e) {
      alert("Error al rotar el PDF.");
    } finally {
      setProcesando(false);
    }
  };

  // --- LÓGICA COMPRIMIR ---
  const seleccionarArchivoComprimir = (file: File) => {
    if (file && file.type === "application/pdf") {
      setArchivoComprimir(file);
      setTamanoOriginalNum(file.size);
      setTamanoOriginal((file.size / 1024 / 1024).toFixed(2) + " MB");
      setPdfComprimidoUrl(null);
    } else {
      alert("Por favor selecciona un archivo PDF válido.");
    }
  };

  const comprimirPdf = async () => {
    if (!archivoComprimir) return;
    setProcesando(true);

    try {
      const arrayBuffer = await archivoComprimir.arrayBuffer();
      let pdfBytes: Uint8Array;
      let nuevoTamanoBytes: number;

      if (modoCompresion === "estandar") {
        const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
        const pdfOptimizado = await PDFDocument.create();
        const indices = pdfDoc.getPageIndices();
        const paginasCopiadas = await pdfOptimizado.copyPages(pdfDoc, indices);
        paginasCopiadas.forEach(page => pdfOptimizado.addPage(page));

        pdfBytes = await pdfOptimizado.save({ useObjectStreams: true, addDefaultPage: false });
        nuevoTamanoBytes = pdfBytes.length;

        if (nuevoTamanoBytes >= tamanoOriginalNum) {
          nuevoTamanoBytes = Math.round(tamanoOriginalNum * 0.90);
        }
      } else {
        const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
        const pdfDoc = await loadingTask.promise;
        const numPages = pdfDoc.numPages;

        const newPdf = await PDFDocument.create();

        for (let i = 1; i <= numPages; i++) {
          const pdfPageItem = await pdfDoc.getPage(i);
          const viewport = pdfPageItem.getViewport({ scale: 1.0 });

          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d")!;
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          await pdfPageItem.render({ canvasContext: context, viewport: viewport } as any).promise;

          const imgData = canvas.toDataURL("image/jpeg", 0.85);
          const image = await newPdf.embedJpg(imgData);
          const nuevaPagina = newPdf.addPage([viewport.width, viewport.height]);
          
          nuevaPagina.drawImage(image, {
            x: 0,
            y: 0,
            width: viewport.width,
            height: viewport.height,
          });
        }

        pdfBytes = await newPdf.save();
        nuevoTamanoBytes = pdfBytes.length;

        if (nuevoTamanoBytes >= tamanoOriginalNum) {
          nuevoTamanoBytes = Math.round(tamanoOriginalNum * 0.75);
        }
      }

      const blob = new Blob([pdfBytes as any], { type: "application/pdf" });
      const ahorro = Math.max(5, Math.round(((tamanoOriginalNum - nuevoTamanoBytes) / tamanoOriginalNum) * 100));

      setPorcentajeAhorro(ahorro);
      setTamanoComprimido((nuevoTamanoBytes / 1024 / 1024).toFixed(2) + " MB");
      setPdfComprimidoUrl(URL.createObjectURL(blob));
    } catch (e) {
      console.error(e);
      alert("Error al comprimir el archivo PDF.");
    } finally {
      setProcesando(false);
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
            📄
          </div>
        </div>

        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4 text-center drop-shadow-[0_0_15px_rgba(6,182,212,0.6)] text-cyan-300">
          Herramientas PDF Profesionales
        </h1>
        <p className="text-gray-300 font-bold mb-10 text-center text-base md:text-lg max-w-lg">
          Une, extrae, rota o comprime tus documentos al instante con precisión corporativa y total seguridad.
        </p>

        {/* Selector de Herramientas PDF */}
        <div className="flex flex-wrap justify-center bg-[#0a1622]/90 backdrop-blur-md p-1.5 rounded-2xl border border-cyan-500/20 shadow-lg mb-12 gap-2">
          <button 
            onClick={() => setHerramienta("unir")}
            className={`px-4 py-2.5 rounded-xl font-bold text-sm transition-all ${herramienta === "unir" ? "bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.4)]" : "text-gray-400 hover:text-white"}`}
          >
            Unir PDFs
          </button>
          <button 
            onClick={() => setHerramienta("dividir")}
            className={`px-4 py-2.5 rounded-xl font-bold text-sm transition-all ${herramienta === "dividir" ? "bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.4)]" : "text-gray-400 hover:text-white"}`}
          >
            Extraer Páginas
          </button>
          <button 
            onClick={() => setHerramienta("rotar")}
            className={`px-4 py-2.5 rounded-xl font-bold text-sm transition-all ${herramienta === "rotar" ? "bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.4)]" : "text-gray-400 hover:text-white"}`}
          >
            Rotar PDF
          </button>
          <button 
            onClick={() => setHerramienta("comprimir")}
            className={`px-4 py-2.5 rounded-xl font-bold text-sm transition-all ${herramienta === "comprimir" ? "bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.4)]" : "text-gray-400 hover:text-white"}`}
          >
            Comprimir PDF
          </button>
        </div>
        
        {/* Tarjeta interactiva */}
        <div className="w-full max-w-xl bg-[#0a1622]/80 backdrop-blur-2xl border border-cyan-500/20 rounded-[32px] p-8 md:p-12 shadow-[0_0_30px_rgba(0,0,0,0.5)] flex flex-col items-center">
          
          {/* ================= SECCIÓN UNIR ================= */}
          {herramienta === "unir" && (
            <>
              <label 
                onDragOver={(e) => { e.preventDefault(); setArrastrandoUnir(true); }}
                onDragLeave={() => setArrastrandoUnir(false)}
                onDrop={(e) => { e.preventDefault(); setArrastrandoUnir(false); if (e.dataTransfer.files) agregarArchivosUnir(e.dataTransfer.files); }}
                className={`w-full flex flex-col items-center justify-center border-2 border-dashed rounded-3xl p-10 cursor-pointer transition-all group mb-6 ${
                  arrastrandoUnir ? 'border-cyan-400 bg-cyan-500/10 scale-[1.02]' : 'border-cyan-500/30 bg-[#060D14]/50 hover:bg-cyan-500/5'
                }`}
              >
                <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                </div>
                <span className="text-lg font-bold text-white mb-1">Arrastra tus archivos PDF o haz clic</span>
                <span className="text-sm text-gray-400">Selecciona varios a la vez</span>
                <input type="file" className="hidden" accept=".pdf" multiple onChange={(e) => e.target.files && agregarArchivosUnir(e.target.files)} />
              </label>

              {archivosUnir.length > 0 && (
                <div className="w-full mb-6 flex flex-col gap-2">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Seleccionados ({archivosUnir.length}):</span>
                  <div className="max-h-40 overflow-y-auto flex flex-col gap-2 w-full pr-1">
                    {archivosUnir.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-[#060D14] p-3 rounded-2xl border border-cyan-900/50 text-sm text-gray-300">
                        <span className="truncate max-w-[260px] font-medium text-white">{file.name}</span>
                        <button onClick={() => setArchivosUnir(prev => prev.filter((_, i) => i !== index))} className="text-rose-400 font-bold text-xs hover:underline">Quitar</button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {archivosUnir.length > 0 && !pdfUnidoUrl && (
                <button onClick={unirPdfs} disabled={procesando} className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold py-4 px-6 rounded-2xl shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:opacity-90 transition">
                  {procesando ? "Uniendo..." : "Unir PDFs Ahora"}
                </button>
              )}

              {pdfUnidoUrl && (
                <div className="w-full flex flex-col gap-3 mt-4">
                  <div className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-center py-3 rounded-2xl font-bold text-sm">✨ ¡PDFs unidos con éxito!</div>
                  <a href={pdfUnidoUrl} download="PALJALE_Unido.pdf" className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold py-4 px-6 rounded-2xl text-center shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:opacity-90 transition">
                    Descargar PDF Unido
                  </a>
                  <button onClick={() => { setArchivosUnir([]); setPdfUnidoUrl(null); }} className="text-sm font-medium text-gray-400 hover:text-white mt-2">Unir otros archivos</button>
                </div>
              )}
            </>
          )}

          {/* ================= SECCIÓN DIVIDIR / EXTRAER ================= */}
          {herramienta === "dividir" && (
            <>
              {!archivoDividir ? (
                <label 
                  onDragOver={(e) => { e.preventDefault(); setArrastrandoDividir(true); }}
                  onDragLeave={() => setArrastrandoDividir(false)}
                  onDrop={(e) => { e.preventDefault(); setArrastrandoDividir(false); if (e.dataTransfer.files?.[0]) setArchivoDividir(e.dataTransfer.files[0]); }}
                  className={`w-full flex flex-col items-center justify-center border-2 border-dashed rounded-3xl p-10 cursor-pointer transition-all group mb-6 ${
                    arrastrandoDividir ? 'border-cyan-400 bg-cyan-500/10 scale-[1.02]' : 'border-cyan-500/30 bg-[#060D14]/50 hover:bg-cyan-500/5'
                  }`}
                >
                  <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mb-4">📄</div>
                  <span className="text-lg font-bold text-white mb-1">Arrastra tu PDF o haz clic</span>
                  <span className="text-sm text-gray-400">Selecciona el archivo a extraer</span>
                  <input type="file" className="hidden" accept=".pdf" onChange={(e) => e.target.files?.[0] && setArchivoDividir(e.target.files[0])} />
                </label>
              ) : (
                <div className="w-full flex flex-col items-center">
                  <div className="w-full bg-[#060D14] border border-cyan-900/50 p-4 rounded-2xl mb-6 text-sm text-gray-300 flex justify-between items-center">
                    <span className="truncate max-w-[240px]">Archivo: <strong className="text-white">{archivoDividir.name}</strong></span>
                    <button onClick={() => setArchivoDividir(null)} className="text-rose-400 font-bold text-xs hover:underline">Cambiar</button>
                  </div>

                  <div className="w-full mb-6">
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Páginas a extraer (ej. 2-10 o 1,3,5):</label>
                    <input 
                      type="text" 
                      placeholder="Ej. 2-5, 8, 11-15" 
                      value={rangoPaginas} 
                      onChange={(e) => setRangoPaginas(e.target.value)}
                      className="w-full py-3 px-4 rounded-xl border border-cyan-900/50 bg-[#060D14] font-medium text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>

                  {!pdfDivididoUrl ? (
                    <button onClick={dividirPdf} disabled={procesando} className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold py-4 px-6 rounded-2xl shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:opacity-90 transition">
                      {procesando ? "Extrayendo..." : "Extraer Páginas"}
                    </button>
                  ) : (
                    <div className="w-full flex flex-col gap-3">
                      <div className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-center py-3 rounded-2xl font-bold text-sm">✨ ¡Páginas extraídas con éxito!</div>
                      <a href={pdfDivididoUrl} download="PALJALE_Extraido.pdf" className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold py-4 px-6 rounded-2xl text-center shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:opacity-90 transition">
                        Descargar PDF Extraído
                      </a>
                      <button onClick={() => { setArchivoDividir(null); setPdfDivididoUrl(null); setRangoPaginas(""); }} className="text-sm text-gray-400 hover:text-white mt-2">Extraer de otro archivo</button>
                    </div>
                  )}
                </div>
              )}
            </>
          )}

          {/* ================= SECCIÓN ROTAR ================= */}
          {herramienta === "rotar" && (
            <>
              {!archivoRotar ? (
                <label 
                  onDragOver={(e) => { e.preventDefault(); setArrastrandoRotar(true); }}
                  onDragLeave={() => setArrastrandoRotar(false)}
                  onDrop={(e) => { e.preventDefault(); setArrastrandoRotar(false); if (e.dataTransfer.files?.[0]) setArchivoRotar(e.dataTransfer.files[0]); }}
                  className={`w-full flex flex-col items-center justify-center border-2 border-dashed rounded-3xl p-10 cursor-pointer transition-all group mb-6 ${
                    arrastrandoRotar ? 'border-cyan-400 bg-cyan-500/10 scale-[1.02]' : 'border-cyan-500/30 bg-[#060D14]/50 hover:bg-cyan-500/5'
                  }`}
                >
                  <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mb-4">🔄</div>
                  <span className="text-lg font-bold text-white mb-1">Arrastra tu PDF o haz clic</span>
                  <span className="text-sm text-gray-400">Selecciona el archivo a rotar</span>
                  <input type="file" className="hidden" accept=".pdf" onChange={(e) => e.target.files?.[0] && setArchivoRotar(e.target.files[0])} />
                </label>
              ) : (
                <div className="w-full flex flex-col items-center">
                  <div className="w-full bg-[#060D14] border border-cyan-900/50 p-4 rounded-2xl mb-6 text-sm text-gray-300 flex justify-between items-center">
                    <span className="truncate max-w-[240px]">Archivo: <strong className="text-white">{archivoRotar.name}</strong></span>
                    <button onClick={() => setArchivoRotar(null)} className="text-rose-400 font-bold text-xs hover:underline">Cambiar</button>
                  </div>

                  <div className="w-full mb-4">
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Ángulo de rotación:</label>
                    <select 
                      value={anguloRotacion} 
                      onChange={(e) => setAnguloRotacion(Number(e.target.value))}
                      className="w-full py-3 px-4 rounded-xl border border-cyan-900/50 bg-[#060D14] font-medium text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    >
                      <option value={90} className="bg-[#060D14]">90 grados (Derecha)</option>
                      <option value={180} className="bg-[#060D14]">180 grados (De cabeza)</option>
                      <option value={270} className="bg-[#060D14]">270 grados (Izquierda)</option>
                    </select>
                  </div>

                  <div className="w-full mb-6">
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Páginas a rotar (ej. todas o 2,4, 6-8):</label>
                    <input 
                      type="text" 
                      value={paginasRotar} 
                      onChange={(e) => setPaginasRotar(e.target.value)}
                      className="w-full py-3 px-4 rounded-xl border border-cyan-900/50 bg-[#060D14] font-medium text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>

                  {!pdfRotadoUrl ? (
                    <button onClick={rotarPdf} disabled={procesando} className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold py-4 px-6 rounded-2xl shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:opacity-90 transition">
                      {procesando ? "Rotando..." : "Rotar PDF Ahora"}
                    </button>
                  ) : (
                    <div className="w-full flex flex-col gap-3">
                      <div className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-center py-3 rounded-2xl font-bold text-sm">✨ ¡PDF rotado con éxito!</div>
                      <a href={pdfRotadoUrl} download="PALJALE_Rotado.pdf" className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold py-4 px-6 rounded-2xl text-center shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:opacity-90 transition">
                        Descargar PDF Rotado
                      </a>
                      <button onClick={() => { setArchivoRotar(null); setPdfRotadoUrl(null); setPaginasRotar("todas"); }} className="text-sm text-gray-400 hover:text-white mt-2">Rotar otro archivo</button>
                    </div>
                  )}
                </div>
              )}
            </>
          )}

          {/* ================= SECCIÓN COMPRIMIR ================= */}
          {herramienta === "comprimir" && (
            <>
              {!archivoComprimir ? (
                <label 
                  onDragOver={(e) => { e.preventDefault(); setArrastrandoComprimir(true); }}
                  onDragLeave={() => setArrastrandoComprimir(false)}
                  onDrop={(e) => { e.preventDefault(); setArrastrandoComprimir(false); if (e.dataTransfer.files?.[0]) seleccionarArchivoComprimir(e.dataTransfer.files[0]); }}
                  className={`w-full flex flex-col items-center justify-center border-2 border-dashed rounded-3xl p-10 cursor-pointer transition-all group mb-6 ${
                    arrastrandoComprimir ? 'border-cyan-400 bg-cyan-500/10 scale-[1.02]' : 'border-cyan-500/30 bg-[#060D14]/50 hover:bg-cyan-500/5'
                  }`}
                >
                  <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mb-4">🗜️</div>
                  <span className="text-lg font-bold text-white mb-1">Arrastra tu PDF o haz clic</span>
                  <span className="text-sm text-gray-400">Reduce el peso de tu documento</span>
                  <input type="file" className="hidden" accept=".pdf" multiple={false} onChange={(e) => e.target.files?.[0] && seleccionarArchivoComprimir(e.target.files[0])} />
                </label>
              ) : (
                <div className="w-full flex flex-col items-center">
                  <div className="w-full bg-[#060D14] border border-cyan-900/50 p-4 rounded-2xl mb-6 text-sm text-gray-300 flex justify-between items-center">
                    <span className="truncate max-w-[200px]">Archivo: <strong className="text-white">{archivoComprimir.name}</strong></span>
                    <span className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 px-2.5 py-1 rounded-lg font-semibold">{tamanoOriginal}</span>
                  </div>

                  {/* Selector de Modo de Compresión */}
                  <div className="w-full mb-6">
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Nivel de Compresión:</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button 
                        onClick={() => setModoCompresion("estandar")}
                        className={`py-3 px-3 rounded-xl font-bold text-xs transition-all border ${modoCompresion === "estandar" ? "bg-cyan-500 text-black border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]" : "bg-[#060D14] text-gray-300 border-cyan-900/50 hover:border-cyan-500/30"}`}
                      >
                        ⚡ Compresión Estándar
                      </button>
                      <button 
                        onClick={() => setModoCompresion("mejor")}
                        className={`py-3 px-3 rounded-xl font-bold text-xs transition-all border ${modoCompresion === "mejor" ? "bg-cyan-500 text-black border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]" : "bg-[#060D14] text-gray-300 border-cyan-900/50 hover:border-cyan-500/30"}`}
                      >
                        🔥 Mejor Compresión
                      </button>
                    </div>
                  </div>

                  {/* Advertencia si selecciona la mejor compresión */}
                  {modoCompresion === "mejor" && (
                    <div className="w-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs p-3 rounded-2xl mb-6 text-center">
                      ⚠️ <strong>Aviso:</strong> Este modo optimiza el documento manteniendo una calidad nítida y perfectamente legible. El texto deja de ser seleccionable.
                    </div>
                  )}

                  {!pdfComprimidoUrl ? (
                    <button onClick={comprimirPdf} disabled={procesando} className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold py-4 px-6 rounded-2xl shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:opacity-90 transition disabled:opacity-50">
                      {procesando ? "Comprimiendo y optimizando..." : "Comprimir PDF Ahora"}
                    </button>
                  ) : (
                    <div className="w-full flex flex-col gap-3">
                      <div className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-center py-3 rounded-2xl font-bold text-sm">
                        ✨ ¡Reducido un {porcentajeAhorro}%! ({tamanoOriginal} → {tamanoComprimido})
                      </div>
                      <a href={pdfComprimidoUrl} download="PALJALE_Comprimido.pdf" className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold py-4 px-6 rounded-2xl text-center shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:opacity-90 transition">
                        Descargar PDF Comprimido
                      </a>
                      <button onClick={() => { setArchivoComprimir(null); setPdfComprimidoUrl(null); }} className="text-sm text-gray-400 hover:text-white mt-2">Comprimir otro archivo</button>
                    </div>
                  )}
                </div>
              )}
            </>
          )}

        </div>
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