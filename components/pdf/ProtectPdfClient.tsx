"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import PdfExtraShell from "@/components/pdf/PdfExtraShell";

const MAX_BYTES = 30 * 1024 * 1024;
const letter = /[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]/;
const digit = /\d/;

export default function ProtectPdfClient() {
  const { language } = useLanguage();
  const en = language === "en";
  const t = (es: string, english: string) => en ? english : es;
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [url, setUrl] = useState<string | null>(null);
  const urlRef = useRef<string | null>(null);
  useEffect(() => () => { if (urlRef.current) URL.revokeObjectURL(urlRef.current); }, []);

  const checks = [
    { ok: password.length >= 8, label: t("Mínimo 8 caracteres", "At least 8 characters") },
    { ok: letter.test(password), label: t("Al menos una letra", "At least one letter") },
    { ok: digit.test(password), label: t("Al menos un número", "At least one number") },
    { ok: password.length > 0 && password === confirmation, label: t("Ambas contraseñas coinciden", "Both passwords match") },
  ];
  const valid = checks.every((check) => check.ok);

  function clear() {
    if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    urlRef.current = null;
    setUrl(null); setFile(null); setPassword(""); setConfirmation(""); setError("");
  }
  function select(candidate?: File) {
    clear();
    if (!candidate) return;
    if (candidate.size === 0 || candidate.size > MAX_BYTES || !(candidate.type === "application/pdf" || candidate.name.toLowerCase().endsWith(".pdf"))) {
      setError(t("Selecciona un PDF válido de hasta 30 MB.", "Select a valid PDF up to 30 MB."));
      return;
    }
    setFile(candidate);
  }
  async function protect() {
    if (!file || busy || !valid) return;
    setBusy(true); setError("");
    try {
      const { encryptPDF } = await import("@pdfsmaller/pdf-encrypt");
      const encrypted = await encryptPDF(new Uint8Array(await file.arrayBuffer()), password, { algorithm: "AES-256" });
      // This is a structural check, not a substitute for opening the output in a PDF reader.
      const header = new TextDecoder("latin1").decode(encrypted);
      if (!/\/Encrypt\s+\d+\s+\d+\s+R/.test(header)) throw new Error("NOT_ENCRYPTED");
      const next = URL.createObjectURL(new Blob([new Uint8Array(encrypted)], { type: "application/pdf" }));
      urlRef.current = next;
      setUrl(next);
      setPassword(""); setConfirmation("");
    } catch {
      setError(t("No se pudo cifrar el PDF. Prueba con un documento válido que no esté protegido.", "Could not encrypt this PDF. Try a valid, unprotected document."));
    } finally { setBusy(false); }
  }
  return (
    <PdfExtraShell title={["Proteger PDF con contraseña", "Password-protect PDF"]} description={["Protege la apertura de tus documentos PDF mediante cifrado AES-256.", "Protect access to your PDF documents using AES-256 encryption."]}>
      {!url ? <div className="space-y-5">
        <label className="block cursor-pointer rounded-3xl border-2 border-dashed border-slate-300 bg-[#f8fafb] p-8 text-center text-sm font-semibold text-slate-800">
          {t("Selecciona tu archivo PDF (máximo 30 MB)", "Select your PDF (maximum 30 MB)")}
          <input type="file" accept=".pdf,application/pdf" className="sr-only" onChange={(event) => { select(event.target.files?.[0]); event.currentTarget.value = ""; }} />
        </label>
        {file && <>
          <p className="break-all text-sm font-semibold text-slate-700">{file.name}</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-semibold text-slate-700">{t("Contraseña", "Password")}
              <input type={show ? "text" : "password"} autoComplete="new-password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 block w-full rounded-xl border border-slate-300 bg-white px-4 py-3" />
            </label>
            <label className="text-sm font-semibold text-slate-700">{t("Confirmar contraseña", "Confirm password")}
              <input type={show ? "text" : "password"} autoComplete="new-password" value={confirmation} onChange={(event) => setConfirmation(event.target.value)} className="mt-2 block w-full rounded-xl border border-slate-300 bg-white px-4 py-3" />
            </label>
          </div>
          <label className="inline-flex items-center gap-2 text-sm text-slate-700"><input type="checkbox" checked={show} onChange={(event) => setShow(event.target.checked)} />{t("Mostrar contraseña", "Show password")}</label>
          <div className="space-y-2 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">
            <p className="text-sm font-bold text-slate-800">{t("Requisitos de contraseña", "Password requirements")}</p>
            {checks.map((check) => <p key={check.label} className={`flex items-center gap-2 text-sm ${check.ok ? "text-emerald-700" : "text-slate-600"}`}><span aria-hidden="true">{check.ok ? "✓" : "○"}</span>{check.label}</p>)}
            <p className="pt-1 text-xs leading-5 text-slate-500">{t("Para mayor seguridad, utiliza una contraseña larga y única. PALJALE no puede recuperarla.", "For better security, use a long, unique password. PALJALE cannot recover it.")}</p>
          </div>
          <button type="button" disabled={busy || !valid} onClick={() => void protect()} className="w-full rounded-2xl bg-[var(--pal-accent)] px-6 py-4 text-sm font-extrabold text-white disabled:cursor-not-allowed disabled:opacity-50">{busy ? t("Cifrando PDF...", "Encrypting PDF...") : t("Proteger PDF", "Protect PDF")}</button>
        </>}
      </div> : <div className="space-y-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
        <p className="font-bold text-emerald-900">{t("PDF cifrado generado. Comprueba que solicite contraseña al abrirlo.", "Encrypted PDF generated. Check that opening it requires a password.")}</p>
        <a href={url} download="PALJALE_Protegido.pdf" className="block rounded-xl bg-emerald-800 px-5 py-3 text-center font-extrabold text-white">{t("Descargar PDF protegido", "Download protected PDF")}</a>
        <button type="button" onClick={clear} className="text-sm font-semibold text-emerald-900 underline">{t("Empezar de nuevo", "Start over")}</button>
      </div>}
      {error && <p role="alert" className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800">{error}</p>}
      <p className="text-center text-xs text-slate-500">{t("El archivo y la contraseña se procesan en tu navegador.", "The file and password are processed in your browser.")}</p>
    </PdfExtraShell>
  );
}
