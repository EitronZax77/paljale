/* eslint-disable @typescript-eslint/no-require-imports -- Este test usa CommonJS para probar el modulo TS transpilado en un directorio temporal. */
/* Prueba autónoma de fórmulas: TypeScript del propio proyecto, sin descargas. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const ts = require('typescript');
const file = path.join(__dirname, '..','lib','decision-math.ts');
const source = fs.readFileSync(file,'utf8');
const compiled = ts.transpileModule(source,{compilerOptions:{target:ts.ScriptTarget.ES2020,module:ts.ModuleKind.CommonJS},reportDiagnostics:true});
if(compiled.diagnostics?.length)throw Error('Errores sintácticos de fórmulas');
const tmp = fs.mkdtempSync(path.join(os.tmpdir(),'paljale-decision-check-'));
let formulas;
try {
 const target=path.join(tmp,'decision-math.cjs');
 fs.writeFileSync(target,compiled.outputText,'utf8');
 formulas=require(target);
} finally { fs.rmSync(tmp,{recursive:true,force:true}); }
const {calcMargin,calcPrice,calcVat,calcDiscount,calcBreakEven}=formulas;
const close=(actual,expected)=>assert.ok(Math.abs(actual-expected)<1e-7,`${actual} !== ${expected}`);
let passed=0;
function test(label,fn){fn();passed++;console.log(`OK ${String(passed).padStart(2,'0')} ${label}`)}
test('Margen real',()=>close(calcMargin(100,150).margin,100/3));
test('Markup real',()=>close(calcMargin(100,150).markup,50));
test('Venta con perdida',()=>close(calcMargin(150,100).profit,-50));
test('Precio con margen del 30%',()=>close(calcPrice(100,30).price,142.857142857));
test('Precio con IVA opcional',()=>close(calcPrice(100,30,16).priceWithVat,165.714285714));
test('Margen 100% inválido',()=>assert.equal(calcPrice(100,100).ok,false));
test('Agregar IVA 16%',()=>close(calcVat(1000,16,'add').total,1160));
test('Desglosar IVA 16%',()=>close(calcVat(1160,16,'extract').base,1000));
test('Descuentos 20% y 10%',()=>close(calcDiscount(1000,20,10).final,720));
test('Utilidad tras descuento',()=>close(calcDiscount(1000,20,10,700).profit,20));
test('Punto de equilibrio 167',()=>assert.equal(calcBreakEven(10000,150,90).units,167));
test('Objetivo 250 unidades',()=>assert.equal(calcBreakEven(10000,150,90,200,5000).targetUnits,250));
test('Contribucion insuficiente',()=>assert.equal(calcBreakEven(100,20,30).reason,'no-contribution'));
test('Costo fijo cero = cero unidades',()=>assert.equal(calcBreakEven(0,100,10).units,0));
test('Entradas negativas rechazadas',()=>assert.equal(calcMargin(-1,20).ok,false));
test('Tasa IVA invalida rechazada',()=>assert.equal(calcVat(100,150,'add').ok,false));
console.log(`PRUEBAS APROBADAS: ${passed}/${passed}`);
