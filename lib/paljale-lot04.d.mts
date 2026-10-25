export function validHex(text:string):boolean;
export function hexToRgb(text:string):{r:number;g:number;b:number}|null;
export function rgbToHex(r:number,g:number,b:number):string|null;
export function rgbToHsl(r:number,g:number,b:number):{h:number;s:number;l:number}|null;
export function hslToRgb(h:number,s:number,l:number):{r:number;g:number;b:number}|null;
export function quoteTotals(lines:Array<{quantity:number|string;price:number|string}>,iva?:number):{subtotal:number;tax:number;total:number}|null;
export function timeLabel(seconds:number):string;
