"use client";
import { useState, type FormEvent } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { supabaseBrowser } from "@/lib/supabase/browser";
export default function ResetPasswordClient() {
  const { language } = useLanguage(); const en = language === "en";
  const [password, setPassword] = useState(""); const [message, setMessage] = useState(""); const [busy, setBusy] = useState(false);
  async function submit(e: FormEvent) { e.preventDefault(); setBusy(true); setMessage("");
    const { error } = await supabaseBrowser().auth.updateUser({ password });
    setMessage(error ? (en ? "Unable to change password. Open the recovery link from your email again." : "No fue posible cambiar la contraseña. Abre de nuevo el enlace de recuperación enviado a tu correo.") : (en ? "Password updated. You may sign in." : "Contraseña actualizada. Puedes iniciar sesión.")); setBusy(false);
  }
  return <form onSubmit={submit} className="mx-auto max-w-md rounded-3xl bg-white p-8 shadow-lg"><h1 className="text-2xl font-bold">{en ? "New password" : "Nueva contraseña"}</h1><input aria-label={en ? "New password" : "Nueva contraseña"} type="password" autoComplete="new-password" minLength={8} required value={password} onChange={e => setPassword(e.target.value)} className="mt-5 w-full rounded-xl border border-slate-300 p-3"/><button disabled={busy} className="mt-4 w-full rounded-xl bg-[var(--pal-accent)] p-3 font-bold text-white">{en ? "Update password" : "Actualizar contraseña"}</button>{message && <p className="mt-4 text-sm" role="status">{message}</p>}</form>;
}
