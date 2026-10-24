export function compoundInterest(input:{principal:number;annualRate:number;years:number;frequency?:number}):{future:number;earned:number;periods:number};
export function savingsPlan(input:{initial:number;monthly:number;annualRate:number;months:number}):{future:number;contributed:number;earned:number;months:number};
export function calculateTip(input:{bill:number;tipPercent:number;people?:number}):{tip:number;total:number;perPerson:number;tipPerPerson:number};
export function loanPayment(input:{amount:number;annualRate:number;months:number}):{payment:number;total:number;interest:number};
