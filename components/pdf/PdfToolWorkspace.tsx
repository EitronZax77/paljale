"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { degrees, PDFDocument } from "pdf-lib";
import { useLanguage } from "@/components/LanguageProvider";
import PdfPreview from "@/components/pdf/PdfPreview";

type Mode = "merge" | "compress" | "rotate" | "extract";
type CompMode = "standard" | "strong";
const MAX_BYTES = 30 * 1024 * 1024;
const MAX_RASTER_PAGES = 100;

const CONFIG: Record<Mode, { title: [string, string]; detail: [string, string]; action: [string, string]; download: string }> = {
  merge: { title: ["Unir archivos PDF", "Merge PDF files"], detail: ["Combina dos o más PDF en un solo documento, sin subirlos a nuestros servidores.", "Combine two or more PDFs into one document without uploading them to our servers."], action: ["Unir PDF", "Merge PDFs"], download: "PALJALE_Unido.pdf" },
  compress: { title: ["Comprimir PDF", "Compress PDF"], detail: ["Intenta reducir el tamaño del documento y muestra únicamente el ahorro real.", "Attempt to reduce file size and display only actual savings."], action: ["Comprimir PDF", "Compress PDF"], download: "PALJALE_Comprimido.pdf" },
  rotate: { title: ["Rotar PDF", "Rotate PDF"], detail: ["Gira todas las páginas o indica cuáles deseas modificar.", "Rotate all pages or choose specific pages."], action: ["Rotar PDF", "Rotate PDF"], download: "PALJALE_Rotado.pdf" },
  extract: { title: ["Extraer páginas PDF", "Extract PDF pages"], detail: ["Selecciona páginas individuales o rangos para crear un nuevo PDF.", "Choose individual pages or ranges to create a new PDF."], action: ["Extraer páginas", "Extract pages"], download: "PALJALE_Extraido.pdf" },
};

function parsePages(value: string, total: number): number[] {
  if (!value.trim()) throw new Error("EMPTY_RANGE");
  const pages = new Set<number>();
  for (const segment of value.split(",")) {
    const part = segment.trim();
    const match = /^(\d+)(?:\s*-\s*(\d+))?$/.exec(part);
    if (!match) throw new Error("INVALID_RANGE");
    const start = Number(match[1]);
    const end = match[2] ? Number(match[2]) : start;
    if (start < 1 || end > total || end < start || end - start > total) throw new Error("INVALID_RANGE");
    for (let page = start; page <= end; page++) pages.add(page - 1);
  }
  if (pages.size === 0) throw new Error("EMPTY_RANGE");
  return [...pages].sort((a, b) => a - b);
}

