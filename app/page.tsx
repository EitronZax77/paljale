export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      
      {/* 1. Barra de Navegación (Header) */}
      <header className="bg-white shadow-sm py-4 px-6 flex items-center justify-between">
        <div className="text-2xl font-black text-blue-600 tracking-tighter">
          PALJALE
        </div>
        <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-500">
          <span className="cursor-pointer hover:text-blue-600 transition">Herramientas</span>
          <span className="cursor-pointer hover:text-blue-600 transition">Nosotros</span>
        </nav>
      </header>

      {/* 2. Sección Principal (Hero & Buscador) */}
      <main className="max-w-5xl mx-auto px-6 py-16 flex flex-col items-center">
        
        <h1 className="text-4xl md:text-6xl font-extrabold text-center mb-6 text-gray-900 leading-tight">
          Todas las herramientas que necesitas,<br/> 
          <span className="text-blue-600">en un solo lugar.</span>
        </h1>
        
        <p className="text-lg text-gray-500 mb-10 text-center max-w-2xl">
          Edita PDFs, convierte imágenes, genera códigos QR y más. 
          100% gratis, rápido y directamente en tu navegador.
        </p>

        {/* Buscador */}
        <div className="w-full max-w-2xl relative mb-20">
          <input 
            type="text" 
            placeholder="¿Qué necesitas hacer hoy? (ej. unir pdf, qr...)" 
            className="w-full py-4 px-6 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg bg-white"
          />
          <button className="absolute right-2 top-2 bg-blue-600 text-white px-8 py-2 rounded-full font-bold hover:bg-blue-700 transition">
            Buscar
          </button>
        </div>

        {/* 3. Cuadrícula de Herramientas (Preview del MVP) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          
          {/* Tarjeta 1: PDF (AHORA CON ENLACE) */}
          <a href="/pdf" className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer block">
            <div className="bg-red-200 w-14 h-14 rounded-xl flex items-center justify-center text-red-500 text-2xl mb-4">
              📄
            </div>
            <h3 className="text-xl font-bold mb-2">Herramientas PDF</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Unir, dividir, comprimir y convertir documentos PDF fácilmente sin perder calidad.
            </p>
          </a>

          {/* Tarjeta 2: Imágenes (AHORA CON ENLACE) */}
          <a href="/imagenes" className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer block">
            <div className="bg-green-200 w-14 h-14 rounded-xl flex items-center justify-center text-green-500 text-2xl mb-4">
              🖼️
            </div>
            <h3 className="text-xl font-bold mb-2">Imágenes</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Comprimir, redimensionar, recortar y cambiar el formato de tus fotos en segundos.
            </p>
          </a>

          {/* Tarjeta 3: QR (AHORA CON ENLACE) */}
          <a href="/qr" className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer block">
            <div className="bg-purple-200 w-14 h-14 rounded-xl flex items-center justify-center text-purple-500 text-2xl mb-4">
              📱
            </div>
            <h3 className="text-xl font-bold mb-2">Códigos QR</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Genera códigos QR personalizados para enlaces, textos, Wi-Fi y tarjetas de contacto.
            </p>
          </a>

        </div>

      </main>
    </div>
  );
}