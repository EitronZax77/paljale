"use client";
import type {ReactNode} from 'react';
import StudioSidebar from './StudioSidebar';
export default function StudioFrame({children}:{children:ReactNode}){
 return <div className="mx-auto flex w-full max-w-[1510px] flex-col items-start gap-5 px-4 py-6 sm:px-6 lg:flex-row lg:gap-7 lg:px-8"><StudioSidebar/><div className="min-w-0 w-full flex-1">{children}</div></div>;
}
