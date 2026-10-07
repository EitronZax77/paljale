import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const rutas = [
    "",
    "/pdf",
    "/imagenes",
    "/conversores",
    "/qr",
  ];

  return rutas.map((ruta) => ({
    url: `${siteConfig.url}${ruta}`,
    lastModified: new Date(),
    changeFrequency:
      ruta === "" ? "weekly" : "monthly",
    priority:
      ruta === ""
        ? 1
        : 0.8,
  }));
}