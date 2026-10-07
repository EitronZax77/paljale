import type { Metadata } from "next";
import Link from "next/link";
import BarraEfemeride from "@/components/BarraEfemeride";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Términos de Uso",
  description:
    "Consulta los términos y condiciones aplicables al uso de las herramientas digitales gratuitas de PALJALE.",
  alternates: {
    canonical: "/terminos",
  },
  openGraph: {
    title: `Términos de Uso | ${siteConfig.name}`,
    description:
      "Condiciones aplicables al acceso y uso de las herramientas digitales de PALJALE.",
    url: `${siteConfig.url}/terminos`,
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary",
    title: `Términos de Uso | ${siteConfig.name}`,
    description:
      "Condiciones aplicables al acceso y uso de las herramientas digitales de PALJALE.",
  },
};

export default function TerminosPage() {
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
            Términos de Uso
          </h1>

          <p className="text-gray-400">
            Última actualización: 6 de octubre de 2026
          </p>
        </div>

        <div className="space-y-10 text-gray-300 leading-8">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              1. Aceptación de los términos
            </h2>

            <p>
              Al acceder o utilizar PALJALE aceptas estos Términos de Uso.
              Si no estás de acuerdo con ellos, debes abstenerte de utilizar
              las herramientas y servicios disponibles en la plataforma.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              2. Descripción del servicio
            </h2>

            <p>
              PALJALE ofrece herramientas digitales que permiten realizar
              distintas operaciones directamente desde el navegador, entre
              ellas procesamiento de documentos PDF, imágenes, archivos
              multimedia y generación de códigos QR.
            </p>

            <p className="mt-4">
              Las herramientas pueden modificarse, ampliarse, sustituirse o
              retirarse conforme evolucione la plataforma.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              3. Uso permitido
            </h2>

            <p>
              Puedes utilizar PALJALE para fines personales o profesionales
              siempre que el uso sea lícito y no infrinja derechos de
              terceros.
            </p>

            <p className="mt-4">
              Eres responsable de asegurarte de que los documentos, imágenes,
              archivos de audio, video, textos o cualquier otro contenido que
              proceses mediante PALJALE puedan ser utilizados legalmente por ti.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              4. Usos prohibidos
            </h2>

            <p>
              No está permitido utilizar PALJALE para actividades ilícitas,
              fraudulentas o que puedan perjudicar la plataforma, a otros
              usuarios o a terceros.
            </p>

            <ul className="mt-4 list-disc pl-6 space-y-2">
              <li>
                procesar o distribuir contenido en violación de derechos de
                autor u otros derechos de propiedad intelectual;
              </li>
              <li>
                utilizar las herramientas con fines de fraude, suplantación o
                engaño;
              </li>
              <li>
                intentar interferir con la seguridad, estabilidad o
                disponibilidad del sitio;
              </li>
              <li>
                automatizar solicitudes de manera abusiva o generar una carga
                desproporcionada sobre la plataforma;
              </li>
              <li>
                utilizar PALJALE para introducir, distribuir o facilitar
                software malicioso;
              </li>
              <li>
                intentar obtener acceso no autorizado a sistemas, datos o
                infraestructura relacionados con PALJALE.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              5. Responsabilidad sobre los archivos
            </h2>

            <p>
              El usuario es responsable de los archivos que seleccione,
              procese, transforme, descargue o comparta mediante PALJALE.
            </p>

            <p className="mt-4">
              PALJALE no revisa de manera sistemática el contenido de los
              archivos procesados localmente en el navegador y no garantiza que
              dichos archivos sean adecuados para un propósito concreto.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              6. Procesamiento local
            </h2>

            <p>
              Las herramientas actuales de PALJALE están diseñadas para
              realizar el procesamiento directamente en el navegador del
              usuario.
            </p>

            <p className="mt-4">
              No obstante, algunas funciones técnicas, servicios de medición,
              alojamiento, distribución o futuras características pueden
              depender de proveedores externos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              7. Disponibilidad del servicio
            </h2>

            <p>
              PALJALE procura mantener sus herramientas disponibles y
              funcionales, pero no garantiza disponibilidad ininterrumpida ni
              ausencia total de errores.
            </p>

            <p className="mt-4">
              El servicio puede experimentar interrupciones por mantenimiento,
              actualizaciones, fallos técnicos, problemas de proveedores o
              circunstancias fuera de nuestro control.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              8. Resultados de las herramientas
            </h2>

            <p>
              PALJALE procura que los resultados generados por sus herramientas
              sean correctos, pero no garantiza que todos los archivos puedan
              procesarse ni que el resultado sea idéntico al obtenido mediante
              software especializado.
            </p>

            <p className="mt-4">
              Antes de eliminar archivos originales o utilizar un resultado en
              procesos críticos, recomendamos verificar que el archivo generado
              funcione correctamente y conserve la información necesaria.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              9. Copias de seguridad
            </h2>

            <p>
              El usuario debe conservar copias de seguridad de cualquier
              documento o archivo importante antes de procesarlo mediante
              PALJALE.
            </p>

            <p className="mt-4">
              PALJALE no debe utilizarse como sistema de almacenamiento o copia
              de seguridad de archivos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              10. Propiedad intelectual de PALJALE
            </h2>

            <p>
              La identidad visual, diseño, estructura, textos propios, marca y
              demás elementos originales de PALJALE están protegidos por las
              normas de propiedad intelectual que resulten aplicables.
            </p>

            <p className="mt-4">
              El uso de la plataforma no otorga derechos sobre la marca PALJALE
              ni sobre los elementos propios del servicio, salvo el derecho
              limitado de utilizar las herramientas conforme a estos términos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              11. Software y componentes de terceros
            </h2>

            <p>
              PALJALE puede utilizar bibliotecas, tecnologías o componentes de
              terceros sujetos a sus propias licencias y condiciones.
            </p>

            <p className="mt-4">
              Estos componentes continúan perteneciendo a sus respectivos
              titulares y se utilizan conforme a las licencias correspondientes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              12. Servicios de terceros
            </h2>

            <p>
              PALJALE puede depender de servicios externos relacionados con
              alojamiento, analítica, distribución de contenido u otras
              funciones técnicas.
            </p>

            <p className="mt-4">
              No controlamos de manera absoluta la disponibilidad, políticas o
              funcionamiento de servicios administrados por terceros.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              13. Publicidad y monetización
            </h2>

            <p>
              PALJALE podrá incorporar publicidad, enlaces de afiliación,
              funciones premium, APIs u otros mecanismos de monetización en el
              futuro.
            </p>

            <p className="mt-4">
              Cuando corresponda, la plataforma podrá actualizar estos términos
              y sus políticas para reflejar dichas funciones.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              14. Limitación de responsabilidad
            </h2>

            <p>
              En la medida permitida por la legislación aplicable, PALJALE no
              será responsable de pérdidas derivadas del uso incorrecto de las
              herramientas, pérdida de archivos originales, interrupciones del
              servicio, incompatibilidades, errores de conversión o decisiones
              tomadas exclusivamente con base en resultados generados mediante
              la plataforma.
            </p>

            <p className="mt-4">
              Nada en estos términos pretende excluir responsabilidades que no
              puedan limitarse legalmente.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              15. Cambios en el servicio
            </h2>

            <p>
              PALJALE puede modificar sus herramientas, límites de archivo,
              formatos compatibles, características y funcionamiento cuando sea
              necesario para mejorar, mantener o desarrollar la plataforma.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              16. Cambios a estos términos
            </h2>

            <p>
              Estos Términos de Uso pueden actualizarse para reflejar cambios
              técnicos, comerciales, regulatorios o funcionales.
            </p>

            <p className="mt-4">
              La versión vigente será la publicada en esta página y estará
              identificada por su fecha de última actualización.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              17. Privacidad
            </h2>

            <p>
              El tratamiento de información relacionado con PALJALE se explica
              con mayor detalle en nuestra Política de Privacidad.
            </p>

            <Link
              href="/privacidad"
              className="inline-flex mt-4 text-cyan-400 font-bold hover:underline"
            >
              Consultar Política de Privacidad
            </Link>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              18. Contacto
            </h2>

            <p>
              PALJALE habilitará medios de contacto para consultas relacionadas
              con el funcionamiento de la plataforma, privacidad, propiedad
              intelectual y otros asuntos vinculados con el servicio.
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