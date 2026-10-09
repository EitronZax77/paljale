"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";

type Mode = "merge" | "compress" | "rotate" | "extract";
type Thumb = { number: number; image: string };
type Preview = { thumbs: Thumb[]; total: number; planned: number; loading: boolean; error?: string };
const MAX_THUMBNAILS = 100;
const BATCH = 5;

function requestedPages(text: string, total: number): number[] {
  if (!text.trim()) return [];
  const pages = new Set<number>();
  for (const token of text.split(",")) {
    const match = /^(\d+)(?:\s*-\s*(\d+))?$/.exec(token.trim());
    if (!match) return [];
    const first = Number(match[1]);
    const last = match[2] ? Number(match[2]) : first;
    if (!Number.isSafeInteger(first) || !Number.isSafeInteger(last) || first < 1 || last < first || last > total) return [];
    for (let page = first; page <= last; page++) pages.add(page);
  }
  return [...pages].sort((a, b) => a - b);
}

function PdfThumbnails({ file, url, selection, rotation = 0, heading }: {
  file?: File; url?: string; selection?: string; rotation?: number; heading: string;
}) {
  const { language } = useLanguage();
  const en = language === "en";
  const [preview, setPreview] = useState<Preview | null>(null);

  useEffect(() => {
    if (!file && !url) return;
    let cancelled = false;
    let task: import("pdfjs-dist").PDFDocumentLoadingTask | undefined;
    let currentRender: import("pdfjs-dist").RenderTask | undefined;

    const load = async () => {
      try {
        const pdfjs = await import("pdfjs-dist");
        if (cancelled) return;
        pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
        const buffer = file ? await file.arrayBuffer() : await (await fetch(url!)).arrayBuffer();
        if (cancelled) return;
        task = pdfjs.getDocument({ data: new Uint8Array(buffer) });
        const doc = await task.promise;
        if (cancelled) return;
        const indices = selection === undefined || !selection.trim()
          ? Array.from({ length: Math.min(doc.numPages, MAX_THUMBNAILS) }, (_, i) => i + 1)
          : requestedPages(selection, doc.numPages).slice(0, MAX_THUMBNAILS);
        const thumbs: Thumb[] = [];
        setPreview({ thumbs: [], total: doc.numPages, planned: indices.length, loading: true });

        for (const number of indices) {
          if (cancelled) return;
          const page = await doc.getPage(number);
          const viewport = page.getViewport({ scale: 0.3, rotation: (page.rotate + rotation) % 360 });
          const canvas = document.createElement("canvas");
          canvas.width = Math.ceil(viewport.width);
          canvas.height = Math.ceil(viewport.height);
          const ctx = canvas.getContext("2d", { alpha: false });
          if (!ctx) throw new Error("Canvas unavailable");
          ctx.fillStyle = "#fff";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          currentRender = page.render({ canvas, canvasContext: ctx, viewport });
          await currentRender.promise;
          currentRender = undefined;
          if (cancelled) return;
          thumbs.push({ number, image: canvas.toDataURL("image/jpeg", 0.78) });
          page.cleanup();
          canvas.width = 1;
          canvas.height = 1;
          if (thumbs.length % BATCH === 0 || thumbs.length === indices.length) {
            setPreview({ thumbs: [...thumbs], total: doc.numPages, planned: indices.length, loading: thumbs.length < indices.length });
            // Yield to the browser so a 100-page PDF does not freeze the interface.
            await new Promise<void>(resolve => window.setTimeout(resolve, 0));
          }
        }
        if (!cancelled) setPreview({ thumbs: [...thumbs], total: doc.numPages, planned: indices.length, loading: false });
      } catch {
        if (!cancelled) setPreview({ thumbs: [], total: 0, planned: 0, loading: false, error: en ? "Preview not available for this file." : "No fue posible mostrar la vista previa de este archivo." });
      } finally {
        if (task) {
          try { await task.destroy(); } catch { /* Cleanup after cancellation */ }
        }
      }
    };
    void load();
    return () => { cancelled = true; currentRender?.cancel(); };
  }, [file, url, selection, rotation, en]);

  return (
    <div className="rounded-2xl border border-[var(--pal-border)] bg-[#f8fafb] p-4 sm:p-5">
      <h3 className="mb-3 text-sm font-extrabold text-slate-800">{heading}</h3>
      {!preview && <p role="status" className="text-xs text-slate-500">{en ? "Generating preview..." : "Generando vista previa..."}</p>}
      {preview?.error && <p role="alert" className="text-xs text-amber-700">{preview.error}</p>}
      {preview && !preview.error && <>
        <p className="mb-3 text-xs text-slate-500" role="status">
          {en ? `${preview.total} pages in document` : `${preview.total} páginas en el documento`}
          {` · ${preview.thumbs.length}/${preview.planned} ${en ? "thumbnails" : "miniaturas"}`}
          {preview.loading ? (en ? " · Loading..." : " · Cargando...") : ""}
          {preview.total > MAX_THUMBNAILS && preview.planned === MAX_THUMBNAILS
            ? (en ? " · Preview limited to 100 pages" : " · Vista previa limitada a 100 páginas") : ""}
        </p>
        {preview.thumbs.length === 0 && !preview.loading
          ? <p className="text-xs text-slate-500">{en ? "Enter a valid page range to preview your selection." : "Indica un rango válido para ver las páginas seleccionadas."}</p>
          : <div className="max-h-[530px] overflow-y-auto rounded-xl border border-slate-200 bg-white p-3" aria-label={heading}>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
              {preview.thumbs.map(thumb => <figure key={thumb.number} className="min-w-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={thumb.image} alt={en ? `Page ${thumb.number}` : `Página ${thumb.number}`} loading="lazy" className="h-36 w-full rounded-lg border border-slate-200 bg-white object-contain shadow-sm" />
                <figcaption className="mt-1 text-center text-xs font-semibold text-slate-600">{en ? "Page" : "Página"} {thumb.number}</figcaption>
              </figure>)}
            </div>
          </div>}
      </>}
    </div>
  );
}

export default function PdfPreview({ mode, pageRange, resultUrl }: {
  files: File[]; mode: Mode; pageRange: string; angle: number; resultUrl: string | null;
}) {
  const { language } = useLanguage();
  const en = language === "en";
  if (!resultUrl || mode === "compress") return null;
  return (
    <div aria-label={en ? "Result preview" : "Vista previa del resultado"}>
      <PdfThumbnails
        key={`${mode}-${resultUrl}-${pageRange}`}
        url={resultUrl}
        selection={undefined}
        heading={en ? "Result preview before download" : "Vista previa del resultado antes de descargar"}
      />
    </div>
  );
}