function validate(file: File): void {
  if (!(file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf"))) throw new Error("INVALID_FILE");
  if (file.size === 0 || file.size > MAX_BYTES) throw new Error("INVALID_SIZE");
}

async function rasterCompress(file: File): Promise<Uint8Array> {
  const pdfjs = await import("pdfjs-dist");
  pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
  const task = pdfjs.getDocument({ data: new Uint8Array(await file.arrayBuffer()) });
  const source = await task.promise;
  try {
    if (source.numPages > MAX_RASTER_PAGES) throw new Error("TOO_MANY_PAGES");
    const output = await PDFDocument.create();
    for (let index = 1; index <= source.numPages; index++) {
      const page = await source.getPage(index);
      const viewport = page.getViewport({ scale: 1 });
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d", { alpha: false });
      if (!context) throw new Error("PROCESSING_FAILED");
      canvas.width = Math.ceil(viewport.width);
      canvas.height = Math.ceil(viewport.height);
      context.fillStyle = "#fff";
      context.fillRect(0, 0, canvas.width, canvas.height);
      await page.render({ canvas, canvasContext: context, viewport }).promise;
      const jpg = await output.embedJpg(canvas.toDataURL("image/jpeg", 0.64));
      const target = output.addPage([viewport.width, viewport.height]);
      target.drawImage(jpg, { x: 0, y: 0, width: viewport.width, height: viewport.height });
      page.cleanup();
      canvas.width = 1; canvas.height = 1;
    }
    return output.save({ useObjectStreams: true });
  } finally { await task.destroy(); }
}

export default function PdfToolWorkspace({ mode }: { mode: Mode }) {
  const { language } = useLanguage();
  const en = language === "en";
  const pick = (es: string, eng: string) => en ? eng : es;
  const cfg = CONFIG[mode];
  const [files, setFiles] = useState<File[]>([]);
  const [pageRange, setPageRange] = useState("");
  const [angle, setAngle] = useState(90);
  const [compression, setCompression] = useState<CompMode>("standard");
  const [busy, setBusy] = useState(false);
  const [step, setStep] = useState<"edit" | "preview" | "ready">("edit");
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<{ url: string; bytes: number; original: number } | null>(null);
  const resultRef = useRef<string | null>(null);
  useEffect(() => () => { if (resultRef.current) URL.revokeObjectURL(resultRef.current); }, []);

  const clearResult = () => {
    if (resultRef.current) URL.revokeObjectURL(resultRef.current);
    resultRef.current = null;
    setResult(null);
  };
  const resetAll = () => {
    clearResult();
    setFiles([]);
    setPageRange("");
    setAngle(90);
    setCompression("standard");
    setError("");
    setDragging(false);
    setStep("edit");
  };

  const selectFiles = (chosen: File[]) => {
    setError("");
    clearResult();
    try {
      chosen.forEach(validate);
      if (!chosen.length) return;
      setFiles(current => mode === "merge" ? [...current, ...chosen] : [chosen[0]]);
    } catch (cause) {
      setError(message(cause));
    }
  };
  function message(cause: unknown): string {
    const key = cause instanceof Error ? cause.message : "PROCESSING_FAILED";
    const msgs: Record<string, [string, string]> = {
      INVALID_FILE: ["Selecciona únicamente documentos PDF.", "Please select PDF files only."],
      INVALID_SIZE: ["Cada PDF debe pesar entre 1 byte y 30 MB.", "Each PDF must be between 1 byte and 30 MB."],
      INVALID_RANGE: ["Escribe páginas válidas, por ejemplo 1,3,5-8. No se permiten páginas fuera del documento.", "Enter a valid page selection, for example 1,3,5-8, within the document."],
      EMPTY_RANGE: ["Indica las páginas que deseas procesar.", "Enter the pages you want to process."],
      TOO_MANY_PAGES: ["La compresión alta admite hasta 100 páginas.", "High compression supports up to 100 pages."],
      NO_REDUCTION: ["El archivo se procesó, pero no se logró reducir su tamaño. No generaremos una reducción ficticia.", "The file was processed but its size did not decrease. We will not report fictitious savings."],
      PROCESSING_FAILED: ["No fue posible procesar este PDF. Comprueba que no esté dañado o protegido.", "Could not process this PDF. Check whether it is damaged or password protected."],
    };
    return pick(...(msgs[key] ?? msgs.PROCESSING_FAILED));
  }
  async function process() {
    if (busy) return;
    if (!files.length || (mode === "merge" && files.length < 2)) {
      setError(pick("Selecciona al menos dos PDF para unir o un PDF para esta operación.", "Select at least two PDFs to merge, or one PDF for this operation."));
      return;
    }
    setBusy(true); setError(""); clearResult();
    try {
      let output: Uint8Array;
      if (mode === "merge") {
        const merged = await PDFDocument.create();
        for (const file of files) {
          const source = await PDFDocument.load(await file.arrayBuffer());
          const pages = await merged.copyPages(source, source.getPageIndices());
          pages.forEach(page => merged.addPage(page));
        }
        output = await merged.save({ useObjectStreams: true });
      } else if (mode === "compress" && compression === "strong") {
        output = await rasterCompress(files[0]);
      } else {
        const original = await PDFDocument.load(await files[0].arrayBuffer());
        if (mode === "extract") {
          const selected = parsePages(pageRange, original.getPageCount());
          const target = await PDFDocument.create();
          const pages = await target.copyPages(original, selected);
          pages.forEach(page => target.addPage(page));
          output = await target.save({ useObjectStreams: true });
        } else if (mode === "rotate") {
          const pages = original.getPages();
          const selected = pageRange.trim() === "" ? pages.map((_, idx) => idx) : parsePages(pageRange, pages.length);
          selected.forEach(idx => { const page = pages[idx]; page.setRotation(degrees((page.getRotation().angle + angle) % 360)); });
          output = await original.save({ useObjectStreams: true });
        } else {
          const target = await PDFDocument.create();
          const pages = await target.copyPages(original, original.getPageIndices());
          pages.forEach(page => target.addPage(page));
          output = await target.save({ useObjectStreams: true });
        }
      }
      const originalBytes = files.reduce((sum, file) => sum + file.size, 0);
      if (mode === "compress" && output.byteLength >= originalBytes) throw new Error("NO_REDUCTION");
      const url = URL.createObjectURL(new Blob([new Uint8Array(output)], { type: "application/pdf" }));
      resultRef.current = url;
      setResult({ url, bytes: output.byteLength, original: originalBytes });
      setStep(mode === "compress" ? "ready" : "preview");
    } catch (cause) { setError(message(cause)); }
    finally { setBusy(false); }
  }

  const inputStyle = "w-full rounded-2xl border border-[var(--pal-border)] bg-[#f7f9fb] px-4 py-3 text-sm text-slate-800 outline-none focus:border-[var(--pal-accent)]";
  return (
    <section className="mx-auto max-w-5xl">
      <Link href="/pdf" className="mb-5 inline-flex min-h-11 items-center gap-2 rounded-2xl border border-[var(--pal-border)] bg-white px-5 py-3 text-sm font-bold text-[var(--pal-accent)] shadow-sm transition hover:-translate-y-0.5 hover:bg-[var(--pal-tint)] hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--pal-accent)]">← {pick("Volver a herramientas PDF", "Back to PDF tools")}</Link>
      <div className="overflow-hidden rounded-[32px] border border-[var(--pal-border)] bg-white shadow-[var(--pal-shadow)]">
        <div className="border-b border-[var(--pal-border)] bg-gradient-to-r from-[var(--pal-tint)] to-white px-6 py-8 sm:px-10">
          <p className="text-xs font-extrabold uppercase tracking-widest text-[var(--pal-accent)]">PALJALE · PDF</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-[var(--pal-text)] sm:text-4xl">{cfg.title[en ? 1 : 0]}</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">{cfg.detail[en ? 1 : 0]}</p>
        </div>
        <div className="space-y-6 px-5 py-7 sm:px-10 sm:py-9">
          {step === "edit" && (<>
          <label onDragOver={event => { event.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={event => { event.preventDefault(); setDragging(false); selectFiles(Array.from(event.dataTransfer.files)); }} className={`flex cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed p-8 text-center transition ${dragging ? "border-[var(--pal-accent)] bg-[var(--pal-tint)]" : "border-slate-300 bg-[#f8fafb] hover:bg-[var(--pal-tint)]"}`}>
            <svg aria-hidden="true" className="mb-3 h-9 w-9 text-[var(--pal-accent)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 16V4m0 0L7 9m5-5 5 5M4 16v3a2 2 0 002 2h12a2 2 0 002-2v-3" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span className="font-bold text-slate-800">{pick("Selecciona o arrastra aquí tus archivos PDF", "Select or drop your PDF files here")}</span>
            <span className="mt-1 text-xs text-slate-500">{pick("Máximo 30 MB por archivo. Procesamiento local.", "Maximum 30 MB per file. Local processing.")}</span>
            <input type="file" accept=".pdf,application/pdf" multiple={mode === "merge"} className="sr-only" onChange={event => { selectFiles(Array.from(event.target.files ?? [])); event.currentTarget.value = ""; }} />
          </label>
          {files.length > 0 && <div className="space-y-2"><p className="text-sm font-semibold text-slate-700">{pick("Archivos seleccionados", "Selected files")}</p>{files.map((file, index) => <div key={`${file.name}-${file.lastModified}-${index}`} className="flex items-center justify-between gap-3 rounded-xl border border-[var(--pal-border)] bg-[#f8fafb] px-4 py-3"><span className="min-w-0 truncate text-sm text-slate-700">{file.name} · {(file.size / 1024 / 1024).toFixed(2)} MB</span><button type="button" onClick={() => { setFiles(current => current.filter((_, i) => i !== index)); clearResult(); setError(""); }} className="shrink-0 text-xs font-bold text-rose-600">{pick("Quitar", "Remove")}</button></div>)}</div>}
          {(mode === "extract" || mode === "rotate") && <div><label htmlFor="pdf-pages" className="mb-2 block text-sm font-semibold text-slate-800">{mode === "extract" ? pick("Páginas a extraer", "Pages to extract") : pick("Páginas a rotar (vacío = todas)", "Pages to rotate (empty = all)")}</label><input id="pdf-pages" type="text" value={pageRange} onChange={event => { setPageRange(event.target.value); clearResult(); }} className={inputStyle} placeholder={mode === "extract" ? "1,3,5-8" : pick("Deja vacío para todas, o 1,3,5-8", "Leave blank for all, or 1,3,5-8")} /></div>}
          {mode === "rotate" && <div><label htmlFor="pdf-angle" className="mb-2 block text-sm font-semibold text-slate-800">{pick("Ángulo de rotación", "Rotation angle")}</label><select id="pdf-angle" className={inputStyle} value={angle} onChange={event => { setAngle(Number(event.target.value)); clearResult(); }}><option value={90}>{pick("90° derecha", "90° clockwise")}</option><option value={180}>180°</option><option value={270}>{pick("90° izquierda", "90° counterclockwise")}</option></select></div>}
          {mode === "compress" && <div><label htmlFor="pdf-compression" className="mb-2 block text-sm font-semibold text-slate-800">{pick("Tipo de compresión", "Compression mode")}</label><select id="pdf-compression" className={inputStyle} value={compression} onChange={event => { setCompression(event.target.value as CompMode); clearResult(); }}><option value="standard">{pick("Estándar (conserva texto)", "Standard (keeps selectable text)")}</option><option value="strong">{pick("Alta (convierte páginas a imágenes)", "High (converts pages to images)")}</option></select>{compression === "strong" && <p className="mt-2 text-xs leading-6 text-amber-800">{pick("La compresión alta convierte las páginas a imágenes: el texto ya no podrá seleccionarse. Admite hasta 100 páginas.", "High compression converts pages to images: text will no longer be selectable. Up to 100 pages.")}</p>}</div>}
          
          {error && <p role="alert" className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-800">{error}</p>}
          <button
            type="button"
            disabled={busy || files.length < (mode === "merge" ? 2 : 1)}
            onClick={() => void process()}
            className="w-full rounded-2xl bg-[var(--pal-accent)] px-6 py-4 text-sm font-extrabold text-white transition hover:brightness-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {busy ? pick("Procesando...", "Processing...") : mode === "compress" ? cfg.action[en ? 1 : 0] : pick("Siguiente →", "Next →")}
          </button>
          </>)}
          {step === "preview" && result && (
            <div className="space-y-5">
              <p className="text-sm leading-6 text-slate-600">{pick("Revisa el resultado antes de confirmar la operación.", "Review the result before confirming the operation.")}</p>
              <PdfPreview files={files} mode={mode} pageRange={pageRange} angle={angle} resultUrl={result.url} />
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <button type="button" onClick={resetAll} className="min-h-12 rounded-2xl border border-[var(--pal-border)] bg-white px-6 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50">
                  {pick("Cancelar", "Cancel")}
                </button>
                <button type="button" onClick={() => setStep("ready")} className="min-h-12 rounded-2xl bg-[var(--pal-accent)] px-6 py-3 text-sm font-extrabold text-white transition hover:brightness-90">
                  {cfg.action[en ? 1 : 0]}
                </button>
              </div>
            </div>
          )}
          {step === "ready" && result && (
            <div className="space-y-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
              <p className="font-bold text-emerald-900">{pick("Documento listo para descargar", "Document ready to download")}</p>
              {mode === "compress" && <p className="text-sm text-emerald-800">{pick("Ahorro real", "Actual reduction")}: {((1 - result.bytes / result.original) * 100).toFixed(1)}% · {(result.original / 1024 / 1024).toFixed(2)} MB → {(result.bytes / 1024 / 1024).toFixed(2)} MB</p>}
              <a href={result.url} download={cfg.download} className="block rounded-xl bg-emerald-800 px-5 py-3 text-center text-sm font-extrabold text-white hover:bg-emerald-900">{pick("Descargar PDF", "Download PDF")}</a>
            </div>
          )}
          <p className="text-center text-xs text-slate-500">{pick("Los archivos se procesan en tu navegador y no se envían a PALJALE.", "Files are processed in your browser and are not uploaded to PALJALE.")}</p>
        </div>
      </div>
    </section>
  );
}