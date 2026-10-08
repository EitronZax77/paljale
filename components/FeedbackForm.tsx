"use client";

import { useState, type FormEvent } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import Link from "next/link";

type FeedbackStatus =
  | "idle"
  | "sending"
  | "success"
  | "error";

const FORM_ID =
  process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID ?? "";

const ENDPOINT = /^[a-zA-Z0-9]+$/.test(FORM_ID)
  ? `https://formspree.io/f/${FORM_ID}`
  : "";

const CATEGORIES = [
  { value: "sugerencia", label: "Sugerencia de mejora", en: "Improvement suggestion" },
  { value: "nueva-herramienta", label: "Proponer una herramienta", en: "Suggest a new tool" },
  { value: "problema", label: "Reportar un problema", en: "Report an issue" },
  { value: "opinion", label: "Opinión o comentario general", en: "General feedback" },
  { value: "privacidad", label: "Consulta sobre privacidad", en: "Privacy question" },
  { value: "otro", label: "Otro asunto", en: "Other" },
];

const fieldClass =
  "mt-2 w-full rounded-2xl border border-[var(--pal-border)] " +
  "bg-[#f7f9fb] px-4 py-3 text-sm text-[var(--pal-text)] " +
  "outline-none transition placeholder:text-slate-400 " +
  "focus:border-[var(--pal-accent)] focus:bg-white " +
  "focus:ring-4 focus:ring-[var(--pal-tint)]";

