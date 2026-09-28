import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#e11d48",
};

export const metadata: Metadata = {
  title: "PALJALE | Herramientas Digitales Gratuita y Seguras",
  description: "Plataforma gratuita para unir, extraer y comprimir PDFs, editar imágenes, convertir formatos y generar códigos QR al instante.",
  keywords: ["PALJALE", "unir pdf", "comprimir pdf", "convertir imagen", "generador qr", "herramientas gratis"],
  authors: [{ name: "PALJALE Team" }],
  openGraph: {
    title: "PALJALE | Herramientas Digitales Sin Límites",
    description: "Gestiona, une, comprime y convierte tus documentos PDF, imágenes y códigos QR al instante.",
    type: "website",
    locale: "es_MX",
    siteName: "PALJALE",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="antialiased bg-slate-50 text-slate-900">
        {children}
      </body>
    </html>
  );
}