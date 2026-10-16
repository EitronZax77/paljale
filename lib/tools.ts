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
  { name: "PDF a Word", href: "/pdf-a-word", description: "Extrae texto del PDF a un DOCX editable. Conversión básica de texto.", category: "PDF", eyebrow: "PALJALE", icon: "pdf", keywords: ["pdf","word","docx","texto","convertir"] },
  { name: "Word a PDF", href: "/word-a-pdf", description: "Convierte el texto de un DOCX sencillo en PDF.", category: "PDF", eyebrow: "PALJALE", icon: "pdf", keywords: ["word","pdf","docx","convertir"] },

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
    description: "Coloca una firma manuscrita visible en una pÃ¡gina de tu PDF.",
    category: "PDF",
    eyebrow: "PDF",
    icon: "pdf",
    keywords: ["firmar", "firma", "pdf", "manuscrita"],
  },
  {
    name: "Proteger PDF",
    href: "/proteger-pdf",
    description: "Protege un documento PDF con una contraseÃ±a de apertura y cifrado AES-256.",
    category: "PDF",
    eyebrow: "PDF",
    icon: "pdf",
    keywords: ["proteger", "contraseÃ±a", "cifrar", "pdf", "aes"],
  },
];

const imagenesTools: PaljaleTool[] = [
  { name: "OCR: extraer texto", href: "/ocr-imagen", description: "Reconoce texto de fotografías e imágenes en español e inglés.", category: "Imágenes", eyebrow: "PALJALE", icon: "image", keywords: ["ocr","imagen","texto","extraer"] },

  {name:"Comprimir imágenes",href:"/comprimir-imagenes",description:"Reduce el peso de JPG, PNG y WebP.",category:"Imágenes",eyebrow:"Imagen",icon:"image",keywords:["comprimir", "optimizar", "imagen"]},
  {name:"Convertir imágenes",href:"/convertir-imagenes",description:"Convierte imágenes JPG, PNG y WebP.",category:"Imágenes",eyebrow:"Imagen",icon:"image",keywords:["convertir", "formato", "jpg", "png", "webp"]},
  {name:"Redimensionar imágenes",href:"/redimensionar-imagenes",description:"Ajusta el ancho y alto de tus imágenes.",category:"Imágenes",eyebrow:"Imagen",icon:"image",keywords:["redimensionar", "dimensiones", "escala"]},
  {name:"Recortar imágenes",href:"/recortar-imagenes",description:"Selecciona visualmente el área que deseas conservar.",category:"Imágenes",eyebrow:"Imagen",icon:"image",keywords:["recortar", "encuadrar", "seleccionar"]},
  {name:"Quitar fondo de imágenes",href:"/quitar-fondo-imagen",description:"Elimina el fondo y descarga un PNG transparente.",category:"Imágenes",eyebrow:"Imagen",icon:"image",keywords:["eliminar fondo", "quitar fondo", "transparencia"]},
  {name:"Convertir HEIC a JPG",href:"/heic-a-jpg",description:"Convierte fotografías HEIC o HEIF a JPG.",category:"Imágenes",eyebrow:"Imagen",icon:"image",keywords:["heic", "heif", "iphone", "jpg"]},
];

