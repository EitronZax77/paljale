"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { PDFDocument } from "pdf-lib";
import SiteHeader from "@/components/SiteHeader";
import BarraEfemeride from "@/components/BarraEfemeride";
import AnimatedSpriteParade from "@/components/theme/AnimatedSpriteParade";
import FloatingFeedbackButton from "@/components/FloatingFeedbackButton";
import { useLanguage } from "@/components/LanguageProvider";
import PdfPreview from "@/components/pdf/PdfPreview";

type Mode = "images-to-pdf" | "pdf-to-images";
type Stage = "upload" | "preview" | "ready";
type ImageResult = { filename: string; url: string; blob: Blob };
const MAX_FILE_BYTES = 30 * 1024 * 1024;
const MAX_IMAGES = 100;
const MAX_PAGES = 100;

function pdfBlob(bytes: Uint8Array): Blob {
  return new Blob([new Uint8Array(bytes)], { type: "application/pdf" });
}

async function toPdf(files: File[]): Promise<Blob> {
  const output = await PDFDocument.create();
  for (const file of files) {
    const bytes = await file.arrayBuffer();
    const picture = file.type === "image/png" || /\.png$/i.test(file.name)
      ? await output.embedPng(bytes) : await output.embedJpg(bytes);
    const scale = Math.min(1, 10000 / Math.max(picture.width, picture.height));
    const width = Math.max(1, picture.width * 0.75 * scale);
    const height = Math.max(1, picture.height * 0.75 * scale);
    const page = output.addPage([width, height]);
    page.drawImage(picture, { x: 0, y: 0, width, height });
  }
  return pdfBlob(await output.save({ useObjectStreams: true }));
}

async function toImages(file: File, format: "jpeg" | "png", onProgress: (done: number, total: number) => void): Promise<ImageResult[]> {
  const pdfjs = await import("pdfjs-dist");
  pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
  const task = pdfjs.getDocument({ data: new Uint8Array(await file.arrayBuffer()) });
  const results: ImageResult[] = [];
  try {
    const doc = await task.promise;
    if (doc.numPages > MAX_PAGES) throw new Error("TOO_MANY_PAGES");
    for (let n = 1; n <= doc.numPages; n++) {
      const page = await doc.getPage(n);
      const basic = page.getViewport({ scale: 1 });
      const desiredScale = Math.min(1.5, 4096 / Math.max(basic.width, basic.height));
      const viewport = page.getViewport({ scale: desiredScale });
      const canvas = document.createElement("canvas");
      canvas.width = Math.ceil(viewport.width);
      canvas.height = Math.ceil(viewport.height);
      const context = canvas.getContext("2d", { alpha: false });
      if (!context) throw new Error("PROCESSING_FAILED");
      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, canvas.width, canvas.height);
      await page.render({ canvas, canvasContext: context, viewport }).promise;
      const mime = format === "png" ? "image/png" : "image/jpeg";
      const blob = await new Promise<Blob>((resolve, reject) => canvas.toBlob((b) => b ? resolve(b) : reject(new Error("PROCESSING_FAILED")), mime, 0.88));
      results.push({ filename: `PALJALE_Pagina_${String(n).padStart(3, "0")}.${format === "png" ? "png" : "jpg"}`, blob, url: URL.createObjectURL(blob) });
      page.cleanup();
      canvas.width = 1;
      canvas.height = 1;
      onProgress(n, doc.numPages);
      await new Promise<void>((resolve) => window.setTimeout(resolve, 0));
    }
    return results;
  } catch (e) {
    results.forEach((r) => URL.revokeObjectURL(r.url));
    throw e;
  } finally {
    await task.destroy();
  }
}

