"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import BarraEfemeride from "@/components/BarraEfemeride";

type HerramientaImagen = "comprimir" | "convertir";
type ModoCompresion = "estandar" | "mejor";
type FormatoDestino = "image/jpeg" | "image/png" | "image/webp";

const MAX_IMAGE_SIZE_MB = 25;
const MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_MB * 1024 * 1024;

function formatearMB(bytes: number): string {
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

function nombreFormatoDesdeMime(tipo: FormatoDestino): string {
  switch (tipo) {
    case "image/png":
      return "PNG";
    case "image/webp":
      return "WebP";
    default:
      return "JPG";
  }
}

function extensionDesdeMime(tipo: FormatoDestino): string {
  switch (tipo) {
    case "image/png":
      return "png";
    case "image/webp":
      return "webp";
    default:
      return "jpg";
  }
}

function validarImagen(file: File): string | null {
  const tiposPermitidos = [
    "image/jpeg",
    "image/png",
    "image/webp",
  ];

  if (!tiposPermitidos.includes(file.type)) {
    return "Formato no compatible. Usa JPG, PNG o WebP.";
  }

  if (file.size > MAX_IMAGE_SIZE_BYTES) {
    return `La imagen supera el límite de ${MAX_IMAGE_SIZE_MB} MB.`;
  }

  return null;
}

function cargarImagen(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onerror = () => {
      reject(new Error("No se pudo leer la imagen."));
    };

    reader.onload = () => {
      if (typeof reader.result !== "string") {
        reject(new Error("El archivo no pudo convertirse a una imagen válida."));
        return;
      }

      const image = new Image();

      image.onerror = () => {
        reject(new Error("El navegador no pudo interpretar la imagen."));
      };

      image.onload = () => {
        resolve(image);
      };

      image.src = reader.result;
    };

    reader.readAsDataURL(file);
  });
}

function canvasABlob(
  canvas: HTMLCanvasElement,
  tipo: FormatoDestino,
  calidad?: number
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("No se pudo generar la imagen resultante."));
          return;
        }

        resolve(blob);
      },
      tipo,
      calidad
    );
  });
}

