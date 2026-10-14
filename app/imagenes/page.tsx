import type {Metadata} from "next";
import SiteHeader from "@/components/SiteHeader";
import ToolExplorer from "@/components/ToolExplorer";
import BarraEfemeride from "@/components/BarraEfemeride";
import AnimatedSpriteParade from "@/components/theme/AnimatedSpriteParade";
import FloatingFeedbackButton from "@/components/FloatingFeedbackButton";
import LocalizedText from "@/components/LocalizedText";
export const metadata:Metadata={title:"Herramientas de imágenes gratis",description:"Comprime, convierte, recorta, redimensiona y elimina fondos de imágenes.",alternates:{canonical:"/imagenes"}};
export default function Page(){return <div className="flex min-h-screen flex-col"><SiteHeader/><main className="mx-auto w-full max-w-[1600px] flex-1 px-4 py-7 sm:px-6 sm:py-10 lg:px-8"><ToolExplorer category="Imágenes" /></main><BarraEfemeride/><AnimatedSpriteParade/><footer className="border-t border-[var(--pal-border)] bg-white px-5 py-5 text-center text-sm font-bold text-slate-700">PALJALE © 2026 — <LocalizedText es="Todos los derechos reservados." en="All rights reserved." /></footer><FloatingFeedbackButton/></div>}
