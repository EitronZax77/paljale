"use client";
import {usePathname} from 'next/navigation';
import LegalBar from '@/components/LegalBar';
import {sectionPaths} from '@/components/layout/SectionFooter';
const dedicatedFooter=new Set(['/conversor-criptomonedas','/precios-criptomonedas']);
export default function LegacyLegalBar(){const path=usePathname();return sectionPaths.has(path)||dedicatedFooter.has(path)?null:<LegalBar/>}
