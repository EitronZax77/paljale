export type PaljaleTheme =
  | "oceano"
  | "primavera"
  | "verano"
  | "tecnologia"
  | "espacial"
  | "ciencia"
  | "arte"
  | "naturaleza"
  | "septiembre"
  | "muertos"
  | "invierno";

const temasSemanales: PaljaleTheme[] = [
  "tecnologia",
  "espacial",
  "ciencia",
  "arte",
  "naturaleza",
  "oceano",
  "primavera",
  "verano",
];

function obtenerSemanaDelAnio(
  fecha: Date
): number {
  const fechaUTC = new Date(
    Date.UTC(
      fecha.getFullYear(),
      fecha.getMonth(),
      fecha.getDate()
    )
  );

  const inicio = new Date(
    Date.UTC(
      fechaUTC.getUTCFullYear(),
      0,
      1
    )
  );

  const diasTranscurridos = Math.floor(
    (fechaUTC.getTime() -
      inicio.getTime()) /
      86400000
  );

  return Math.floor(
    (diasTranscurridos +
      inicio.getUTCDay()) /
      7
  );
}

export function obtenerTemaPaljale(
  fecha: Date
): PaljaleTheme {
  const mes =
    fecha.getMonth() + 1;

  const dia =
    fecha.getDate();

  /*
   * Septiembre:
   * identidad mexicana sobria.
   */
  if (mes === 9) {
    return "septiembre";
  }

  /*
   * Día de Muertos:
   * comienza desde finales de octubre
   * y continúa durante noviembre.
   */
  if (
    (mes === 10 && dia >= 25) ||
    mes === 11
  ) {
    return "muertos";
  }

  /*
   * Temporada de invierno / diciembre.
   */
  if (mes === 12) {
    return "invierno";
  }

  const semana =
    obtenerSemanaDelAnio(
      fecha
    );

  return temasSemanales[
    semana %
      temasSemanales.length
  ];
}