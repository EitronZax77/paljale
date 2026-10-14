import type { Metadata } from "next";
import ImageToolClient from "@/components/images/ImageToolClient";
export const metadata:Metadata={title:"Comprimir imágenes",description:"Comprimir imágenes gratis en PALJALE, directamente desde tu navegador.",alternates:{canonical:"/comprimir-imagenes"}};
export default function Page(){return <ImageToolClient mode="compress"/>;}
