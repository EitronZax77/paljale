'use client';
import {useState} from 'react';
import {reglaTres,ageOn,dateDifference} from '@/lib/paljale-math02.mjs';
export type Math02Kind='rule'|'age'|'dates';
const dateToday=()=>{const now=new Date();return `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`};
const present=(n:number)=>new Intl.NumberFormat('es-MX',{maximumFractionDigits:8}).format(n);
export default function Math02Client({kind}:{kind:Math02Kind}){
 const [a,setA]=useState(''),[b,setB]=useState(''),[c,setC]=useState('');
 const [inclusive,setInclusive]=useState(false);
 const clear=()=>{setA('');setB('');setC('');setInclusive(false)};
 const entered=kind==='rule'?a!==''&&b!==''&&c!=='':a!==''&&b!=='';
 let result:{title:string;value:string;detail:string;more?:string}|null=null;
 let error='';
 if(entered)try{
  if(kind==='rule'){
   for(const str of [a,b,c])if(!/^[+-]?(?:\d+\.?\d*|\.\d+)$/.test(str.trim()))throw new Error('Introduce números válidos en los tres campos.');
   const value=reglaTres(Number(a),Number(b),Number(c));
   result={title:'Valor de X',value:present(value),detail:'Proporción directa: X = (B × C) ÷ A.',more:`La relación entre A (${present(Number(a))}) y B (${present(Number(b))}) se aplica a C (${present(Number(c))}).`};
  }else if(kind==='age'){
   const r=ageOn(a,b);result={title:'Edad cumplida',value:`${r.years} años`,detail:`Días hasta el próximo cumpleaños: ${r.daysUntilBirthday}.`,more:'Cálculo por fecha civil, sin estimar años dividiendo entre 365 días.'};
  }else{
   const r=dateDifference(a,b);const days=r.days+(inclusive?(r.days>=0?1:-1):0);
   result={title:'Diferencia entre fechas',value:`${present(Math.abs(days))} días`,detail:r.days>0?'La fecha final es posterior a la inicial.':r.days<0?'La fecha final es anterior a la inicial.':'Las fechas son iguales.',more:`${present(Math.trunc(Math.abs(days)/7))} semanas completas y ${Math.abs(days)%7} días restantes${inclusive?' (incluyendo ambas fechas)':''}.`};
  }
 }catch(e){error=e instanceof Error?e.message:'No fue posible calcular.'}
 const input=(id:string,label:string,value:string,onChange:(s:string)=>void,type='number',hint='')=><div><label htmlFor={id} className="block text-sm font-bold text-slate-800">{label}</label><input id={id} type={type} inputMode={type==='number'?'decimal':undefined} value={value} onChange={e=>onChange(e.target.value)} step={type==='number'?'any':undefined} className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-offset-2 focus-visible:outline-2 focus-visible:outline-teal-600" placeholder={hint||undefined}/></div>;
 return <div className="grid gap-5 lg:grid-cols-2">
  <section className="rounded-[25px] border border-slate-200 bg-white p-5 sm:p-7">
   <h2 className="text-xl font-black text-slate-900">{kind==='rule'?'Datos de la proporción':kind==='age'?'Fechas para calcular edad':'Selecciona tus fechas'}</h2>
   <p className="mt-2 text-sm leading-6 text-slate-600">{kind==='rule'?'Si A corresponde a B, ¿a cuánto corresponde C? Introduce los tres valores.':kind==='age'?'Escribe la fecha de nacimiento y la fecha en la que deseas consultar la edad.':'Elige una fecha inicial y una final; el cálculo se actualiza automáticamente.'}</p>
   <div className="mt-5 grid gap-4">
    {kind==='rule'?<>{input('rule-a','A · cantidad conocida',a,setA)}{input('rule-b','B · resultado conocido',b,setB)}{input('rule-c','C · nueva cantidad',c,setC)}</>:<>{input('date-a',kind==='age'?'Fecha de nacimiento':'Fecha inicial',a,setA,'date')}{input('date-b',kind==='age'?'Fecha de referencia':'Fecha final',b,setB,'date')}<button type="button" className="w-fit text-sm font-bold text-teal-700 underline-offset-2 hover:underline" onClick={()=>setB(dateToday())}>Usar fecha de hoy como referencia</button></>}
    {kind==='dates'&&<label className="flex items-center gap-2 text-sm text-slate-700"><input type="checkbox" checked={inclusive} onChange={e=>setInclusive(e.target.checked)}/> Incluir ambas fechas en el conteo</label>}
   </div>
   <button type="button" onClick={clear} disabled={!a&&!b&&!c&&!inclusive} className="mt-6 rounded-xl border border-slate-300 px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 disabled:opacity-40">Limpiar</button>
  </section>
  <section aria-live="polite" className="rounded-[25px] border border-slate-200 bg-white p-5 sm:p-7">
   <h2 className="text-xl font-black text-slate-900">Resultado automático</h2>
   {error?<p role="alert" className="mt-5 rounded-xl bg-red-50 p-4 text-sm text-red-800">{error}</p>:result?<div className="mt-5 space-y-4"><div className="rounded-2xl bg-teal-50 p-5"><p className="text-sm font-bold text-teal-900">{result.title}</p><p className="mt-2 break-words text-3xl font-black text-slate-900">{result.value}</p></div><p className="text-sm leading-7 text-slate-700">{result.detail}</p><p className="rounded-xl bg-slate-50 p-4 text-sm leading-7 text-slate-600">{result.more}</p></div>:<p className="mt-5 rounded-xl bg-slate-50 p-5 text-sm text-slate-600">Completa los campos para obtener el resultado. No hay valores de ejemplo precargados.</p>}
  </section>
 </div>
}
