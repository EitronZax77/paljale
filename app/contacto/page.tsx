import type { Metadata } from "next";
import Link from "next/link";
import InstitutionalShell from "@/components/InstitutionalShell";
import FeedbackForm from "@/components/FeedbackForm";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Envía tus comentarios, sugerencias y consultas a PALJALE mediante nuestro formulario de contacto.",
  alternates: { canonical: "/contacto" },
  openGraph: {
    title: `Contacto | ${siteConfig.name}`,
    description: "Formulario de opiniones y sugerencias de PALJALE.",
    url: `${siteConfig.url}/contacto`,
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary",
    title: `Contacto | ${siteConfig.name}`,
    description: "Envía tus comentarios y sugerencias a PALJALE.",
  },
};

const sectionClass = "rounded-[24px] border border-[var(--pal-border)] bg-white p-5 shadow-[0_5px_20px_rgba(15,23,42,0.035)] sm:p-7";

export default function ContactoPage() {
  return (
    <InstitutionalShell
      eyebrow="Estamos para escucharte"
      title="Contacto"
      introduction="¿Tienes alguna sugerencia, comentario o encontraste un problema? Queremos conocer tu experiencia para seguir mejorando PALJALE."
    >
      <FeedbackForm />
      <section className={sectionClass}>
        <h2 className="mb-3 text-xl font-extrabold text-[var(--pal-text)] sm:text-2xl">¿En qué podemos ayudarte?</h2>
        <p>Utiliza el formulario para compartir opiniones, solicitar nuevas herramientas, reportar fallas o hacernos llegar consultas sobre el sitio.</p>
        <p className="mt-3">Si reportas un problema, describe lo que ocurrió e indica la herramienta utilizada. No envíes contraseñas, datos bancarios ni documentos confidenciales.</p>
        <p className="mt-3 text-sm text-slate-500">Los mensajes se gestionan mediante nuestro proveedor de formularios. Puedes consultar cómo tratamos los datos en nuestra Política de Privacidad.</p>
        <Link href="/privacidad" className="mt-4 inline-flex rounded-xl border border-[var(--pal-border)] px-5 py-3 text-sm font-bold text-[var(--pal-accent)] transition hover:bg-[var(--pal-tint)]">Política de Privacidad →</Link>
      </section>
    </InstitutionalShell>
  );
}
