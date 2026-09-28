export default function Home() {
  return (
    <div className="min-h-screen bg-[#FAFAFC] text-gray-900 font-sans selection:bg-blue-600 selection:text-white">
      
      {/* 1. Barra de Navegación Fija */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="text-lg font-bold tracking-tight text-blue-600 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-blue-600"></span>
            PALJALE
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
            <a href="#herramientas" className="hover:text-blue-600 transition-colors">Herramientas</a>
          </nav>
        </div>
      </header>

      {/* 2. Sección Principal (Sin texto largo ni buscador, directo a los bloques) */}
      <main className="pt-36 pb-20 px-6 max-w-6xl mx-auto">
        
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-xs font-semibold text-blue-700 mb-6">
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            Plataforma 100% gratuita y sin registros
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 leading-[1.1]">
            Herramientas sencillas. <br />
            <span className="text-blue-600">Listas para usar al instante.</span>
          </h1>
        </div>

        {/* 3. Cuadrícula de Herramientas (Los bloques principales) */}
        <div id="herramientas" className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          
          {/* Tarjeta 1: PDF */}
          <a href="/pdf" className="group relative bg-white rounded-3xl p-8 border border-gray-200 shadow-sm hover:shadow-xl hover:border-blue-200 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                📄
              </div>
              <h3 className="text-2xl font-bold tracking-tight mb-3 text-gray-900">Herramientas PDF</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Unir, dividir, comprimir y organizar tus documentos de forma segura sin perder calidad.
              </p>
            </div>
            <div className="mt-8 flex items-center gap-2 text-sm font-bold text-red-600 group-hover:gap-3 transition-all">
              <span>Abrir herramienta</span>
              <span>→</span>
            </div>
          </a>

          {/* Tarjeta 2: Imágenes */}
          <a href="/imagenes" className="group relative bg-white rounded-3xl p-8 border border-gray-200 shadow-sm hover:shadow-xl hover:border-green-200 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                🖼️
              </div>
              <h3 className="text-2xl font-bold tracking-tight mb-3 text-gray-900">Editar Imágenes</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Cambia el tamaño, recorta fotos o convierte formatos en segundos desde cualquier dispositivo.
              </p>
            </div>
            <div className="mt-8 flex items-center gap-2 text-sm font-bold text-green-600 group-hover:gap-3 transition-all">
              <span>Abrir herramienta</span>
              <span>→</span>
            </div>
          </a>

          {/* Tarjeta 3: QR */}
          <a href="/qr" className="group relative bg-white rounded-3xl p-8 border border-gray-200 shadow-sm hover:shadow-xl hover:border-purple-200 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                📱
              </div>
              <h3 className="text-2xl font-bold tracking-tight mb-3 text-gray-900">Crear Códigos QR</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Genera códigos QR personalizados para enlaces y textos, listos para descargar o compartir.
              </p>
            </div>
            <div className="mt-8 flex items-center gap-2 text-sm font-bold text-purple-600 group-hover:gap-3 transition-all">
              <span>Abrir herramienta</span>
              <span>→</span>
            </div>
          </a>

        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-10 px-6 text-center text-sm text-gray-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} PALJALE. Hecho para facilitarte la vida.</p>
          <div className="flex gap-6 font-medium">
            <span className="hover:text-gray-900 cursor-pointer transition-colors">Privacidad</span>
            <span className="hover:text-gray-900 cursor-pointer transition-colors">Términos</span>
          </div>
        </div>
      </footer>

    </div>
  );
}