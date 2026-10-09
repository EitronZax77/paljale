export type ToolCategory =
  | "PDF"
  | "Imágenes"
  | "Audio"
  | "Video"
  | "Calculadoras"
  | "Crypto"
  | "Plantillas"
  | "Traductores"
  | "Utilidades";

export type ToolIcon =
  | "pdf"
  | "merge"
  | "compress"
  | "rotate"
  | "extract"
  | "image"
  | "audio"
  | "video"
  | "calculator"
  | "crypto"
  | "template"
  | "translate"
  | "qr";

export interface PaljaleTool {
  name: string;
  href: string;
  description: string;
  category: ToolCategory;
  eyebrow: string;
  icon: ToolIcon;
  keywords: string[];
}

export interface ToolGroup {
  name: ToolCategory;
  href?: string;
  description: string;
  shortDescription: string;
  icon: ToolIcon;
  isAvailable: boolean;
  keywords: string[];
  color: {
    soft: string;
    icon: string;
    text: string;
    border: string;
    button: string;
    chip: string;
  };
  tools: PaljaleTool[];
}

export const pdfTools: PaljaleTool[] = [
  {
    name: "Unir PDF",
    href: "/unir-pdf",
    description:
      "Combina dos o más documentos PDF en un único archivo.",
    category: "PDF",
    eyebrow: "PDF",
    icon: "merge",
    keywords: ["pdf", "unir", "combinar", "merge", "juntar pdf"],
  },
  {
    name: "Comprimir PDF",
    href: "/comprimir-pdf",
    description:
      "Reduce el tamaño de un PDF directamente desde tu navegador.",
    category: "PDF",
    eyebrow: "PDF",
    icon: "compress",
    keywords: ["pdf", "comprimir", "reducir", "peso", "compresión"],
  },
  {
    name: "Rotar PDF",
    href: "/rotar-pdf",
    description:
      "Gira todas o algunas páginas de un documento PDF.",
    category: "PDF",
    eyebrow: "PDF",
    icon: "rotate",
    keywords: ["pdf", "rotar", "girar", "páginas"],
  },
  {
    name: "Extraer páginas PDF",
    href: "/extraer-paginas-pdf",
    description:
      "Selecciona páginas específicas y genera un nuevo documento PDF.",
    category: "PDF",
    eyebrow: "PDF",
    icon: "extract",
    keywords: ["pdf", "extraer", "dividir", "separar", "páginas"],
  },
  {
    name: "Imagenes a PDF",
    href: "/imagenes-a-pdf",
    description: "Convierte imagenes JPG y PNG en un archivo PDF.",
    category: "PDF",
    eyebrow: "PDF",
    icon: "image",
    keywords: ["imagenes", "jpg", "png", "pdf", "convertir"],
  },
  {
    name: "PDF a imagenes",
    href: "/pdf-a-imagenes",
    description: "Convierte paginas PDF en imagenes JPG o PNG descargables.",
    category: "PDF",
    eyebrow: "PDF",
    icon: "image",
    keywords: ["pdf", "imagenes", "jpg", "png", "convertir"],
  },
  {
    name: "Firmar PDF",
    href: "/firmar-pdf",
    description: "Coloca una firma manuscrita visible en una página de tu PDF.",
    category: "PDF",
    eyebrow: "PDF",
    icon: "pdf",
    keywords: ["firmar", "firma", "pdf", "manuscrita"],
  },
  {
    name: "Proteger PDF",
    href: "/proteger-pdf",
    description: "Protege un documento PDF con una contraseña de apertura y cifrado AES-256.",
    category: "PDF",
    eyebrow: "PDF",
    icon: "pdf",
    keywords: ["proteger", "contraseña", "cifrar", "pdf", "aes"],
  },
];

const imagenesTools: PaljaleTool[] = [
  {
    name: "Herramientas de imágenes",
    href: "/imagenes",
    description:
      "Comprime y convierte imágenes JPG, PNG y WebP.",
    category: "Imágenes",
    eyebrow: "Imagen",
    icon: "image",
    keywords: ["imagen", "jpg", "png", "webp", "comprimir", "convertir"],
  },
];

const audioTools: PaljaleTool[] = [
  {
    name: "Audio y multimedia",
    href: "/conversores",
    description:
      "Convierte audio y extrae pistas desde archivos multimedia.",
    category: "Audio",
    eyebrow: "Conversión",
    icon: "audio",
    keywords: ["audio", "mp3", "wav", "aac", "video", "convertir"],
  },
];

const utilidadesTools: PaljaleTool[] = [
  {
    name: "Generador QR",
    href: "/qr",
    description:
      "Genera códigos QR listos para descargar y compartir.",
    category: "Utilidades",
    eyebrow: "Utilidad",
    icon: "qr",
    keywords: ["qr", "código qr", "codigo qr", "generador"],
  },
];

