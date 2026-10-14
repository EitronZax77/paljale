"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { createPortal } from "react-dom";
import type { User } from "@supabase/supabase-js";
import { useLanguage } from "@/components/LanguageProvider";
import { supabaseBrowser } from "@/lib/supabase/browser";

const navLink = "rounded-2xl px-4 py-2.5 text-sm font-semibold text-slate-700 transition-all duration-200 hover:bg-[var(--pal-tint)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--pal-accent)]";


export default function AuthHeaderButton() {
  const { language } = useLanguage();
  const en = language === "en";
  const [menuPosition, setMenuPosition] = useState({ top: 0, right: 12 });
  const [logoutError, setLogoutError] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const popup = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let live = true;
    const client = supabaseBrowser();
    async function refresh() {
      const { data } = await client.auth.getUser();
      if (!live) return;
      setUser(data.user);
      if (!data.user) { setName(""); setOpen(false); return; }
      const fallback = String(data.user.user_metadata?.full_name || data.user.user_metadata?.name || data.user.email?.split("@")[0] || "");
      setName(fallback);
      const { data: profile } = await client.from("profiles").select("full_name").eq("id", data.user.id).maybeSingle();
      if (live && profile?.full_name) setName(profile.full_name);
    }
    void refresh();
    const { data: { subscription } } = client.auth.onAuthStateChange(() => { void refresh(); });
    return () => { live = false; subscription.unsubscribe(); };
  }, []);

  useEffect(() => {
    if (!open) return;
    const dismiss = (event: MouseEvent) => {
      if (wrap.current && !wrap.current.contains(event.target as Node) && !popup.current?.contains(event.target as Node)) setOpen(false);
    };
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    const reposition = () => {
      const bounds = wrap.current?.getBoundingClientRect();
      if (bounds) setMenuPosition({ top: bounds.bottom + 10, right: Math.max(12, window.innerWidth - bounds.right) });
    };
    reposition();
    window.addEventListener("resize", reposition);
    window.addEventListener("scroll", reposition, true);
    document.addEventListener("mousedown", dismiss);
    document.addEventListener("keydown", escape);
    return () => { document.removeEventListener("mousedown", dismiss); document.removeEventListener("keydown", escape); window.removeEventListener("resize", reposition); window.removeEventListener("scroll", reposition, true); };
  }, [open]);

  async function signOut() {
    setLeaving(true); setLogoutError("");
    try {
      const { error } = await supabaseBrowser().auth.signOut({ scope: "local" });
      if (error) throw error;
      setOpen(false); setUser(null);
      window.location.assign("/");
    } catch { setLogoutError(en ? "Could not sign out. Please retry." : "No se pudo cerrar sesión. Inténtalo otra vez."); }
    finally { setLeaving(false); }
  }

  if (!user) return <div className="flex items-center gap-2">
    <Link href="/acceso" className={navLink}>{en ? "Sign in" : "Ingresar"}</Link>
    <Link href="/registro" className={navLink}>{en ? "Create account" : "Crear cuenta"}</Link>
  </div>;

  const first = name.trim().split(/\s+/)[0] || (en ? "My account" : "Mi cuenta");
  return <div ref={wrap} className="relative">
    <button type="button" aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen(value => !value)} className={`${navLink} inline-flex max-w-40 items-center gap-2`}>
      <span className="truncate">{first}</span>
    </button>
    {open && typeof document !== "undefined" && createPortal(<div ref={popup} role="menu" style={{ top: menuPosition.top, right: menuPosition.right }} className="fixed z-[99999] w-64 rounded-2xl border border-[var(--pal-border)] bg-white p-2 shadow-[0_18px_48px_rgba(15,23,42,0.22)]">
      <div className="border-b border-slate-100 px-3 py-3"><p className="truncate text-sm font-bold text-slate-900">{name || first}</p><p className="truncate text-xs text-slate-500">{user.email}</p></div>
      <Link role="menuitem" href="/cuenta" onClick={() => setOpen(false)} className="mt-2 block rounded-xl px-3 py-3 text-sm font-semibold text-slate-800 transition hover:bg-[var(--pal-tint)] active:scale-[0.98]">{en ? "My profile" : "Mi perfil"}</Link>
      <button role="menuitem" type="button" onClick={() => void signOut()} disabled={leaving} className="block w-full rounded-xl px-3 py-3 text-left text-sm font-semibold text-rose-700 transition hover:bg-rose-50 active:scale-[0.98] disabled:opacity-50">{leaving ? (en ? "Signing out…" : "Cerrando sesión…") : (en ? "Sign out" : "Cerrar sesión")}</button>
      {logoutError && <p role="alert" className="px-3 py-2 text-xs text-rose-700">{logoutError}</p>}
    </div>, document.body)}
  </div>;
}
