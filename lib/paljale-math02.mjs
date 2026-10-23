export function reglaTres(a,b,c) {
 if (![a,b,c].every(Number.isFinite)) throw new Error('Introduce tres números válidos.');
 if(a===0) throw new Error('El valor A no puede ser cero.');
 const result=b*c/a;
 if(!Number.isFinite(result)) throw new Error('Resultado fuera de rango.');
 return result;
}
export function parseCivil(value){
 if(!/^\d{4}-\d{2}-\d{2}$/.test(value)) throw new Error('Introduce una fecha válida.');
 const [y,m,d]=value.split('-').map(Number);
 const stamp=Date.UTC(y,m-1,d); const date=new Date(stamp);
 if(y<100 || !Number.isFinite(stamp) || date.getUTCFullYear()!==y || date.getUTCMonth()!==m-1 || date.getUTCDate()!==d) throw new Error('Fecha de calendario inválida.');
 return {y,m,d,day:Math.round(stamp/86400000)};
}
export function ageOn(birth,reference){
 const b=parseCivil(birth),r=parseCivil(reference);
 if(b.day>r.day) throw new Error('La fecha de nacimiento no puede ser posterior a la fecha de referencia.');
 let years=r.y-b.y;
 if(r.m<b.m || r.m===b.m && r.d<b.d) years--;
 const nextYear=r.y+(r.m>b.m||r.m===b.m&&r.d>=b.d?1:0);
 const anniversaryDay=Math.min(b.d,new Date(Date.UTC(nextYear,b.m,0)).getUTCDate());
 const nextDate=Math.round(Date.UTC(nextYear,b.m-1,anniversaryDay)/86400000);
 return {years,daysUntilBirthday:nextDate-r.day};
}
export function dateDifference(start,end){
 const a=parseCivil(start),b=parseCivil(end); const days=b.day-a.day;
 return {days, weeks:Math.trunc(Math.abs(days)/7),remainingDays:Math.abs(days)%7, order:Math.sign(days)};
}
