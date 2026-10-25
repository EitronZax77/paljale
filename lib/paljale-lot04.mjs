export function validHex(text){return /^#?[\da-f]{6}$/i.test(text.trim());}
export function hexToRgb(text){if(!validHex(text))return null;const n=parseInt(text.trim().replace('#',''),16);return {r:(n>>16)&255,g:(n>>8)&255,b:n&255};}
export function rgbToHex(r,g,b){if(![r,g,b].every(v=>Number.isInteger(v)&&v>=0&&v<=255))return null;return '#'+[r,g,b].map(v=>v.toString(16).padStart(2,'0')).join('').toUpperCase();}
export function rgbToHsl(r,g,b){if(![r,g,b].every(v=>Number.isInteger(v)&&v>=0&&v<=255))return null;
 r/=255;g/=255;b/=255;const max=Math.max(r,g,b),min=Math.min(r,g,b),d=max-min;let h=0,s=0;const l=(max+min)/2;
 if(d){s=d/(1-Math.abs(2*l-1));switch(max){case r:h=((g-b)/d)%6;break;case g:h=(b-r)/d+2;break;default:h=(r-g)/d+4;}h=(h*60+360)%360;}
 return {h:Math.round(h),s:Math.round(s*100),l:Math.round(l*100)};}
export function hslToRgb(h,s,l){if(!Number.isFinite(h)||!Number.isFinite(s)||!Number.isFinite(l)||h<0||h>360||s<0||s>100||l<0||l>100)return null;
 s/=100;l/=100;const c=(1-Math.abs(2*l-1))*s,x=c*(1-Math.abs((h/60)%2-1)),m=l-c/2;
 let a=0,b=0,d=0;if(h<60){a=c;b=x;}else if(h<120){a=x;b=c;}else if(h<180){b=c;d=x;}else if(h<240){b=x;d=c;}else if(h<300){a=x;d=c;}else{a=c;d=x;}
 return {r:Math.round((a+m)*255),g:Math.round((b+m)*255),b:Math.round((d+m)*255)};}
export function quoteTotals(lines,iva=0){if(!Array.isArray(lines)||!Number.isFinite(iva)||iva<0||iva>100)return null;let subtotal=0;
 for(const line of lines){const q=Number(line.quantity),p=Number(line.price);if(!Number.isFinite(q)||!Number.isFinite(p)||q<0||p<0)return null;subtotal+=Math.round(q*p*100)/100;}
 subtotal=Math.round(subtotal*100)/100;const tax=Math.round(subtotal*iva)/100;return {subtotal,tax,total:Math.round((subtotal+tax)*100)/100};}
export function timeLabel(seconds){const s=Math.max(0,Math.floor(seconds));return `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;}
