import type { Metadata } from "next";
import LocaleOnly from "@/components/LocaleOnly";
import EnglishInstitutionalPage from "@/components/EnglishInstitutionalPage";
import InstitutionalShell from "@/components/InstitutionalShell";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description:
    "Consulta cómo PALJALE trata la información, los archivos procesados en el navegador y los datos de uso recopilados mediante servicios de analítica.",
  alternates: {
    canonical: "/privacidad",
  },
  openGraph: {
    title: `Política de Privacidad | ${siteConfig.name}`,
    description:
      "Información sobre privacidad, procesamiento local de archivos y analítica en PALJALE.",
    url: `${siteConfig.url}/privacidad`,
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary",
    title: `Política de Privacidad | ${siteConfig.name}`,
    description:
      "Información sobre privacidad, procesamiento local de archivos y analítica en PALJALE.",
  },
};

export default function PrivacidadPage() {
  return (
    <InstitutionalShell
      eyebrowEn="Legal center"
      titleEn="Privacy Policy"
      introductionEn="Learn how PALJALE protects your privacy and processes information."
      eyebrow="Centro legal"
      title="Política de Privacidad"
      introduction="Consulta cómo protegemos la privacidad y cómo funcionan los servicios digitales de PALJALE."
      updatedAt="6 de octubre de 2026"
    >

      <LocaleOnly language="es">
          <section className="rounded-[24px] border border-[var(--pal-border)] bg-white p-5 shadow-[0_5px_20px_rgba(15,23,42,0.035)] sm:p-7">
            <h2 className="text-xl font-extrabold text-[var(--pal-text)] mb-4 sm:text-2xl">
              1. Introducción
            </h2>

            <p>
              PALJALE respeta la privacidad de sus usuarios y procura
              reducir al mínimo la recopilación de información necesaria
              para ofrecer sus herramientas digitales.
            </p>

            <p className="mt-4">
              Esta Política de Privacidad explica qué información puede
              tratarse cuando utilizas PALJALE, cómo funcionan nuestras
              herramientas y qué servicios externos utilizamos.
            </p>
          </section>

          <section className="rounded-[24px] border border-[var(--pal-border)] bg-white p-5 shadow-[0_5px_20px_rgba(15,23,42,0.035)] sm:p-7">
            <h2 className="text-xl font-extrabold text-[var(--pal-text)] mb-4 sm:text-2xl">
              2. Procesamiento de archivos
            </h2>

            <p>
              Las herramientas actuales de PALJALE para PDF, imágenes,
              conversión multimedia y códigos QR están diseñadas para
              realizar el procesamiento directamente en el navegador del
              usuario.
            </p>

            <p className="mt-4">
              Los archivos que seleccionas para utilizar estas
              herramientas no necesitan ser enviados a un servidor propio
              de PALJALE para realizar el procesamiento.
            </p>

            <p className="mt-4">
              Esto significa que PALJALE no almacena de forma intencional
              los documentos, imágenes, archivos de audio o video que
              procesas mediante estas herramientas.
            </p>

            <div className="mt-5 rounded-2xl border border-[var(--pal-border)] bg-[var(--pal-tint)] p-5 text-slate-700">
              Aun así, recomendamos no utilizar ningún servicio en línea
              para procesar información extremadamente sensible,
              confidencial o cuya manipulación esté sujeta a requisitos
              legales especiales sin evaluar previamente los riesgos
              correspondientes.
            </div>
          </section>

          <section className="rounded-[24px] border border-[var(--pal-border)] bg-white p-5 shadow-[0_5px_20px_rgba(15,23,42,0.035)] sm:p-7">
            <h2 className="text-xl font-extrabold text-[var(--pal-text)] mb-4 sm:text-2xl">
              3. Información de uso y analítica
            </h2>

            <p>
              PALJALE utiliza Google Analytics 4 para comprender de manera
              general cómo se utiliza el sitio y mejorar las herramientas
              disponibles.
            </p>

            <p className="mt-4">
              Esta información puede incluir datos técnicos y de uso como:
            </p>

            <ul className="mt-4 list-disc pl-6 space-y-2">
              <li>páginas visitadas;</li>
              <li>sesiones y eventos de navegación;</li>
              <li>tipo de navegador y dispositivo;</li>
              <li>sistema operativo;</li>
              <li>ubicación geográfica aproximada;</li>
              <li>
                acciones generales realizadas dentro de las herramientas.
              </li>
            </ul>

            <p className="mt-4">
              También podemos registrar eventos internos como apertura de
              una herramienta, carga de un archivo, procesamiento exitoso,
              error de procesamiento o descarga de un resultado.
            </p>

            <p className="mt-4">
              Estos eventos están diseñados para medir el funcionamiento
              de PALJALE y no incluyen intencionalmente el contenido de los
              archivos ni sus nombres.
            </p>
          </section>

          <section className="rounded-[24px] border border-[var(--pal-border)] bg-white p-5 shadow-[0_5px_20px_rgba(15,23,42,0.035)] sm:p-7">
            <h2 className="text-xl font-extrabold text-[var(--pal-text)] mb-4 sm:text-2xl">
              4. Cookies y tecnologías similares
            </h2>

            <p>
              Los servicios de analítica pueden utilizar cookies u otros
              identificadores para distinguir sesiones y usuarios y
              generar estadísticas de uso.
            </p>

            <p className="mt-4">
              La disponibilidad y el funcionamiento de estas tecnologías
              pueden depender de la configuración del navegador y de las
              preferencias de consentimiento aplicables al usuario.
            </p>
          </section>

          <section className="rounded-[24px] border border-[var(--pal-border)] bg-white p-5 shadow-[0_5px_20px_rgba(15,23,42,0.035)] sm:p-7">
            <h2 className="text-xl font-extrabold text-[var(--pal-text)] mb-4 sm:text-2xl">
              5. Direcciones IP
            </h2>

            <p>
              Google Analytics 4 puede utilizar temporalmente la dirección
              IP para funciones como la determinación aproximada de la
              ubicación y el procesamiento técnico de la solicitud.
            </p>

            <p className="mt-4">
              De acuerdo con la documentación de Google Analytics 4, las
              direcciones IP no se registran ni se almacenan dentro de
              Google Analytics como parte de su funcionamiento estándar.
            </p>
          </section>

          <section className="rounded-[24px] border border-[var(--pal-border)] bg-white p-5 shadow-[0_5px_20px_rgba(15,23,42,0.035)] sm:p-7">
            <h2 className="text-xl font-extrabold text-[var(--pal-text)] mb-4 sm:text-2xl">
              6. Información que no solicitamos
            </h2>

            <p>
              PALJALE no requiere actualmente la creación de una cuenta
              para utilizar sus herramientas públicas.
            </p>

            <p className="mt-4">
              No solicitamos de manera general datos como contraseñas,
              información bancaria, documentos de identidad o datos
              personales sensibles para utilizar las herramientas
              disponibles actualmente.
            </p>
          </section>

          <section className="rounded-[24px] border border-[var(--pal-border)] bg-white p-5 shadow-[0_5px_20px_rgba(15,23,42,0.035)] sm:p-7">
            <h2 className="text-xl font-extrabold text-[var(--pal-text)] mb-4 sm:text-2xl">
              7. Servicios de terceros
            </h2>

            <p>
              Algunas funciones técnicas o de medición pueden depender de
              proveedores externos. Actualmente, PALJALE utiliza Google
              Analytics para analítica del sitio y Vercel como plataforma
              de alojamiento y distribución de la aplicación.
            </p>

            <p className="mt-4">
              Estos proveedores pueden tratar determinada información
              técnica conforme a sus propios términos y políticas de
              privacidad.
            </p>
          </section>

          <section className="rounded-[24px] border border-[var(--pal-border)] bg-white p-5 shadow-[0_5px_20px_rgba(15,23,42,0.035)] sm:p-7">
            <h2 className="text-xl font-extrabold text-[var(--pal-text)] mb-4 sm:text-2xl">
              8. Conservación de información
            </h2>

            <p>
              PALJALE no conserva intencionalmente los archivos procesados
              localmente mediante sus herramientas.
            </p>

            <p className="mt-4">
              Los datos estadísticos gestionados mediante Google Analytics
              pueden conservarse de acuerdo con la configuración de
              retención establecida en dicho servicio y sus propias
              políticas.
            </p>
          </section>

          <section className="rounded-[24px] border border-[var(--pal-border)] bg-white p-5 shadow-[0_5px_20px_rgba(15,23,42,0.035)] sm:p-7">
            <h2 className="text-xl font-extrabold text-[var(--pal-text)] mb-4 sm:text-2xl">
              9. Seguridad
            </h2>

            <p>
              Adoptamos medidas razonables para reducir riesgos técnicos y
              mantener las dependencias y herramientas utilizadas por
              PALJALE en condiciones adecuadas de seguridad.
            </p>

            <p className="mt-4">
              Sin embargo, ningún sistema conectado a Internet puede
              garantizar seguridad absoluta.
            </p>
          </section>

          <section className="rounded-[24px] border border-[var(--pal-border)] bg-white p-5 shadow-[0_5px_20px_rgba(15,23,42,0.035)] sm:p-7">
            <h2 className="text-xl font-extrabold text-[var(--pal-text)] mb-4 sm:text-2xl">
              10. Privacidad de menores
            </h2>

            <p>
              PALJALE no está diseñado específicamente para recopilar datos
              personales de menores de edad. Si detectamos que se ha
              proporcionado información personal de manera inapropiada,
              procuraremos tomar las medidas razonables que correspondan.
            </p>
          </section>

          <section className="rounded-[24px] border border-[var(--pal-border)] bg-white p-5 shadow-[0_5px_20px_rgba(15,23,42,0.035)] sm:p-7">
            <h2 className="text-xl font-extrabold text-[var(--pal-text)] mb-4 sm:text-2xl">
              11. Derechos y opciones del usuario
            </h2>

            <p>
              Dependiendo de la legislación aplicable, los usuarios pueden
              tener derechos relacionados con el acceso, corrección,
              eliminación, oposición o limitación del tratamiento de sus
              datos personales.
            </p>

            <p className="mt-4">
              También puedes utilizar las opciones disponibles en tu
              navegador para administrar o eliminar cookies y otros datos
              almacenados localmente.
            </p>
          </section>

          <section className="rounded-[24px] border border-[var(--pal-border)] bg-white p-5 shadow-[0_5px_20px_rgba(15,23,42,0.035)] sm:p-7">
            <h2 className="text-xl font-extrabold text-[var(--pal-text)] mb-4 sm:text-2xl">
              12. Cambios a esta política
            </h2>

            <p>
              Esta Política de Privacidad puede actualizarse cuando PALJALE
              incorpore nuevas herramientas, servicios, proveedores,
              modelos de monetización o cuando sea necesario reflejar
              cambios técnicos o regulatorios.
            </p>

            <p className="mt-4">
              La fecha de actualización indicada al inicio de esta página
              permitirá identificar la versión vigente.
            </p>
          </section>

          <section className="rounded-[24px] border border-[var(--pal-border)] bg-white p-5 shadow-[0_5px_20px_rgba(15,23,42,0.035)] sm:p-7">
            <h2 className="text-xl font-extrabold text-[var(--pal-text)] mb-4 sm:text-2xl">
              13. Responsable y contacto
            </h2>

            <p>
              El servicio PALJALE es responsable de esta Política de
              Privacidad en relación con las funciones que administra
              directamente.
            </p>

            <p className="mt-4">
              Se habilitará una página de contacto para consultas
              relacionadas con privacidad, funcionamiento del servicio o
              solicitudes vinculadas con el tratamiento de información.
            </p>
          </section>
      </LocaleOnly>
      <EnglishInstitutionalPage kind="privacy" />
    </InstitutionalShell>
  );
}
