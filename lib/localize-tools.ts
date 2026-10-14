import type { PaljaleTool, ToolGroup } from "@/lib/tools";
const names: Record<string,string> = {"PDF":"PDF","Imágenes":"Images","Audio":"Audio","Video":"Video","Calculadoras":"Calculators","Crypto":"Crypto","Plantillas":"Templates","Traductores":"Translators","Utilidades":"Utilities"};
const descriptions: Record<string,[string,string]> = {
"PDF":["Tools to merge, compress, rotate and extract PDF pages.","PDF files and quick editing."],
"Imágenes":["Image compression, conversion and optimization.","Process, convert and optimize images."],
"Audio":["Audio and multimedia conversion and processing.","Audio and multimedia formats."],
"Video":["Video conversion, compression and export.","Video tools planned."],
"Calculadoras":["Practical calculations for personal and professional use.","Percentages, units and more."],
"Crypto":["Cryptocurrency tools, calculations and conversion.","BTC, ETH and crypto utilities."],
"Plantillas":["Editable digital templates and downloadable resources.","Formats, resources and templates."],
"Traductores":["Language and quick translation tools.","Text, languages and translation."],
"Utilidades":["Quick generators and useful everyday tools.","Generators and helper tools."]
};
const tools: Record<string,[string,string]> = {
"Proteger PDF":["Password-protect PDF","Protect your PDF with an opening password and AES-256 encryption."],
"Firmar PDF":["Sign PDF","Add a visible handwritten signature to a PDF page."],
"Unir PDF":["Merge PDFs","Combine two or more PDF documents into one file."],
"Comprimir PDF":["Compress PDF","Reduce PDF file size directly in your browser."],
"Rotar PDF":["Rotate PDF","Rotate all or selected pages in a PDF document."],
"Extraer páginas PDF":["Extract PDF pages","Select specific pages and create a new PDF."],
"Herramientas de imágenes":["Image tools","Compress and convert JPG, PNG and WebP images."],
"Comprimir imágenes":["Compress images", "Reduce JPG, PNG and WebP file sizes."],
"Convertir imágenes":["Convert images", "Convert between supported image formats."],
"Redimensionar imágenes":["Resize images", "Adjust image width and height."],
"Recortar imágenes":["Crop images", "Visually select the portion to keep."],
"Quitar fondo de imágenes":["Remove image background", "Remove the background and export a transparent PNG."],
"Convertir HEIC a JPG":["Convert HEIC to JPG", "Convert iPhone HEIC and HEIF images to JPG."],
"Audio y multimedia":["Audio and multimedia","Convert audio and extract soundtracks from multimedia files."],
"Generador QR":["QR code generator","Generate downloadable, shareable QR codes."]
};
export function localizedGroup(group:ToolGroup,en:boolean) {return en ? {...group,nameDisplay:names[group.name] ?? group.name,description:descriptions[group.name]?.[0] ?? group.description,shortDescription:descriptions[group.name]?.[1] ?? group.shortDescription} : {...group,nameDisplay:group.name};}
export function localizedTool(tool:PaljaleTool,en:boolean) {return en ? {name:tools[tool.name]?.[0] ?? tool.name,description:tools[tool.name]?.[1] ?? tool.description} : {name:tool.name,description:tool.description};}
export function nameInEnglish(name:string) {return names[name] ?? name;}
