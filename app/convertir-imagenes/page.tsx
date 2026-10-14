import type { Metadata } from "next";
import ImageToolClient from "@/components/images/ImageToolClient";
export const metadata:Metadata={title:"Convertir imágenes",description:"Convertir imágenes gratis en PALJALE, directamente desde tu navegador.",alternates:{canonical:"/convertir-imagenes"}};
export default function Page(){return <ImageToolClient mode="convert"/>;}
