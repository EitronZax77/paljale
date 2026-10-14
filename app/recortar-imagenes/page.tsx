import type { Metadata } from "next";
import ImageToolClient from "@/components/images/ImageToolClient";
export const metadata:Metadata={title:"Recortar imágenes",description:"Recortar imágenes gratis en PALJALE, directamente desde tu navegador.",alternates:{canonical:"/recortar-imagenes"}};
export default function Page(){return <ImageToolClient mode="crop"/>;}
