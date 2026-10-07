import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import ConversoresToolClient from "./ConversoresToolClient";

export const metadata: Metadata = {
  title: "Conversor de Audio y Multimedia Gratis",

  description:
    "Convierte audio y extrae pistas desde archivos de video a MP3, WAV y AAC directamente en tu navegador con PALJALE.",

  alternates: {
    canonical: "/conversores",
  },

  openGraph: {
    title: "Conversor de Audio y Multimedia Gratis | PALJALE",
    description:
      "Convierte audio y extrae pistas desde video a MP3, WAV y AAC directamente en tu navegador.",
    url: `${siteConfig.url}/conversores`,
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Conversor de Audio y Multimedia Gratis | PALJALE",
    description:
      "Convierte audio y extrae pistas desde video con FFmpeg directamente en tu navegador.",
  },
};

export default function ConversoresPage() {
  return <ConversoresToolClient />;
}