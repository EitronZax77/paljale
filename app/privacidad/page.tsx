import type { Metadata } from "next";
import Link from "next/link";
import BarraEfemeride from "@/components/BarraEfemeride";
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
    <div className="min-h-screen bg-[#060D14] text-gray-100 font-sans selection:bg-cyan-500 selection:text-black flex flex-col">
      <header className="sticky top-0 z-50 bg-[#060D14]/90 backdrop-blur-xl border-b border-cyan-900/40">
        <div className="w-full px-6 md:px-12 h-20 flex items-center justify-between">
          <Link
            href="/"
            className="text-2xl md:text-3xl font-black tracking-wider bg-gradient-to-r from-rose-500 via-orange-400 to-cyan-400 bg-clip-text text-transparent"
          >
            PALJALE
          </Link>

          <Link
            href="/"
            className="text-sm font-semibold text-cyan-400 hover:underline"
          >
            ← Volver al inicio
          </Link>
        </div>
      </header>

      <main className="w-full max-w-4xl mx-auto px-6 py-14 md:py-20 flex-1">
        <div className="mb-12">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-400 mb-3">
            Legal
          </p>

          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-5">
            Política de Privacidad
          </h1>

          <p className="text-gray-400">
            Última actualización: 6 de octubre de 2026
          </p>
        </div>

        <div className="space-y-10 text-gray-300 leading-8">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
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

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
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

            <div className="mt-5 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5 text-cyan-100">
              Aun así, recomendamos no utilizar ningún servicio en línea
              para procesar información extremadamente sensible,
              confidencial o cuya manipulación esté sujeta a requisitos
              legales especiales sin evaluar previamente los riesgos
              correspondientes.
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
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

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
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

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
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

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
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

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
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

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
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

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
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

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              10. Privacidad de menores
            </h2>

            <p>
              PALJALE no está diseñado específicamente para recopilar datos
              personales de menores de edad. Si detectamos que se ha
              proporcionado información personal de manera inapropiada,
              procuraremos tomar las medidas razonables que correspondan.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
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

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
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

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
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

          <div className="pt-4 border-t border-cyan-900/40">
            <Link
              href="/"
              className="inline-flex items-center text-cyan-400 font-bold hover:underline"
            >
              ← Regresar a PALJALE
            </Link>
          </div>
        </div>
      </main>

      <BarraEfemeride />

      <footer className="w-full border-t border-cyan-900/40 py-8 text-center text-xs text-gray-500 bg-[#04080c]">
        PALJALE © 2026 — Todos los derechos reservados.
      </footer>
    </div>
  );
}