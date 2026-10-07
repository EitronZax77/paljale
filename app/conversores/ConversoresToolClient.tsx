"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
import BarraEfemeride from "@/components/BarraEfemeride";
import { trackEvent } from "@/lib/analytics";

type FormatoSalida = "mp3" | "wav" | "aac";

const MAX_MEDIA_MB = 50;
const MAX_MEDIA_BYTES = MAX_MEDIA_MB * 1024 * 1024;

// Agrupamos extensiones desconocidas para no enviar nombres de archivo
// ni valores arbitrarios a Google Analytics.
const FORMATOS_CONOCIDOS = new Set([
  "mp3", "wav", "aac", "m4a", "mp4", "mov", "webm",
  "ogg", "oga", "opus", "flac", "aiff", "wma", "mkv",
  "avi", "mpeg", "mpg", "3gp", "m4v",
]);

function formatoOrigen(file: File): string {
  const extension = obtenerExtension(file.name);
  return FORMATOS_CONOCIDOS.has(extension) ? extension : "other";
}

function tipoOrigen(file: File): string {
  if (file.type.startsWith("audio/")) return "audio";
  if (file.type.startsWith("video/")) return "video";
  return "unknown";
}

function formatearTamano(bytes: number): string {
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

function obtenerExtension(nombre: string): string {
  const partes = nombre.split(".");
  return partes.length > 1
    ? partes.pop()?.toLowerCase() ?? "bin"
    : "bin";
}

function mimeSalida(formato: FormatoSalida): string {
  switch (formato) {
    case "wav":
      return "audio/wav";
    case "aac":
      return "audio/aac";
    default:
      return "audio/mpeg";
  }
}

function argumentosConversion(
  entrada: string,
  salida: string,
  formato: FormatoSalida
): string[] {
  switch (formato) {
    case "wav":
      return [
        "-i",
        entrada,
        "-vn",
        "-acodec",
        "pcm_s16le",
        "-ar",
        "44100",
        "-ac",
        "2",
        salida,
      ];

    case "aac":
      return [
        "-i",
        entrada,
        "-vn",
        "-c:a",
        "aac",
        "-b:a",
        "192k",
        salida,
      ];

    default:
      return [
        "-i",
        entrada,
        "-vn",
        "-c:a",
        "libmp3lame",
        "-b:a",
        "192k",
        salida,
      ];
  }
}

export default function ConversoresPage() {
  const ffmpegRef = useRef<FFmpeg | null>(null);

  const [archivo, setArchivo] = useState<File | null>(null);
  const [formatoDestino, setFormatoDestino] =
    useState<FormatoSalida>("mp3");

  const [urlResultado, setUrlResultado] =
    useState<string | null>(null);

  const [procesando, setProcesando] = useState(false);
  const [cargandoMotor, setCargandoMotor] =
    useState(false);
  const [motorListo, setMotorListo] = useState(false);

  const [arrastrando, setArrastrando] =
    useState(false);

  const [mensajeEstado, setMensajeEstado] =
    useState("Motor de conversión pendiente de carga.");

  const [error, setError] = useState<string | null>(
    null
  );

  useEffect(() => {
    return () => {
      if (urlResultado) {
        URL.revokeObjectURL(urlResultado);
      }
    };
  }, [urlResultado]);

  const limpiarResultado = () => {
    if (urlResultado) {
      URL.revokeObjectURL(urlResultado);
    }

    setUrlResultado(null);
  };

  const cargarMotor = async () => {
    if (motorListo || cargandoMotor) return;

    setCargandoMotor(true);
    setError(null);
    setMensajeEstado(
      "Cargando motor FFmpeg en el navegador..."
    );

    try {
      const ffmpeg = new FFmpeg();

      ffmpeg.on("log", ({ message }) => {
        if (message.trim()) {
          setMensajeEstado(message);
        }
      });

      const baseURL =
        "/ffmpeg";

      await ffmpeg.load({
        coreURL: await toBlobURL(
          `${baseURL}/ffmpeg-core.js`,
          "text/javascript"
        ),
        wasmURL: await toBlobURL(
          `${baseURL}/ffmpeg-core.wasm`,
          "application/wasm"
        ),
      });

      ffmpegRef.current = ffmpeg;
      setMotorListo(true);
      setMensajeEstado(
        "Motor FFmpeg listo para convertir."
      );
    } catch (err) {
      console.error(
        "Error al cargar FFmpeg:",
        err
      );

      setError(
        "No se pudo cargar el motor de conversión. Revisa tu conexión e inténtalo nuevamente."
      );

      setMensajeEstado(
        "Motor FFmpeg no disponible."
      );

      trackEvent("tool_error", {
        tool: "conversores",
        action: "load_engine",
        error_type: "engine_load_failed",
      });
    } finally {
      setCargandoMotor(false);
    }
  };

  const manejarArchivo = (file: File) => {
    const esAudio = file.type.startsWith("audio/");
    const esVideo = file.type.startsWith("video/");

    if (!esAudio && !esVideo) {
      setError(
        "Selecciona un archivo de audio o video válido."
      );
      trackEvent("tool_error", {
        tool: "conversores",
        action: "file_validation",
        error_type: "unsupported_media_type",
      });
      return;
    }

    if (file.size > MAX_MEDIA_BYTES) {
      setError(
        `El archivo supera el límite actual de ${MAX_MEDIA_MB} MB.`
      );
      trackEvent("tool_error", {
        tool: "conversores",
        action: "file_validation",
        error_type: "file_too_large",
        input_type: tipoOrigen(file),
        input_format: formatoOrigen(file),
        original_size_bytes: file.size,
      });
      return;
    }

    limpiarResultado();

    setArchivo(file);
    setFormatoDestino("mp3");
    setError(null);
  };

  const ejecutarConversionAudio = async () => {
    if (!archivo) {
      setError(
        "Selecciona primero un archivo."
      );
      trackEvent("tool_error", {
        tool: "conversores",
        action: "convert",
        error_type: "missing_file",
      });
      return;
    }

    if (!motorListo) {
      await cargarMotor();
    }

    const ffmpeg = ffmpegRef.current;

    if (!ffmpeg) {
      setError(
        "El motor FFmpeg no está disponible."
      );
      // Si falló cargarMotor, ya se registró engine_load_failed.
      return;
    }

    setProcesando(true);
    setError(null);
    limpiarResultado();

    const extensionEntrada =
      obtenerExtension(archivo.name);

    const nombreEntrada =
      `entrada.${extensionEntrada}`;

    const nombreSalida =
      `PALJALE_Audio.${formatoDestino}`;

    let etapa: "write_input" | "convert" | "read_output" | "validate_output" =
      "write_input";

    try {
      setMensajeEstado(
        "Preparando archivo para conversión..."
      );

      await ffmpeg.writeFile(
        nombreEntrada,
        await fetchFile(archivo)
      );

      setMensajeEstado(
        `Convirtiendo a ${formatoDestino.toUpperCase()}...`
      );

      const argumentos =
        argumentosConversion(
          nombreEntrada,
          nombreSalida,
          formatoDestino
        );

      etapa = "convert";
      const codigoSalida =
        await ffmpeg.exec(argumentos);

      if (codigoSalida !== 0) {
        throw new Error(
          `FFmpeg terminó con código ${codigoSalida}.`
        );
      }

      etapa = "read_output";
      const datos =
        await ffmpeg.readFile(nombreSalida);

      etapa = "validate_output";
      if (typeof datos === "string") {
        throw new Error(
          "FFmpeg devolvió un resultado inesperado."
        );
      }

      const blob = new Blob(
        [new Uint8Array(datos)],
        {
          type: mimeSalida(formatoDestino),
        }
      );

      if (blob.size === 0) {
        throw new Error(
          "El archivo convertido quedó vacío."
        );
      }

      setUrlResultado(
        URL.createObjectURL(blob)
      );

      setMensajeEstado(
        `Conversión completada: ${formatearTamano(
          archivo.size
        )} → ${formatearTamano(blob.size)}`
      );

      trackEvent("tool_success", {
        tool: "conversores",
        action: "convert",
        input_type: tipoOrigen(archivo),
        input_format: formatoOrigen(archivo),
        output_format: formatoDestino,
        original_size_bytes: archivo.size,
        result_size_bytes: blob.size,
      });

      try {
        await ffmpeg.deleteFile(nombreEntrada);
        await ffmpeg.deleteFile(nombreSalida);
      } catch {
        // La limpieza temporal no debe bloquear
        // una conversión ya completada.
      }
    } catch (err) {
      console.error(
        "Error al convertir multimedia:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "No se pudo completar la conversión."
      );

      setMensajeEstado(
        "La conversión no pudo completarse."
      );

      trackEvent("tool_error", {
        tool: "conversores",
        action: "convert",
        input_type: tipoOrigen(archivo),
        input_format: formatoOrigen(archivo),
        output_format: formatoDestino,
        original_size_bytes: archivo.size,
        error_type: `${etapa}_failed`,
      });
    } finally {
      setProcesando(false);
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
            🎵
          </div>
        </div>

        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-cyan-300 mb-4 text-center">
          Conversor de Audio y Multimedia
        </h1>

        <p className="text-gray-300 font-bold mb-10 text-center text-base md:text-lg max-w-xl">
          Convierte audio o extrae audio desde video
          directamente en tu navegador usando FFmpeg.
        </p>

        <div className="w-full max-w-xl bg-[#0a1622]/80 backdrop-blur-2xl border border-cyan-500/20 rounded-[32px] p-8 md:p-12 shadow-[0_0_30px_rgba(0,0,0,0.5)] flex flex-col items-center">
          <h2 className="text-2xl font-bold text-white mb-6">
            Conversor real de audio
          </h2>

          {!motorListo && (
            <button
              type="button"
              onClick={cargarMotor}
              disabled={cargandoMotor}
              className="w-full mb-6 bg-[#060D14] border border-cyan-500/30 text-cyan-300 font-bold py-3 px-4 rounded-2xl disabled:opacity-50"
            >
              {cargandoMotor
                ? "Cargando motor..."
                : "Cargar motor FFmpeg"}
            </button>
          )}

          <div className="w-full mb-6 text-xs text-gray-400 border border-cyan-900/40 rounded-xl p-3 bg-[#060D14] break-words">
            {mensajeEstado}
          </div>

          {error && (
            <div className="w-full mb-6 border border-rose-500/30 bg-rose-500/10 text-rose-200 rounded-2xl px-4 py-3 text-sm">
              {error}
            </div>
          )}

          {!archivo ? (
            <label
              onDragOver={(event) => {
                event.preventDefault();
                setArrastrando(true);
              }}
              onDragLeave={() =>
                setArrastrando(false)
              }
              onDrop={(event) => {
                event.preventDefault();
                setArrastrando(false);

                const file =
                  event.dataTransfer.files?.[0];

                if (file) {
                  manejarArchivo(file);
                }
              }}
              className={`w-full flex flex-col items-center justify-center border-2 border-dashed rounded-3xl p-10 cursor-pointer transition-all group mb-6 ${
                arrastrando
                  ? "border-cyan-400 bg-cyan-500/10 scale-[1.02]"
                  : "border-cyan-500/30 bg-[#060D14]/50 hover:bg-cyan-500/5"
              }`}
            >
              <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                🎧
              </div>

              <span className="text-lg font-bold text-white mb-1 text-center">
                Arrastra tu archivo de audio o video aquí
              </span>

              <span className="text-sm text-gray-400 text-center">
                MP3, WAV, AAC, MP4, MOV, WebM y otros
                compatibles · máximo {MAX_MEDIA_MB} MB
              </span>

              <input
                type="file"
                className="hidden"
                accept="audio/*,video/*"
                onChange={(event) => {
                  const file =
                    event.target.files?.[0];

                  if (file) {
                    manejarArchivo(file);
                  }
                }}
              />
            </label>
          ) : (
            <div className="w-full flex flex-col items-center">
              <div className="w-full bg-[#060D14] border border-cyan-900/50 p-4 rounded-2xl mb-6 text-sm text-gray-300 flex justify-between items-center gap-4">
                <div className="min-w-0">
                  <span className="block truncate">
                    Archivo:{" "}
                    <strong className="text-white">
                      {archivo.name}
                    </strong>
                  </span>

                  <span className="text-xs text-cyan-400">
                    {formatearTamano(
                      archivo.size
                    )}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setArchivo(null);
                    limpiarResultado();
                    setError(null);
                  }}
                  className="text-rose-400 font-bold text-xs hover:underline"
                >
                  Cambiar
                </button>
              </div>

              <div className="w-full mb-6">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                  Formato de salida
                </label>

                <div className="grid grid-cols-3 gap-2">
                  {(
                    ["mp3", "wav", "aac"] as const
                  ).map((formato) => (
                    <button
                      key={formato}
                      type="button"
                      onClick={() => {
                        setFormatoDestino(formato);
                        limpiarResultado();
                      }}
                      className={`py-3 rounded-xl font-bold text-xs border ${
                        formatoDestino === formato
                          ? "bg-cyan-500 text-black border-cyan-400"
                          : "bg-[#060D14] text-gray-300 border-cyan-900/50"
                      }`}
                    >
                      {formato.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {!urlResultado ? (
                <button
                  type="button"
                  onClick={ejecutarConversionAudio}
                  disabled={
                    procesando || cargandoMotor
                  }
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold py-4 px-6 rounded-2xl shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:opacity-90 transition disabled:opacity-50"
                >
                  {procesando
                    ? "Procesando conversión..."
                    : `Convertir a ${formatoDestino.toUpperCase()}`}
                </button>
              ) : (
                <div className="w-full flex flex-col gap-3">
                  <div className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-center py-3 rounded-2xl font-bold text-sm">
                    ✓ Conversión real completada
                  </div>

                  <a
                    href={urlResultado}
                    download={`PALJALE_Audio.${formatoDestino}`}
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold py-4 px-6 rounded-2xl text-center shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:opacity-90 transition"
                  >
                    Descargar{" "}
                    {formatoDestino.toUpperCase()}
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      setArchivo(null);
                      limpiarResultado();
                      setError(null);
                    }}
                    className="text-sm text-gray-400 hover:text-white mt-2"
                  >
                    Convertir otro archivo
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <BarraEfemeride />

      <footer className="w-full border-t border-cyan-900/40 py-8 text-center text-xs text-gray-500 bg-[#04080c]">
        PALJALE © 2026 — Todos los derechos reservados.
      </footer>
    </div>
  );
}