export default function ImagenesPage() {
  const [herramienta, setHerramienta] =
    useState<HerramientaImagen>("comprimir");

  const [imagenComprimir, setImagenComprimir] =
    useState<File | null>(null);
  const [imagenComprimidaUrl, setImagenComprimidaUrl] =
    useState<string | null>(null);
  const [tamanoOriginalImg, setTamanoOriginalImg] =
    useState("");
  const [tamanoNuevoImg, setTamanoNuevoImg] =
    useState("");
  const [modoCompresionImg, setModoCompresionImg] =
    useState<ModoCompresion>("estandar");
  const [procesandoImg, setProcesandoImg] =
    useState(false);
  const [errorCompresion, setErrorCompresion] =
    useState<string | null>(null);

  const [imagenConvertir, setImagenConvertir] =
    useState<File | null>(null);
  const [imagenConvertidaUrl, setImagenConvertidaUrl] =
    useState<string | null>(null);
  const [formatoDestino, setFormatoDestino] =
    useState<FormatoDestino>("image/jpeg");
  const [procesandoConv, setProcesandoConv] =
    useState(false);
  const [errorConversion, setErrorConversion] =
    useState<string | null>(null);

  const nombreFormato = nombreFormatoDesdeMime(formatoDestino);

  useEffect(() => {
    return () => {
      if (imagenComprimidaUrl) {
        URL.revokeObjectURL(imagenComprimidaUrl);
      }
    };
  }, [imagenComprimidaUrl]);

  useEffect(() => {
    return () => {
      if (imagenConvertidaUrl) {
        URL.revokeObjectURL(imagenConvertidaUrl);
      }
    };
  }, [imagenConvertidaUrl]);

  const limpiarResultadoCompresion = () => {
    if (imagenComprimidaUrl) {
      URL.revokeObjectURL(imagenComprimidaUrl);
    }

    setImagenComprimidaUrl(null);
    setTamanoNuevoImg("");
  };

  const limpiarResultadoConversion = () => {
    if (imagenConvertidaUrl) {
      URL.revokeObjectURL(imagenConvertidaUrl);
    }

    setImagenConvertidaUrl(null);
  };

  const manejarComp = (file: File) => {
    const error = validarImagen(file);

    if (error) {
      setErrorCompresion(error);
      return;
    }

    limpiarResultadoCompresion();

    setImagenComprimir(file);
    setTamanoOriginalImg(formatearMB(file.size));
    setErrorCompresion(null);
  };

  const ejecutarCompresion = async () => {
    if (!imagenComprimir) return;

    setProcesandoImg(true);
    setErrorCompresion(null);
    limpiarResultadoCompresion();

    try {
      const image = await cargarImagen(imagenComprimir);

      const escala =
        modoCompresionImg === "estandar" ? 1 : 0.85;
      const calidad =
        modoCompresionImg === "estandar" ? 0.85 : 0.65;

      const canvas = document.createElement("canvas");

      canvas.width = Math.max(
        1,
        Math.round(image.width * escala)
      );
      canvas.height = Math.max(
        1,
        Math.round(image.height * escala)
      );

      const context = canvas.getContext("2d");

      if (!context) {
        throw new Error(
          "El navegador no pudo preparar el área de procesamiento."
        );
      }

      context.fillStyle = "#FFFFFF";
      context.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
      );

      context.drawImage(
        image,
        0,
        0,
        canvas.width,
        canvas.height
      );

      const blob = await canvasABlob(
        canvas,
        "image/jpeg",
        calidad
      );

      const url = URL.createObjectURL(blob);

      setImagenComprimidaUrl(url);
      setTamanoNuevoImg(formatearMB(blob.size));

      if (blob.size >= imagenComprimir.size) {
        setErrorCompresion(
          "La imagen resultante no logró reducir el peso respecto al archivo original. Puedes probar el modo de compresión máxima."
        );
      }
    } catch (error) {
      console.error("Error al comprimir imagen:", error);

      setErrorCompresion(
        error instanceof Error
          ? error.message
          : "No se pudo comprimir la imagen."
      );
    } finally {
      setProcesandoImg(false);
    }
  };

  const manejarConv = (file: File) => {
    const error = validarImagen(file);

    if (error) {
      setErrorConversion(error);
      return;
    }

    limpiarResultadoConversion();

    setImagenConvertir(file);
    setErrorConversion(null);
  };

  const ejecutarConversion = async () => {
    if (!imagenConvertir) return;

    setProcesandoConv(true);
    setErrorConversion(null);
    limpiarResultadoConversion();

    try {
      const image = await cargarImagen(imagenConvertir);

      const canvas = document.createElement("canvas");

      canvas.width = image.width;
      canvas.height = image.height;

      const context = canvas.getContext("2d");

      if (!context) {
        throw new Error(
          "El navegador no pudo preparar el área de procesamiento."
        );
      }

      if (formatoDestino === "image/jpeg") {
        context.fillStyle = "#FFFFFF";
        context.fillRect(
          0,
          0,
          canvas.width,
          canvas.height
        );
      }

      context.drawImage(image, 0, 0);

      const calidad =
        formatoDestino === "image/png" ? undefined : 0.95;

      const blob = await canvasABlob(
        canvas,
        formatoDestino,
        calidad
      );

      if (blob.type !== formatoDestino) {
        throw new Error(
          `Tu navegador no admite exportación real a ${nombreFormato}.`
        );
      }

      const url = URL.createObjectURL(blob);

      setImagenConvertidaUrl(url);
    } catch (error) {
      console.error("Error al convertir imagen:", error);

      setErrorConversion(
        error instanceof Error
          ? error.message
          : "No se pudo convertir la imagen."
      );
    } finally {
      setProcesandoConv(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#060D14] text-gray-100 font-sans selection:bg-cyan-500 selection:text-black flex flex-col justify-between overflow-x-hidden">
      <header className="sticky top-0 z-50 bg-[#060D14]/90 backdrop-blur-xl border-b border-cyan-900/40">
        <div className="w-full px-6 md:px-12 h-20 flex items-center justify-between">
          <Link
            href="/"
            className="text-2xl md:text-3xl font-black tracking-wider bg-gradient-to-r from-rose-500 via-orange-400 to-cyan-400 bg-clip-text text-transparent"
          >
            PALJALE
          </Link>

          <Link
            href="/"
            className="text-sm font-semibold text-cyan-400 hover:underline"
          >
            ← Volver al inicio
          </Link>
        </div>
      </header>

      <main className="w-full max-w-4xl mx-auto px-6 py-16 flex flex-col items-center my-auto">
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-cyan-500 rounded-3xl blur-xl opacity-20 animate-pulse" />

          <div className="relative w-20 h-20 rounded-3xl bg-[#0a1622] border border-cyan-500/30 text-cyan-400 flex items-center justify-center text-4xl shadow-[0_0_20px_rgba(6,182,212,0.2)]">
            🖼️
          </div>
        </div>

        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4 text-center text-cyan-300">
          Editor y Conversor de Imágenes
        </h1>

        <p className="text-gray-300 font-bold mb-10 text-center text-base md:text-lg max-w-lg">
          Comprime y convierte imágenes JPG, PNG y WebP directamente
          desde tu navegador.
        </p>

        <div className="flex flex-wrap justify-center bg-[#0a1622]/90 backdrop-blur-md p-1.5 rounded-2xl border border-cyan-500/20 shadow-lg mb-12 gap-2">
          <button
            type="button"
            onClick={() => setHerramienta("comprimir")}
            className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${
              herramienta === "comprimir"
                ? "bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                : "text-gray-400 hover:text-white"
            }`}
          >
            🗜️ Compresor de Imágenes
          </button>

          <button
            type="button"
            onClick={() => setHerramienta("convertir")}
            className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${
              herramienta === "convertir"
                ? "bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                : "text-gray-400 hover:text-white"
            }`}
          >
            🔄 Conversor JPG / PNG / WebP
          </button>
        </div>

        {herramienta === "comprimir" && (
          <div className="w-full max-w-xl bg-[#0a1622]/80 backdrop-blur-2xl border border-cyan-500/20 rounded-[32px] p-8 md:p-12 shadow-[0_0_30px_rgba(0,0,0,0.5)] flex flex-col items-center">
            <h2 className="text-2xl font-bold text-white mb-6">
              Compresor de Imágenes
            </h2>

            {!imagenComprimir ? (
              <div
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => {
                  event.preventDefault();

                  const file = event.dataTransfer.files?.[0];

                  if (file) {
                    manejarComp(file);
                  }
                }}
                className="w-full"
              >
                <label className="w-full flex flex-col items-center justify-center border-2 border-dashed border-cyan-500/30 bg-[#060D14]/50 hover:bg-cyan-500/5 rounded-3xl p-10 cursor-pointer transition-all group mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    📸
                  </div>

                  <span className="text-lg font-bold text-white mb-1">
                    Arrastra tu imagen o haz clic
                  </span>

                  <span className="text-sm text-gray-400">
                    JPG, PNG o WebP · máximo {MAX_IMAGE_SIZE_MB} MB
                  </span>

                  <input
                    type="file"
                    className="hidden"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={(event) => {
                      const file = event.target.files?.[0];

                      if (file) {
                        manejarComp(file);
                      }
                    }}
                  />
                </label>
              </div>
            ) : (
              <div className="w-full flex flex-col items-center">
                <div className="w-full bg-[#060D14] border border-cyan-900/50 p-4 rounded-2xl mb-6 text-sm text-gray-300 flex justify-between items-center gap-4">
                  <span className="truncate">
                    Archivo:{" "}
                    <strong className="text-white">
                      {imagenComprimir.name}
                    </strong>
                  </span>

                  <button
                    type="button"
                    onClick={() => {
                      setImagenComprimir(null);
                      limpiarResultadoCompresion();
                      setErrorCompresion(null);
                    }}
                    className="text-rose-400 font-bold text-xs hover:underline"
                  >
                    Cambiar
                  </button>
                </div>

                <div className="w-full mb-6">
                  <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                    Nivel de Compresión
                  </span>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setModoCompresionImg("estandar")
                      }
                      className={`py-3 rounded-xl font-bold text-xs border ${
                        modoCompresionImg === "estandar"
                          ? "bg-cyan-500 text-black border-cyan-400"
                          : "bg-[#060D14] text-gray-300 border-cyan-900/50"
                      }`}
                    >
                      ⚡ Estándar
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setModoCompresionImg("mejor")
                      }
                      className={`py-3 rounded-xl font-bold text-xs border ${
                        modoCompresionImg === "mejor"
                          ? "bg-cyan-500 text-black border-cyan-400"
                          : "bg-[#060D14] text-gray-300 border-cyan-900/50"
                      }`}
                    >
                      🔥 Máxima
                    </button>
                  </div>
                </div>

                {errorCompresion && (
                  <div className="w-full mb-4 rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
                    {errorCompresion}
                  </div>
                )}

                {!imagenComprimidaUrl ? (
                  <button
                    type="button"
                    onClick={ejecutarCompresion}
                    disabled={procesandoImg}
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold py-4 px-6 rounded-2xl shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {procesandoImg
                      ? "Comprimiendo..."
                      : "Comprimir Imagen"}
                  </button>
                ) : (
                  <div className="w-full flex flex-col gap-3">
                    <div className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-center py-3 rounded-2xl font-bold text-sm">
                      {tamanoOriginalImg} → {tamanoNuevoImg}
                    </div>

                    <a
                      href={imagenComprimidaUrl}
                      download="PALJALE_Comprimido.jpg"
                      className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold py-4 px-6 rounded-2xl text-center shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:opacity-90 transition"
                    >
                      Descargar Imagen Comprimida
                    </a>

                    <button
                      type="button"
                      onClick={() => {
                        setImagenComprimir(null);
                        limpiarResultadoCompresion();
                        setErrorCompresion(null);
                      }}
                      className="text-sm text-gray-400 hover:text-white mt-2"
                    >
                      Comprimir otra
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {herramienta === "convertir" && (
          <div className="w-full max-w-xl bg-[#0a1622]/80 backdrop-blur-2xl border border-cyan-500/20 rounded-[32px] p-8 md:p-12 shadow-[0_0_30px_rgba(0,0,0,0.5)] flex flex-col items-center">
            <h2 className="text-2xl font-bold text-white mb-6">
              Conversor de Imágenes
            </h2>

            {!imagenConvertir ? (
              <div
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => {
                  event.preventDefault();

                  const file = event.dataTransfer.files?.[0];

                  if (file) {
                    manejarConv(file);
                  }
                }}
                className="w-full"
              >
                <label className="w-full flex flex-col items-center justify-center border-2 border-dashed border-cyan-500/30 bg-[#060D14]/50 hover:bg-cyan-500/5 rounded-3xl p-10 cursor-pointer transition-all group mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    🔄
                  </div>

                  <span className="text-lg font-bold text-white mb-1">
                    Arrastra tu imagen o haz clic
                  </span>

                  <span className="text-sm text-gray-400">
                    JPG, PNG o WebP · máximo {MAX_IMAGE_SIZE_MB} MB
                  </span>

                  <input
                    type="file"
                    className="hidden"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={(event) => {
                      const file = event.target.files?.[0];

                      if (file) {
                        manejarConv(file);
                      }
                    }}
                  />
                </label>
              </div>
            ) : (
              <div className="w-full flex flex-col items-center">
                <div className="w-full bg-[#060D14] border border-cyan-900/50 p-4 rounded-2xl mb-6 text-sm text-gray-300 flex justify-between items-center gap-4">
                  <span className="truncate">
                    Archivo:{" "}
                    <strong className="text-white">
                      {imagenConvertir.name}
                    </strong>
                  </span>

                  <button
                    type="button"
                    onClick={() => {
                      setImagenConvertir(null);
                      limpiarResultadoConversion();
                      setErrorConversion(null);
                    }}
                    className="text-rose-400 font-bold text-xs hover:underline"
                  >
                    Cambiar
                  </button>
                </div>

                <div className="w-full mb-6">
                  <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                    Selecciona formato de destino
                  </span>

                  <div className="grid grid-cols-3 gap-2">
                    {(
                      [
                        ["image/jpeg", "JPG"],
                        ["image/png", "PNG"],
                        ["image/webp", "WebP"],
                      ] as const
                    ).map(([mime, etiqueta]) => (
                      <button
                        key={mime}
                        type="button"
                        onClick={() => {
                          setFormatoDestino(mime);
                          limpiarResultadoConversion();
                          setErrorConversion(null);
                        }}
                        className={`py-3 rounded-xl font-bold text-xs border ${
                          formatoDestino === mime
                            ? "bg-cyan-500 text-black border-cyan-400"
                            : "bg-[#060D14] text-gray-300 border-cyan-900/50"
                        }`}
                      >
                        {etiqueta}
                      </button>
                    ))}
                  </div>
                </div>

                {errorConversion && (
                  <div className="w-full mb-4 rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
                    {errorConversion}
                  </div>
                )}

                {!imagenConvertidaUrl ? (
                  <button
                    type="button"
                    onClick={ejecutarConversion}
                    disabled={procesandoConv}
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold py-4 px-6 rounded-2xl shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {procesandoConv
                      ? "Convirtiendo..."
                      : `Convertir a ${nombreFormato}`}
                  </button>
                ) : (
                  <div className="w-full flex flex-col gap-3">
                    <div className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-center py-3 rounded-2xl font-bold text-sm">
                      ✓ Conversión real a {nombreFormato} completada.
                    </div>

                    <a
                      href={imagenConvertidaUrl}
                      download={`PALJALE_Convertido.${extensionDesdeMime(
                        formatoDestino
                      )}`}
                      className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold py-4 px-6 rounded-2xl text-center shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:opacity-90 transition"
                    >
                      Descargar Imagen en {nombreFormato}
                    </a>

                    <button
                      type="button"
                      onClick={() => {
                        setImagenConvertir(null);
                        limpiarResultadoConversion();
                        setErrorConversion(null);
                      }}
                      className="text-sm text-gray-400 hover:text-white mt-2"
                    >
                      Convertir otra
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </main>

      <BarraEfemeride />

      <footer className="w-full border-t border-cyan-900/40 py-8 text-center text-xs text-gray-500 flex items-center justify-center bg-[#04080c]">
        <span>PALJALE © 2026 — Todos los derechos reservados.</span>
      </footer>
    </div>
  );
}