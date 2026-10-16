import type { CSSProperties, ReactNode } from 'react';
export default function StudioIcon({ name, size=24, style }: {name:string;size?:number;style?:CSSProperties}) {
 const common = { width:size,height:size,viewBox:'0 0 24 24',fill:'none',stroke:'currentColor',strokeWidth:1.8,strokeLinecap:'round' as const,strokeLinejoin:'round' as const,style,'aria-hidden':true as const };
 const art:Record<string,ReactNode>={
 trend:<><path d="M3 17 9 11l4 4 8-9"/><path d="M16 6h5v5"/><path d="M4 21h16"/></>,
 tag:<><path d="M20.5 13.5 13.5 20.5a2 2 0 0 1-2.8 0L3 12.8V4h8.8l8.7 6.7a2 2 0 0 1 0 2.8Z"/><circle cx="7.5" cy="8.5" r="1.5"/></>,
 receipt:<><path d="M5 3h14v18l-3-2-3 2-3-2-3 2-2-2V3Z"/><path d="M9 8h6M9 12h6"/></>,
 percent:<><circle cx="6" cy="6" r="2"/><circle cx="18" cy="18" r="2"/><path d="M20 4 4 20"/></>,
 chart:<><path d="M4 20V4M4 20h17"/><path d="m7 16 4-5 4 2 5-8"/><circle cx="11" cy="11" r="1"/><circle cx="20" cy="5" r="1"/></>,
 calculator:<><rect x="5" y="2.5" width="14" height="19" rx="3"/><path d="M8 7h8M8 11h2M14 11h2M8 15h2M14 15h2M8 19h2M14 19h2"/></>,
 arrow:<><path d="m5 12 14 0m-6-6 6 6-6 6"/></>,
 lock:<><rect x="4" y="10" width="16" height="12" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></>,
 bookmark:<><path d="M5 4h14v17l-7-4-7 4V4Z"/></>,
 spark:<><path d="m12 2 1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2Z"/><path d="m20 17 .6 1.4L22 19l-1.4.6L20 21l-.6-1.4L18 19l1.4-.6L20 17Z"/></>,
 copy:<><rect x="8" y="8" width="12" height="13" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h3"/></>,
 back:<><path d="m12 19-7-7 7-7M5 12h14"/></>,
 check:<><path d="m5 12 4 4L19 6"/></>,
 info:<><circle cx="12" cy="12" r="9"/><path d="M12 10v6M12 7h.01"/></>,
 reset:<><path d="M3 12a9 9 0 1 0 3-6M3 3v6h6"/></>,
 compare:<><path d="M3 6h18M3 18h18m-4-4 4 4-4 4M7 2 3 6l4 4"/></>,
 save:<><path d="M4 3h13l3 3v15H4V3Z"/><path d="M7 3v6h9V3M8 21v-8h8v8"/></>,
 download:<><path d="M12 3v13m-5-5 5 5 5-5M4 20h16"/></>,
 business:<><rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V4h8v3M3 13h18M10 13v2h4v-2"/></>,
 home:<><path d="m3 11 9-8 9 8v10H3V11ZM9 21v-7h6v7"/></>,
 text:<><path d="M4 6h16M12 6v13m-4 0h8"/></>,
 crypto:<><circle cx="12" cy="12" r="9"/><path d="M10 6v12m4-12v12M9 8h5a2 2 0 0 1 0 4H9m0 0h5a2 2 0 0 1 0 4H9"/></>,
 tools:<><path d="M20 7a5 5 0 0 1-6 6L7 20l-3-3 7-7a5 5 0 0 1 6-6l-3 3 3 3 3-3Z"/></>,
 };
 return <svg {...common}>{art[name]??art.calculator}</svg>;
}
