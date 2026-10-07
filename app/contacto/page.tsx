import type { Metadata } from "next";
import Link from "next/link";
import BarraEfemeride from "@/components/BarraEfemeride";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contacto y Acerca de",
  description:
    "Conoce PALJALE y consulta las opciones de contacto para temas relacionados con soporte, privacidad y funcionamiento del sitio.",
  alternates: {
    canonical: "/contacto",
  },
  openGraph: {
    title: `Contacto y Acerca de | ${siteConfig.name}`,
    description:
      "Información sobre PALJALE y medios de contacto relacionados con el servicio.",
    url: `${siteConfig.url}/contacto`,
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary",
    title: `Contacto y Acerca de | ${siteConfig.name}`,
    description:
      "Información sobre PALJALE y medios de contacto relacionados con el servicio.",
  },
};

export default function ContactoPage() {
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
            PALJALE
          </p>

          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-5">
            Contacto y Acerca de
          </h1>

          <p className="text-gray-400">
            Herramientas digitales gratuitas, simples y accesibles desde el navegador.
          </p>
        </div>

        <div className="space-y-10 text-gray-300 leading-8">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              Acerca de PALJALE
            </h2>

            <p>
              PALJALE es una plataforma de herramientas digitales gratuitas
              diseñada para resolver tareas comunes directamente desde el
              navegador, sin necesidad de instalar software adicional.
            </p>

            <p className="mt-4">
              Actualmente incluye funciones para trabajar con documentos PDF,
              imágenes, archivos multimedia y códigos QR.
            </p>

            <p className="mt-4">
              El proyecto está diseñado para crecer progresivamente con nuevas
              herramientas basadas en necesidades reales de los usuarios.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              Nuestra forma de trabajar
            </h2>

            <p>
              Siempre que técnicamente sea posible, PALJALE prioriza el
              procesamiento local en el navegador del usuario.
            </p>

            <p className="mt-4">
              Esto permite reducir la necesidad de transferir archivos a
              servidores externos y ayuda a mantener una experiencia más rápida,
              sencilla y privada.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              Contacto
            </h2>

            <p>
              Puedes utilizar nuestros medios de contacto para asuntos
              relacionados con:
            </p>

            <ul className="mt-4 list-disc pl-6 space-y-2">
              <li>problemas técnicos con alguna herramienta;</li>
              <li>errores o comportamientos inesperados;</li>
              <li>consultas sobre privacidad;</li>
              <li>solicitudes relacionadas con propiedad intelectual;</li>
              <li>sugerencias de nuevas herramientas;</li>
              <li>colaboraciones o propuestas comerciales.</li>
            </ul>

            <div className="mt-6 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-6">
              <p className="font-bold text-white mb-2">
                Correo de contacto
              </p>

              <p className="text-gray-300">
                El correo oficial de contacto será publicado aquí cuando quede
                habilitado para PALJALE.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              Reporte de problemas
            </h2>

            <p>
              Si encuentras un error, recomendamos indicar la herramienta que
              estabas utilizando, el tipo de archivo involucrado y una
              descripción general del problema.
            </p>

            <p className="mt-4">
              Por seguridad y privacidad, evita enviar archivos sensibles,
              información bancaria, contraseñas, documentos de identidad u otros
              datos confidenciales mediante canales de contacto no diseñados para
              ello.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              Sugerencias
            </h2>

            <p>
              PALJALE se desarrolla de manera progresiva. Las sugerencias de
              herramientas, mejoras de funcionamiento y necesidades frecuentes
              de los usuarios pueden utilizarse como referencia para futuras
              actualizaciones.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              Información legal
            </h2>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/privacidad"
                className="inline-flex items-center justify-center rounded-xl border border-cyan-500/30 px-5 py-3 text-cyan-400 font-bold hover:bg-cyan-500/10 transition"
              >
                Política de Privacidad
              </Link>

              <Link
                href="/terminos"
                className="inline-flex items-center justify-center rounded-xl border border-cyan-500/30 px-5 py-3 text-cyan-400 font-bold hover:bg-cyan-500/10 transition"
              >
                Términos de Uso
              </Link>
            </div>
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