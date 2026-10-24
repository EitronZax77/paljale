'use client';
import {useState} from 'react';
import {compoundInterest,savingsPlan,calculateTip,loanPayment} from '@/lib/paljale-finance03.mjs';
import type {FinanceKind} from './Finance03Catalog';
const fmt=(n:number)=>new Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN',maximumFractionDigits:2}).format(n);
const specs:Record<FinanceKind,{heading:string;fields:Array<{id:string;label:string;hint:string;defaultValue?:string;integer?:boolean}>;note:string}>={
 compound:{heading:'Proyección de inversión',fields:[{id:'principal',label:'Capital inicial (MXN)',hint:'Ej. 10000'},{id:'annualRate',label:'Tasa anual (%)',hint:'Ej. 8'},{id:'years',label:'Plazo en años',hint:'Ej. 5'}],note:'Capitalización mensual; tasa anual nominal fija, sin impuestos ni comisiones.'},
 savings:{heading:'Tu plan de ahorro',fields:[{id:'initial',label:'Ahorro inicial (MXN)',hint:'Ej. 1000'},{id:'monthly',label:'Aportación mensual (MXN)',hint:'Ej. 500'},{id:'annualRate',label:'Rendimiento anual (%)',hint:'Ej. 6'},{id:'months',label:'Plazo en meses',hint:'Ej. 24',integer:true}],note:'Aportaciones al final de cada mes; rendimiento nominal fijo con capitalización mensual.'},
 tip:{heading:'Divide tu cuenta',fields:[{id:'bill',label:'Importe de la cuenta (MXN)',hint:'Ej. 850'},{id:'tipPercent',label:'Propina (%)',hint:'Ej. 10'},{id:'people',label:'Número de personas',hint:'Ej. 4',integer:true}],note:'Reparte el total en partes iguales; no incluye cargos adicionales.'},
 loan:{heading:'Datos del préstamo',fields:[{id:'amount',label:'Monto del préstamo (MXN)',hint:'Ej. 150000'},{id:'annualRate',label:'Tasa anual fija (%)',hint:'Ej. 12'},{id:'months',label:'Plazo en meses',hint:'Ej. 36',integer:true}],note:'Mensualidad estimada con amortización de cuota fija; excluye IVA, seguros, comisiones y CAT.'},
};
export default function Finance03Client({kind}:{kind:FinanceKind}){
 const [values,setValues]=useState<Record<string,string>>({});
 const spec=specs[kind];
 const complete=spec.fields.every(f=>(values[f.id]??'').trim()!=='');
 let results:Array<{label:string;value:string;detail?:string}>=[];
 let error='';
 if(complete){
  try{
   const n:Record<string,number>={};
   for(const f of spec.fields){const s=values[f.id].trim();if(!/^(?:\d+(?:\.\d*)?|\.\d+)$/.test(s))throw new Error(`${f.label}: introduce un número válido mayor o igual a cero.`);n[f.id]=Number(s);if(f.integer&&!Number.isInteger(n[f.id]))throw new Error(`${f.label}: introduce un número entero.`);}
   if(kind==='compound'){const r=compoundInterest({principal:n.principal,annualRate:n.annualRate,years:n.years});results=[{label:'Capital final',value:fmt(r.future)},{label:'Interés acumulado',value:fmt(r.earned)},{label:'Capital aportado',value:fmt(n.principal)}];}
   if(kind==='savings'){const r=savingsPlan({initial:n.initial,monthly:n.monthly,annualRate:n.annualRate,months:n.months});results=[{label:'Ahorro proyectado',value:fmt(r.future)},{label:'Total aportado',value:fmt(r.contributed)},{label:'Rendimiento estimado',value:fmt(r.earned)}];}
   if(kind==='tip'){const r=calculateTip({bill:n.bill,tipPercent:n.tipPercent,people:n.people});results=[{label:'Total con propina',value:fmt(r.total)},{label:'Propina total',value:fmt(r.tip)},{label:'Por persona',value:fmt(r.perPerson)},{label:'Propina por persona',value:fmt(r.tipPerPerson)}];}
   if(kind==='loan'){const r=loanPayment({amount:n.amount,annualRate:n.annualRate,months:n.months});results=[{label:'Pago mensual',value:fmt(r.payment)},{label:'Total por pagar',value:fmt(r.total)},{label:'Intereses totales',value:fmt(r.interest)}];}
  }catch(e){error=e instanceof Error?e.message:'Datos inválidos.';}
 }
 return <div className="grid gap-5 lg:grid-cols-2">
  <section className="rounded-[25px] border border-slate-200 bg-white p-5 sm:p-7"><h2 className="text-xl font-black text-slate-900">{spec.heading}</h2><p className="mt-2 text-sm leading-6 text-slate-600">Completa tus datos. Los resultados se calculan automáticamente.</p><div className="mt-5 grid gap-4">{spec.fields.map(f=><div key={f.id}><label htmlFor={`finance03-${f.id}`} className="block text-sm font-bold text-slate-800">{f.label}</label><input id={`finance03-${f.id}`} type="number" inputMode={f.integer?'numeric':'decimal'} step={f.integer?'1':'any'} min="0" value={values[f.id]??''} onChange={e=>setValues(v=>({...v,[f.id]:e.target.value}))} placeholder={f.hint} className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-offset-2 focus-visible:outline-2 focus-visible:outline-teal-600"/></div>)}</div><button type="button" onClick={()=>setValues({})} disabled={!Object.values(values).some(v=>v!=='')} className="mt-6 rounded-xl border border-slate-300 px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 disabled:opacity-40">Limpiar campos</button></section>
  <section aria-live="polite" className="rounded-[25px] border border-slate-200 bg-white p-5 sm:p-7"><h2 className="text-xl font-black text-slate-900">Tu resultado</h2>{error?<p role="alert" className="mt-5 rounded-xl bg-red-50 p-4 text-sm text-red-800">{error}</p>:results.length?<div className="mt-5 grid gap-3 sm:grid-cols-2">{results.map((r,i)=><div key={r.label} className={`rounded-2xl p-4 ${i===0?'bg-teal-50':'bg-slate-100'}`}><p className="text-xs font-bold text-slate-600">{r.label}</p><p className="mt-2 break-words text-xl font-black text-slate-900">{r.value}</p></div>)}</div>:<p className="mt-5 rounded-xl bg-slate-50 p-5 text-sm text-slate-600">Introduce los valores para ver tu cálculo. No se cargan cantidades de ejemplo.</p>}<p className="mt-5 text-xs leading-6 text-slate-500">{spec.note} Los resultados son orientativos y no constituyen asesoría financiera.</p></section>
 </div>;
}
