/** PALJALE · motores de texto 100 % locales. */
export function wordCount(value) { return (value.trim().match(/\S+/gu) || []).length; }
export function charCount(value) { return [...value].length; }
export function sentenceCount(value) { return (value.match(/[^.!?\n]+[.!?]+|[^.!?\n]+$/gmu) || []).filter(s=>s.trim()).length; }
export function paragraphCount(value) { return value.trim() ? value.trim().split(/\n\s*\n/gu).filter(x=>x.trim()).length : 0; }
export function readingMinutes(value) { return wordCount(value)/200; }
export function nonSpaceCount(value) { return [...value].filter(x=>!(/\s/u.test(x))).length; }
export function whitespaceCount(value) { return charCount(value)-nonSpaceCount(value); }
export function lineCount(value) { return value.length ? value.split(/\r\n|\r|\n/u).length : 0; }
export function normalizeSpaces(value, mode = 'all') {
 const normalized=value.replace(/\r\n?|\u2028|\u2029/gu,'\n');
 switch(mode) {
  case 'all': return normalized.replace(/[\p{Zs}\t\f\v]+/gu,'');
  case 'repeated': return normalized.replace(/[\p{Zs}\t\f\v]{2,}/gu,' ');
  case 'trim': return normalized.split('\n').map(x=>x.trim()).join('\n');
  case 'lines': return normalized.replace(/^\s*\n/gmu,'').replace(/\n\s*\n+/gu,'\n');
  default: return normalized;
 }
}
export function uniqueLines(value, options = {}) {
 const {ignoreCase=false, trimComparison=true, skipEmpty=false}=options;
 const seen=new Set();
 return value.split(/\r\n|\r|\n/u).filter(line=> {
  const normalized=trimComparison?line.trim():line;
  if(skipEmpty && !normalized) return false;
  const key=ignoreCase?normalized.toLocaleLowerCase('es-MX'):normalized;
  if(seen.has(key)) return false;
  seen.add(key); return true;
 }).join('\n');
}
export function textCase(value,mode){
 if(mode==='upper') return value.toLocaleUpperCase('es-MX');
 if(mode==='lower') return value.toLocaleLowerCase('es-MX');
 if(mode==='title') return value.toLocaleLowerCase('es-MX').replace(/\p{L}[\p{L}\p{M}]*/gu,w=>w[0].toLocaleUpperCase('es-MX')+w.slice(1));
 if(mode==='sentence') return value.toLocaleLowerCase('es-MX').replace(/(^|[.!?]\s+)(\p{L})/gmu,(_,p,c)=>p+c.toLocaleUpperCase('es-MX'));
 return value;
}
export function processText(value,kind,mode='upper',options={}) {
 if(kind==='case') return textCase(value,mode);
 if(kind==='spaces') return normalizeSpaces(value,mode==='upper'?'all':mode);
 if(kind==='duplicates') return uniqueLines(value,options);
 return value;
}
