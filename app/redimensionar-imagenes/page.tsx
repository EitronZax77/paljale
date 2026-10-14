import type { Metadata } from "next";
import ImageToolClient from "@/components/images/ImageToolClient";
export const metadata:Metadata={title:"Redimensionar imágenes",description:"Redimensionar imágenes gratis en PALJALE, directamente desde tu navegador.",alternates:{canonical:"/redimensionar-imagenes"}};
export default function Page(){return <ImageToolClient mode="resize"/>;}
