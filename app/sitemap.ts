import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const rutas = [
    // PALJALE20_SITEMAP_START
    "/calculadoras",
    "/calculadora-margen-ganancia",
    "/calculadora-precio-venta",
    "/calculadora-iva-mexico",
    "/calculadora-descuentos",
    "/calculadora-punto-equilibrio",
    // PALJALE20_SITEMAP_END
    "",
    "/pdf",
    "/imagenes",
    "/conversores",
    "/qr",
    "/unir-pdf",
    "/comprimir-pdf",
    "/rotar-pdf",
    "/extraer-paginas-pdf",
    "/imagenes-a-pdf",
    "/pdf-a-imagenes",
    "/firmar-pdf",
    "/proteger-pdf",
    "/comprimir-imagenes",
    "/convertir-imagenes",
    "/redimensionar-imagenes",
    "/recortar-imagenes",
    "/quitar-fondo-imagen",
    "/heic-a-jpg",
    "/pdf-a-word",
    "/word-a-pdf",
    "/ocr-imagen",
    "/comprimir-video",
    "/mp4-a-mp3",
    "/calculadora-porcentajes",
    "/conversor-unidades",
    "/conversor-divisas",
    "/generador-contrasenas",
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