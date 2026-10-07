import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const rutas = [
    "",
    "/pdf",
    "/imagenes",
    "/conversores",
    "/qr",
    "/privacidad",
    "/terminos",
    "/contacto",
  ];

  const rutasLegales = new Set([
    "/privacidad",
    "/terminos",
    "/contacto",
  ]);

  return rutas.map((ruta) => ({
    url: `${siteConfig.url}${ruta}`,
    lastModified: new Date(),
    changeFrequency:
      ruta === "" ? "weekly" : "monthly",
    priority:
      ruta === ""
        ? 1
        : rutasLegales.has(ruta)
          ? 0.3
          : 0.8,
  }));
}