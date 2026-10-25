export const COINS:readonly {id:string;symbol:string;name:string}[];
export const FIATS:readonly string[];
export function validQuote(x:unknown):boolean;
export function conversion(amount:number,from:string,to:string,quotes:unknown[]):number|null;
export function normalizeMarkets(usd:unknown,mxn:unknown):unknown[];
