import type { Metadata } from "next";
import ImageToolClient from "@/components/images/ImageToolClient";
export const metadata:Metadata={title:"HEIC a JPG",description:"HEIC a JPG gratis en PALJALE, directamente desde tu navegador.",alternates:{canonical:"/heic-a-jpg"}};
export default function Page(){return <ImageToolClient mode="heic"/>;}