export default function FeedbackForm() {
  const { language } = useLanguage();
  const en = language === "en";
  const [category, setCategory] = useState("sugerencia");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<FeedbackStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const configured = Boolean(ENDPOINT);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!configured || status === "sending") {
      return;
    }

    const cleanMessage = message.trim();
    const cleanName = name.trim();
    const cleanEmail = email.trim();

    if (cleanMessage.length < 10 || cleanMessage.length > 2000) {
      setErrorMessage(
        en ? "Please write between 10 and 2,000 characters." : "Escribe un comentario de entre 10 y 2,000 caracteres."
      );
      setStatus("error");
      return;
    }

    if (website.trim()) {
      return;
    }

    setStatus("sending");
    setErrorMessage("");

    const selectedCategory =
      CATEGORIES.find((item) => item.value === category)?.label ??
      "Comentario general";

    try {
      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _subject: `PALJALE: ${selectedCategory}`,
          categoria: selectedCategory,
          nombre: cleanName || "No proporcionado",
          email: cleanEmail || undefined,
          mensaje: cleanMessage,
          _gotcha: website,
        }),
      });

      if (!response.ok) {
        throw new Error("No se pudo enviar el mensaje.");
      }

      setStatus("success");
      setMessage("");
      setName("");
      setEmail("");
      setCategory("sugerencia");
    } catch {
      setStatus("error");
      setErrorMessage(
        en ? "Could not send your message. Please try again later." : "No fue posible enviar tu comentario. Inténtalo nuevamente más tarde."
      );
    }
  }

  return (
    <section
      id="opiniones"
      aria-labelledby="feedback-title"
      className="scroll-mt-6 rounded-[24px] border border-[var(--pal-border)] bg-white p-5 shadow-[0_5px_20px_rgba(15,23,42,0.035)] sm:p-7"
    >
      <div className="mb-6 flex items-start gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[var(--pal-tint)] text-[var(--pal-accent)]">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-7 w-7"
            aria-hidden="true"
          >
            <path
              d="M5 6.5A2.5 2.5 0 0 1 7.5 4h9A2.5 2.5 0 0 1 19 6.5v7a2.5 2.5 0 0 1-2.5 2.5H12l-5 4v-4.5a2.5 2.5 0 0 1-2-2.45V6.5Z"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinejoin="round"
            />
            <path
              d="M8.5 9h7M8.5 12h4.5"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div>
          <h2
            id="feedback-title"
            className="text-xl font-extrabold text-[var(--pal-text)] sm:text-2xl"
          >
            {en ? "Your feedback helps us improve" : "Tu opinión nos ayuda a mejorar"}
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            {en ? "Share your ideas, comments, or issues you experienced while using PALJALE." : "Comparte tus ideas, comentarios o problemas que hayas encontrado al utilizar PALJALE."}
          </p>
        </div>
      </div>

      {status === "success" ? (
        <div
          role="status"
          className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6"
        >
          <h3 className="text-lg font-extrabold text-emerald-900">
            {en ? "Thank you for sharing your feedback!" : "¡Muchas gracias por compartir tu opinión!"}
          </h3>

          <p className="mt-3 text-sm leading-7 text-emerald-800">
            {en ? "We have received your feedback. Your ideas help us improve and build useful tools for our community." : "Hemos recibido tu comentario. Tu experiencia e ideas nos ayudan a identificar mejoras y crear herramientas que realmente sean útiles para nuestra comunidad."}
          </p>

          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="mt-5 rounded-xl bg-emerald-800 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-900"
          >
            {en ? "Send another message" : "Enviar otro comentario"}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="feedback-category"
              className="text-sm font-bold text-[var(--pal-text)]"
            >
              {en ? "Category" : "Categoría"}
            </label>

            <select
              id="feedback-category"
              name="categoria"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className={fieldClass}
              required
            >
              {CATEGORIES.map((item) => (
                <option key={item.value} value={item.value}>
                  {en ? item.en : item.label}
                </option>
              ))}
            </select>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="feedback-name"
                className="text-sm font-bold text-[var(--pal-text)]"
              >
                {en ? "Your name" : "Tu nombre"}
                <span className="ml-2 font-normal text-slate-500">
                  {en ? "(optional)" : "(opcional)"}
                </span>
              </label>

              <input
                id="feedback-name"
                type="text"
                autoComplete="name"
                maxLength={80}
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder={en ? "Your name" : "¿Cómo te llamas?"}
                className={fieldClass}
              />
            </div>

            <div>
              <label
                htmlFor="feedback-email"
                className="text-sm font-bold text-[var(--pal-text)]"
              >
                {en ? "Email address" : "Correo electrónico"}
                <span className="ml-2 font-normal text-slate-500">
                  {en ? "(optional)" : "(opcional)"}
                </span>
              </label>

              <input
                id="feedback-email"
                type="email"
                autoComplete="email"
                maxLength={254}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder={en ? "For a reply (optional)" : "Para recibir una respuesta"}
                className={fieldClass}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="feedback-message"
              className="text-sm font-bold text-[var(--pal-text)]"
            >
              {en ? "Your message" : "Tu comentario"}
              <span className="ml-2 text-rose-600">*</span>
            </label>

            <textarea
              id="feedback-message"
              name="mensaje"
              rows={6}
              minLength={10}
              maxLength={2000}
              required
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder={en ? "Tell us your idea, suggestion or experience..." : "Cuéntanos tu idea, sugerencia o experiencia..."}
              className={`${fieldClass} resize-y`}
            />

            <p className="mt-2 text-right text-xs text-slate-500">
              {message.length} / 2,000 {en ? "characters" : "caracteres"}
            </p>
          </div>

          {/* Campo oculto destinado a detectar bots básicos. */}
          <div
            aria-hidden="true"
            className="absolute -left-[10000px] h-0 overflow-hidden"
          >
            <label htmlFor="feedback-website">
              {en ? "Leave blank" : "Deja este campo vacío"}
            </label>
            <input
              id="feedback-website"
              name="_gotcha"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(event) => setWebsite(event.target.value)}
            />
          </div>

          <p className="text-xs leading-6 text-slate-600">
            {en ? "Do not include passwords, financial or confidential information. Your message will be processed to address your request. Read our " : "No incluyas contraseñas, datos bancarios, documentos personales ni archivos confidenciales. Al enviar tu mensaje, autorizas su tratamiento para atender tu consulta. Consulta nuestra "}
            <Link
              href="/privacidad"
              className="font-bold text-[var(--pal-accent)] underline underline-offset-2"
            >
              {en ? "Privacy Policy" : "Política de Privacidad"}
            </Link>
            .
          </p>

          {status === "error" && (
            <p
              role="alert"
              className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm font-medium text-rose-800"
            >
              {errorMessage}
            </p>
          )}

          {!configured && (
            <p
              role="status"
              className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900"
            >
              {en ? "The feedback form is not configured yet." : "El formulario está preparado, pero todavía falta conectar el servicio de recepción de mensajes."}
            </p>
          )}

          <button
            type="submit"
            disabled={!configured || status === "sending"}
            className="inline-flex min-h-12 items-center justify-center gap-3 rounded-2xl bg-[var(--pal-accent)] px-7 py-3 text-sm font-extrabold text-white shadow-sm transition hover:brightness-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {status === "sending"
              ? (en ? "Sending message..." : "Enviando comentario...")
              : (en ? "Send message" : "Enviar comentario")}

            {status !== "sending" && (
              <span aria-hidden="true">→</span>
            )}
          </button>
        </form>
      )}
    </section>
  );
}
