import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PALJALE | Herramientas Digitales Gratuitas",
  description: "Edita PDFs, convierte imágenes y genera códigos QR gratis y sin registro.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XBT7CN70H7"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XBT7CN70H7');
            `,
          }}
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}