
import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import StudioFrame from "@/components/decision/StudioFrame";
import StudioIcon from "@/components/decision/StudioIcon";
import styles from "@/components/decision/Studio.module.css";

export const metadata: Metadata = {
  title: "Utilidades | PALJALE",
  description: "Utilidades digitales: QR, contraseñas y conversión de unidades.",
  alternates: { canonical: "/utilidades" },
};

const tools = [
  { href: '/conversor-colores', title: 'Conversor de colores', detail: 'Convierte HEX, RGB y HSL con vista previa.', icon: 'compare', accent: '#7c3aed' },
  { href: '/temporizador', title: 'Temporizador', detail: 'Cuenta regresiva con pausa y reinicio.', icon: 'info', accent: '#ea580c' },
  { href: "/qr", title: "Generador QR", detail: "Crea códigos para enlaces y textos.", icon: "business", accent: "#0d9488" },
  { href: "/generador-contrasenas", title: "Generador de contraseñas", detail: "Genera claves aleatorias seguras.", icon: "lock", accent: "#2563eb" },
  { href: "/conversor-unidades", title: "Conversor de unidades", detail: "Convierte medidas y temperaturas.", icon: "calculator", accent: "#ea580c" },
];

export default function Page() {
  return <>
    <SiteHeader />
    <StudioFrame>
      <main className="mx-auto max-w-7xl space-y-9 px-4 py-8 sm:px-6 lg:px-8">
        <section className={`${styles.glass} bg-white p-7 sm:p-10`}>
          <span className="inline-flex rounded-xl bg-teal-50 p-3 text-teal-700"><StudioIcon name="tools" size={30} /></span>
          <h1 className="mt-5 text-[34px] font-black tracking-tight text-slate-900 sm:text-[42px]">Utilidades</h1>
          <p className="mt-3 max-w-2xl text-[15px] leading-7 text-slate-600">Accede a las utilidades ya construidas: códigos QR, contraseñas y conversiones de unidades.</p>
        </section>
        <section aria-label="Herramientas de utilidades" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {tools.map((tool) => <article key={tool.href} className={`${styles.tile} flex min-h-[242px] flex-col p-5 sm:p-6`}>
            <div className="mb-5 flex items-start justify-between">
              <span className="flex h-14 w-14 items-center justify-center rounded-[18px]" style={{ color: tool.accent, backgroundColor: `${tool.accent}14` }}>
                <StudioIcon name={tool.icon} size={28} />
              </span>
              <span className="rounded-full border border-slate-200 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">Utilidades</span>
            </div>
            <h2 className="text-[20px] font-extrabold tracking-tight text-slate-900">{tool.title}</h2>
            <p className="mt-2 flex-1 text-[13px] leading-6 text-slate-600">{tool.detail}</p>
            <Link href={tool.href} className={`${styles.action} mt-5 self-start`} aria-label={`Abrir ${tool.title}`}>
              Abrir herramienta <StudioIcon name="arrow" size={17} />
            </Link>
          </article>)}
        </section>
      
        
</main>
    </StudioFrame>
  </>;
}
