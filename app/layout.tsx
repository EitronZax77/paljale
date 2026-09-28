import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PALJALE | Herramientas Digitales Gratuitas",
  description: "Edita PDFs, convierte imágenes y genera códigos QR gratis, rápido y sin registro. Todo directamente en tu navegador.",
  openGraph: {
    title: "PALJALE | Herramientas Digitales",
    description: "Tu caja de herramientas gratuitas sin instalaciones.",
    siteName: "PALJALE",
    locale: "es_MX",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
