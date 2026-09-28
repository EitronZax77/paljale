export default function QrPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <header className="bg-white shadow-sm py-4 px-6">
        <a href="/" className="text-sm font-bold text-blue-600 hover:text-blue-800 transition flex items-center gap-2">
          ← Volver a PALJALE
        </a>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12 flex flex-col items-center">
        <div className="bg-purple-50 w-16 h-16 rounded-2xl flex items-center justify-center text-purple-500 text-3xl mb-6">
          📱
        </div>
        
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 text-center">
          Generador de Código QR
        </h1>
        <p className="text-gray-500 mb-10 text-center text-lg">
          Crea un código QR al instante para tu enlace, menú o tarjeta de contacto.
        </p>
        
        <div className="w-full max-w-xl bg-white border border-gray-200 rounded-3xl p-8 md:p-10 shadow-sm flex flex-col items-center">
          <label className="w-full text-left font-bold text-gray-700 mb-2">Ingresa tu enlace o texto:</label>
          <input 
            type="text" 
            placeholder="Ejemplo: https://mi-sitio.com" 
            className="w-full py-4 px-6 mb-6 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button className="bg-purple-600 text-white font-bold py-4 px-8 rounded-xl w-full hover:bg-purple-700 transition shadow-md">
            Generar Código QR
          </button>
        </div>
      </main>
    </div>
  );
}