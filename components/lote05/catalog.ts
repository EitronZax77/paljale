export const tools=[
 {kind:'sats',href:'/btc-a-satoshis',title:'Conversor BTC y satoshis',desc:'Convierte entre bitcoin y su unidad mínima, sin consultar precios de mercado.',icon:'crypto',color:'#0d9488',category:'cripto'},
 {kind:'pnl',href:'/ganancias-cripto',title:'Ganancias y pérdidas cripto',desc:'Calcula resultado neto incluyendo comisiones de compra y venta.',icon:'chart',color:'#2563eb',category:'cripto'},
 {kind:'average',href:'/precio-promedio-cripto',title:'Precio promedio de compra',desc:'Obtén el costo promedio ponderado de varias compras de cripto.',icon:'calculator',color:'#7c3aed',category:'cripto'},
 {kind:'order',href:'/orden-de-compra',title:'Orden de compra',desc:'Crea una orden de compra con proveedor, conceptos, impuestos y vista imprimible.',icon:'receipt',color:'#ea580c',category:'plantillas'},
] as const;
export type Kind=typeof tools[number]['kind'];
