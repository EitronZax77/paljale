"use client";
import type {Kind,Field} from '@/lib/decision-studio';

type ExportArgs={kind:Kind;title:string;fields:Field[];values:Record<string,string>;results:Record<string,unknown>;en:boolean;vatMode:'add'|'extract';vatRate:string;vatEnabled:boolean};
const labels:Record<Kind,[string,string,string][]>={
 margen:[['profit','Utilidad por unidad','Profit per unit'],['margin','Margen sobre ventas (%)','Sales margin (%)'],['markup','Recargo sobre costo (%)','Markup on cost (%)'],['total','Utilidad total estimada','Estimated total profit']],
 precio:[['price','Precio sugerido sin IVA','Suggested price before VAT'],['profit','Utilidad unitaria','Unit profit'],['markup','Recargo sobre costo (%)','Markup (%)'],['vat','IVA aplicable','VAT amount'],['priceWithVat','Precio final con IVA','Final price with VAT']],
 iva:[['base','Base sin IVA','Amount before VAT'],['vat','Importe de IVA','VAT amount'],['total','Total con IVA','Total including VAT']],
 descuento:[['afterFirst','Precio tras primer descuento','Price after first discount'],['final','Precio final','Final price'],['savings','Ahorro total','Total savings'],['effective','Descuento efectivo (%)','Effective discount (%)'],['profit','Utilidad tras descuento','Profit after discount'],['finalMargin','Margen final (%)','Final margin (%)']],
 equilibrio:[['contribution','Contribución unitaria','Unit contribution'],['units','Unidades de equilibrio','Break-even units'],['targetUnits','Unidades para objetivo','Units to target profit'],['revenue','Ingresos en equilibrio','Revenue at break-even'],['costs','Costos en equilibrio','Costs at break-even'],['profit','Utilidad estimada de ventas previstas','Profit on expected sales'],['marginOfContribution','Margen de contribución (%)','Contribution margin (%)']]
};
const currencyKeys=new Set(['profit','total','price','vat','priceWithVat','afterFirst','final','savings','contribution','revenue','costs','base']);
const percentKeys=new Set(['margin','markup','effective','finalMargin','marginOfContribution']);
export async function downloadDecisionExcel(a:ExportArgs){
 const XLSX=await import('xlsx-js-style');
 const date=new Date();const language=a.en?'en-US':'es-MX';
 const sheet=XLSX.utils.aoa_to_sheet([
  ['PALJALE / DECISION STUDIO'],
  [a.title],
  [a.en?'Business analysis · Editable Excel':'Análisis comercial · Hoja Excel editable'],
  [a.en?'Generated':'Generado',date.toLocaleString(language)],
  [],
  [a.en?'INPUTS · ORIGINAL VALUES':'DATOS DE ENTRADA · VALORES ORIGINALES'],
  [a.en?'Concept':'Concepto',a.en?'Value':'Valor',a.en?'Unit':'Unidad',a.en?'What it means':'Explicación del concepto'],
 ]);
 let row=8;
 for(const f of a.fields){
   const raw=a.values[f.id];const numeric=raw===''||raw===undefined?null:Number(raw);
   XLSX.utils.sheet_add_aoa(sheet,[[f.label[a.en?1:0],numeric,f.unit==='units'?'uds.':f.unit??'',f.help[a.en?1:0]]],{origin:`A${row}`});row++;
 }
 if(a.kind==='iva') {XLSX.utils.sheet_add_aoa(sheet,[[a.en?'Calculation mode':'Modalidad de cálculo',a.vatMode==='add'?(a.en?'Add VAT':'Agregar IVA'):(a.en?'Extract VAT':'Desglosar IVA'),'',a.en?'Whether the input includes VAT':'Si el importe ya incorpora el impuesto']],{origin:`A${row++}`});XLSX.utils.sheet_add_aoa(sheet,[[a.en?'VAT rate (%)':'Tasa de IVA (%)',Number(a.vatRate),'%',a.en?'Rate chosen by the user':'Tasa seleccionada por el usuario']],{origin:`A${row++}`});}
 if(a.kind==='precio'){XLSX.utils.sheet_add_aoa(sheet,[[a.en?'VAT enabled':'Incluir IVA',a.vatEnabled?(a.en?'Yes':'Sí'):(a.en?'No':'No'),'',a.en?'Only when applicable':'Solo cuando corresponda']],{origin:`A${row++}`});if(a.vatEnabled)XLSX.utils.sheet_add_aoa(sheet,[[a.en?'VAT rate (%)':'Tasa de IVA (%)',Number(a.vatRate),'%','']],{origin:`A${row++}`});}
 row+=2;const resultHeader=row;XLSX.utils.sheet_add_aoa(sheet,[[a.en?'RESULTS · CALCULATED ANALYSIS':'RESULTADOS · ANÁLISIS CALCULADO']],{origin:`A${row++}`});XLSX.utils.sheet_add_aoa(sheet,[[a.en?'Indicator':'Indicador',a.en?'Result':'Resultado',a.en?'Unit':'Unidad',a.en?'Interpretation':'Interpretación']],{origin:`A${row++}`});const resultFirst=row;
 for(const [key,es,en] of labels[a.kind]){
   const v=a.results[key];if(v===undefined||v===null||typeof v!=='number'||!Number.isFinite(v))continue;
   const isPct=percentKeys.has(key);const isCash=currencyKeys.has(key)&&!isPct;
   XLSX.utils.sheet_add_aoa(sheet,[[a.en?en:es,v,isPct?'%':isCash?'MXN':key.toLowerCase().includes('units')?'uds.':'',a.en?'Calculated from your input values. Review the assumptions below.':'Calculado a partir de los datos capturados. Verifica los supuestos al final.']],{origin:`A${row}`});
   const target=sheet[`B${row}`];target.z=isCash?'"$"#,##0.00;[Red]("$"#,##0.00)':isPct?'0.00':'#,##0.00';row++;
 }
 row+=2;
 XLSX.utils.sheet_add_aoa(sheet,[[a.en?'GUIDANCE AND ASSUMPTIONS':'GUÍA Y SUPUESTOS'],[a.en?'Purpose':'Propósito',a.title],[a.en?'Use':'Uso',a.en?'Change the values in PALJALE to recalculate and download an updated analysis.':'Modifica los valores en PALJALE para recalcular y descargar un análisis actualizado.'],[a.en?'Scope':'Alcance',a.en?'Informational estimate, not tax, accounting or financial advice.':'Estimación informativa; no sustituye asesoría contable, fiscal ni financiera.'],[a.en?'Precision':'Precisión',a.en?'Calculations use unrounded values; displayed amounts may be rounded.':'El cálculo utiliza valores sin redondear; las cantidades visibles pueden redondearse.']],{origin:`A${row}`});
 const last=row+5;sheet['!cols']=[{wch:41},{wch:24},{wch:16},{wch:84}];sheet['!rows']=[{hpt:31},{hpt:31},{hpt:23}];sheet['!merges']=[{s:{r:0,c:0},e:{r:0,c:3}},{s:{r:1,c:0},e:{r:1,c:3}},{s:{r:2,c:0},e:{r:2,c:3}},{s:{r:5,c:0},e:{r:5,c:3}},{s:{r:resultHeader-1,c:0},e:{r:resultHeader-1,c:3}},{s:{r:row-1,c:0},e:{r:row-1,c:3}}];
 const maxRow=Math.max(last,row+5);
 for(let r=1;r<=maxRow;r++)for(let c=0;c<4;c++){const adr=XLSX.utils.encode_cell({r:r-1,c});const cell=sheet[adr];if(!cell)continue;const header=[1,6,resultHeader,row].includes(r);const colHeader=[7,resultHeader+1].includes(r);const title=r===2;cell.s={font:{name:'Aptos',sz:title?20:header?12:11,bold:header||colHeader||title,color:{rgb:header?'FFFFFF':title?'143B4A':'273649'}},fill:{fgColor:{rgb:header?'143B4A':colHeader?'DCF1EE':r%2===0?'F3F7F9':'FFFFFF'}},alignment:{vertical:'center',wrapText:c===3},border:{bottom:{style:'hair',color:{rgb:'D7E4E9'}}}};}
 const guide=XLSX.utils.aoa_to_sheet([[a.en?'PALJALE · READING GUIDE':'PALJALE · GUÍA DE LECTURA'],[],[a.en?'Workbook':'Libro','PALJALE Decision Studio'],[a.en?'Inputs':'Entradas',a.en?'Values as entered at the time of export':'Valores capturados al momento de exportar'],[a.en?'Results':'Resultados',a.en?'Computed results from PALJALE; modify inputs in the application to recalculate.':'Resultados calculados por PALJALE; cambia los valores en la aplicación para recalcular.'],[a.en?'Tax':'Impuestos',a.en?'Verify the rate and tax situation applicable to your case.':'Verifica la tasa y el tratamiento fiscal aplicable a tu caso.'],[a.en?'Confidentiality':'Confidencialidad',a.en?'The Excel file stays on the device where you download it.':'El Excel queda en el dispositivo donde lo descargues.']]);guide['!cols']=[{wch:28},{wch:85}];
 const wb=XLSX.utils.book_new();XLSX.utils.book_append_sheet(wb,sheet,'Análisis');XLSX.utils.book_append_sheet(wb,guide,'Guía');
 const binary=XLSX.write(wb,{bookType:'xlsx',type:'array',cellStyles:true});const blob=new Blob([binary],{type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
 const link=URL.createObjectURL(blob);const element=document.createElement('a');element.href=link;element.download=`PALJALE_${a.kind}_${date.toISOString().slice(0,10)}.xlsx`;document.body.appendChild(element);element.click();element.remove();setTimeout(()=>URL.revokeObjectURL(link),1500);
}