const audioTools: PaljaleTool[] = [
  { name: "MP4 a MP3", href: "/mp4-a-mp3", description: "Extrae audio MP3 desde videos con FFmpeg local.", category: "Audio", eyebrow: "PALJALE", icon: "audio", keywords: ["mp4","mp3","audio","convertir"] },

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
  { name: "Generador de contraseñas", href: "/generador-contrasenas", description: "Genera contraseñas seguras sin enviarlas al servidor.", category: "Utilidades", eyebrow: "PALJALE", icon: "crypto", keywords: ["password","contraseña","seguridad"] },

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

const videoTop20Tools: PaljaleTool[] = [
  { name: "Comprimir video", href: "/comprimir-video", description: "Reduce videos MP4 en el navegador con FFmpeg.", category: "Video", eyebrow: "PALJALE", icon: "video", keywords: ["mp4","video","comprimir"] },
];

const calculadorasTop20Tools: PaljaleTool[] = [
  { name: "Calculadora de porcentajes", href: "/calculadora-porcentajes", description: "Calcula proporciones y variaciones.", category: "Calculadoras", eyebrow: "PALJALE", icon: "calculator", keywords: ["porcentaje","calculadora","variacion"] },
  { name: "Conversor de unidades", href: "/conversor-unidades", description: "Convierte medidas y temperatura.", category: "Calculadoras", eyebrow: "PALJALE", icon: "calculator", keywords: ["unidades","medidas","peso","longitud"] },
  { name: "Conversor de divisas", href: "/conversor-divisas", description: "Consulta tasas de referencia fechadas.", category: "Calculadoras", eyebrow: "PALJALE", icon: "calculator", keywords: ["divisas","monedas","mexico","usd","mxn"] },
];

// PALJALE_TOP20_MASS_INSTALL_V1
const paljaleLegacyGroups: ToolGroup[] = [
  {
    name: "PDF",
    href: "/pdf",
    description: "Edita, convierte y optimiza documentos PDF.",
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
    shortDescription: "Procesa, convierte y optimiza imágenes.",
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
    href: "/comprimir-video",
    description: "Conversión, compresión y exportación de video.",
    shortDescription: "Módulo planeado para video.",
    icon: "video",
    isAvailable: true,
    keywords: ["video", "mp4", "mov", "avi"],
    color: {
      soft: "bg-[#f3f0fb]",
      icon: "bg-[#e6defa]",
      text: "text-[#6b51af]",
      border: "border-[#ddd3f7]",
      button: "bg-[#faf8ff] hover:bg-[#f3efff]",
      chip: "bg-[#7157b4] text-white",
    },
    tools: videoTop20Tools,
  },
  {
    name: "Calculadoras",
    href: "/calculadora-porcentajes",
    description: "Cálculos prácticos para uso diario y profesional.",
    shortDescription: "Porcentajes, medidas y más.",
    icon: "calculator",
    isAvailable: true,
    keywords: ["calculadora", "porcentaje", "conversion", "medidas"],
    color: {
      soft: "bg-[#eef8f3]",
      icon: "bg-[#dff1e8]",
      text: "text-[#2d7d5f]",
      border: "border-[#d1e9dd]",
      button: "bg-[#f7fcf9] hover:bg-[#eef8f3]",
      chip: "bg-[#2d7d5f] text-white",
    },
    tools: calculadorasTop20Tools,
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

// PALJALE20_CATALOG_START - enfoque en calculadoras y utilidades. Las rutas antiguas siguen intactas.
const paljaleCommercialTools: PaljaleTool[] = [
  { name: "Calculadora de margen de ganancia", href: "/calculadora-margen-ganancia", description: "Margen sobre venta, utilidad y recargo sobre costo.", category: "Calculadoras", eyebrow: "Negocios", icon: "calculator", keywords: ["margen", "ganancia", "utilidad", "comercio"] },
  { name: "Calculadora de precio de venta", href: "/calculadora-precio-venta", description: "Determina el precio con margen deseado e IVA.", category: "Calculadoras", eyebrow: "Negocios", icon: "calculator", keywords: ["precio", "venta", "margen", "negocio"] },
  { name: "Calculadora de IVA MÃ©xico", href: "/calculadora-iva-mexico", description: "Calcula y desglosa el IVA incluido o agregado.", category: "Calculadoras", eyebrow: "Negocios", icon: "calculator", keywords: ["iva", "mexico", "impuesto", "16"] },
  { name: "Calculadora de descuentos", href: "/calculadora-descuentos", description: "Descuentos sucesivos, precio final y ahorro.", category: "Calculadoras", eyebrow: "Negocios", icon: "calculator", keywords: ["descuento", "rebaja", "oferta", "porcentaje"] },
  { name: "Calculadora de punto de equilibrio", href: "/calculadora-punto-equilibrio", description: "Calcula las unidades necesarias para cubrir costos.", category: "Calculadoras", eyebrow: "Negocios", icon: "calculator", keywords: ["punto", "equilibrio", "costos", "ventas"] },
];
const paljalePublicGroups = new Set<ToolCategory>(["Calculadoras", "Utilidades", "Plantillas", "Crypto", "Traductores"]);
export const toolGroups: ToolGroup[] = paljaleLegacyGroups.filter(group => paljalePublicGroups.has(group.name)).map(group => {
  if (group.name !== "Calculadoras") return group;
  const currentTools = group.tools.filter(tool => !paljaleCommercialTools.some(next => next.href === tool.href));
  return { ...group, href: "/calculadoras", isAvailable: true, description: "Calculadoras y simuladores para MÃ©xico.", shortDescription: "Precios, IVA, descuentos, margen y mÃ¡s.", tools: [...paljaleCommercialTools, ...currentTools] };
});
// PALJALE20_CATALOG_END
export const paljaleTools = toolGroups.flatMap((group) => group.tools);

export const activeToolGroups = toolGroups.filter(
  (group) => group.isAvailable
);

export const toolCategories = toolGroups.map((group) => group.name);

export function getToolGroup(category: ToolCategory) {
  return toolGroups.find((group) => group.name === category);
}
