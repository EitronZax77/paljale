"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { degrees, PDFDocument } from "pdf-lib";
import * as pdfjsLib from "pdfjs-dist";
import BarraEfemeride from "@/components/BarraEfemeride";

type HerramientaPdf =
  | "unir"
  | "dividir"
  | "rotar"
  | "comprimir";

type ModoCompresion = "estandar" | "mejor";

const MAX_PDF_MB = 30;
const MAX_PDF_BYTES = MAX_PDF_MB * 1024 * 1024;
const MAX_PAGES_RASTER = 100;

if (typeof window !== "undefined") {
  pdfjsLib.GlobalWorkerOptions.workerSrc =
    `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;
}

function esPdf(file: File): boolean {
  return (
    file.type === "application/pdf" ||
    file.name.toLowerCase().endsWith(".pdf")
  );
}

function validarPdf(file: File): string | null {
  if (!esPdf(file)) {
    return "El archivo seleccionado no es un PDF válido.";
  }

  if (file.size > MAX_PDF_BYTES) {
    return `El archivo supera el límite actual de ${MAX_PDF_MB} MB.`;
  }

  return null;
}

function formatearTamano(bytes: number): string {
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

function bytesABlob(bytes: Uint8Array): Blob {
  return new Blob([new Uint8Array(bytes)], {
    type: "application/pdf",
  });
}

function procesarRangoPaginas(
  input: string,
  maxPaginas: number
): number[] {
  const paginasSet = new Set<number>();

  for (const fragmento of input.split(",")) {
    const limpio = fragmento.trim();

    if (!limpio) continue;

    if (limpio.includes("-")) {
      const valores = limpio
        .split("-")
        .map((valor) => Number.parseInt(valor.trim(), 10));

      if (
        valores.length !== 2 ||
        Number.isNaN(valores[0]) ||
        Number.isNaN(valores[1])
      ) {
        continue;
      }

      const inicio = Math.min(valores[0], valores[1]);
      const fin = Math.max(valores[0], valores[1]);

      for (let pagina = inicio; pagina <= fin; pagina += 1) {
        if (pagina >= 1 && pagina <= maxPaginas) {
          paginasSet.add(pagina - 1);
        }
      }

      continue;
    }

    const pagina = Number.parseInt(limpio, 10);

    if (
      !Number.isNaN(pagina) &&
      pagina >= 1 &&
      pagina <= maxPaginas
    ) {
      paginasSet.add(pagina - 1);
    }
  }

  return Array.from(paginasSet).sort((a, b) => a - b);
}

export default function PdfPage() {
  const [herramienta, setHerramienta] =
    useState<HerramientaPdf>("unir");

  const [procesando, setProcesando] = useState(false);
  const [mensajeError, setMensajeError] =
    useState<string | null>(null);

  const [archivosUnir, setArchivosUnir] =
    useState<File[]>([]);
  const [pdfUnidoUrl, setPdfUnidoUrl] =
    useState<string | null>(null);
  const [arrastrandoUnir, setArrastrandoUnir] =
    useState(false);

  const [archivoDividir, setArchivoDividir] =
    useState<File | null>(null);
  const [pdfDivididoUrl, setPdfDivididoUrl] =
    useState<string | null>(null);
  const [rangoPaginas, setRangoPaginas] =
    useState("");
  const [arrastrandoDividir, setArrastrandoDividir] =
    useState(false);

  const [archivoRotar, setArchivoRotar] =
    useState<File | null>(null);
  const [pdfRotadoUrl, setPdfRotadoUrl] =
    useState<string | null>(null);
  const [anguloRotacion, setAnguloRotacion] =
    useState(90);
  const [paginasRotar, setPaginasRotar] =
    useState("todas");
  const [arrastrandoRotar, setArrastrandoRotar] =
    useState(false);

  const [archivoComprimir, setArchivoComprimir] =
    useState<File | null>(null);
  const [pdfComprimidoUrl, setPdfComprimidoUrl] =
    useState<string | null>(null);
  const [tamanoOriginal, setTamanoOriginal] =
    useState("");
  const [tamanoComprimido, setTamanoComprimido] =
    useState("");
  const [porcentajeAhorro, setPorcentajeAhorro] =
    useState(0);
  const [modoCompresion, setModoCompresion] =
    useState<ModoCompresion>("estandar");
  const [
    arrastrandoComprimir,
    setArrastrandoComprimir,
  ] = useState(false);

  useEffect(() => {
    return () => {
      if (pdfUnidoUrl) URL.revokeObjectURL(pdfUnidoUrl);

      if (pdfDivididoUrl) {
        URL.revokeObjectURL(pdfDivididoUrl);
      }

      if (pdfRotadoUrl) {
        URL.revokeObjectURL(pdfRotadoUrl);
      }

      if (pdfComprimidoUrl) {
        URL.revokeObjectURL(pdfComprimidoUrl);
      }
    };
  }, [
    pdfUnidoUrl,
    pdfDivididoUrl,
    pdfRotadoUrl,
    pdfComprimidoUrl,
  ]);

  const revocarUrl = (
    url: string | null,
    limpiar: (valor: string | null) => void
  ) => {
    if (url) {
      URL.revokeObjectURL(url);
    }

    limpiar(null);
  };

  const cambiarHerramienta = (
    nuevaHerramienta: HerramientaPdf
  ) => {
    setHerramienta(nuevaHerramienta);
    setMensajeError(null);
  };

  const agregarArchivosUnir = (
    files: FileList | File[]
  ) => {
    const archivosValidos: File[] = [];
    const errores: string[] = [];

    Array.from(files).forEach((file) => {
      const error = validarPdf(file);

      if (error) {
        errores.push(`${file.name}: ${error}`);
      } else {
        archivosValidos.push(file);
      }
    });

    if (errores.length > 0) {
      setMensajeError(errores.join(" "));
    } else {
      setMensajeError(null);
    }

    if (archivosValidos.length > 0) {
      revocarUrl(pdfUnidoUrl, setPdfUnidoUrl);

      setArchivosUnir((actuales) => [
        ...actuales,
        ...archivosValidos,
      ]);
    }
  };

  const unirPdfs = async () => {
    if (archivosUnir.length < 2) {
      setMensajeError(
        "Selecciona al menos dos archivos PDF."
      );
      return;
    }

    setProcesando(true);
    setMensajeError(null);

    try {
      const resultado = await PDFDocument.create();

      for (const archivo of archivosUnir) {
        const bytes = await archivo.arrayBuffer();

        const documento = await PDFDocument.load(bytes, {
          ignoreEncryption: true,
        });

        const paginas = await resultado.copyPages(
          documento,
          documento.getPageIndices()
        );

        paginas.forEach((pagina) => {
          resultado.addPage(pagina);
        });
      }

      const bytesFinales = await resultado.save({
        useObjectStreams: true,
        addDefaultPage: false,
      });

      revocarUrl(pdfUnidoUrl, setPdfUnidoUrl);

      setPdfUnidoUrl(
        URL.createObjectURL(bytesABlob(bytesFinales))
      );
    } catch (error) {
      console.error("Error al unir PDFs:", error);

      setMensajeError(
        "No fue posible unir los archivos. Verifica que los PDFs no estén dañados o protegidos."
      );
    } finally {
      setProcesando(false);
    }
  };

  const seleccionarDividir = (file: File) => {
    const error = validarPdf(file);

    if (error) {
      setMensajeError(error);
      return;
    }

    revocarUrl(pdfDivididoUrl, setPdfDivididoUrl);

    setArchivoDividir(file);
    setRangoPaginas("");
    setMensajeError(null);
  };

  const dividirPdf = async () => {
    if (!archivoDividir || !rangoPaginas.trim()) {
      setMensajeError(
        "Selecciona un PDF e indica las páginas que quieres extraer."
      );
      return;
    }

    setProcesando(true);
    setMensajeError(null);

    try {
      const bytes = await archivoDividir.arrayBuffer();

      const original = await PDFDocument.load(bytes, {
        ignoreEncryption: true,
      });

      const indices = procesarRangoPaginas(
        rangoPaginas,
        original.getPageCount()
      );

      if (indices.length === 0) {
        setMensajeError(
          "El rango de páginas no es válido o está fuera del documento."
        );
        return;
      }

      const nuevoDocumento = await PDFDocument.create();

      const paginas = await nuevoDocumento.copyPages(
        original,
        indices
      );

      paginas.forEach((pagina) => {
        nuevoDocumento.addPage(pagina);
      });

      const bytesFinales = await nuevoDocumento.save({
        useObjectStreams: true,
        addDefaultPage: false,
      });

      revocarUrl(
        pdfDivididoUrl,
        setPdfDivididoUrl
      );

      setPdfDivididoUrl(
        URL.createObjectURL(bytesABlob(bytesFinales))
      );
    } catch (error) {
      console.error(
        "Error al extraer páginas:",
        error
      );

      setMensajeError(
        "No fue posible extraer las páginas del PDF."
      );
    } finally {
      setProcesando(false);
    }
  };

  const seleccionarRotar = (file: File) => {
    const error = validarPdf(file);

    if (error) {
      setMensajeError(error);
      return;
    }

    revocarUrl(pdfRotadoUrl, setPdfRotadoUrl);

    setArchivoRotar(file);
    setPaginasRotar("todas");
    setMensajeError(null);
  };

  const rotarPdf = async () => {
    if (!archivoRotar) {
      setMensajeError("Selecciona un PDF.");
      return;
    }

    setProcesando(true);
    setMensajeError(null);

    try {
      const bytes = await archivoRotar.arrayBuffer();

      const documento = await PDFDocument.load(bytes, {
        ignoreEncryption: true,
      });

      const paginas = documento.getPages();

      const indices =
        paginasRotar.trim().toLowerCase() === "todas" ||
        paginasRotar.trim() === ""
          ? paginas.map((_, index) => index)
          : procesarRangoPaginas(
              paginasRotar,
              paginas.length
            );

      if (indices.length === 0) {
        setMensajeError(
          "No se encontraron páginas válidas para rotar."
        );
        return;
      }

      indices.forEach((indice) => {
        const pagina = paginas[indice];

        if (!pagina) return;

        const anguloActual =
          pagina.getRotation().angle;

        pagina.setRotation(
          degrees(
            (anguloActual + anguloRotacion) % 360
          )
        );
      });

      const bytesFinales = await documento.save({
        useObjectStreams: true,
      });

      revocarUrl(pdfRotadoUrl, setPdfRotadoUrl);

      setPdfRotadoUrl(
        URL.createObjectURL(bytesABlob(bytesFinales))
      );
    } catch (error) {
      console.error("Error al rotar PDF:", error);

      setMensajeError(
        "No fue posible rotar el PDF."
      );
    } finally {
      setProcesando(false);
    }
  };

  const seleccionarArchivoComprimir = (
    file: File
  ) => {
    const error = validarPdf(file);

    if (error) {
      setMensajeError(error);
      return;
    }

    revocarUrl(
      pdfComprimidoUrl,
      setPdfComprimidoUrl
    );

    setArchivoComprimir(file);
    setTamanoOriginal(formatearTamano(file.size));
    setTamanoComprimido("");
    setPorcentajeAhorro(0);
    setMensajeError(null);
  };

  const compresionEstandar = async (
    file: File
  ): Promise<Uint8Array> => {
    const bytes = await file.arrayBuffer();

    const original = await PDFDocument.load(bytes, {
      ignoreEncryption: true,
    });

    const optimizado = await PDFDocument.create();

    const paginas = await optimizado.copyPages(
      original,
      original.getPageIndices()
    );

    paginas.forEach((pagina) => {
      optimizado.addPage(pagina);
    });

    return optimizado.save({
      useObjectStreams: true,
      addDefaultPage: false,
      objectsPerTick: 50,
    });
  };

  const compresionRaster = async (
    file: File
  ): Promise<Uint8Array> => {
    const datos = new Uint8Array(
      await file.arrayBuffer()
    );

    const tarea = pdfjsLib.getDocument({
      data: datos,
    });

    const original = await tarea.promise;

    if (original.numPages > MAX_PAGES_RASTER) {
      await tarea.destroy();

      throw new Error(
        `El modo de máxima compresión admite hasta ${MAX_PAGES_RASTER} páginas por operación.`
      );
    }

    const nuevoPdf = await PDFDocument.create();

    try {
      for (
        let numeroPagina = 1;
        numeroPagina <= original.numPages;
        numeroPagina += 1
      ) {
        const pagina =
          await original.getPage(numeroPagina);

        const viewportSalida =
          pagina.getViewport({ scale: 1 });

        const viewportRender =
          pagina.getViewport({ scale: 1.15 });

        const canvas =
          document.createElement("canvas");

        canvas.width = Math.ceil(
          viewportRender.width
        );
        canvas.height = Math.ceil(
          viewportRender.height
        );

        const context =
          canvas.getContext("2d", {
            alpha: false,
          });

        if (!context) {
          throw new Error(
            "No se pudo preparar el navegador para procesar una página."
          );
        }

        context.fillStyle = "#FFFFFF";

        context.fillRect(
          0,
          0,
          canvas.width,
          canvas.height
        );

        await pagina.render({
          canvas,
          canvasContext: context,
          viewport: viewportRender,
        }).promise;

        const imagenDataUrl =
          canvas.toDataURL("image/jpeg", 0.72);

        const imagen =
          await nuevoPdf.embedJpg(
            imagenDataUrl
          );

        const paginaNueva =
          nuevoPdf.addPage([
            viewportSalida.width,
            viewportSalida.height,
          ]);

        paginaNueva.drawImage(imagen, {
          x: 0,
          y: 0,
          width: viewportSalida.width,
          height: viewportSalida.height,
        });

        pagina.cleanup();

        canvas.width = 1;
        canvas.height = 1;
      }

      return await nuevoPdf.save({
        useObjectStreams: true,
        addDefaultPage: false,
        objectsPerTick: 50,
      });
    } finally {
      await tarea.destroy();
    }
  };

  const comprimirPdf = async () => {
    if (!archivoComprimir) {
      setMensajeError("Selecciona un PDF.");
      return;
    }

    setProcesando(true);
    setMensajeError(null);

    revocarUrl(
      pdfComprimidoUrl,
      setPdfComprimidoUrl
    );

    try {
      const resultado =
        modoCompresion === "estandar"
          ? await compresionEstandar(
              archivoComprimir
            )
          : await compresionRaster(
              archivoComprimir
            );

      const tamanoReal = resultado.byteLength;
      const tamanoOriginalBytes =
        archivoComprimir.size;

      setTamanoComprimido(
        formatearTamano(tamanoReal)
      );

      if (
        tamanoReal >= tamanoOriginalBytes
      ) {
        setPorcentajeAhorro(0);

        setMensajeError(
          `PALJALE procesó el archivo, pero este método no logró reducirlo: ${formatearTamano(
            tamanoOriginalBytes
          )} → ${formatearTamano(
            tamanoReal
          )}. No se mostrará una reducción ficticia. Prueba ${
            modoCompresion === "estandar"
              ? "Máxima Compresión"
              : "otro PDF"
          }.`
        );

        return;
      }

      const ahorroReal = Math.max(
        0,
        Math.round(
          ((tamanoOriginalBytes - tamanoReal) /
            tamanoOriginalBytes) *
            100
        )
      );

      setPorcentajeAhorro(ahorroReal);

      setPdfComprimidoUrl(
        URL.createObjectURL(
          bytesABlob(resultado)
        )
      );
    } catch (error) {
      console.error(
        "Error al comprimir PDF:",
        error
      );

      setPorcentajeAhorro(0);

      setMensajeError(
        error instanceof Error
          ? error.message
          : "No fue posible comprimir este PDF."
      );
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

          <div className="relative w-20 h-20 rounded-3xl bg-[#0a1622] border border-cyan-500/30 text-cyan-400 flex items-center justify-center text-4xl">
            📄
          </div>
        </div>

        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-cyan-300 mb-4 text-center">
          Herramientas PDF Profesionales
        </h1>

        <p className="text-gray-300 font-bold mb-10 text-center text-base md:text-lg max-w-xl">
          Une, extrae, rota y comprime PDFs directamente
          desde tu navegador.
        </p>

        <div className="flex flex-wrap justify-center bg-[#0a1622]/90 p-1.5 rounded-2xl border border-cyan-500/20 mb-10 gap-2">
          {(
            [
              ["unir", "Unir PDFs"],
              ["dividir", "Extraer Páginas"],
              ["rotar", "Rotar PDF"],
              ["comprimir", "Comprimir PDF"],
            ] as const
          ).map(([id, texto]) => (
            <button
              key={id}
              type="button"
              onClick={() =>
                cambiarHerramienta(id)
              }
              className={`px-4 py-2.5 rounded-xl font-bold text-sm transition ${
                herramienta === id
                  ? "bg-cyan-500 text-black"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {texto}
            </button>
          ))}
        </div>

        {mensajeError && (
          <div className="w-full max-w-xl mb-6 border border-amber-500/30 bg-amber-500/10 text-amber-200 rounded-2xl px-4 py-3 text-sm">
            {mensajeError}
          </div>
        )}

        <div className="w-full max-w-xl bg-[#0a1622]/80 border border-cyan-500/20 rounded-[32px] p-8 md:p-12 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
          {herramienta === "unir" && (
            <div className="flex flex-col gap-6">
              <label
                onDragOver={(event) => {
                  event.preventDefault();
                  setArrastrandoUnir(true);
                }}
                onDragLeave={() =>
                  setArrastrandoUnir(false)
                }
                onDrop={(event) => {
                  event.preventDefault();
                  setArrastrandoUnir(false);
                  agregarArchivosUnir(
                    event.dataTransfer.files
                  );
                }}
                className={`w-full flex flex-col items-center justify-center border-2 border-dashed rounded-3xl p-10 cursor-pointer transition ${
                  arrastrandoUnir
                    ? "border-cyan-400 bg-cyan-500/10"
                    : "border-cyan-500/30 bg-[#060D14]/50"
                }`}
              >
                <span className="text-4xl mb-4">
                  📚
                </span>

                <span className="font-bold text-white text-center">
                  Arrastra dos o más PDFs o haz clic
                </span>

                <span className="text-sm text-gray-400 mt-2">
                  Máximo {MAX_PDF_MB} MB por archivo
                </span>

                <input
                  type="file"
                  multiple
                  accept=".pdf,application/pdf"
                  className="hidden"
                  onChange={(event) => {
                    if (event.target.files) {
                      agregarArchivosUnir(
                        event.target.files
                      );
                    }
                  }}
                />
              </label>

              {archivosUnir.length > 0 && (
                <div className="flex flex-col gap-2">
                  {archivosUnir.map(
                    (archivo, index) => (
                      <div
                        key={`${archivo.name}-${archivo.lastModified}-${index}`}
                        className="flex justify-between items-center bg-[#060D14] border border-cyan-900/50 rounded-xl p-3 gap-4"
                      >
                        <span className="truncate text-sm">
                          {archivo.name}
                        </span>

                        <button
                          type="button"
                          onClick={() => {
                            setArchivosUnir(
                              (actuales) =>
                                actuales.filter(
                                  (_, indice) =>
                                    indice !== index
                                )
                            );

                            revocarUrl(
                              pdfUnidoUrl,
                              setPdfUnidoUrl
                            );
                          }}
                          className="text-rose-400 text-xs font-bold"
                        >
                          Quitar
                        </button>
                      </div>
                    )
                  )}
                </div>
              )}

              {!pdfUnidoUrl ? (
                <button
                  type="button"
                  onClick={unirPdfs}
                  disabled={
                    procesando ||
                    archivosUnir.length < 2
                  }
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold py-4 rounded-2xl disabled:opacity-50"
                >
                  {procesando
                    ? "Uniendo..."
                    : "Unir PDFs"}
                </button>
              ) : (
                <a
                  href={pdfUnidoUrl}
                  download="PALJALE_Unido.pdf"
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-black text-center font-bold py-4 rounded-2xl"
                >
                  Descargar PDF Unido
                </a>
              )}
            </div>
          )}

          {herramienta === "dividir" && (
            <div className="flex flex-col gap-6">
              {!archivoDividir ? (
                <label
                  onDragOver={(event) => {
                    event.preventDefault();
                    setArrastrandoDividir(true);
                  }}
                  onDragLeave={() =>
                    setArrastrandoDividir(false)
                  }
                  onDrop={(event) => {
                    event.preventDefault();
                    setArrastrandoDividir(false);

                    const file =
                      event.dataTransfer.files?.[0];

                    if (file) {
                      seleccionarDividir(file);
                    }
                  }}
                  className={`w-full flex flex-col items-center border-2 border-dashed rounded-3xl p-10 cursor-pointer ${
                    arrastrandoDividir
                      ? "border-cyan-400 bg-cyan-500/10"
                      : "border-cyan-500/30 bg-[#060D14]/50"
                  }`}
                >
                  <span className="text-4xl mb-4">
                    ✂️
                  </span>

                  <span className="font-bold">
                    Selecciona un PDF
                  </span>

                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,application/pdf"
                    onChange={(event) => {
                      const file =
                        event.target.files?.[0];

                      if (file) {
                        seleccionarDividir(file);
                      }
                    }}
                  />
                </label>
              ) : (
                <>
                  <div className="bg-[#060D14] rounded-xl p-4 text-sm">
                    {archivoDividir.name}
                  </div>

                  <div>
                    <label
                      htmlFor="paginas-extraer"
                      className="block text-xs uppercase font-bold text-gray-400 mb-2"
                    >
                      Páginas a extraer
                    </label>

                    <input
                      id="paginas-extraer"
                      type="text"
                      value={rangoPaginas}
                      onChange={(event) =>
                        setRangoPaginas(
                          event.target.value
                        )
                      }
                      placeholder="Ej. 1,3,5-9"
                      className="w-full bg-[#060D14] border border-cyan-900/50 rounded-xl px-4 py-3"
                    />
                  </div>

                  {!pdfDivididoUrl ? (
                    <button
                      type="button"
                      onClick={dividirPdf}
                      disabled={procesando}
                      className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold py-4 rounded-2xl disabled:opacity-50"
                    >
                      {procesando
                        ? "Extrayendo..."
                        : "Extraer páginas"}
                    </button>
                  ) : (
                    <a
                      href={pdfDivididoUrl}
                      download="PALJALE_Extraido.pdf"
                      className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-black text-center font-bold py-4 rounded-2xl"
                    >
                      Descargar PDF Extraído
                    </a>
                  )}
                </>
              )}
            </div>
          )}

          {herramienta === "rotar" && (
            <div className="flex flex-col gap-6">
              {!archivoRotar ? (
                <label
                  onDragOver={(event) => {
                    event.preventDefault();
                    setArrastrandoRotar(true);
                  }}
                  onDragLeave={() =>
                    setArrastrandoRotar(false)
                  }
                  onDrop={(event) => {
                    event.preventDefault();
                    setArrastrandoRotar(false);

                    const file =
                      event.dataTransfer.files?.[0];

                    if (file) {
                      seleccionarRotar(file);
                    }
                  }}
                  className={`w-full flex flex-col items-center border-2 border-dashed rounded-3xl p-10 cursor-pointer ${
                    arrastrandoRotar
                      ? "border-cyan-400 bg-cyan-500/10"
                      : "border-cyan-500/30 bg-[#060D14]/50"
                  }`}
                >
                  <span className="text-4xl mb-4">
                    🔄
                  </span>

                  <span className="font-bold">
                    Selecciona un PDF
                  </span>

                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,application/pdf"
                    onChange={(event) => {
                      const file =
                        event.target.files?.[0];

                      if (file) {
                        seleccionarRotar(file);
                      }
                    }}
                  />
                </label>
              ) : (
                <>
                  <div className="bg-[#060D14] rounded-xl p-4 text-sm">
                    {archivoRotar.name}
                  </div>

                  <div>
                    <label
                      htmlFor="angulo-rotacion"
                      className="block text-xs uppercase font-bold text-gray-400 mb-2"
                    >
                      Ángulo
                    </label>

                    <select
                      id="angulo-rotacion"
                      value={anguloRotacion}
                      onChange={(event) =>
                        setAnguloRotacion(
                          Number(
                            event.target.value
                          )
                        )
                      }
                      className="w-full bg-[#060D14] border border-cyan-900/50 rounded-xl px-4 py-3"
                    >
                      <option value={90}>
                        90° derecha
                      </option>
                      <option value={180}>
                        180°
                      </option>
                      <option value={270}>
                        90° izquierda
                      </option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="paginas-rotar"
                      className="block text-xs uppercase font-bold text-gray-400 mb-2"
                    >
                      Páginas
                    </label>

                    <input
                      id="paginas-rotar"
                      value={paginasRotar}
                      onChange={(event) =>
                        setPaginasRotar(
                          event.target.value
                        )
                      }
                      placeholder="todas o 1,3,5-8"
                      className="w-full bg-[#060D14] border border-cyan-900/50 rounded-xl px-4 py-3"
                    />
                  </div>

                  {!pdfRotadoUrl ? (
                    <button
                      type="button"
                      onClick={rotarPdf}
                      disabled={procesando}
                      className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold py-4 rounded-2xl disabled:opacity-50"
                    >
                      {procesando
                        ? "Rotando..."
                        : "Rotar PDF"}
                    </button>
                  ) : (
                    <a
                      href={pdfRotadoUrl}
                      download="PALJALE_Rotado.pdf"
                      className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-black text-center font-bold py-4 rounded-2xl"
                    >
                      Descargar PDF Rotado
                    </a>
                  )}
                </>
              )}
            </div>
          )}

          {herramienta === "comprimir" && (
            <div className="flex flex-col gap-6">
              {!archivoComprimir ? (
                <label
                  onDragOver={(event) => {
                    event.preventDefault();
                    setArrastrandoComprimir(true);
                  }}
                  onDragLeave={() =>
                    setArrastrandoComprimir(false)
                  }
                  onDrop={(event) => {
                    event.preventDefault();
                    setArrastrandoComprimir(false);

                    const file =
                      event.dataTransfer.files?.[0];

                    if (file) {
                      seleccionarArchivoComprimir(
                        file
                      );
                    }
                  }}
                  className={`w-full flex flex-col items-center border-2 border-dashed rounded-3xl p-10 cursor-pointer ${
                    arrastrandoComprimir
                      ? "border-cyan-400 bg-cyan-500/10"
                      : "border-cyan-500/30 bg-[#060D14]/50"
                  }`}
                >
                  <span className="text-4xl mb-4">
                    🗜️
                  </span>

                  <span className="font-bold">
                    Selecciona un PDF
                  </span>

                  <span className="text-sm text-gray-400 mt-2">
                    Máximo {MAX_PDF_MB} MB
                  </span>

                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,application/pdf"
                    onChange={(event) => {
                      const file =
                        event.target.files?.[0];

                      if (file) {
                        seleccionarArchivoComprimir(
                          file
                        );
                      }
                    }}
                  />
                </label>
              ) : (
                <>
                  <div className="flex justify-between items-center bg-[#060D14] rounded-xl p-4 gap-4">
                    <span className="truncate text-sm">
                      {archivoComprimir.name}
                    </span>

                    <span className="text-cyan-400 text-xs font-bold whitespace-nowrap">
                      {tamanoOriginal}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setModoCompresion(
                          "estandar"
                        )
                      }
                      className={`py-3 rounded-xl text-xs font-bold border ${
                        modoCompresion ===
                        "estandar"
                          ? "bg-cyan-500 text-black border-cyan-400"
                          : "bg-[#060D14] border-cyan-900/50"
                      }`}
                    >
                      ⚡ Estándar
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setModoCompresion(
                          "mejor"
                        )
                      }
                      className={`py-3 rounded-xl text-xs font-bold border ${
                        modoCompresion === "mejor"
                          ? "bg-cyan-500 text-black border-cyan-400"
                          : "bg-[#060D14] border-cyan-900/50"
                      }`}
                    >
                      🔥 Máxima
                    </button>
                  </div>

                  {modoCompresion === "mejor" && (
                    <div className="text-xs text-cyan-200 border border-cyan-500/20 bg-cyan-500/5 p-3 rounded-xl text-center">
                      Este modo rasteriza las páginas para reducir
                      documentos basados en imágenes. El texto dejará
                      de ser seleccionable.
                    </div>
                  )}

                  {!pdfComprimidoUrl ? (
                    <button
                      type="button"
                      onClick={comprimirPdf}
                      disabled={procesando}
                      className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold py-4 rounded-2xl disabled:opacity-50"
                    >
                      {procesando
                        ? "Procesando..."
                        : "Comprimir PDF"}
                    </button>
                  ) : (
                    <>
                      <div className="border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 rounded-xl p-4 text-center font-bold text-sm">
                        Reducción real:{" "}
                        {porcentajeAhorro}%{" "}
                        <span className="block mt-1 text-xs font-normal">
                          {tamanoOriginal} →{" "}
                          {tamanoComprimido}
                        </span>
                      </div>

                      <a
                        href={pdfComprimidoUrl}
                        download="PALJALE_Comprimido.pdf"
                        className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-black text-center font-bold py-4 rounded-2xl"
                      >
                        Descargar PDF Comprimido
                      </a>
                    </>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      setArchivoComprimir(null);

                      revocarUrl(
                        pdfComprimidoUrl,
                        setPdfComprimidoUrl
                      );

                      setTamanoOriginal("");
                      setTamanoComprimido("");
                      setPorcentajeAhorro(0);
                      setMensajeError(null);
                    }}
                    className="text-sm text-gray-400 hover:text-white"
                  >
                    Seleccionar otro PDF
                  </button>
                </>
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