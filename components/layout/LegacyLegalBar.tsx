"use client";
import { usePathname } from "next/navigation";
import LegalBar from "@/components/LegalBar";
import { sectionPaths } from "@/components/layout/SectionFooter";

export default function LegacyLegalBar() {
  const path = usePathname();
  return sectionPaths.has(path) ? null : <LegalBar />;
}