// Create a standards-compliant uncompressed ZIP locally, without dependencies or uploads.
function crc32(bytes: Uint8Array): number {
  let crc = 0xffffffff;
  for (const b of bytes) {
    crc ^= b;
    for (let k = 0; k < 8; k++) crc = (crc >>> 1) ^ (crc & 1 ? 0xedb88320 : 0);
  }
  return (crc ^ 0xffffffff) >>> 0;
}
function u16(view: DataView, at: number, value: number) { view.setUint16(at, value, true); }
function u32(view: DataView, at: number, value: number) { view.setUint32(at, value, true); }
async function zipImages(images: ImageResult[]): Promise<Blob> {
  const enc = new TextEncoder();
  const entries: { name: Uint8Array; data: Uint8Array; checksum: number; offset: number }[] = [];
  let offset = 0;
  for (const img of images) {
    const name = enc.encode(img.filename);
    const data = new Uint8Array(await img.blob.arrayBuffer());
    entries.push({ name, data, checksum: crc32(data), offset });
    offset += 30 + name.length + data.length;
  }
  const directoryOffset = offset;
  for (const e of entries) offset += 46 + e.name.length;
  const zip = new Uint8Array(offset + 22);
  const view = new DataView(zip.buffer);
  let cursor = 0;
  for (const e of entries) {
    u32(view, cursor, 0x04034b50); u16(view, cursor + 4, 20);
    u16(view, cursor + 6, 0x0800); u16(view, cursor + 8, 0);
    u32(view, cursor + 14, e.checksum); u32(view, cursor + 18, e.data.length);
    u32(view, cursor + 22, e.data.length); u16(view, cursor + 26, e.name.length);
    cursor += 30; zip.set(e.name, cursor); cursor += e.name.length;
    zip.set(e.data, cursor); cursor += e.data.length;
  }
  const directorySize = offset - 22 - directoryOffset;
  for (const e of entries) {
    u32(view, cursor, 0x02014b50); u16(view, cursor + 4, 20); u16(view, cursor + 6, 20);
    u16(view, cursor + 8, 0x0800); u16(view, cursor + 10, 0);
    u32(view, cursor + 16, e.checksum); u32(view, cursor + 20, e.data.length);
    u32(view, cursor + 24, e.data.length); u16(view, cursor + 28, e.name.length);
    u32(view, cursor + 42, e.offset);
    cursor += 46; zip.set(e.name, cursor); cursor += e.name.length;
  }
  u32(view, cursor, 0x06054b50); u16(view, cursor + 8, entries.length);
  u16(view, cursor + 10, entries.length); u32(view, cursor + 12, directorySize);
  u32(view, cursor + 16, directoryOffset);
  return new Blob([zip], { type: "application/zip" });
}

