import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import StudioIcon from '@/components/decision/StudioIcon';
import TextWorkspace,{type TextKind} from './TextWorkspace';
import TextToolIcon from './TextToolIcon';

export default function TextToolPage({kind,title,description,help}:{kind:TextKind,title:string,description:string,help:string}) {
  return <>
    <SiteHeader/>
      <main className="mx-auto w-full max-w-7xl space-y-6 px-4 py-7 sm:px-6 lg:px-8">
        <nav aria-label="Volver a la categoría de texto">
          <Link href="/texto-idiomas" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 no-underline transition-all duration-200 hover:-translate-y-0.5 hover:border-teal-200 hover:bg-teal-50 hover:text-teal-800 hover:no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600">
            <span aria-hidden="true">←</span> Todas las herramientas de texto
          </Link>
        </nav>
        <section className="rounded-[27px] border border-slate-200 bg-white p-7 sm:p-10">
          <span className="inline-flex rounded-xl bg-teal-50 p-3 text-teal-700"><TextToolIcon kind={kind} size={30}/></span>
          <h1 className="mt-5 text-[34px] font-black tracking-tight text-slate-900 sm:text-[42px]">{title}</h1>
          <p className="mt-3 max-w-3xl text-[15px] leading-7 text-slate-600">{description}</p>
        </section>
        <TextWorkspace kind={kind}/>
        <section className="rounded-[25px] border border-slate-200 bg-white p-6 sm:p-7" aria-labelledby="text-related-heading">
          <h2 id="text-related-heading" className="text-lg font-black text-slate-900">Explora otras herramientas de texto</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {([
              {kind:'words',href:'/contador-palabras',label:'Contador de palabras',color:'#0d9488'},
              {kind:'characters',href:'/contador-caracteres',label:'Contador de caracteres',color:'#2563eb'},
              {kind:'case',href:'/convertir-mayusculas-minusculas',label:'Mayúsculas y minúsculas',color:'#7c3aed'},
              {kind:'spaces',href:'/eliminar-espacios-texto',label:'Eliminar espacios',color:'#db2777'},
              {kind:'duplicates',href:'/eliminar-lineas-duplicadas',label:'Eliminar líneas duplicadas',color:'#ea580c'}
            ] as const).filter(item=>item.kind!==kind).map(item=><Link key={item.href} href={item.href} className="group flex min-h-16 items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 text-sm font-bold text-slate-700 no-underline transition-all duration-200 hover:-translate-y-0.5 hover:border-teal-200 hover:bg-teal-50 hover:shadow-md hover:no-underline focus-visible:outline-2 focus-visible:outline-teal-600">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{color:item.color,backgroundColor:`${item.color}14`}}><TextToolIcon kind={item.kind} size={22}/></span>
              <span className="flex-1">{item.label}</span>
              <StudioIcon name="arrow" size={16}/>
            </Link>)}
          </div>
        </section>

      </main>
  </>;
}
