import type { Metadata, Viewport } from "next";

import { LanguageProvider } from "@/components/LanguageProvider";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import CookieConsent from "@/components/CookieConsent";
import DynamicTheme from "@/components/DynamicTheme";
import LegalBar from "@/components/LegalBar";

import { siteConfig } from "@/lib/site";

import "./globals.css";
import "./theme-effects.css";
import "./sprite-parade.css";

export const viewport: Viewport = {
  themeColor: "#eef2f5",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),

  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },

  description: siteConfig.description,

  applicationName: siteConfig.name,

  authors: [{ name: siteConfig.name }],

  creator: siteConfig.name,

  publisher: siteConfig.name,

  keywords: [
    "herramientas digitales",
    "herramientas online gratis",
    "unir PDF",
    "comprimir PDF",
    "extraer páginas PDF",
    "rotar PDF",
    "comprimir imágenes",
    "convertir imágenes",
    "convertir audio",
    "generador QR",
    "PALJALE",
  ],

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
  },

  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={siteConfig.language}>
      <body>
        <LanguageProvider>
        <DynamicTheme />

        {children}

        <LegalBar />

        <AnalyticsTracker />

        <CookieConsent />
        </LanguageProvider>
      </body>
    </html>
  );
}
