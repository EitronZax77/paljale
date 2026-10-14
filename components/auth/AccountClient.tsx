"use client";
import { useEffect, useState, type FormEvent } from "react";
import type { User } from "@supabase/supabase-js";
import Link from "next/link";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { useLanguage } from "@/components/LanguageProvider";

type Profile = { full_name: string | null; avatar_url: string | null; auth_provider: string | null; created_at: string };
export default function AccountClient() {
  const { language } = useLanguage();
  const en = language === "en";
  const t = (es: string, english: string) => en ? english : es;
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [ready, setReady] = useState(false);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  useEffect(() => {
    let live = true;
    const client = supabaseBrowser();
    async function load() {
      const { data: auth } = await client.auth.getUser();
      if (!live) return;
      setUser(auth.user); setReady(true);
      if (!auth.user) return;
      const { data } = await client.from("profiles").select("full_name,avatar_url,auth_provider,created_at").eq("id", auth.user.id).maybeSingle();
      if (!live) return;
      const info = data as Profile | null;
      setProfile(info);
      setName(info?.full_name || String(auth.user.user_metadata?.full_name || auth.user.user_metadata?.name || ""));
    }
    void load();
    const { data: { subscription } } = client.auth.onAuthStateChange((_, session) => {
      if (!live) return;
      if (!session?.user) { setUser(null); setProfile(null); setReady(true); }
      else void load();
    });
    return () => { live = false; subscription.unsubscribe(); };
  }, []);
  async function save(e: FormEvent) {
    e.preventDefault();
    const clean = name.trim();
    if (clean.length < 2 || clean.length > 100 || !user) { setNotice(t("Introduce un nombre de 2 a 100 caracteres.", "Enter a name of 2–100 characters.")); return; }
    setBusy(true); setNotice("");
    const client = supabaseBrowser();
    const { error } = await client.from("profiles").upsert({ id: user.id, full_name: clean, updated_at: new Date().toISOString() }, { onConflict: "id" });
    if (!error) {
      const { error: metaError } = await client.auth.updateUser({ data: { full_name: clean } });
      setProfile(old => ({ full_name: clean, avatar_url: old?.avatar_url ?? null, auth_provider: old?.auth_provider ?? null, created_at: old?.created_at || user.created_at }));
      setEditing(false);
      setNotice(metaError ? t("Nombre guardado en tu perfil.", "Name saved to your profile.") : t("Nombre actualizado correctamente.", "Name updated."));
    } else setNotice(t("No se pudo guardar. Intenta de nuevo.", "Unable to save. Try again."));
    setBusy(false);
  }
  if (!ready) return <section className="mx-auto max-w-2xl rounded-3xl bg-white p-8 shadow-lg">{t("Cargando cuenta...", "Loading account...")}</section>;
  if (!user) return <section className="mx-auto max-w-2xl rounded-3xl bg-white p-8 shadow-lg"><h1 className="text-2xl font-bold">{t("Mi cuenta", "My account")}</h1><Link href="/acceso" className="mt-5 inline-block underline">{t("Inicia sesión para continuar", "Sign in to continue")}</Link></section>;
  const displayName = profile?.full_name || String(user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split("@")[0] || "PALJALE");
  const avatar = displayName.trim().charAt(0).toUpperCase();
  const provider = profile?.auth_provider || user.app_metadata?.provider || "email";
  const created = new Date(profile?.created_at || user.created_at).toLocaleDateString(en ? "en-US" : "es-MX", { year: "numeric", month: "long", day: "numeric" });
  return <section className="mx-auto w-full max-w-2xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
    <div className="bg-gradient-to-r from-sky-50 via-white to-teal-50 p-7 sm:p-9">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">PALJALE · {t("Perfil personal", "Personal profile")}</p>
      <div className="mt-5 flex items-center gap-4"><div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[var(--pal-accent)] text-3xl font-black text-white" aria-hidden="true">{avatar}</div><div className="min-w-0"><h1 className="break-words text-2xl font-extrabold text-slate-900">{displayName}</h1><p className="break-all text-sm text-slate-600">{user.email}</p></div></div>
    </div>
    <div className="space-y-6 p-7 sm:p-9">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 p-4"><p className="text-xs font-bold uppercase tracking-wide text-slate-500">{t("Método de acceso", "Sign-in method")}</p><p className="mt-1 font-semibold text-slate-900">{provider === "google" ? "Google" : t("Correo electrónico", "Email")}</p></div>
        <div className="rounded-2xl border border-slate-200 p-4"><p className="text-xs font-bold uppercase tracking-wide text-slate-500">{t("Miembro desde", "Member since")}</p><p className="mt-1 font-semibold text-slate-900">{created}</p></div>
      </div>
      {editing ? <form onSubmit={save} className="space-y-3"><label className="block text-sm font-semibold text-slate-700">{t("Nombre completo", "Full name")}<input className="mt-2 w-full rounded-xl border border-slate-300 p-3" required minLength={2} maxLength={100} value={name} onChange={e => setName(e.target.value)} /></label><div className="flex gap-3"><button type="submit" disabled={busy} className="rounded-xl bg-[var(--pal-accent)] px-5 py-3 font-bold text-white">{t("Guardar", "Save")}</button><button type="button" onClick={() => setEditing(false)} className="rounded-xl border border-slate-300 px-5 py-3">{t("Cancelar", "Cancel")}</button></div></form> : <button type="button" onClick={() => setEditing(true)} className="rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-800">{t("Editar nombre", "Edit name")}</button>}
      {notice && <p className="rounded-xl bg-slate-100 p-3 text-sm" role="status">{notice}</p>}
      <div className="flex flex-wrap items-center gap-3 border-t border-slate-100 pt-5">
        {provider !== "google" && <Link href="/acceso?mode=recover" className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold">{t("Cambiar contraseña", "Change password")}</Link>}
        <button type="button" className="rounded-xl border border-rose-200 px-5 py-3 text-sm font-semibold text-rose-700" onClick={() => void supabaseBrowser().auth.signOut({ scope: "local" }).then(({ error }) => { if (error) setNotice(t("No se pudo cerrar sesión.", "Sign out failed.")); else window.location.assign("/"); })}>{t("Cerrar sesión", "Sign out")}</button>
      </div>
      <p className="text-xs text-slate-500">{t("Para solicitar la eliminación de tu cuenta y datos personales, utiliza el formulario de Contacto. No se eliminarán datos sin verificar tu identidad.", "To request deletion of your account and personal data, use the Contact form. No data will be deleted before identity verification.")} <Link href="/contacto" className="font-semibold underline hover:text-[var(--pal-accent)]">{t("Solicitar baja de cuenta", "Request account deletion")}</Link></p>
      <p className="text-xs text-slate-500">{t("Las cuotas de uso se habilitarán en una fase posterior.", "Usage quotas will be enabled in a later phase.")}</p>
    </div>
  </section>;
}