export default function PdfConversionClient({ mode }: { mode: Mode }) {
  const { language } = useLanguage();
  const en = language === "en";
  const t = (es: string, eng: string) => en ? eng : es;
  const toDocument = mode === "images-to-pdf";
  const [stage, setStage] = useState<Stage>("upload");
  const [files, setFiles] = useState<File[]>([]);
  const [format, setFormat] = useState<"jpeg" | "png">("jpeg");
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState("");
  const [error, setError] = useState("");
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [images, setImages] = useState<ImageResult[]>([]);
  const [zipUrl, setZipUrl] = useState<string | null>(null);
  const resources = useRef<string[]>([]);
  useEffect(() => () => { resources.current.forEach((url) => URL.revokeObjectURL(url)); }, []);
  const clean = () => { resources.current.forEach((url) => URL.revokeObjectURL(url)); resources.current = []; setPdfUrl(null); setImages([]); setZipUrl(null); };
  const reset = () => { clean(); setFiles([]); setStage("upload"); setProgress(""); setError(""); setFormat("jpeg"); };
  const pickFiles = (newFiles: File[]) => {
    setError("");
    if (!newFiles.length) return;
    const accepted = newFiles.every((file) => file.size > 0 && file.size <= MAX_FILE_BYTES && (toDocument ? /\.(jpg|jpeg|png)$/i.test(file.name) : /\.pdf$/i.test(file.name)));
    if (!accepted) { setError(t("Selecciona archivos válidos de hasta 30 MB cada uno.", "Choose valid files up to 30 MB each.")); return; }
    if (toDocument && files.length + newFiles.length > MAX_IMAGES) { setError(t("Máximo 100 imágenes.", "Maximum 100 images.")); return; }
    clean(); setFiles((old) => toDocument ? [...old, ...newFiles] : [newFiles[0]]);
  };
  const next = async () => {
    if (busy || files.length === 0) return;
    setBusy(true); setError(""); clean(); setProgress("");
    try {
      if (toDocument) {
        const blob = await toPdf(files);
        const url = URL.createObjectURL(blob);
        resources.current.push(url); setPdfUrl(url);
      } else {
        const processed = await toImages(files[0], format, (done, total) => setProgress(`${done}/${total}`));
        processed.forEach((image) => resources.current.push(image.url));
        setImages(processed);
      }
      setStage("preview");
    } catch (err) {
      const code = err instanceof Error ? err.message : "";
      setError(code === "TOO_MANY_PAGES" ? t("Máximo 100 páginas por conversión.", "Maximum 100 pages per conversion.") : t("No fue posible convertir los archivos. Comprueba que sean válidos y no estén protegidos.", "Conversion failed. Make sure your files are valid and not protected."));
    } finally { setBusy(false); }
  };
  const confirm = async () => {
    if (busy) return;
    if (toDocument) { setStage("ready"); return; }
    setBusy(true);
    try {
      const zip = await zipImages(images);
      const url = URL.createObjectURL(zip);
      resources.current.push(url); setZipUrl(url); setStage("ready");
    } catch { setError(t("No fue posible preparar el ZIP.", "Could not create ZIP.")); }
    finally { setBusy(false); }
  };
  const title = toDocument ? t("Convertir imágenes a PDF", "Convert images to PDF") : t("Convertir PDF a imágenes", "Convert PDF to images");
  return <div className="flex min-h-screen flex-col text-[var(--pal-text)]">
    <SiteHeader />
    <main className="mx-auto w-full max-w-[1200px] flex-1 px-4 py-7 sm:px-6 lg:px-8">
      <Link href="/pdf" className="mb-5 inline-flex min-h-11 items-center rounded-2xl border border-[var(--pal-border)] bg-white px-5 py-3 text-sm font-bold text-[var(--pal-accent)] shadow-sm transition hover:bg-[var(--pal-tint)]">← {t("Volver a herramientas PDF", "Back to PDF tools")}</Link>
      <section className="overflow-hidden rounded-[32px] border border-[var(--pal-border)] bg-white shadow-[var(--pal-shadow)]">
        <div className="border-b border-[var(--pal-border)] bg-gradient-to-r from-[var(--pal-tint)] to-white px-6 py-8 sm:px-10">
          <p className="text-xs font-extrabold uppercase tracking-widest text-[var(--pal-accent)]">PALJALE · PDF</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">{title}</h1>
          <p className="mt-3 text-sm leading-7 text-slate-600">{toDocument ? t("Crea un PDF con una página por imagen JPG o PNG.", "Create a PDF with one page per JPG or PNG image.") : t("Convierte hasta 100 páginas PDF en imágenes JPG o PNG.", "Convert up to 100 PDF pages into JPG or PNG images.")}</p>
        </div>
        <div className="space-y-5 px-5 py-7 sm:px-10">
          <p className="text-xs font-bold uppercase tracking-wider text-[var(--pal-accent)]">{t("Paso", "Step")} {stage === "upload" ? "1/3" : stage === "preview" ? "2/3" : "3/3"}</p>
          {stage === "upload" && <>
            <label className="flex cursor-pointer flex-col items-center gap-2 rounded-3xl border-2 border-dashed border-slate-300 bg-[#f8fafb] p-9 text-center hover:bg-[var(--pal-tint)]">
              <span aria-hidden="true" className="text-3xl text-[var(--pal-accent)]">↑</span>
              <span className="font-bold text-slate-800">{toDocument ? t("Selecciona imágenes JPG o PNG", "Select JPG or PNG images") : t("Selecciona un documento PDF", "Select a PDF document")}</span>
              <span className="text-xs text-slate-500">{t("Máximo 30 MB por archivo. Procesamiento local.", "Maximum 30 MB per file. Local processing.")}</span>
              <input type="file" accept={toDocument ? ".jpg,.jpeg,.png,image/jpeg,image/png" : ".pdf,application/pdf"} multiple={toDocument} className="sr-only" onChange={(e) => { pickFiles(Array.from(e.target.files ?? [])); e.currentTarget.value = ""; }}/>
            </label>
            {files.length > 0 && <div className="space-y-2">{files.map((file, index) => <div key={`${index}-${file.name}`} className="flex items-center justify-between rounded-xl border border-slate-200 bg-[#f8fafb] px-4 py-3 text-sm"><span className="truncate pr-4">{index + 1}. {file.name}</span><button type="button" className="font-bold text-rose-700" onClick={() => setFiles((all) => all.filter((_, i) => i !== index))}>{t("Quitar", "Remove")}</button></div>)}</div>}
            {!toDocument && <div><label htmlFor="pdf-img-format" className="mb-2 block text-sm font-semibold">{t("Formato de salida", "Output format")}</label><select id="pdf-img-format" value={format} onChange={(e) => setFormat(e.target.value as "jpeg" | "png")} className="w-full rounded-xl border border-slate-200 bg-[#f8fafb] p-3"><option value="jpeg">JPG</option><option value="png">PNG</option></select></div>}
            <button type="button" onClick={() => void next()} disabled={busy || files.length === 0} className="w-full rounded-2xl bg-[var(--pal-accent)] px-5 py-4 text-sm font-extrabold text-white disabled:opacity-50">{busy ? t("Procesando...", "Processing...") : t("Siguiente", "Next")}</button>
            {busy && progress && <p role="status" className="text-center text-sm text-slate-600">{t("Páginas procesadas", "Pages processed")}: {progress}</p>}
          </>}
          {stage === "preview" && <>
            <h2 className="text-lg font-extrabold text-slate-800">{t("Vista previa del resultado", "Result preview")}</h2>
            {toDocument && pdfUrl && <PdfPreview files={[]} mode="merge" pageRange="" angle={0} resultUrl={pdfUrl}/>}
            {!toDocument && <div className="max-h-[540px] overflow-y-auto rounded-xl border border-slate-200 bg-[#f8fafb] p-3"><div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-5">{images.map((img, i) => <figure key={img.filename} className="min-w-0 rounded-xl bg-white p-2 shadow-sm"><img src={img.url} alt={`${t("Página", "Page")} ${i+1}`} className="h-40 w-full object-contain"/><figcaption className="mt-1 text-center text-xs text-slate-600">{t("Página", "Page")} {i+1}</figcaption></figure>)}</div></div>}
            <div className="grid grid-cols-2 gap-3"><button onClick={reset} className="rounded-2xl border border-slate-300 bg-white px-4 py-4 font-bold text-slate-800" type="button">{t("Cancelar", "Cancel")}</button><button onClick={() => void confirm()} disabled={busy} className="rounded-2xl bg-[var(--pal-accent)] px-4 py-4 font-bold text-white disabled:opacity-50" type="button">{busy ? t("Preparando...", "Preparing...") : t("Confirmar conversión", "Confirm conversion")}</button></div>
          </>}
          {stage === "ready" && <div className="space-y-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-5"><p className="font-bold text-emerald-900">{t("Conversión completada", "Conversion complete")}</p>
            {toDocument && pdfUrl && <a href={pdfUrl} download="PALJALE_Imagenes.pdf" className="block rounded-xl bg-emerald-800 px-5 py-4 text-center font-extrabold text-white">{t("Descargar PDF", "Download PDF")}</a>}
            {!toDocument && zipUrl && <><a href={zipUrl} download="PALJALE_Imagenes_PDF.zip" className="block rounded-xl bg-emerald-800 px-5 py-4 text-center font-extrabold text-white">{t("Descargar todas las imágenes (ZIP)", "Download all images (ZIP)")}</a><div className="flex flex-wrap gap-2">{images.map((img, i) => <a key={img.filename} href={img.url} download={img.filename} className="rounded-lg border border-emerald-300 bg-white px-3 py-2 text-xs font-bold text-emerald-900">{t("Página", "Page")} {i + 1} ↓</a>)}</div></>}
            <button type="button" onClick={reset} className="text-sm font-semibold text-emerald-900 underline">{t("Nueva conversión", "New conversion")}</button>
          </div>}
          {error && <p role="alert" className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm font-bold text-rose-800">{error}</p>}
          <p className="text-center text-xs text-slate-500">{t("Los archivos se procesan en tu navegador y no se envían a PALJALE.", "Files are processed in your browser and are not uploaded to PALJALE.")}</p>
        </div>
      </section>
    </main>
    <BarraEfemeride/><AnimatedSpriteParade/>
    <footer className="border-t border-[var(--pal-border)] bg-white px-5 py-5 text-center text-sm font-bold text-slate-700">PALJALE © 2026</footer>
    <FloatingFeedbackButton/>
  </div>;
}
