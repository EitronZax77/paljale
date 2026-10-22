import type {Metadata} from 'next';
import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import StudioFrame from '@/components/decision/StudioFrame';
import StudioIcon from '@/components/decision/StudioIcon';
import styles from '@/components/decision/Studio.module.css';
import TextToolIcon,{type TextIconKind} from '@/components/text/TextToolIcon';

export const metadata:Metadata={
  title:'Herramientas de texto gratuitas | PALJALE',
  description:'Cuenta palabras y caracteres, convierte mayúsculas, elimina espacios y líneas duplicadas. Herramientas rápidas en tu navegador.',
  alternates:{canonical:'/texto-idiomas'}
};

const tools=[
  {href:'/contador-palabras',title:'Contador de palabras',desc:'Cuenta palabras, párrafos y lectura estimada en tiempo real.',icon:'words',accent:'#0d9488'},
  {href:'/contador-caracteres',title:'Contador de caracteres',desc:'Mide caracteres totales, sin espacios y espacios.',icon:'characters',accent:'#2563eb'},
  {href:'/convertir-mayusculas-minusculas',title:'Mayúsculas y minúsculas',desc:'Transforma texto a mayúsculas, minúsculas, título u oración.',icon:'case',accent:'#7c3aed'},
  {href:'/eliminar-espacios-texto',title:'Eliminar espacios',desc:'Quita espacios según el modo elegido: todos, repetidos, extremos o líneas vacías.',icon:'spaces',accent:'#db2777'},
  {href:'/eliminar-lineas-duplicadas',title:'Eliminar líneas duplicadas',desc:'Conserva la primera aparición de cada línea y elimina repetidos.',icon:'duplicates',accent:'#ea580c'}
];

export default function Page(){
  return <>
    <SiteHeader/>
    <StudioFrame>
      <main className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        <section className="rounded-[27px] border border-slate-200 bg-white p-7 sm:p-10">
          <span className="inline-flex rounded-xl bg-teal-50 p-3 text-teal-700"><StudioIcon name="text" size={30}/></span>
          <h1 className="mt-5 text-[34px] font-black tracking-tight text-slate-900 sm:text-[42px]">Texto e idiomas</h1>
          <p className="mt-3 max-w-3xl text-[15px] leading-7 text-slate-600">Trabaja con tus textos de forma rápida y privada. Elige la herramienta que necesites dentro de este grupo.</p>
        </section>

        <section aria-label="Herramientas de texto" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {tools.map((tool)=><article key={tool.href} className={`${styles.tile} flex min-h-[242px] flex-col p-5 sm:p-6`}>
            <div className="mb-5 flex items-start justify-between gap-3">
              <span className="flex h-14 w-14 items-center justify-center rounded-[18px]" style={{color:tool.accent,backgroundColor:`${tool.accent}14`}}>
                <TextToolIcon kind={tool.icon as TextIconKind} size={28}/>
              </span>
              <span className="rounded-full border border-slate-200 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">Texto</span>
            </div>
            <h2 className="text-[20px] font-extrabold tracking-tight text-slate-900">{tool.title}</h2>
            <p className="mt-2 flex-1 text-[13px] leading-6 text-slate-600">{tool.desc}</p>
            <Link href={tool.href} className={`${styles.action} mt-5 self-start`} aria-label={`Abrir ${tool.title}`}>
              Abrir herramienta <StudioIcon name="arrow" size={17}/>
            </Link>
          </article>)}
        </section>
      </main>
    </StudioFrame>
  </>;
}
