"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import { supabaseBrowser } from "@/lib/supabase/browser";

export default function RegisterClient() {
  const { language } = useLanguage();
  const en = language === "en";
  const t = (es: string, english: string) => en ? english : es;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [reveal, setReveal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;
    void supabaseBrowser().auth.getSession().then(({ data }) => {
      if (alive && data.session) window.location.replace("/");
    });
    return () => { alive = false; };
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading) return;
    setError("");
    if (name.trim().length < 2 || name.trim().length > 100) {
      setError(t("Escribe tu nombre completo (2 a 100 caracteres).", "Enter your full name (2 to 100 characters)."));
      return;
    }
    if (password.length < 8 || password !== confirmation) {
      setError(t("Revisa la contraseña: mínimo 8 caracteres y debe coincidir en ambos campos.", "Check your password: at least 8 characters and matching both fields."));
      return;
    }
    setLoading(true);
    try {
      const { data, error: issue } = await supabaseBrowser().auth.signUp({
        email: email.trim(), password,
        options: { emailRedirectTo: `${window.location.origin}/`, data: { full_name: name.trim() } },
      });
      if (issue) { setError(issue.message); return; }
      if (data.session) { window.location.replace("/"); return; }
      setComplete(true);
    } catch {
      setError(t("No se pudo completar el registro. Inténtalo nuevamente.", "Registration could not be completed. Please try again."));
    } finally { setLoading(false); }
  }

  async function google() {
    setError("");
    setLoading(true);
    try {
      const { error: issue } = await supabaseBrowser().auth.signInWithOAuth({
        provider: "google", options: { redirectTo: `${window.location.origin}/` },
      });
      if (issue) setError(issue.message);
    } catch {
      setError(t("No se pudo conectar con Google.", "Could not connect to Google."));
    } finally { setLoading(false); }
  }

  const field = "mt-1.5 block w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100";
  return <section className="mx-auto max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-xl sm:p-10">
    {complete ? <div className="space-y-5 text-center" role="status">
      <h1 className="text-2xl font-extrabold text-slate-900">{t("Revisa tu correo", "Check your email")}</h1>
      <p className="text-sm leading-6 text-slate-600">{t("Te enviamos un enlace de confirmación. Abre el correo, confirma tu cuenta y después ingresa a PALJALE.", "We sent a confirmation link. Check your email, confirm your account, then sign in to PALJALE.")}</p>
      <Link href="/acceso" className="inline-block rounded-xl bg-[var(--pal-accent)] px-6 py-3 font-semibold text-white transition hover:brightness-90 active:scale-95">{t("Ir a Ingresar", "Go to sign in")}</Link>
    </div> : <>
      <div className="mb-7 text-center">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.17em] text-[var(--pal-accent)]">PALJALE</p>
        <h1 className="text-3xl font-extrabold text-slate-900">{t("Crea tu cuenta gratuita", "Create your free account")}</h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">{t("Guarda tu perfil y continúa disfrutando las herramientas digitales.", "Save your profile and keep using our digital tools.")}</p>
      </div>
      <button onClick={() => void google()} disabled={loading} type="button" className="flex min-h-12 w-full items-center justify-center gap-3 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-800 transition hover:-translate-y-0.5 hover:shadow-md active:scale-[0.98] disabled:opacity-50">
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true"><path fill="#4285F4" d="M21.6 12.23c0-.71-.06-1.38-.18-2.04H12v3.86h5.39a4.6 4.6 0 0 1-2 3.02v2.51h3.23c1.9-1.75 2.98-4.33 2.98-7.35Z"/><path fill="#34A853" d="M12 22c2.7 0 4.96-.9 6.62-2.42l-3.22-2.51c-.9.6-2.04.96-3.4.96a6.03 6.03 0 0 1-5.67-4.18H3v2.58A10 10 0 0 0 12 22Z"/><path fill="#FBBC05" d="M6.33 13.85a6.01 6.01 0 0 1 0-3.7V7.57H3a10 10 0 0 0 0 8.86l3.33-2.58Z"/><path fill="#EA4335" d="M12 5.97c1.47 0 2.79.5 3.82 1.49l2.86-2.86A9.59 9.59 0 0 0 12 2a10 10 0 0 0-9 5.57l3.33 2.58A6.03 6.03 0 0 1 12 5.97Z"/></svg>
        {t("Registrarme con Google", "Sign up with Google")}
      </button>
      <div className="my-6 flex items-center gap-3 text-xs text-slate-500"><span className="h-px flex-1 bg-slate-200"/>{t("o con tu correo", "or with email")}<span className="h-px flex-1 bg-slate-200"/></div>
      <form onSubmit={e => void submit(e)} className="space-y-4">
        <label className="block text-sm font-semibold text-slate-700">{t("Nombre completo", "Full name")}<input className={field} value={name} onChange={e => setName(e.target.value)} minLength={2} maxLength={100} autoComplete="name" placeholder={t("Nombre y apellidos", "First and last name")} required/></label>
        <label className="block text-sm font-semibold text-slate-700">{t("Correo electrónico", "Email address")}<input className={field} type="email" value={email} onChange={e => setEmail(e.target.value)} autoComplete="email" placeholder="correo@ejemplo.com" required/></label>
        <label className="block text-sm font-semibold text-slate-700">{t("Contraseña", "Password")}<input className={field} type={reveal ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} autoComplete="new-password" minLength={8} required/></label>
        <label className="block text-sm font-semibold text-slate-700">{t("Confirmar contraseña", "Confirm password")}<input className={field} type={reveal ? "text" : "password"} value={confirmation} onChange={e => setConfirmation(e.target.value)} autoComplete="new-password" minLength={8} required/></label>
        <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-600"><input type="checkbox" checked={reveal} onChange={e => setReveal(e.target.checked)}/>{t("Mostrar contraseñas", "Show passwords")}</label>
        <button type="submit" disabled={loading} className="min-h-12 w-full rounded-xl bg-[var(--pal-accent)] px-5 py-3 font-bold text-white transition hover:brightness-90 active:scale-[0.98] disabled:opacity-50">{loading ? t("Creando cuenta...", "Creating account...") : t("Crear mi cuenta", "Create my account")}</button>
      </form>
      {error && <p role="alert" className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      <p className="mt-6 text-center text-sm text-slate-600">{t("¿Ya tienes cuenta?", "Already have an account?")} <Link href="/acceso" className="font-bold text-[var(--pal-accent)] underline-offset-4 hover:underline">{t("Ingresar", "Sign in")}</Link></p>
      <p className="mt-5 text-center text-xs text-slate-500">{t("Al registrarte aceptas nuestros", "By signing up you accept our")} <Link href="/terminos" className="underline">{t("términos", "terms")}</Link> {t("y", "and")} <Link href="/privacidad" className="underline">{t("política de privacidad", "privacy policy")}</Link>.</p>
    </>}
  </section>;
}
