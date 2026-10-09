"use client";

import { useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { useLanguage } from "@/components/LanguageProvider";
import PdfExtraShell from "@/components/pdf/PdfExtraShell";

const MAX_PDF_BYTES = 30 * 1024 * 1024;
const MAX_SIGNATURE_BYTES = 5 * 1024 * 1024;
type Stage = "edit" | "preview" | "ready";
type SignatureSource = "draw" | "upload";

export default function SignPdfClient() {
  const { language } = useLanguage();
  const en = language === "en";
  const t = (es: string, english: string) => en ? english : es;
  const [file, setFile] = useState<File | null>(null);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [pageImage, setPageImage] = useState<string | null>(null);
  const [signature, setSignature] = useState<string | null>(null);
  const [source, setSource] = useState<SignatureSource>("draw");
  const [position, setPosition] = useState({ x: 0.5, y: 0.8 });
  const [positionChosen, setPositionChosen] = useState(false);
  const [size, setSize] = useState(30);
  const [withLine, setWithLine] = useState(false);
  const [stage, setStage] = useState<Stage>("edit");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [url, setUrl] = useState<string | null>(null);
  const signCanvas = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const urlRef = useRef<string | null>(null);

  useEffect(() => () => { if (urlRef.current) URL.revokeObjectURL(urlRef.current); }, []);
  useEffect(() => {
    if (!file) return;
    let cancelled = false;
    let task: import("pdfjs-dist").PDFDocumentLoadingTask | undefined;
    let render: import("pdfjs-dist").RenderTask | undefined;
    const load = async () => {
      try {
        const pdfjs = await import("pdfjs-dist");
        pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
        task = pdfjs.getDocument({ data: new Uint8Array(await file.arrayBuffer()) });
        const document = await task.promise;
        if (cancelled) return;
        setPageCount(document.numPages);
        const selected = await document.getPage(page);
        const base = selected.getViewport({ scale: 1 });
        const viewport = selected.getViewport({ scale: Math.min(1.3, 800 / base.width) });
        const canvas = window.document.createElement("canvas");
        canvas.width = Math.ceil(viewport.width);
        canvas.height = Math.ceil(viewport.height);
        const context = canvas.getContext("2d", { alpha: false });
        if (!context) throw new Error("CANVAS");
        render = selected.render({ canvas, canvasContext: context, viewport });
        await render.promise;
        if (!cancelled) setPageImage(canvas.toDataURL("image/jpeg", 0.87));
        selected.cleanup();
      } catch {
        if (!cancelled) setError(t("No se pudo mostrar la página. Comprueba que el PDF sea válido.", "Could not preview this page. Check the PDF file."));
      } finally {
        try { await task?.destroy(); } catch { /* Ignore cancellation */ }
      }
    };
    void load();
    return () => { cancelled = true; render?.cancel(); };
    // language only affects text in JSX; no PDF rerender necessary.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file, page]);

  function clear() {
    if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    urlRef.current = null;
    setUrl(null); setFile(null); setPage(1); setPageCount(0); setPageImage(null);
    setSignature(null); setSource("draw"); setStage("edit"); setError("");
    setPosition({ x: 0.5, y: 0.8 }); setPositionChosen(false); setSize(30); setWithLine(false);
  }
  function select(candidate?: File) {
    clear();
    if (!candidate) return;
    if (!(candidate.type === "application/pdf" || candidate.name.toLowerCase().endsWith(".pdf")) || !candidate.size || candidate.size > MAX_PDF_BYTES) {
      setError(t("Selecciona un PDF válido de hasta 30 MB.", "Select a valid PDF up to 30 MB."));
      return;
    }
    setFile(candidate);
  }
  function choosePosition(event: ReactPointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    setPosition({
      x: Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width)),
      y: Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height)),
    });
    setPositionChosen(true);
  }
  function coords(event: ReactPointerEvent<HTMLCanvasElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    return { x: (event.clientX - rect.left) * event.currentTarget.width / rect.width, y: (event.clientY - rect.top) * event.currentTarget.height / rect.height };
  }
  function start(event: ReactPointerEvent<HTMLCanvasElement>) {
    event.preventDefault();
    const canvas = signCanvas.current;
    if (!canvas) return;
    canvas.setPointerCapture(event.pointerId);
    const context = canvas.getContext("2d");
    if (!context) return;
    const point = coords(event);
    context.lineCap = "round";
    context.lineJoin = "round";
    context.lineWidth = 3;
    context.strokeStyle = "#07152c";
    context.beginPath();
    context.moveTo(point.x, point.y);
    context.lineTo(point.x + 0.1, point.y + 0.1);
    context.stroke();
    drawing.current = true;
  }
  function move(event: ReactPointerEvent<HTMLCanvasElement>) {
    if (!drawing.current) return;
    event.preventDefault();
    const point = coords(event);
    const context = signCanvas.current?.getContext("2d");
    context?.lineTo(point.x, point.y);
    context?.stroke();
  }
  function end() {
    if (!drawing.current) return;
    drawing.current = false;
    if (signCanvas.current) setSignature(signCanvas.current.toDataURL("image/png"));
  }
  function erase() {
    signCanvas.current?.getContext("2d")?.clearRect(0, 0, 600, 180);
    setSignature(null);
  }
  async function loadSignature(candidate?: File) {
    if (!candidate) return;
    setError("");
    if (!candidate.size || candidate.size > MAX_SIGNATURE_BYTES || !["image/png", "image/jpeg"].includes(candidate.type)) {
      setError(t("Utiliza una imagen PNG o JPG de hasta 5 MB.", "Use a PNG or JPG image up to 5 MB."));
      return;
    }
    try {
      const picture = new Image();
      const objectUrl = URL.createObjectURL(candidate);
      try {
        picture.src = objectUrl;
        await picture.decode();
        const canvas = document.createElement("canvas");
        canvas.width = picture.naturalWidth;
        canvas.height = picture.naturalHeight;
        if (!canvas.width || !canvas.height || canvas.width * canvas.height > 20_000_000) throw new Error("INVALID_IMAGE");
        const context = canvas.getContext("2d");
        if (!context) throw new Error("CANVAS");
        context.drawImage(picture, 0, 0);
        setSignature(canvas.toDataURL("image/png"));
        setSource("upload");
      } finally { URL.revokeObjectURL(objectUrl); }
    } catch { setError(t("No fue posible leer la firma. Intenta con otra imagen PNG o JPG.", "Could not read the signature. Try another PNG or JPG.")); }
  }
  async function prepare() {
    if (!file || !signature || !positionChosen || busy || pageCount < 1 || !pageImage) return;
    setBusy(true); setError("");
    try {
      const pdf = await PDFDocument.load(await file.arrayBuffer());
      const target = pdf.getPage(page - 1);
      const image = await pdf.embedPng(signature);
      const { width, height } = target.getSize();
      const imageWidth = width * size / 100;
      const imageHeight = imageWidth * image.height / image.width;
      const lineArea = withLine ? 23 : 0;
      const blockHeight = imageHeight + lineArea;
      if (imageWidth > width || blockHeight > height) throw new Error("SIGNATURE_TOO_LARGE");
      const x = Math.max(0, Math.min(width - imageWidth, position.x * width - imageWidth / 2));
      const y = Math.max(0, Math.min(height - blockHeight, (1 - position.y) * height - blockHeight / 2));
      target.drawImage(image, { x, y: y + lineArea, width: imageWidth, height: imageHeight });
      if (withLine) {
        target.drawLine({ start: { x, y: y + 17 }, end: { x: x + imageWidth, y: y + 17 }, thickness: 0.8, color: rgb(0.35, 0.39, 0.45) });
        const font = await pdf.embedFont(StandardFonts.Helvetica);
        target.drawText(en ? "Signature" : "Firma", { x: x + Math.max(0, (imageWidth - font.widthOfTextAtSize(en ? "Signature" : "Firma", 10)) / 2), y: y + 3, size: 10, font, color: rgb(0.35, 0.39, 0.45) });
      }
      const bytes = await pdf.save({ useObjectStreams: true });
      const next = URL.createObjectURL(new Blob([new Uint8Array(bytes)], { type: "application/pdf" }));
      urlRef.current = next;
      setUrl(next);
      setStage("preview");
    } catch {
      setError(t("No se pudo preparar el PDF firmado. Revisa el archivo y el tamaño de la firma.", "Could not prepare the signed PDF. Check the file and signature size."));
    } finally { setBusy(false); }
  }

  const actionClass = "min-h-12 rounded-2xl px-5 py-3 text-sm font-extrabold transition";
  return (
    <PdfExtraShell title={["Firmar PDF", "Sign PDF"]} description={["Selecciona dónde colocar una firma visual en el documento.", "Choose where to place a visual signature in your document."]}>
      {stage === "edit" && <div className="space-y-6">
        <label className="block cursor-pointer rounded-3xl border-2 border-dashed border-slate-300 bg-[#f8fafb] p-8 text-center font-semibold text-slate-800">
          {t("1. Selecciona un PDF (máximo 30 MB)", "1. Select a PDF (maximum 30 MB)")}
          <input type="file" accept=".pdf,application/pdf" className="sr-only" onChange={(event) => { select(event.target.files?.[0]); event.currentTarget.value = ""; }} />
        </label>
        {file && <>
          <p className="break-all text-sm font-semibold text-slate-700">{file.name} · {pageCount} {t("páginas", "pages")}</p>
          <label className="block text-sm font-bold text-slate-800">{t("2. Página que deseas firmar", "2. Page to sign")}
            <input type="number" min={1} max={Math.max(1, pageCount)} value={page} onChange={(event) => { setPage(Math.max(1, Math.min(Math.max(1, pageCount), Number(event.target.value) || 1))); setPageImage(null); setPositionChosen(false); }} className="mt-2 block w-full rounded-xl border border-slate-300 px-4 py-3" />
          </label>
          <div className="space-y-3">
            <p className="text-sm font-bold text-slate-800">{t("3. Haz clic o toca la página para elegir la ubicación de la firma", "3. Click or tap the page to choose the signature location")}</p>
            {pageImage ? <div className="mx-auto max-w-[720px] rounded-xl border border-slate-200 bg-white p-2">
              <div role="button" tabIndex={0} aria-label={t("Elegir ubicación de la firma en el documento", "Choose signature placement in the document")} className="relative cursor-crosshair outline-offset-4 focus-visible:outline-2 focus-visible:outline-[var(--pal-accent)]" onPointerDown={choosePosition} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setPosition({ x: 0.5, y: 0.8 }); setPositionChosen(true); } }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={pageImage} alt={t("Vista de la página seleccionada", "Selected page preview")} className="block h-auto w-full select-none" draggable={false} />
                {positionChosen && <div className="pointer-events-none absolute flex items-center justify-center" style={{ left: `${position.x * 100}%`, top: `${position.y * 100}%`, width: `${size}%`, transform: "translate(-50%, -50%)" }}>
                  {signature ? <div className="w-full text-center">{/* eslint-disable-next-line @next/next/no-img-element */}<img src={signature} alt="" className="w-full" />{withLine && <div className="border-t border-slate-500 text-[9px] text-slate-600">Firma</div>}</div> : <div className="rounded-lg border-2 border-dashed border-teal-600 bg-white/75 px-2 py-1 text-center text-xs font-semibold text-teal-800">{t("Aquí irá la firma", "Signature here")}</div>}
                </div>}
              </div>
            </div> : <p role="status" className="text-sm text-slate-500">{t("Cargando página...", "Loading page...")}</p>}
            {positionChosen && <p className="text-xs font-semibold text-emerald-700">{t("Ubicación seleccionada. Puedes tocar otra zona para cambiarla.", "Location selected. Tap another area to change it.")}</p>}
          </div>
          <div className="space-y-3">
            <p className="text-sm font-bold text-slate-800">{t("4. Crear o adjuntar tu firma", "4. Draw or upload your signature")}</p>
            <div className="grid grid-cols-2 gap-2">
              <button type="button" onClick={() => { setSource("draw"); setSignature(null); }} className={`rounded-xl px-4 py-3 text-sm font-bold ${source === "draw" ? "bg-[var(--pal-accent)] text-white" : "border border-slate-300 bg-white text-slate-700"}`}>{t("Dibujar firma", "Draw signature")}</button>
              <button type="button" onClick={() => { setSource("upload"); setSignature(null); }} className={`rounded-xl px-4 py-3 text-sm font-bold ${source === "upload" ? "bg-[var(--pal-accent)] text-white" : "border border-slate-300 bg-white text-slate-700"}`}>{t("Adjuntar firma", "Upload signature")}</button>
            </div>
            {source === "draw" ? <div className="space-y-2">
              <canvas ref={signCanvas} width={600} height={180} onPointerDown={start} onPointerMove={move} onPointerUp={end} onPointerCancel={end} className="h-36 w-full touch-none rounded-xl border border-slate-300 bg-white" aria-label={t("Dibujar firma", "Draw signature")} />
              <button type="button" onClick={erase} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700">{t("Borrar y volver a dibujar", "Clear and redraw")}</button>
            </div> : <label className="block cursor-pointer rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-5 text-center text-sm font-semibold text-slate-700">
              {t("Seleccionar imagen PNG o JPG de tu firma (máximo 5 MB)", "Choose your signature PNG or JPG (maximum 5 MB)")}
              <input type="file" accept=".png,.jpg,.jpeg,image/png,image/jpeg" className="sr-only" onChange={(event) => { void loadSignature(event.target.files?.[0]); event.currentTarget.value = ""; }} />
              {signature && <span className="mt-2 block text-emerald-700">{t("Imagen cargada", "Image loaded")}</span>}
            </label>}
          </div>
          <div className="space-y-4">
            <p className="text-sm font-bold text-slate-800">{t("5. Personalizar la firma", "5. Customize signature")}</p>
            <label className="block text-sm font-semibold text-slate-700">{t("Ancho de firma", "Signature width")}: {size}%
              <input type="range" min={10} max={65} value={size} onChange={(event) => setSize(Number(event.target.value))} className="mt-2 block w-full" />
            </label>
            <label className="flex items-center gap-3 text-sm font-semibold text-slate-700"><input type="checkbox" checked={withLine} onChange={(event) => setWithLine(event.target.checked)} />{t("Agregar línea y texto «Firma» debajo", "Add a line and 'Signature' label underneath")}</label>
          </div>
          <button type="button" disabled={!signature || !positionChosen || !pageImage || busy} onClick={() => void prepare()} className={`${actionClass} w-full bg-[var(--pal-accent)] text-white disabled:cursor-not-allowed disabled:opacity-50`}>{busy ? t("Preparando...", "Preparing...") : t("Siguiente →", "Next →")}</button>
        </>}
      </div>}
      {stage === "preview" && url && <div className="space-y-4">
        <p className="text-sm font-semibold text-slate-700">{t("Comprueba el documento firmado antes de confirmar.", "Review the signed document before confirming.")}</p>
        <iframe src={url} title={t("Vista previa del PDF firmado", "Signed PDF preview")} className="h-[550px] w-full rounded-xl border border-slate-200" />
        <div className="grid gap-3 sm:grid-cols-2">
          <button type="button" onClick={clear} className={`${actionClass} border border-slate-300 bg-white text-slate-700`}>{t("Cancelar", "Cancel")}</button>
          <button type="button" onClick={() => setStage("ready")} className={`${actionClass} bg-[var(--pal-accent)] text-white`}>{t("Firmar PDF", "Sign PDF")}</button>
        </div>
      </div>}
      {stage === "ready" && url && <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
        <p className="mb-4 font-bold text-emerald-900">{t("Documento listo para descargar", "Document ready to download")}</p>
        <a href={url} download="PALJALE_Firmado.pdf" className={`${actionClass} block bg-emerald-800 text-center text-white`}>{t("Descargar PDF", "Download PDF")}</a>
      </div>}
      {error && <p role="alert" className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800">{error}</p>}
      <p className="text-center text-xs text-slate-500">{t("Firma visual, no certificada. El archivo se procesa localmente.", "Visual, non-certified signature. Your file is processed locally.")}</p>
    </PdfExtraShell>
  );
}
