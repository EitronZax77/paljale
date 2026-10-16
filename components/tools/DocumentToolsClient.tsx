"use client";
import {useEffect,useRef,useState} from "react";
import {useLanguage} from "@/components/LanguageProvider";
import ToolShell,{buttonClass,inputClass,secondaryClass,downloadBlob} from "@/components/tools/ToolShell";

type Mode="pdf-word"|"word-pdf"|"ocr";
const MAX_DOC=12*1024*1024;const MAX_IMAGE=10*1024*1024;const MAX_PAGES=80;
function xmlEscape(input:string){return input.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&apos;");}
async function pdfToWord(file:File,en:boolean) {
 const pdfjs=await import("pdfjs-dist"); pdfjs.GlobalWorkerOptions.workerSrc="/pdf.worker.min.mjs";
 const {default:JSZip}=await import("jszip");
 const bytes=new Uint8Array(await file.arrayBuffer());if(bytes.length<5 || new TextDecoder("ascii").decode(bytes.slice(0,5))!=="%PDF-")throw new Error("INVALID_PDF");
 const doc=await pdfjs.getDocument({data:bytes,useSystemFonts:true}).promise;
 try{
  if(doc.numPages>MAX_PAGES)throw new Error("TOO_MANY_PAGES");let content="";let foundText=false;
  for(let i=1;i<=doc.numPages;i++){
   const pg=await doc.getPage(i);const text=await pg.getTextContent();let lines:string[]=[];let line="";
   for(const item of text.items){if("str" in item){line+=item.str+(item.hasEOL?"":" ");if(item.hasEOL){lines.push(line.trim());line="";}}}
   if(line.trim())lines.push(line.trim()); if(lines.some(Boolean))foundText=true; if(!lines.length)lines=[""];
   content+=`<w:p><w:pPr><w:pStyle w:val="Heading2"/></w:pPr><w:r><w:t xml:space="preserve">${xmlEscape(`${en?"Page":"Página"} ${i}`)}</w:t></w:r></w:p>`;
   for(const l of lines){content+=`<w:p><w:r><w:t xml:space="preserve">${xmlEscape(l)}</w:t></w:r></w:p>`;}
  }
  if(!foundText)throw new Error("NO_TEXT_USE_OCR");
  const zip=new JSZip();zip.file("[Content_Types].xml",`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/></Types>`);
  zip.folder("_rels")?.file(".rels",`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>`);
  zip.folder("word")?.file("document.xml",`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body>${content}<w:sectPr><w:pgSz w:w="12240" w:h="15840"/><w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440"/></w:sectPr></w:body></w:document>`);
  return await zip.generateAsync({type:"blob",mimeType:"application/vnd.openxmlformats-officedocument.wordprocessingml.document",compression:"DEFLATE"});
 }finally{await doc.cleanup();}
}
async function docxToPdf(file:File){
 const {default:JSZip}=await import("jszip"); const {PDFDocument,StandardFonts,rgb}=await import("pdf-lib");
 const zip=await JSZip.loadAsync(await file.arrayBuffer(),{checkCRC32:true});const entry=zip.file("word/document.xml");if(!entry)throw new Error("INVALID_DOCX");
 const raw=await entry.async("string");if(raw.length>25*1024*1024)throw new Error("TOO_LARGE");
 const xml=new DOMParser().parseFromString(raw,"application/xml");if(xml.querySelector("parsererror"))throw new Error("INVALID_DOCX");
 const ns="http://schemas.openxmlformats.org/wordprocessingml/2006/main";
 const paragraphs=Array.from(xml.getElementsByTagNameNS(ns,"p")).map(node=>{
   const t=Array.from(node.getElementsByTagNameNS(ns,"t")).map(t=>t.textContent??"").join("");return t.trim();
 });
 if(paragraphs.length>6000)throw new Error("TOO_LARGE");if(!paragraphs.some(Boolean))throw new Error("NO_TEXT");
 const pdf=await PDFDocument.create();const font=await pdf.embedFont(StandardFonts.Helvetica);const size=11;const lineHeight=16;const margin=48;
 let page=pdf.addPage([595.28,841.89]);let y=page.getHeight()-margin;let pages=1;
 const pdfSafe=(text:string)=>Array.from(text).map(ch=>{try{font.encodeText(ch);return ch;}catch{return "?";}}).join("");
 function draw(line:string){if(y<margin){pages++;if(pages>MAX_PAGES)throw new Error("TOO_MANY_PAGES");page=pdf.addPage([595.28,841.89]);y=page.getHeight()-margin;}page.drawText(pdfSafe(line),{x:margin,y,size,font,color:rgb(.12,.16,.23)});y-=lineHeight;}
 for(const para of paragraphs){const words=pdfSafe(para).split(/\s+/).filter(Boolean);if(!words.length){y-=lineHeight/2;continue;}
  let line="";for(const word of words){const width=page.getWidth()-margin*2;const test=line?`${line} ${word}`:word;if(font.widthOfTextAtSize(test,size)<=width){line=test;continue;}
   if(line){draw(line);line="";}
   if(font.widthOfTextAtSize(word,size)<=width){line=word;continue;}
   // Textos muy largos sin espacios: dividir sin perder caracteres.
   let part="";for(const ch of word){const chunk=part+ch;if(font.widthOfTextAtSize(chunk,size)>width&&part){draw(part);part=ch;}else part=chunk;}line=part;
  }if(line)draw(line);y-=5;
 }
 return new Blob([new Uint8Array(await pdf.save())],{type:"application/pdf"});
}
export default function DocumentToolsClient({mode}:{mode:Mode}){
 const {language}=useLanguage();const en=language==="en";const t=(es:string,eng:string)=>en?eng:es;
 const ocr=mode==="ocr";const [file,setFile]=useState<File|null>(null);const [busy,setBusy]=useState(false);const [status,setStatus]=useState("");const [error,setError]=useState("");const [result,setResult]=useState<Blob|null>(null);const [ocrText,setOcrText]=useState("");const [preview,setPreview]=useState<string|null>(null);const workerRef=useRef<{terminate:()=>Promise<unknown>}|null>(null);
 useEffect(()=>()=>{if(workerRef.current)void workerRef.current.terminate().catch(()=>{});},[]);
 const title:[string,string]=mode==="pdf-word"?["Convertir PDF a Word editable","Convert PDF to editable Word"]:mode==="word-pdf"?["Convertir Word a PDF","Convert Word to PDF"]:["OCR — Extraer texto de imágenes","OCR — Extract text from images"];
 const description:[string,string]=mode==="pdf-word"?["Extrae el texto de un PDF y crea un archivo DOCX editable. Compatible con PDF que ya contienen texto; no reconoce PDF escaneados.","Extract text from a PDF into an editable DOCX. Intended for text PDFs, not scanned images."]:mode==="word-pdf"?["Convierte el texto de documentos DOCX sencillos a PDF descargable con texto seleccionable.","Convert text from simple DOCX documents into downloadable PDFs with selectable text."]:["Reconoce texto en fotografías PNG, JPG y WebP directamente en el navegador. Español e inglés.","Recognize text from PNG, JPG and WebP images directly in your browser. Spanish and English."];
 const note:[string,string]=ocr?["El OCR es orientativo: revisa siempre palabras, números y acentos. El motor y sus modelos de idioma pueden descargarse la primera vez. La imagen se procesa localmente.","OCR is approximate: always verify words, numbers and accents. The engine and language data may be downloaded at first use. Images are processed locally."]:["Conversión básica de texto: no conserva diseños complejos, tablas, imágenes, firmas ni tipografías exactas. Usa un editor de oficina para conversiones de fidelidad completa.","Basic text conversion only: complex layouts, tables, images, signatures and exact fonts are not preserved. Use an office editor for full-fidelity conversion."];
 function select(f?:File){setFile(null);setResult(null);setOcrText("");setStatus("");setError("");if(preview)URL.revokeObjectURL(preview);setPreview(null);if(!f)return;
  const ext=f.name.split(".").pop()?.toLowerCase();const valid=ocr?["png","jpg","jpeg","webp"].includes(ext??""):ext===(mode==="word-pdf"?"docx":"pdf");
  if(!valid||f.size<1||f.size>(ocr?MAX_IMAGE:MAX_DOC)){setError(t("Archivo incompatible o demasiado grande.","Unsupported or oversized file."));return;}setFile(f);if(ocr)setPreview(URL.createObjectURL(f));}
 async function process(){if(!file||busy)return;setBusy(true);setError("");setResult(null);setOcrText("");setStatus(t("Procesando en tu navegador...","Processing in your browser..."));
  try{if(ocr){const {createWorker}=await import("tesseract.js");const worker=await createWorker(en?"eng":"spa+eng",1,{logger:m=>{if(m.status&&m.progress!==undefined)setStatus(`${m.status}: ${Math.round(m.progress*100)}%`);}});workerRef.current=worker;
    try{const result=await worker.recognize(file);if(!result.data.text.trim())throw new Error("NO_TEXT");setOcrText(result.data.text);}finally{await worker.terminate();workerRef.current=null;}}
   else{const blob=mode==="pdf-word"?await pdfToWord(file,en):await docxToPdf(file);if(!blob.size)throw new Error("EMPTY_OUTPUT");setResult(blob);}
   setStatus(t("Listo.","Done."));
  }catch(e){const detail=e instanceof Error?e.message:"unknown";setError(t(`No fue posible completar esta operación (${detail.slice(0,55)}). Verifica que el archivo no esté dañado o protegido.`,`Could not complete this operation (${detail.slice(0,55)}). Check that the file is not corrupted or protected.`));setStatus("");}finally{setBusy(false);}}
 const extension=mode==="pdf-word"?".pdf":mode==="word-pdf"?".docx":"image/*";
 return <ToolShell title={title} description={description} category={ocr?["Imágenes","Images"]:["Documentos","Documents"]} note={note}>
   <label className="block space-y-2 text-sm font-bold">{t("Selecciona el archivo","Choose a file")}<input type="file" accept={extension} className={inputClass} onChange={e=>{select(e.target.files?.[0]);e.currentTarget.value="";}}/></label>
   {file&&<p className="break-all rounded-xl bg-slate-50 p-4 text-sm text-slate-700">{file.name} · {(file.size/1048576).toFixed(2)} MB</p>}
   {preview&&<figure className="rounded-xl bg-slate-50 p-4">{/* eslint-disable-next-line @next/next/no-img-element */}<img src={preview} alt={t("Imagen de entrada","Input image")} className="mx-auto max-h-72 object-contain"/></figure>}
   <div className="flex flex-wrap gap-3"><button type="button" className={buttonClass} disabled={!file||busy} onClick={()=>void process()}>{busy?t("Procesando...","Processing..."):ocr?t("Extraer texto","Extract text"):t("Convertir archivo","Convert file")}</button>
    {result&&<button className={secondaryClass} onClick={()=>downloadBlob(result,mode==="pdf-word"?"PALJALE_Texto_Editable.docx":"PALJALE_Word_a_PDF.pdf")}>{t("Descargar resultado","Download result")}</button>}
    {ocrText&&<button className={secondaryClass} onClick={()=>downloadBlob(new Blob([ocrText],{type:"text/plain;charset=utf-8"}),"PALJALE_Texto_OCR.txt")}>{t("Descargar TXT","Download TXT")}</button>}
   </div>
   {status&&<p className="rounded-xl bg-sky-50 p-4 text-sm text-sky-900" role="status">{status}</p>}{error&&<p role="alert" className="rounded-xl bg-rose-50 p-4 text-sm text-rose-800">{error}</p>}
   {ocrText&&<div className="space-y-3"><label htmlFor="ocr-text" className="block text-sm font-bold">{t("Texto detectado (editable)","Recognized text (editable)")}</label><textarea id="ocr-text" value={ocrText} onChange={e=>setOcrText(e.target.value)} rows={12} className={inputClass}/><button type="button" className={secondaryClass} onClick={()=>void navigator.clipboard.writeText(ocrText).then(()=>setStatus(t("Texto copiado.","Text copied."))).catch(()=>setError(t("No fue posible copiar el texto.","Could not copy text.")))}>{t("Copiar texto","Copy text")}</button></div>}
 </ToolShell>;
}
