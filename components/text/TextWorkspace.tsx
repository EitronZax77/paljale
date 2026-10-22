"use client";
import {useState} from "react";
import {wordCount,charCount,nonSpaceCount,whitespaceCount,paragraphCount,lineCount,readingMinutes,processText} from "@/lib/paljale-text.mjs";
export type TextKind = 'words'|'characters'|'case'|'spaces'|'duplicates';
export default function TextWorkspace({kind}:{kind:TextKind}) {
 const [value,setValue]=useState('');
 const [caseMode,setCaseMode]=useState('upper');
 const [spaceMode,setSpaceMode]=useState('all');
 const [ignoreCase,setIgnoreCase]=useState(false);
 const [copied,setCopied]=useState(false);
 const isTransform=kind==='case'||kind==='spaces'||kind==='duplicates';
 const mode=kind==='case'?caseMode:kind==='spaces'?spaceMode:'upper';
 const transformed=processText(value,kind,mode,{ignoreCase});
 const characters=charCount(value);
 const resultCharacters=charCount(transformed);
 const origLines=lineCount(value);
 const resultLines=lineCount(transformed);
 const changed= value!==transformed;
 const stats: Array<{label:string;value:string;detail?:string}> = kind==='words' ? [
  {label:'Palabras',value:String(wordCount(value)),detail:'Separadas por espacios o saltos de línea'},
  {label:'Párrafos',value:String(paragraphCount(value))},
  {label:'Lectura estimada',value:wordCount(value)?`${Math.max(1,Math.ceil(readingMinutes(value)))} min`:'0 min',detail:'Estimación a 200 palabras por minuto'}
 ] : kind==='characters' ? [
  {label:'Caracteres totales',value:String(characters),detail:'Incluye espacios y saltos de línea'},
  {label:'Sin espacios',value:String(nonSpaceCount(value))},
  {label:'Espacios y saltos',value:String(whitespaceCount(value))}
 ] : kind==='case' ? [
  {label:'Transformación',value:caseMode==='upper'?'MAYÚSCULAS':caseMode==='lower'?'minúsculas':caseMode==='title'?'Tipo título':'Oraciones'},
  {label:'Letras modificadas',value:String([...value].filter((ch,i)=>ch!==[...transformed][i]).length)}
 ] : kind==='spaces' ? [
  {label:'Espacios eliminados',value:String(Math.max(0,characters-resultCharacters))},
  {label:'Caracteres finales',value:String(resultCharacters)}
 ] : [
  {label:'Líneas originales',value:String(origLines)},
  {label:'Líneas únicas',value:String(resultLines)},
  {label:'Líneas eliminadas',value:String(Math.max(0,origLines-resultLines))}
 ];
 const copy=async()=>{try{await navigator.clipboard.writeText(transformed);setCopied(true);}catch{setCopied(false);}};
 return <div className="grid gap-5 lg:grid-cols-2">
  <section className="rounded-[25px] border border-slate-200 bg-white p-5 sm:p-7">
   <label htmlFor="pal-text-input" className="block text-sm font-extrabold text-slate-900">{kind==='duplicates'?'Lista de líneas':kind==='spaces'?'Texto con espacios':'Tu texto'}</label>
   <p className="my-2 text-xs leading-5 text-slate-500">Introduce o pega el contenido. El procesamiento ocurre en tu navegador.</p>
   <textarea id="pal-text-input" value={value} onChange={e=>{setValue(e.target.value);setCopied(false);}} className="min-h-[220px] w-full resize-y rounded-2xl border border-slate-300 bg-white p-4 text-sm leading-7 text-slate-800 focus:outline-2 focus:outline-teal-600" placeholder={kind==='duplicates'?'Escribe una entrada en cada línea...':'Escribe o pega aquí tu texto...'} spellCheck={false}/>
   {kind==='case'&&<div className="mt-4"><label htmlFor="pal-case" className="mr-3 text-sm font-bold text-slate-700">Convertir a</label><select id="pal-case" className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm" value={caseMode} onChange={e=>{setCaseMode(e.target.value);setCopied(false);}}><option value="upper">MAYÚSCULAS</option><option value="lower">minúsculas</option><option value="title">Primera letra de cada palabra</option><option value="sentence">Inicio de oración</option></select></div>}
   {kind==='spaces'&&<div className="mt-4"><label htmlFor="pal-spaces" className="mb-2 block text-sm font-bold text-slate-700">¿Qué espacios deseas eliminar?</label><select id="pal-spaces" className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm" value={spaceMode} onChange={e=>{setSpaceMode(e.target.value);setCopied(false);}}><option value="all">Todos los espacios horizontales (predeterminado)</option><option value="repeated">Solo espacios repetidos</option><option value="trim">Espacios al inicio y al final de cada línea</option><option value="lines">Líneas vacías</option></select><p className="mt-2 text-xs text-slate-500">«Todos» conserva los saltos de línea; «repetidos» conserva un espacio entre palabras.</p></div>}
   {kind==='duplicates'&&<label className="mt-4 flex items-center gap-2 text-sm text-slate-700"><input type="checkbox" checked={ignoreCase} onChange={e=>{setIgnoreCase(e.target.checked);setCopied(false);}}/>Ignorar mayúsculas/minúsculas al comparar</label>}
   <div className="mt-4"><button type="button" onClick={()=>{setValue('');setCopied(false);}} disabled={!value} className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40">Limpiar</button></div>
  </section>
  <section className="rounded-[25px] border border-slate-200 bg-white p-5 sm:p-7" aria-live="polite" aria-atomic="false">
   <h2 className="text-xl font-black text-slate-900">{kind==='words'?'Análisis de palabras':kind==='characters'?'Análisis de caracteres':kind==='case'?'Texto convertido':kind==='spaces'?'Espacios eliminados':'Líneas sin duplicados'}</h2>
   <div className={`mt-5 grid gap-3 ${stats.length===3?'sm:grid-cols-3':'sm:grid-cols-2'}`}>{stats.map((s,i)=><div key={s.label} className={`rounded-2xl p-4 ${i===0?'bg-teal-50':'bg-slate-100'}`}><p className="text-xs font-bold text-slate-600">{s.label}</p><p className="mt-2 break-words text-2xl font-black text-slate-900">{s.value}</p>{s.detail&&<p className="mt-2 text-xs leading-5 text-slate-500">{s.detail}</p>}</div>)}</div>
   {isTransform ? <><label htmlFor="pal-text-output" className="mt-5 block text-sm font-bold text-slate-800">Texto procesado</label><textarea id="pal-text-output" readOnly value={transformed} className="mt-2 min-h-[155px] w-full resize-y rounded-2xl border border-slate-300 bg-slate-50 p-4 text-sm leading-7 text-slate-800"/><button type="button" disabled={!value} onClick={copy} className="mt-3 rounded-xl bg-teal-700 px-5 py-3 text-sm font-extrabold text-white hover:bg-teal-800 disabled:opacity-40">{copied?'Copiado':'Copiar resultado'}</button><p className="mt-3 text-xs leading-5 text-slate-500">{!value?'Introduce texto para empezar.':changed?'Se han aplicado los cambios indicados.':'El texto ya cumple la regla seleccionada; no se detectaron cambios.'}</p></> : <p className="mt-5 text-sm leading-7 text-slate-600">{value?kind==='words'?'Cuenta palabras y párrafos sin modificar el texto.':'Cuenta los caracteres Unicode, incluidos espacios y saltos de línea.':'Introduce texto para comenzar; los indicadores parten de cero.'}</p>}
   {kind==='characters'&&<p className="mt-4 text-xs leading-6 text-slate-500">Se cuentan puntos de código Unicode. Un emoji compuesto puede incluir varios puntos de código.</p>}
  </section>
 </div>;
}
