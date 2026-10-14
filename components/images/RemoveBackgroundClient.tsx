"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import ImageToolShell from "@/components/images/ImageToolShell";

type Stage = "edit" | "preview" | "ready";
const MAX_BYTES = 10 * 1024 * 1024;

export default function RemoveBackgroundClient() {
  const { language } = useLanguage();
  const en = language === "en";
  const t = (es: string, eng: string) => en ? eng : es;
  const [file, setFile] = useState<File | null>(null);
  const [original, setOriginal] = useState<string | null>(null);
  const [processed, setProcessed] = useState<string | null>(null);
  const [stage, setStage] = useState<Stage>("edit");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const active = useRef<AbortController | null>(null);
  const objectUrls = useRef<string[]>([]);
  useEffect(() => () => { active.current?.abort(); objectUrls.current.forEach(url => URL.revokeObjectURL(url)); }, []);

  function remember(blob: Blob) {
    const url = URL.createObjectURL(blob);
    objectUrls.current.push(url);
    return url;
  }
  function reset() {
    active.current?.abort();
    objectUrls.current.forEach(url => URL.revokeObjectURL(url));
    objectUrls.current = [];
    setFile(null); setOriginal(null); setProcessed(null); setStage("edit");
    setBusy(false); setError(""); setNotice("");
  }
  function choose(next?: File) {
    reset();
    if (!next) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(next.type) || next.size < 1 || next.size > MAX_BYTES) {
      setError(t("Para quitar fondos usa JPG, PNG o WebP de hasta 10 MB.", "For background removal, use JPG, PNG, or WebP up to 10 MB."));
      return;
    }
    setFile(next);
    setOriginal(remember(next));
  }
  async function process() {
    if (!file || busy) return;
    setBusy(true); setError("");
    const controller = new AbortController(); active.current = controller;
    try {
      const form = new FormData(); form.set("image", file);
      const response = await fetch("/api/remove-background", { method: "POST", body: form, signal: controller.signal });
      if (!response.ok) {
        const code = (await response.json().catch(() => ({}))) as { error?: string; reset_at?: string | null };
        if (code.error === "WEEKLY_LIMIT") {
          const resetAt = typeof code.reset_at === "string" ? code.reset_at : null;
          const date = resetAt && !Number.isNaN(Date.parse(resetAt))
            ? new Date(resetAt).toLocaleString(en ? "en-US" : "es-MX", { dateStyle: "full", timeStyle: "short" })
            : "";
          setNotice(t("Has utilizado tus 3 eliminaciones gratuitas. Regresa " + (date || "la próxima semana") + ".", "You have used your 3 free removals. Come back " + (date || "next week") + "."));
          setFile(null);
          return;
        }
        if (code.error === "OFFLINE") throw new Error("OFFLINE");
        if (code.error === "NOT_PUBLIC") throw new Error("NOT_PUBLIC");
        if (code.error === "LOCAL_LIMIT") throw new Error("LOCAL_LIMIT");
        if (code.error === "NOT_CONFIGURED") throw new Error("NOT_CONFIGURED");
        throw new Error("PROCESS_FAILED");
      }
      const blob = await response.blob();
      if (blob.type !== "image/png") throw new Error("PROCESS_FAILED");
      if (controller.signal.aborted) return;
      const remaining = Number(response.headers.get("X-Paljale-Remaining"));
      const reset = response.headers.get("X-Paljale-Reset");
      if (remaining === 0 && reset && !Number.isNaN(Date.parse(reset))) {
        const date = new Date(reset).toLocaleString(en ? "en-US" : "es-MX", { dateStyle: "full", timeStyle: "short" });
        setNotice(t(`Has completado tus 3 eliminaciones gratuitas. Vuelve el ${date}.`, `You have completed your 3 free removals. Come back on ${date}.`));
      } else if (remaining === 1 || remaining === 2) {
        setNotice(t(`Te quedan ${remaining} eliminaciones gratuitas esta semana.`, `You have ${remaining} free removals left this week.`));
      }
      setProcessed(remember(blob));
      setStage("preview");
    } catch (cause) {
      if (controller.signal.aborted) return;
      const code = cause instanceof Error ? cause.message : "PROCESS_FAILED";
      const messages: Record<string, [string, string]> = {
        OFFLINE: ["Herramienta temporalmente fuera de servicio. El presupuesto gratuito está agotado o el servicio está pausado.", "Temporarily unavailable. The free processing budget has run out or the service is paused."],
        NOT_PUBLIC: ["Herramienta deshabilitada temporalmente en producción.", "This tool is temporarily disabled in production."],
        LOCAL_LIMIT: ["Se alcanzó el límite local de 5 pruebas. Detén y reinicia el servidor para continuar, revisando primero tus créditos.", "Local 5-test limit reached. Restart the dev server only after checking your credits."],
        NOT_CONFIGURED: ["Faltan las claves de iLoveAPI en el servidor.", "Server-side iLoveAPI keys are missing."],
        PROCESS_FAILED: ["iLoveAPI no pudo procesar esta imagen. Comprueba su formato y revisa la terminal del servidor.", "iLoveAPI could not process this image. Check its format and review the server console."],
      };
      setError(t(...(messages[code] ?? messages.PROCESS_FAILED)));
    } finally { if (!controller.signal.aborted) setBusy(false); }
  }

  const primary = "min-h-12 w-full rounded-2xl bg-[var(--pal-accent)] px-6 py-3 text-sm font-extrabold text-white transition hover:brightness-90 disabled:cursor-not-allowed disabled:opacity-50";
  return (
    <ImageToolShell title={["Quitar fondo de imágenes", "Remove image backgrounds"]}
      description={["Elimina el fondo de una imagen y compara el original con el resultado antes de descargar.", "Remove an image background and compare original and result before downloading."]}>
      {stage === "edit" && <div className="space-y-5">
        <label className="block cursor-pointer rounded-3xl border-2 border-dashed border-slate-300 bg-[#f8fafb] p-8 text-center">
          <span className="block text-lg font-bold text-slate-800">{t("Selecciona tu imagen", "Choose your image")}</span>
          <span className="mt-2 block text-sm text-slate-500">JPG · PNG · WebP · {t("máximo 10 MB", "maximum 10 MB")}</span>
          <input type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" onChange={e => { choose(e.target.files?.[0]); e.currentTarget.value = ""; }} />
        </label>
        {file && <div className="space-y-4">
          <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm"><span className="min-w-0 truncate">{file.name} · {(file.size / 1024 / 1024).toFixed(2)} MB</span><button onClick={reset} type="button" className="font-semibold text-rose-600">{t("Quitar", "Remove")}</button></div>
          <button type="button" disabled={busy} onClick={() => void process()} className={primary}>{busy ? t("Procesando...", "Processing...") : t("Quitar fondo", "Remove background")}</button>
          {busy && <p role="status" className="text-center text-sm text-slate-600">{t("Procesando imagen. Puede tardar unos momentos.", "Processing image. This may take a moment.")}</p>}
        </div>}
      </div>}
      {stage === "preview" && original && processed && <div className="space-y-5">
        <h2 className="text-base font-bold text-slate-800">{t("Compara antes de descargar", "Compare before downloading")}</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <figure className="rounded-xl border border-slate-200 bg-slate-50 p-3"><figcaption className="mb-3 text-sm font-bold text-slate-700">{t("Original", "Original")}</figcaption>
            {/* eslint-disable-next-line @next/next/no-img-element */}<img src={original} alt={t("Imagen original", "Original image")} className="mx-auto max-h-96 w-full object-contain" />
          </figure>
          <figure className="rounded-xl border border-slate-200 p-3" style={{backgroundImage:"linear-gradient(45deg,#e5e7eb 25%,transparent 25%),linear-gradient(-45deg,#e5e7eb 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#e5e7eb 75%),linear-gradient(-45deg,transparent 75%,#e5e7eb 75%)",backgroundSize:"18px 18px",backgroundPosition:"0 0,0 9px,9px -9px,-9px 0"}}><figcaption className="mb-3 text-sm font-bold text-slate-700">{t("Sin fondo", "Background removed")}</figcaption>
            {/* eslint-disable-next-line @next/next/no-img-element */}<img src={processed} alt={t("Resultado sin fondo", "Background-free result")} className="mx-auto max-h-96 w-full object-contain" />
          </figure>
        </div>
        <div className="grid gap-3 sm:grid-cols-2"><button type="button" onClick={reset} className="min-h-12 rounded-2xl border border-slate-300 bg-white px-5 font-bold">{t("Cancelar", "Cancel")}</button><button type="button" className={primary} onClick={() => setStage("ready")}>{t("Confirmar resultado", "Confirm result")}</button></div>
      </div>}
      {stage === "ready" && processed && <div className="space-y-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-5"><p className="font-bold text-emerald-900">{t("Imagen PNG lista", "PNG image ready")}</p><a className="block rounded-xl bg-emerald-800 px-5 py-3 text-center font-bold text-white" download="PALJALE_Sin_Fondo.png" href={processed}>{t("Descargar PNG", "Download PNG")}</a><button type="button" onClick={reset} className="text-sm font-semibold text-emerald-900 underline">{t("Empezar de nuevo", "Start over")}</button></div>}
      {notice && <p role="status" className="rounded-xl border border-sky-200 bg-sky-50 p-4 text-sm font-semibold text-sky-900">{notice}</p>}
      {error && <p role="alert" className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm font-semibold text-rose-800">{error}</p>}
      <p className="text-center text-xs text-slate-500">{t("Durante el procesamiento, la imagen se envía a un proveedor externo. Consulta la Política de privacidad.", "Images are sent to an external provider for processing. See the Privacy Policy.")}</p>
    </ImageToolShell>
  );
}
