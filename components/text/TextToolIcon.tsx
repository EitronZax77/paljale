import type {ReactNode} from 'react';
export type TextIconKind = 'words'|'characters'|'case'|'spaces'|'duplicates';
const outlines: Record<TextIconKind,ReactNode> = {
  words:<><path d="M5 5h14M5 10h10M5 15h14M5 20h8"/><circle cx="19" cy="19" r="1"/></>,
  characters:<><path d="M4 19L10 5l6 14M6 15h8M18 6h3M19.5 6v13"/></>,
  case:<><path d="M3 18L9 5l6 13M5 14h8M15 13h6v6M21 13h-3a3 3 0 0 0 0 6h3"/></>,
  spaces:<><path d="M3 7v10h4M21 7v10h-4M9 11v2M12 11v2M15 11v2"/></>,
  duplicates:<><path d="M8 5h12v13H8zM4 9v12h12M11 9h6M11 13h6"/></>
};
export default function TextToolIcon({kind,size=28}:{kind:TextIconKind;size?:number}) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{outlines[kind]}</svg>;
}
