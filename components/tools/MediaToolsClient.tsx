"use client";
import {useEffect,useRef,useState} from "react";
import {FFmpeg} from "@ffmpeg/ffmpeg";
import {fetchFile,toBlobURL} from "@ffmpeg/util";
import {useLanguage} from "@/components/LanguageProvider";
import ToolShell,{buttonClass,inputClass,secondaryClass,downloadBlob} from "@/components/tools/ToolShell";
type Mode="video"|"audio";
const MAX_BYTES=50*1024*1024;
export default function MediaToolsClient({mode}:{mode:Mode}){
 const {language}=useLanguage();const en=language==="en";const t=(es:string,eng:string)=>en?eng:es;
 const ffRef=useRef<FFmpeg|null>(null);const [file,setFile]=useState<File|null>(null);const [quality,setQuality]=useState("balanced");
 const [busy,setBusy]=useState(false);const [engineLoading,setEngineLoading]=useState(false);const [status,setStatus]=useState("");const [error,setError]=useState("");const [result,setResult]=useState<Blob|null>(null);
 useEffect(()=>()=>{try{ffRef.current?.terminate()}catch{/* worker no iniciado */}},[]);
 async function loadEngine(){if(ffRef.current)return ffRef.current;setEngineLoading(true);setStatus(t("Cargando FFmpeg local...","Loading local FFmpeg..."));
  try{const ff=new FFmpeg();ff.on("log",({message})=>{if(message.startsWith("frame=") || message.includes("time="))setStatus(message.slice(0,170));});
   await ff.load({coreURL:await toBlobURL("/ffmpeg/ffmpeg-core.js","text/javascript"),wasmURL:await toBlobURL("/ffmpeg/ffmpeg-core.wasm","application/wasm")});ffRef.current=ff;return ff;
  }finally{setEngineLoading(false);}}
 function onFile(f?:File){setResult(null);setError("");setStatus("");if(!f){setFile(null);return;}const ext=f.name.split(".").pop()?.toLowerCase()??"";
  const allowed=mode==="video"?["mp4","mov","webm","mkv","avi"]:["mp4","mov","m4v","webm","mkv"];
  if(!allowed.includes(ext)||f.size<1||f.size>MAX_BYTES){setFile(null);setError(t("Selecciona un archivo compatible de hasta 50 MB.","Choose a supported file up to 50 MB."));return;}setFile(f);
 }
 async function convert(){if(!file||busy||engineLoading)return;setBusy(true);setError("");setResult(null);let ff:FFmpeg|null=null;
  const ext=(file.name.split(".").pop()??"mp4").toLowerCase();const filename=`input.${ext}`;const out=mode==="audio"?"PALJALE_Audio.mp3":"PALJALE_Video_Comprimido.mp4";
  try{ff=await loadEngine();await ff.writeFile(filename,await fetchFile(file));setStatus(t("Procesando en este dispositivo. Puede tardar varios minutos.","Processing on this device. This may take several minutes."));
   const opts=mode==="audio"?["-i",filename,"-vn","-c:a","libmp3lame","-b:a","192k",out]:["-i",filename,"-map","0:v:0","-map","0:a?","-c:v","libx264","-preset","ultrafast","-crf",quality==="small"?"32":quality==="quality"?"24":"28","-pix_fmt","yuv420p","-c:a","aac","-b:a","96k","-movflags","+faststart",out];
   const code=await ff.exec(opts,120000);if(code!==0)throw new Error(`FFMPEG_EXIT_${code}`);const data=await ff.readFile(out);if(typeof data==="string")throw new Error("EMPTY_OUTPUT");const bytes=new Uint8Array(data);if(bytes.byteLength===0)throw new Error("EMPTY_OUTPUT");
   const blob=new Blob([bytes],{type:mode==="audio"?"audio/mpeg":"video/mp4"});setResult(blob);setStatus(t("Procesamiento terminado.","Processing complete."));
  }catch(e){const message=e instanceof Error?e.message:"unknown";setError(t(`No se pudo procesar este archivo (${message.slice(0,45)}). Comprueba el formato y la compatibilidad de tu navegador.`,`Cannot process this file (${message.slice(0,45)}). Check the format and browser compatibility.`));}
  finally{if(ff){await ff.deleteFile(filename).catch(()=>{});await ff.deleteFile(out).catch(()=>{});}setBusy(false);}}
 const video=mode==="video";
 return <ToolShell category={video?["Video","Video"]:["Audio","Audio"]} title={video?["Comprimir video MP4","Compress MP4 video"]:["Convertir MP4 a MP3","Convert MP4 to MP3"]} description={video?["Reduce videos en tu navegador mediante FFmpeg, sin subirlos a nuestro servidor. Calidad ajustable y límite de 50 MB.","Compress videos inside your browser with FFmpeg, without uploading them to our server. Adjustable quality; 50 MB limit."]:["Extrae el audio de videos MP4 a un archivo MP3 descargable, directamente en tu navegador.","Extract audio from MP4 videos into a downloadable MP3 directly in your browser."]} note={video?["La codificación de video requiere recursos de memoria y CPU. Puede tardar varios minutos, fallar en móviles antiguos o generar archivos más grandes según la fuente. Conserva siempre el original.","Video encoding uses significant memory and CPU. It may take several minutes, fail on older phones or create a larger file depending on the source. Always retain your original."]:["FFmpeg se carga desde archivos del propio sitio. Solo procesa archivos cuyo uso esté permitido.","FFmpeg is loaded from this website. Process only files you are authorized to use."]}>
   <label className="block space-y-2 text-sm font-bold">{t("Seleccionar archivo","Choose a file")}<input type="file" accept={video?"video/*,.mkv,.avi":"video/mp4,video/quicktime,video/webm,.m4v,.mkv"} onChange={e=>{onFile(e.target.files?.[0]);e.currentTarget.value="";}} className={inputClass}/></label>
   {file&&<p className="break-all rounded-xl bg-slate-50 p-4 text-sm">{file.name} · {(file.size/1048576).toFixed(2)} MB</p>}
   {video&&<label className="block space-y-2 text-sm font-bold">{t("Nivel de compresión","Compression level")}<select className={inputClass} value={quality} onChange={e=>{setQuality(e.target.value);setResult(null)}}><option value="small">{t("Mayor compresión (menos calidad)","Smaller size (lower quality)")}</option><option value="balanced">{t("Equilibrado","Balanced")}</option><option value="quality">{t("Mejor calidad (más tamaño)","Higher quality (larger file)")}</option></select></label>}
   <div className="flex flex-wrap gap-3"><button type="button" disabled={!file||busy||engineLoading} className={buttonClass} onClick={()=>void convert()}>{busy||engineLoading?t("Procesando...","Processing..."):video?t("Comprimir video","Compress video"):t("Extraer MP3","Extract MP3")}</button>{result&&<button type="button" className={secondaryClass} onClick={()=>downloadBlob(result,video?"PALJALE_Video_Comprimido.mp4":"PALJALE_Audio.mp3")}>{t("Descargar resultado","Download result")}</button>}</div>
   {status&&<p role="status" className="break-all rounded-xl bg-sky-50 p-4 text-sm text-sky-900">{status}</p>}{error&&<p role="alert" className="rounded-xl bg-rose-50 p-4 text-sm text-rose-800">{error}</p>}
   {result&&file&&<p className="text-sm font-semibold text-slate-700">{t("Archivo original","Original file")}: {(file.size/1048576).toFixed(2)} MB · {t("Resultado","Output")}: {(result.size/1048576).toFixed(2)} MB</p>}
 </ToolShell>;
}
