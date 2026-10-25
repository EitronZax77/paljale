export const SATOSHIS_PER_BTC:number;
export function btcToSats(x:number):number|null;
export function satsToBtc(x:number):number|null;
export function cryptoPnl(data:{quantity:number;buyPrice:number;sellPrice:number;buyFee?:number;sellFee?:number}):{invested:number;proceeds:number;profit:number;roi:number|null}|null;
export function averageBuy(orders:{quantity:number;price:number;fee?:number}[]):{quantity:number;cost:number;average:number}|null;
export function purchaseOrderTotals(items:{quantity:number;price:number}[],taxRate?:number):{subtotal:number;tax:number;total:number}|null;
