import type { Metadata } from "next";
import Link from "next/link";
import LocaleOnly from "@/components/LocaleOnly";
import EnglishInstitutionalPage from "@/components/EnglishInstitutionalPage";
import InstitutionalShell from "@/components/InstitutionalShell";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Acerca de PALJALE",
  description: "Conoce PALJALE, su propósito, su filosofía y a su creador, Eduardo Muñoz Hernández.",
  alternates: { canonical: "/acerca-de" },
  openGraph: {
    title: `Acerca de | ${siteConfig.name}`,
    description: "La historia y el propósito de PALJALE, herramientas digitales al alcance de todos.",
    url: `${siteConfig.url}/acerca-de`,
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary",
    title: `Acerca de | ${siteConfig.name}`,
    description: "Conoce el propósito y al creador de PALJALE.",
  },
};

const card = "rounded-[24px] border border-[var(--pal-border)] bg-white p-5 shadow-[0_5px_20px_rgba(15,23,42,0.035)] sm:p-7";
const heading = "mb-4 text-xl font-extrabold text-[var(--pal-text)] sm:text-2xl";

export default function AcercaDePage() {
  return (
    <InstitutionalShell
      eyebrowEn="Get to know our project"
      titleEn="About PALJALE"
      introductionEn="A project dedicated to making useful digital tools accessible to more people."
      eyebrow="Conoce nuestro proyecto"
      title="Acerca de PALJALE"
      introduction="Una plataforma creada para que las herramientas digitales útiles estén al alcance de más personas, de manera sencilla y accesible."
    >

      <LocaleOnly language="es">      <section className={card}>
        <h2 className={heading}>¿Qué es PALJALE?</h2>
        <p>PALJALE es un proyecto de herramientas digitales en línea que busca facilitar tareas cotidianas sin complicaciones ni instalaciones innecesarias. Su biblioteca está organizada por categorías para ayudarte a encontrar lo que necesitas en un mismo lugar.</p>
        <p className="mt-4">La plataforma se desarrolla por etapas e incorpora soluciones para documentos, imágenes, audio y otras necesidades digitales. Algunas categorías se encuentran en preparación y se habilitarán progresivamente.</p>
      </section>
      <section className={card}>
        <h2 className={heading}>Nuestro propósito</h2>
        <p>Construir herramientas prácticas, fáciles de entender y disponibles desde el navegador; reducir pasos innecesarios y mejorar continuamente a partir de lo que nos comparte la comunidad.</p>
        <p className="mt-4">Siempre que sea técnicamente posible, priorizamos el procesamiento local de archivos para reducir la necesidad de transferirlos a servidores externos.</p>
      </section>
      <section className="rounded-[24px] border border-[var(--pal-border)] bg-gradient-to-br from-[var(--pal-tint)] via-white to-white px-6 py-9 text-center sm:px-10">
        <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-[var(--pal-accent)]">Nuestra inspiración</p>
        <blockquote className="mx-auto mt-5 max-w-2xl text-2xl font-extrabold leading-snug tracking-[-0.035em] text-[var(--pal-text)] sm:text-3xl">“La tecnología es más valiosa cuando simplifica la vida de las personas.”</blockquote>
      </section>
      <section className={card}>
        <h2 className={heading}>El creador de PALJALE</h2>
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[var(--pal-tint)] text-[var(--pal-accent)]" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="8" r="3.5" />
              <path d="M5 20a7 7 0 0 1 14 0" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-extrabold tracking-tight text-[var(--pal-text)]">Eduardo Muñoz Hernández</h3>
            <p className="mt-1 text-sm font-semibold text-[var(--pal-accent)]">Ingeniero Industrial</p>
          </div>
        </div>
        <p className="mt-5">Apasionado por la tecnología, la innovación y la mejora continua. Con una visión enfocada en crear soluciones digitales prácticas, accesibles y útiles, busca transformar ideas en herramientas que simplifiquen las tareas cotidianas.</p>
        <p className="mt-4">PALJALE nace de esa pasión por aprender, crear y demostrar que la tecnología puede estar al alcance de todos.</p>
      </section>
      <section className={card}>
        <h2 className={heading}>Tu participación importa</h2>
        <p>Las opiniones y sugerencias de los usuarios son esenciales para decidir qué mejorar y qué nuevas herramientas desarrollar. Te invitamos a compartir tus ideas.</p>
        <Link href="/contacto#opiniones" className="mt-5 inline-flex rounded-xl bg-[var(--pal-accent)] px-5 py-3 text-sm font-bold text-white transition hover:brightness-90">Enviar una sugerencia →</Link>
      </section>
      </LocaleOnly>
      <EnglishInstitutionalPage kind="about" />
    </InstitutionalShell>
  );
}
