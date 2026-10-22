import type { Metadata } from "next";
import Link from "next/link";
import LocaleOnly from "@/components/LocaleOnly";
import EnglishInstitutionalPage from "@/components/EnglishInstitutionalPage";
import InstitutionalShell from "@/components/InstitutionalShell";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = { title: "Términos de Uso", description: "Condiciones para utilizar las herramientas digitales de PALJALE.", alternates: { canonical: "/terminos" } };
const card = "rounded-[24px] border border-[var(--pal-border)] bg-white p-5 shadow-[0_5px_20px_rgba(15,23,42,0.035)] sm:p-7";
export default function Page() {
  return <InstitutionalShell eyebrow="Centro legal" eyebrowEn="Legal center" title="Términos de Uso" titleEn="Terms of Use" introduction="Condiciones para utilizar las herramientas digitales de PALJALE." introductionEn="Conditions for using PALJALE digital tools." updatedAt="21 de octubre de 2026">
    <LocaleOnly language="es">
        <section className={card}><h2 className="mb-4 text-xl font-extrabold text-[var(--pal-text)] sm:text-2xl">1. Aceptación y uso</h2>
          <p>Al utilizar PALJALE aceptas estas condiciones. Si no estás de acuerdo, abstente de usar los servicios. Puedes utilizar las herramientas públicas para fines lícitos y respetando los derechos de terceros.</p>
        </section>
        <section className={card}><h2 className="mb-4 text-xl font-extrabold text-[var(--pal-text)] sm:text-2xl">2. Qué ofrece PALJALE</h2>
          <p>PALJALE es un portal de herramientas digitales organizado en Calculadoras, Utilidades, Plantillas, Cripto y Texto e idiomas. Algunas categorías o funciones pueden encontrarse en desarrollo, cambiar o dejar de estar disponibles.</p>
          <p className="mt-4">Las herramientas comerciales ayudan a realizar estimaciones matemáticas y comparar escenarios; no sustituyen asesoría financiera, fiscal, contable o legal profesional.</p>
        </section>
        <section className={card}><h2 className="mb-4 text-xl font-extrabold text-[var(--pal-text)] sm:text-2xl">3. Resultados y responsabilidad</h2>
          <p>Verifica importes, tasas, fórmulas, supuestos y resultados antes de utilizarlos para decisiones empresariales o transacciones. PALJALE no garantiza que una estimación represente resultados futuros o ganancias reales.</p>
          <p className="mt-4">No utilices el sitio para fraude, abuso de sistemas, solicitudes automatizadas perjudiciales ni actividades contrarias a la ley.</p>
        </section>
        <section className={card}><h2 className="mb-4 text-xl font-extrabold text-[var(--pal-text)] sm:text-2xl">4. Privacidad y datos</h2>
          <p>Algunas operaciones se ejecutan en el navegador, pero otras pueden utilizar servicios externos. No compartas contraseñas, documentos confidenciales o datos sensibles cuando no sea necesario. Consulta la <Link href="/privacidad" className="font-semibold text-[var(--pal-accent)]">Política de Privacidad</Link>.</p>
        </section>
        <section className={card}><h2 className="mb-4 text-xl font-extrabold text-[var(--pal-text)] sm:text-2xl">5. Disponibilidad y propiedad intelectual</h2>
          <p>El servicio puede cambiar o interrumpirse por mantenimiento, incidencias técnicas o decisiones operativas. La marca, los contenidos originales y el diseño de PALJALE están sujetos a los derechos correspondientes; las bibliotecas externas conservan sus licencias.</p>
        </section>
        <section className={card}><h2 className="mb-4 text-xl font-extrabold text-[var(--pal-text)] sm:text-2xl">6. Publicidad y gratuidad</h2>
          <p>El proyecto prioriza el acceso gratuito a las herramientas públicas y contempla financiar su operación mediante anuncios. La publicidad se identificará según corresponda y estará sujeta a los avisos y opciones de privacidad aplicables.</p>
          <p className="mt-4">Las donaciones están temporalmente deshabilitadas. No se requiere realizar una aportación para utilizar las herramientas públicas.</p>
        </section>
        <section className={card}><h2 className="mb-4 text-xl font-extrabold text-[var(--pal-text)] sm:text-2xl">7. Modificaciones y contacto</h2>
          <p>Podemos actualizar estos términos cuando cambien las herramientas, condiciones comerciales o normas aplicables. Para consultas, reportes o sugerencias utiliza <Link href="/contacto" className="font-semibold text-[var(--pal-accent)]">Contacto</Link>.</p>
        </section>
    </LocaleOnly>
    <EnglishInstitutionalPage kind="terms" />
  </InstitutionalShell>;
}
