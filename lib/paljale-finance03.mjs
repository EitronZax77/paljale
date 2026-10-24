/** PALJALE L03: cálculos locales, sin APIs ni datos de ejemplo. */
const valid=(n,name)=>{if(!Number.isFinite(n))throw new Error(`${name}: introduce un número válido.`);return n};
const nonnegative=(n,name)=>{valid(n,name);if(n<0)throw new Error(`${name} no puede ser negativo.`);return n};
const positive=(n,name)=>{valid(n,name);if(n<=0)throw new Error(`${name} debe ser mayor que cero.`);return n};
export function compoundInterest({principal,annualRate,years,frequency=12}){
 nonnegative(principal,'Capital inicial');nonnegative(annualRate,'Tasa anual');positive(years,'Plazo');
 if(!Number.isInteger(frequency)||frequency<1||frequency>365)throw new Error('Frecuencia de capitalización inválida.');
 const periods=years*frequency;
 const future=principal*Math.pow(1+annualRate/100/frequency,periods);
 if(!Number.isFinite(future))throw new Error('Los valores superan el rango calculable.');
 return {future,earned:future-principal,periods};
}
export function savingsPlan({initial,monthly,annualRate,months}){
 nonnegative(initial,'Ahorro inicial');nonnegative(monthly,'Aportación mensual');nonnegative(annualRate,'Tasa anual');
 if(!Number.isInteger(months)||months<1||months>1200)throw new Error('El plazo debe ser de 1 a 1200 meses enteros.');
 const r=annualRate/1200;
 let balance=initial;
 for(let i=0;i<months;i++){balance=balance*(1+r)+monthly;if(!Number.isFinite(balance))throw new Error('Los valores superan el rango calculable.');}
 const contributed=initial+monthly*months;
 return {future:balance,contributed,earned:balance-contributed,months};
}
export function calculateTip({bill,tipPercent,people=1}){
 nonnegative(bill,'Cuenta');nonnegative(tipPercent,'Propina');
 if(!Number.isInteger(people)||people<1||people>10000)throw new Error('Personas: indica un entero entre 1 y 10000.');
 const tip=bill*tipPercent/100,total=bill+tip;
 if(!Number.isFinite(total))throw new Error('Los valores superan el rango calculable.');
 return {tip,total,perPerson:total/people,tipPerPerson:tip/people};
}
export function loanPayment({amount,annualRate,months}){
 positive(amount,'Monto del préstamo');nonnegative(annualRate,'Tasa anual');
 if(!Number.isInteger(months)||months<1||months>1200)throw new Error('El plazo debe ser de 1 a 1200 meses enteros.');
 const r=annualRate/1200;
 const payment=r===0?amount/months:amount*r/(1-Math.pow(1+r,-months));
 const total=payment*months;
 if(!Number.isFinite(total))throw new Error('Los valores superan el rango calculable.');
 return {payment,total,interest:Math.max(0,total-amount)};
}
