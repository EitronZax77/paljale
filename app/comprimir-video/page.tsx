import type { Metadata } from "next";
import MediaToolsClient from "@/components/tools/MediaToolsClient";
export const metadata:Metadata={title:"Comprimir Video MP4 Gratis",description:"Comprime videos MP4 gratis desde tu navegador mediante FFmpeg; elige calidad y descarga.",alternates:{canonical:"/comprimir-video"}};
export default function Page(){return <MediaToolsClient mode="video"/>;}
