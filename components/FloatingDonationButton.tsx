"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";

const STRIPE_PAYMENT_LINK = "https://buy.stripe.com/4gM6oHf8B9XCbVD4AD3ks00";
const PAYMENTS_ENABLED = process.env.NEXT_PUBLIC_PALJALE_DONATIONS_ENABLED === "true";

export default function FloatingDonationButton() {
  const { language } = useLanguage();
  const [open, setOpen] = useState(false);
  const en = language === "en";

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      <div className="fixed bottom-24 right-6 z-[90]">
        <button
          type="button"
          aria-label={en ? "Support PALJALE" : "Apoyar PALJALE"}
          title={en ? "Support PALJALE" : "Apoyar PALJALE"}
          onClick={() => setOpen(true)}
          className="group relative flex h-14 w-14 items-center justify-center rounded-full border border-[var(--pal-border)] bg-white text-[var(--pal-accent)] shadow-[0_14px_35px_rgba(7,21,44,0.16)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(7,21,44,0.20)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--pal-accent)]"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-6 w-6">
            <path d="M20.8 4.6a5.3 5.3 0 0 0-7.5 0L12 5.9l-1.3-1.3a5.3 5.3 0 0 0-7.5 7.5L12 20.9l8.8-8.8a5.3 5.3 0 0 0 0-7.5Z" />
          </svg>
          <span className="pointer-events-none absolute right-16 whitespace-nowrap rounded-xl bg-[#07152c] px-3 py-2 text-xs font-bold text-white opacity-0 shadow-lg transition group-hover:opacity-100 group-focus-visible:opacity-100">
            {en ? "Support PALJALE" : "Apoyar PALJALE"}
          </span>
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-[#07152c]/55 p-4 backdrop-blur-[3px]" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false); }}>
          <section role="dialog" aria-modal="true" aria-labelledby="paljale-donation-title" aria-describedby="paljale-donation-description" className="w-full max-w-[460px] rounded-[30px] border border-[var(--pal-border)] bg-white p-6 shadow-[0_28px_100px_rgba(7,21,44,0.28)] sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--pal-tint)] text-[var(--pal-accent)]" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M20.8 4.6a5.3 5.3 0 0 0-7.5 0L12 5.9l-1.3-1.3a5.3 5.3 0 0 0-7.5 7.5L12 20.9l8.8-8.8a5.3 5.3 0 0 0 0-7.5Z" /></svg>
              </div>
              <button type="button" onClick={() => setOpen(false)} aria-label={en ? "Close" : "Cerrar"} className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-[var(--pal-accent)]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true" className="h-5 w-5"><path d="M5 5l14 14M19 5 5 19" /></svg>
              </button>
            </div>
            <h2 id="paljale-donation-title" className="mt-5 text-2xl font-black tracking-tight text-[var(--pal-text)]">
              {en ? "Support PALJALE" : "Apoya PALJALE"}
            </h2>
            <p id="paljale-donation-description" className="mt-3 text-sm leading-7 text-slate-600">
              {en ? "Your voluntary, one-time contribution helps maintain PALJALE and develop more free digital tools. Choose your amount on Stripe's secure checkout page." : "Tu aportación voluntaria y única ayuda a mantener PALJALE y desarrollar más herramientas digitales gratuitas. Elige el importe en la página de pago seguro de Stripe."}
            </p>
            <div className="mt-5 rounded-2xl border border-[var(--pal-border)] bg-[var(--pal-tint)] p-4 text-sm leading-6 text-slate-700">
              {en ? "No subscription, financial return, or exclusive benefits. The payment is processed by Stripe in MXN." : "Sin suscripción, rendimientos económicos ni beneficios exclusivos. El pago se procesa mediante Stripe en MXN."}
            </div>
            {PAYMENTS_ENABLED ? (
              <a href={STRIPE_PAYMENT_LINK} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[var(--pal-accent)] px-5 py-3 text-center text-sm font-extrabold text-white transition hover:brightness-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--pal-accent)]">
                {en ? "Continue to Stripe" : "Continuar a Stripe"}
                <span aria-hidden="true">↗</span>
              </a>
            ) : (
              <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900" role="status">
                {en ? "Contributions are not enabled yet. We are waiting for the necessary Stripe verification and confirmation." : "Las aportaciones todavía no están habilitadas. Estamos pendientes de la verificación y confirmación necesaria de Stripe."}
              </div>
            )}
            <p className="mt-4 text-center text-xs leading-5 text-slate-500">
              {en ? "PALJALE is not presenting this as a charitable tax-deductible donation." : "PALJALE no presenta este apoyo como un donativo benéfico deducible de impuestos."}
            </p>
          </section>
        </div>
      )}
    </>
  );
}
