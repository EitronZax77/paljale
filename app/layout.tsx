import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#e11d48",
};

export const metadata: Metadata = {
  title: "PALJALE | Herramientas Digitales",
  description: "Plataforma gratuita para unir, extraer y comprime PDFs, editar imágenes, convertir formatos y generar códigos QR al instante.",
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
        
        {/* Google Tag (gtag.js) inyectado directamente */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XBT7CN70H7"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XBT7CN70H7');
          `}
        </Script>
      </head>
      <body className="antialiased bg-slate-50 text-slate-900">
        {children}
      </body>
    </html>
  );
}