export const toolGroups: ToolGroup[] = [
  {
    name: "PDF",
    href: "/pdf",
    description: "Herramientas para unir, comprimir, rotar y extraer PDF.",
    shortDescription: "Documentos PDF y edición rápida.",
    icon: "pdf",
    isAvailable: true,
    keywords: ["pdf", "documentos", "unir", "rotar", "comprimir"],
    color: {
      soft: "bg-[#eef8fb]",
      icon: "bg-[#dff3f7]",
      text: "text-[#0a8da3]",
      border: "border-[#cbe8ef]",
      button: "bg-[#f6fbfc] hover:bg-[#edf8fa]",
      chip: "bg-[#0b92a8] text-white",
    },
    tools: pdfTools,
  },
  {
    name: "Imágenes",
    href: "/imagenes",
    description: "Compresión, conversión y optimización de imágenes.",
    shortDescription: "Trabaja con JPG, PNG y WebP.",
    icon: "image",
    isAvailable: true,
    keywords: ["imagenes", "imagen", "jpg", "png", "webp"],
    color: {
      soft: "bg-[#fff4f2]",
      icon: "bg-[#ffe5e0]",
      text: "text-[#c4474b]",
      border: "border-[#f6d6cf]",
      button: "bg-[#fff9f8] hover:bg-[#fff1ee]",
      chip: "bg-[#d9555a] text-white",
    },
    tools: imagenesTools,
  },
  {
    name: "Audio",
    href: "/conversores",
    description: "Conversión y procesamiento de audio y multimedia.",
    shortDescription: "Audio y formatos multimedia.",
    icon: "audio",
    isAvailable: true,
    keywords: ["audio", "mp3", "wav", "multimedia", "convertir"],
    color: {
      soft: "bg-[#eff4fb]",
      icon: "bg-[#dfe9f7]",
      text: "text-[#27578a]",
      border: "border-[#d4e1f1]",
      button: "bg-[#f8fbff] hover:bg-[#eef4fb]",
      chip: "bg-[#2d5e92] text-white",
    },
    tools: audioTools,
  },
  {
    name: "Video",
    description: "Conversión, compresión y exportación de video.",
    shortDescription: "Módulo planeado para video.",
    icon: "video",
    isAvailable: false,
    keywords: ["video", "mp4", "mov", "avi"],
    color: {
      soft: "bg-[#f3f0fb]",
      icon: "bg-[#e6defa]",
      text: "text-[#6b51af]",
      border: "border-[#ddd3f7]",
      button: "bg-[#faf8ff] hover:bg-[#f3efff]",
      chip: "bg-[#7157b4] text-white",
    },
    tools: [],
  },
  {
    name: "Calculadoras",
    description: "Cálculos prácticos para uso diario y profesional.",
    shortDescription: "Porcentajes, medidas y más.",
    icon: "calculator",
    isAvailable: false,
    keywords: ["calculadora", "porcentaje", "conversion", "medidas"],
    color: {
      soft: "bg-[#eef8f3]",
      icon: "bg-[#dff1e8]",
      text: "text-[#2d7d5f]",
      border: "border-[#d1e9dd]",
      button: "bg-[#f7fcf9] hover:bg-[#eef8f3]",
      chip: "bg-[#2d7d5f] text-white",
    },
    tools: [],
  },
  {
    name: "Crypto",
    description: "Herramientas para criptomonedas, cálculo y conversión.",
    shortDescription: "BTC, ETH y utilidades cripto.",
    icon: "crypto",
    isAvailable: false,
    keywords: ["crypto", "btc", "bitcoin", "ethereum", "cripto"],
    color: {
      soft: "bg-[#fff8ec]",
      icon: "bg-[#ffefcf]",
      text: "text-[#b8770e]",
      border: "border-[#f6e3b9]",
      button: "bg-[#fffdf7] hover:bg-[#fff7e8]",
      chip: "bg-[#c78a1b] text-white",
    },
    tools: [],
  },
  {
    name: "Plantillas",
    description: "Plantillas digitales listas para editar y descargar.",
    shortDescription: "Recursos, formatos y plantillas.",
    icon: "template",
    isAvailable: false,
    keywords: ["plantillas", "formatos", "recursos", "editable"],
    color: {
      soft: "bg-[#f6f3fb]",
      icon: "bg-[#ebe3f8]",
      text: "text-[#7651ac]",
      border: "border-[#e0d5f3]",
      button: "bg-[#fcfbff] hover:bg-[#f4effd]",
      chip: "bg-[#7a57b0] text-white",
    },
    tools: [],
  },
  {
    name: "Traductores",
    description: "Herramientas lingüísticas y de traducción rápida.",
    shortDescription: "Texto, idiomas y traducciones.",
    icon: "translate",
    isAvailable: false,
    keywords: ["traductor", "idiomas", "texto", "traducción"],
    color: {
      soft: "bg-[#edf8f8]",
      icon: "bg-[#dbf0f0]",
      text: "text-[#247f8a]",
      border: "border-[#d0e9ea]",
      button: "bg-[#f7fcfc] hover:bg-[#eef8f8]",
      chip: "bg-[#2b8d98] text-white",
    },
    tools: [],
  },
  {
    name: "Utilidades",
    href: "/qr",
    description: "Herramientas rápidas, generadores y utilidades diversas.",
    shortDescription: "Generadores y herramientas auxiliares.",
    icon: "qr",
    isAvailable: true,
    keywords: ["utilidades", "qr", "herramientas", "generador"],
    color: {
      soft: "bg-[#f2f7fa]",
      icon: "bg-[#e0ecf4]",
      text: "text-[#365a7d]",
      border: "border-[#d6e3ed]",
      button: "bg-[#f9fcfe] hover:bg-[#f0f6fb]",
      chip: "bg-[#45698d] text-white",
    },
    tools: utilidadesTools,
  },
];

export const paljaleTools = toolGroups.flatMap((group) => group.tools);

export const activeToolGroups = toolGroups.filter(
  (group) => group.isAvailable
);

export const toolCategories = toolGroups.map((group) => group.name);

export function getToolGroup(category: ToolCategory) {
  return toolGroups.find((group) => group.name === category);
}
