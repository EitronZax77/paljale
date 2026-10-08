"use client";
import { useLanguage } from "@/components/LanguageProvider";
export default function LocalizedText({ es, en }: { es: string; en: string }) { const { language } = useLanguage(); return <>{language === "en" ? en : es}</>; }
