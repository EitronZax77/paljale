export type OrderLine = {description:string;quantity:string|number;price:string|number;unit?:string};
export type OrderRequired = {folio:string;date:string;buyer:string;supplier:string;discount:string|number;vat:string|number;lines:OrderLine[]};
export function orderTotals(lines:OrderLine[],discount?:number,vat?:number):{subtotal:number;discount:number;base:number;tax:number;total:number}|null;
export function validateOrder<T extends OrderRequired>(order:T):string[];
export function escapeHtml(text:unknown):string;
export function printDocument<T extends OrderRequired>(order:T):string;
