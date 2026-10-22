import type { Metadata } from "next";
import Link from "next/link";
import LocaleOnly from "@/components/LocaleOnly";
import EnglishInstitutionalPage from "@/components/EnglishInstitutionalPage";
import InstitutionalShell from "@/components/InstitutionalShell";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = { title: "Política de Privacidad", description: "Cómo usamos la información y cómo puedes administrar tus preferencias.", alternates: { canonical: "/privacidad" } };
const card = "rounded-[24px] border border-[var(--pal-border)] bg-white p-5 shadow-[0_5px_20px_rgba(15,23,42,0.035)] sm:p-7";
export default function Page() {
  return <InstitutionalShell eyebrow="Centro legal" eyebrowEn="Legal center" title="Política de Privacidad" titleEn="Privacy Policy" introduction="Cómo usamos la información y cómo puedes administrar tus preferencias." introductionEn="How information is used and how you can manage your choices." updatedAt="21 de octubre de 2026">
    <LocaleOnly language="es">
        <section className={card}><h2 className="mb-4 text-xl font-extrabold text-[var(--pal-text)] sm:text-2xl">1. Responsable y alcance</h2>
          <p>PALJALE ofrece herramientas digitales accesibles desde su sitio web. Este aviso explica el tratamiento de datos asociado a navegación, herramientas, analítica, contacto y funciones opcionales.</p>
          <p className="mt-4">Para solicitudes relacionadas con datos personales puedes utilizar nuestra <Link href="/contacto" className="font-semibold text-[var(--pal-accent)]">página de Contacto</Link>.</p>
        </section>
        <section className={card}><h2 className="mb-4 text-xl font-extrabold text-[var(--pal-text)] sm:text-2xl">2. Información tratada</h2>
          <p>Podemos tratar datos técnicos de navegación (como dispositivo, navegador, páginas consultadas, eventos y ubicación aproximada), mensajes que envíes voluntariamente y datos necesarios para las funciones que elijas utilizar.</p>
          <p className="mt-4">Algunas funciones permiten utilizar una cuenta opcional. Si decides registrarte, el proceso puede implicar datos de identificación de cuenta y autenticación gestionados por el servicio correspondiente. No debes compartir contraseñas a través del formulario de contacto.</p>
        </section>
        <section className={card}><h2 className="mb-4 text-xl font-extrabold text-[var(--pal-text)] sm:text-2xl">3. Calculadoras y herramientas</h2>
          <p>PALJALE organiza su oferta principal en Calculadoras, Utilidades, Plantillas, Cripto y Texto e idiomas. Las calculadoras comerciales pueden procesar cantidades y escenarios en tu navegador y algunas permiten guardar datos localmente de forma voluntaria.</p>
          <p className="mt-4">Otras rutas o funciones técnicas del sitio pueden tener requisitos distintos, incluidos servicios externos y límites de uso. No afirmamos que toda operación o todo archivo se procese exclusivamente de forma local. Revisa los avisos de la herramienta que utilices.</p>
        </section>
        <section className={card}><h2 className="mb-4 text-xl font-extrabold text-[var(--pal-text)] sm:text-2xl">4. Analítica y cookies</h2>
          <p>PALJALE dispone de Google Analytics para obtener estadísticas de uso, sujeto a la elección de consentimiento que presenta el sitio. Si rechazas, el componente de analítica no debe cargarse.</p>
          <p className="mt-4">Puedes cambiar tu elección mediante <strong>Preferencias de cookies</strong>, disponible en el pie de página. La configuración actual se refiere a analítica; no implica que hayas consentido automáticamente publicidad personalizada.</p>
        </section>
        <section className={card}><h2 className="mb-4 text-xl font-extrabold text-[var(--pal-text)] sm:text-2xl">5. Publicidad y monetización</h2>
          <p>El proyecto contempla sostener sus herramientas gratuitas mediante publicidad. La mención de anuncios no significa necesariamente que una red publicitaria ya esté instalada o activa.</p>
          <p className="mt-4">Antes de implementar cookies publicitarias o tecnologías de personalización que requieran consentimiento, se deberá actualizar la configuración de privacidad, los controles de elección y este aviso. Las donaciones a PALJALE no están disponibles actualmente.</p>
        </section>
        <section className={card}><h2 className="mb-4 text-xl font-extrabold text-[var(--pal-text)] sm:text-2xl">6. Proveedores externos</h2>
          <p>Según la función utilizada, pueden intervenir proveedores de alojamiento, medición, autenticación, formularios de contacto u otros servicios técnicos. En el código revisado se identifican integraciones con Vercel, Google Analytics y un proveedor de formularios, además de servicios utilizados por algunas herramientas.</p>
          <p className="mt-4">Cada proveedor puede tratar datos conforme a sus políticas. Las funcionalidades que requieran transmisión de archivos o solicitudes a terceros deben comunicarlo en su flujo específico.</p>
        </section>
        <section className={card}><h2 className="mb-4 text-xl font-extrabold text-[var(--pal-text)] sm:text-2xl">7. Conservación y seguridad</h2>
          <p>Los escenarios que decidas almacenar en tu navegador pueden permanecer en ese dispositivo hasta que los borres o el navegador los elimine. Los registros técnicos, datos de cuenta y mensajes pueden conservarse conforme a la finalidad y configuración del proveedor utilizado.</p>
          <p className="mt-4">Aplicamos medidas técnicas razonables, pero ningún servicio conectado a Internet puede ofrecer seguridad absoluta. Evita introducir información comercial o personal sensible cuando no sea necesaria.</p>
        </section>
        <section className={card}><h2 className="mb-4 text-xl font-extrabold text-[var(--pal-text)] sm:text-2xl">8. Derechos y opciones</h2>
          <p>Según la legislación aplicable puedes solicitar información, acceso, rectificación, cancelación u oposición respecto de datos personales tratados por PALJALE. Para ello utiliza <Link href="/contacto" className="font-semibold text-[var(--pal-accent)]">Contacto</Link>.</p>
          <p className="mt-4">También puedes administrar la información guardada localmente en tu navegador y revisar tus preferencias de cookies.</p>
        </section>
        <section className={card}><h2 className="mb-4 text-xl font-extrabold text-[var(--pal-text)] sm:text-2xl">9. Cambios al aviso</h2>
          <p>Actualizaremos este documento cuando cambien las funciones, los proveedores o el uso de datos. La fecha del encabezado identifica la versión publicada.</p>
        </section>
    </LocaleOnly>
    <EnglishInstitutionalPage kind="privacy" />
  </InstitutionalShell>;
}
