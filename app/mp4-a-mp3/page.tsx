import type { Metadata } from "next";
import MediaToolsClient from "@/components/tools/MediaToolsClient";
export const metadata:Metadata={title:"Convertir MP4 a MP3 Gratis",description:"Extrae audio MP3 desde videos MP4 de manera gratuita directamente en el navegador.",alternates:{canonical:"/mp4-a-mp3"}};
export default function Page(){return <MediaToolsClient mode="audio"/>;}
