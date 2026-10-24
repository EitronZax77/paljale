"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { QRCodeCanvas } from "qrcode.react";
import SiteHeader from "@/components/SiteHeader";
import StudioIcon from "@/components/decision/StudioIcon";
import { trackEvent } from "@/lib/analytics";

const related = [
  { href: "/generador-contrasenas", title: "Generador de contraseñas", icon: "lock" },
  { href: "/conversor-unidades", title: "Conversor de unidades", icon: "calculator" },
];

export default function QrToolClient() {
  const [textoQr, setTextoQr] = useState("");
  const [notice, setNotice] = useState("");
  const qrRef = useRef<HTMLDivElement>(null);
  const content = textoQr.trim();
  const parametrosQr = () => ({
    tool: "qr",
    content_length: content.length,
    content_type: "custom",
  });

  const descargarQr = () => {
    if (!content) return;
    try {
      const canvas = qrRef.current?.querySelector("canvas");
      if (!canvas) throw new Error("No se encontró el código QR para descargar.");
      const enlace = document.createElement("a");
      enlace.href = canvas.toDataURL("image/png");
      enlace.download = "PALJALE_Codigo_QR.png";
      enlace.click();
      trackEvent("tool_success", { ...parametrosQr(), action: "generate_png", output_format: "png" });
      setNotice("Descarga de PNG solicitada al navegador.");
    } catch (error) {
      console.error("Error al descargar código QR:", error);
      trackEvent("tool_error", { ...parametrosQr(), action: "generate_png", error_type: "png_generation_failed" });
      setNotice("No se pudo generar el archivo PNG.");
    }
  };

  const compartirQr = async () => {
    if (!content) return;
    let action = "share_image";
    try {
      const canvas = qrRef.current?.querySelector("canvas");
      if (!canvas) throw new Error("No se encontró el código QR para compartir.");
      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));
      if (!blob) throw new Error("No se pudo generar la imagen del código QR.");
      const archivo = new File([blob], "PALJALE_Codigo_QR.png", { type: "image/png" });
      if (navigator.share && navigator.canShare?.({ files: [archivo] })) {
        await navigator.share({ title: "Código QR de PALJALE", text: "Código QR generado con PALJALE.", files: [archivo] });
        trackEvent("tool_success", { ...parametrosQr(), action, output_format: "png", result_size_bytes: blob.size });
        setNotice("Se abrió la función de compartir.");
        return;
      }
      if (navigator.clipboard) {
        action = "copy_content";
        await navigator.clipboard.writeText(content);
        trackEvent("tool_success", { ...parametrosQr(), action });
        setNotice("Contenido del QR copiado al portapapeles.");
        return;
      }
      if (navigator.share) {
        action = "share_text";
        await navigator.share({ title: "Código QR de PALJALE", text: content });
        trackEvent("tool_success", { ...parametrosQr(), action });
        setNotice("Se abrió la función de compartir.");
        return;
      }
      trackEvent("tool_error", { ...parametrosQr(), action: "share", error_type: "sharing_not_supported" });
      setNotice("Tu navegador no permite compartir; puedes descargar el PNG.");
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") return;
      console.error("Error al compartir código QR:", error);
      trackEvent("tool_error", { ...parametrosQr(), action, error_type: "sharing_failed" });
      setNotice("No se pudo compartir el código QR.");
    }
  };

  return <>
    <SiteHeader />
    <main className="mx-auto w-full max-w-7xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
      <nav aria-label="Volver a Utilidades" className="flex items-center gap-3 text-sm font-bold text-slate-700">
        <Link href="/utilidades" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 transition hover:-translate-y-0.5 hover:border-teal-300 hover:bg-teal-50">
          <span aria-hidden="true">←</span> Todas las utilidades
        </Link>
        <span className="hidden text-slate-400 sm:inline" aria-hidden="true">/</span>
        <span className="hidden sm:inline">Generador de código QR</span>
      </nav>

      <section className="rounded-[27px] border border-slate-200 bg-white p-7 sm:p-10">
        <span className="inline-flex rounded-xl bg-teal-50 p-3 text-teal-700"><StudioIcon name="tools" size={30}/></span>
        <h1 className="mt-5 text-[34px] font-black tracking-tight text-slate-900 sm:text-[42px]">Generador de código QR</h1>
        <p className="mt-3 max-w-3xl text-[15px] leading-7 text-slate-600">Crea códigos QR para enlaces o textos de forma gratuita. Descarga la imagen PNG o compártela desde tu navegador.</p>
      </section>

      <div className="grid items-start gap-5 lg:grid-cols-2">
        <section className="rounded-[25px] border border-slate-200 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-black text-slate-900">Contenido del código QR</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">Introduce el contenido que deseas codificar. El procesamiento ocurre en tu navegador.</p>
          <label htmlFor="qr-content" className="mt-6 block text-sm font-bold text-slate-800">Enlace o texto</label>
          <textarea id="qr-content" rows={5} maxLength={2400} value={textoQr} onChange={e => {setTextoQr(e.target.value); setNotice("");}} placeholder="Escribe o pega aquí el enlace o texto..." className="mt-2 w-full resize-y rounded-2xl border border-slate-300 bg-white p-4 text-sm leading-7 text-slate-900 outline-offset-2 focus:border-teal-600 focus:outline-teal-600" />
          <div className="mt-4 flex items-center justify-between gap-3">
            <p className="text-xs text-slate-500">{textoQr.length} / 2400 caracteres</p>
            <button type="button" disabled={!textoQr} onClick={() => {setTextoQr("");setNotice("");}} className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40">Limpiar</button>
          </div>
        </section>
        <section className="rounded-[25px] border border-slate-200 bg-white p-6 sm:p-8" aria-label="Vista previa del código QR">
          <h2 className="text-xl font-black text-slate-900">Tu código QR</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">La vista previa se actualiza al escribir.</p>
          <div className="mt-6 flex min-h-[275px] items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-5">
            {content ? <div ref={qrRef} className="max-w-full rounded-2xl bg-white p-4 shadow-sm"><QRCodeCanvas value={content} size={210} level="H" marginSize={2}/></div> : <p className="max-w-xs text-center text-sm leading-7 text-slate-500">Introduce un enlace o texto para generar tu código QR.</p>}
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <button type="button" onClick={descargarQr} disabled={!content} className="rounded-xl bg-teal-700 px-5 py-3 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-40">Descargar PNG</button>
            <button type="button" onClick={compartirQr} disabled={!content} className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-extrabold text-slate-700 transition hover:bg-teal-50 disabled:cursor-not-allowed disabled:opacity-40">Compartir QR</button>
          </div>
          <p role="status" aria-live="polite" className="mt-4 min-h-5 text-sm text-slate-600">{notice}</p>
        </section>
      </div>

      <section className="rounded-[25px] border border-slate-200 bg-white p-6 sm:p-8">
        <h2 className="text-lg font-black text-slate-900">Explora otras utilidades</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {related.map(x => <Link key={x.href} href={x.href} className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-4 text-sm font-bold text-slate-700 transition hover:-translate-y-0.5 hover:border-teal-300 hover:bg-teal-50">
            <span className="flex items-center gap-3"><span className="rounded-lg bg-teal-50 p-2 text-teal-700"><StudioIcon name={x.icon} size={19}/></span>{x.title}</span><span aria-hidden="true">→</span>
          </Link>)}
        </div>
      </section>
    </main>
  </>;
}
