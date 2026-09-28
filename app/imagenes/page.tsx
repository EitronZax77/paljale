export default function ImagenesPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <header className="bg-white shadow-sm py-4 px-6">
        <a href="/" className="text-sm font-bold text-blue-600 hover:text-blue-800 transition flex items-center gap-2">
          ← Volver a PALJALE
        </a>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12 flex flex-col items-center">
        <div className="bg-green-50 w-16 h-16 rounded-2xl flex items-center justify-center text-green-500 text-3xl mb-6">
          🖼️
        </div>
        
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 text-center">
          Herramientas de Imagen
        </h1>
        <p className="text-gray-500 mb-10 text-center text-lg">
          Comprime, recorta o cambia el formato de tus fotos en segundos.
        </p>
        
        <div className="w-full max-w-2xl bg-white border-2 border-dashed border-gray-300 rounded-3xl p-10 md:p-16 flex flex-col items-center justify-center hover:border-green-500 hover:bg-green-50 transition-colors cursor-pointer group shadow-sm">
          <div className="bg-gray-100 group-hover:bg-green-100 text-gray-400 group-hover:text-green-600 p-5 rounded-full mb-6 transition-colors">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-gray-700 mb-2 text-center">
            Selecciona tu imagen
          </h3>
          <p className="text-gray-400 text-sm md:text-base mb-8 text-center">
            JPG, PNG, WebP o GIF
          </p>
          <button className="bg-green-600 text-white font-bold py-3 px-8 rounded-full hover:bg-green-700 transition shadow-md">
            Subir foto
          </button>
        </div>
      </main>
    </div>
  );
}