"use client";
import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";
import { supabaseBrowser } from "@/lib/supabase/browser";

type Mode = "login" | "signup" | "recover";
export default function AuthPageClient() {
  const { language } = useLanguage();
  const en = language === "en";
  const t = (es: string, english: string) => en ? english : es;
  const params = useSearchParams();
  const [mode, setMode] = useState<Mode>(params.get("mode") === "recover" ? "recover" : "login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const root = typeof window !== "undefined" ? window.location.origin : "";
  // Same-origin next path only; no external redirect URLs.
  const requested = params.get("next") ?? "/";
  const next = requested.startsWith("/") && !requested.startsWith("//") && !requested.includes("\\") ? requested : "/";
  async function withTask(task: () => Promise<void>) {
    setBusy(true); setError(""); setMessage("");
    try { await task(); } catch (e) {
      setError(e instanceof Error && e.message === "SUPABASE_NOT_CONFIGURED" ? t("Falta configurar Supabase.", "Supabase is not configured.") : t("No se pudo completar la operación. Revisa los datos e inténtalo nuevamente.", "Could not complete the operation. Check your details and try again."));
    } finally { setBusy(false); }
  }
  function submit(event: FormEvent) {
    event.preventDefault();
    void withTask(async () => {
      const client = supabaseBrowser();
      if (mode === "recover") {
        const { error: issue } = await client.auth.resetPasswordForEmail(email, { redirectTo: `${root}/restablecer-contrasena` });
        if (issue) { setError(issue.message); return; }
        setMessage(t("Si existe una cuenta con ese correo, recibirás instrucciones para restablecer tu contraseña.", "If an account exists for that email, you'll receive password reset instructions."));
        return;
      }
      if (mode === "signup") {
        if (fullName.trim().length < 2 || fullName.trim().length > 100) { setError(t("Escribe tu nombre completo (2 a 100 caracteres).", "Enter your full name (2–100 characters).")); return; }
        if (password !== confirmPassword) { setError(t("Las contraseñas no coinciden.", "Passwords do not match.")); return; }
        const { data, error: issue } = await client.auth.signUp({ email, password, options: { emailRedirectTo: `${root}/acceso`, data: { full_name: fullName.trim() } } });
        if (issue) { setError(issue.message); return; }
        if (data.session) window.location.assign(next);
        else setMessage(t("Revisa tu correo y confirma tu cuenta para ingresar.", "Check your email and confirm your account before signing in."));
        return;
      }
      const { error: issue } = await client.auth.signInWithPassword({ email, password });
      if (issue) { setError(t("No pudimos iniciar sesión. Revisa tus datos o confirma tu correo. Si aún no tienes cuenta, puedes crear una gratis.", "Could not sign in. Check your details or confirm your email. If you are new, create a free account.")); return; }
      window.location.assign(next);
    });
  }
  function google() {
    void withTask(async () => {
      const { error: issue } = await supabaseBrowser().auth.signInWithOAuth({
        provider: "google", options: { redirectTo: `${root}${next}` },
      });
      if (issue) setError(issue.message);
    });
  }
  // Users who return to /acceso after OAuth must not remain on the login form.
  useEffect(() => {
    let live = true;
    const client = supabaseBrowser();
    const goIfAuthenticated = async () => {
      const { data } = await client.auth.getSession();
      if (live && data.session?.user) window.location.replace(next);
    };
    void goIfAuthenticated();
    const { data: { subscription } } = client.auth.onAuthStateChange((event, session) => {
      if (live && event === "SIGNED_IN" && session?.user) window.location.replace(next);
    });
    return () => { live = false; subscription.unsubscribe(); };
  }, [next]);

  const input = "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 focus:border-sky-500 focus:outline-none";
  return <section className="mx-auto w-full max-w-md rounded-3xl border border-[var(--pal-border)] bg-white p-6 shadow-xl sm:p-8">
    <h1 className="text-center text-2xl font-extrabold text-slate-900">{mode === "signup" ? t("Crear cuenta", "Create account") : mode === "recover" ? t("Recuperar contraseña", "Reset password") : t("Bienvenido a PALJALE", "Welcome to PALJALE")}</h1>
    <p className="mt-2 text-center text-sm text-slate-600">{t("Tu cuenta gratuita para las herramientas digitales de PALJALE.", "Your free account for PALJALE digital tools.")}</p>
    {mode !== "recover" && <><button type="button" onClick={google} disabled={busy} className="mt-6 w-full rounded-2xl border border-slate-300 px-4 py-3 font-bold text-slate-800 transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-md active:translate-y-0 active:scale-[0.98] disabled:opacity-50"><svg aria-hidden="true" className="mr-3 inline-block h-5 w-5 align-middle" viewBox="0 0 24 24"><path fill="#4285F4" d="M21.6 12.23c0-.71-.06-1.38-.18-2.04H12v3.86h5.39a4.6 4.6 0 0 1-2 3.02v2.51h3.23c1.9-1.75 2.98-4.33 2.98-7.35Z"/><path fill="#34A853" d="M12 22c2.7 0 4.96-.9 6.62-2.42l-3.22-2.51c-.9.6-2.04.96-3.4.96a6.03 6.03 0 0 1-5.67-4.18H3v2.58A10 10 0 0 0 12 22Z"/><path fill="#FBBC05" d="M6.33 13.85a6.01 6.01 0 0 1 0-3.7V7.57H3a10 10 0 0 0 0 8.86l3.33-2.58Z"/><path fill="#EA4335" d="M12 5.97c1.47 0 2.79.5 3.82 1.49l2.86-2.86A9.59 9.59 0 0 0 12 2a10 10 0 0 0-9 5.57l3.33 2.58A6.03 6.03 0 0 1 12 5.97Z"/></svg>{t("Continuar con Google", "Continue with Google")}</button><p className="my-4 text-center text-xs text-slate-500">{t("o utiliza tu correo electrónico", "or use your email")}</p></>}
    <form onSubmit={submit} className="space-y-4">
      {mode === "signup" && <label className="block text-sm font-semibold text-slate-700">{t("Nombre completo", "Full name")}<input type="text" autoComplete="name" minLength={2} maxLength={100} required value={fullName} onChange={e => setFullName(e.target.value)} className={`${input} mt-2`} placeholder={t("Nombre y apellidos", "First and last name")} /></label>}
      <label className="block text-sm font-semibold text-slate-700">{t("Correo electrónico", "Email")}<input type="email" autoComplete="email" required value={email} onChange={e => setEmail(e.target.value)} className={`${input} mt-2`} /></label>
      {mode !== "recover" && <label className="block text-sm font-semibold text-slate-700">{t("Contraseña", "Password")}<input type={showPassword ? "text" : "password"} minLength={mode === "signup" ? 8 : undefined} autoComplete={mode === "signup" ? "new-password" : "current-password"} required value={password} onChange={e => setPassword(e.target.value)} className={`${input} mt-2`} /></label>}
      {mode !== "recover" && <label className="flex items-center gap-2 text-xs text-slate-600"><input type="checkbox" checked={showPassword} onChange={e => setShowPassword(e.target.checked)} />{t("Mostrar contraseña", "Show password")}</label>}
      {mode === "signup" && <label className="block text-sm font-semibold text-slate-700">{t("Confirmar contraseña", "Confirm password")}<input type={showPassword ? "text" : "password"} autoComplete="new-password" minLength={8} required value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className={`${input} mt-2`} /></label>}
      <button disabled={busy} type="submit" className="w-full rounded-2xl bg-[var(--pal-accent)] px-5 py-3 font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:scale-[0.98] disabled:opacity-60">{busy ? t("Procesando...", "Working...") : mode === "signup" ? t("Registrarme", "Create account") : mode === "recover" ? t("Enviar instrucciones", "Send instructions") : t("Entrar", "Sign in")}</button>
    </form>
    {error && <p role="alert" className="mt-4 rounded-lg bg-rose-50 p-3 text-sm text-rose-700">{error}</p>}
    {message && <p role="status" className="mt-4 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-800">{message}</p>}
    <div className="mt-5 flex flex-wrap justify-center gap-4 text-sm font-semibold text-slate-700">
      {mode !== "login" && <button type="button" onClick={() => { setMode("login"); setError(""); setMessage(""); }}>{t("Iniciar sesión", "Sign in")}</button>}
      {mode !== "signup" && <Link href="/registro" className="transition hover:underline active:scale-95">{t("Crear cuenta", "Create account")}</Link>}
      {mode === "login" && <button type="button" onClick={() => { setMode("recover"); setError(""); setMessage(""); }} className="cursor-pointer text-sm font-semibold text-slate-700 underline-offset-4 transition hover:text-[var(--pal-accent)] hover:underline focus-visible:underline active:scale-95">{t("Olvidé mi contraseña", "Forgot password")}</button>}
    </div>
    {error && mode === "login" && <p className="mt-2 text-center text-sm"><Link href="/registro" className="font-bold text-[var(--pal-accent)] underline underline-offset-4">{t("Crear una cuenta gratuita", "Create a free account")}</Link></p>}
    <p className="mt-6 text-center text-xs text-slate-500">{t("Al registrarte aceptas nuestros", "By signing up you agree to our")} <Link href="/terminos" className="underline">{t("términos", "terms")}</Link> {t("y", "and")} <Link href="/privacidad" className="underline">{t("política de privacidad", "privacy policy")}</Link>.</p>
  </section>;
}
