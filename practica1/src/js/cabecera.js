const fechaHoy = document.getElementById("fecha-hoy");
const horaActual = document.getElementById("hora-actual");

const DIAS = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];
const MESES = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];

// 1. Muestra la fecha de hoy escrita en texto, con la primera letra en mayúscula:
// Miércoles, 28 de octubre de 2026.

/**
 * Función que muestra la fecha actual en el siguiente formato "Miércoles, 28 de octubre de 2026"
 */
function muestraFecha() {
  let hoy = new Date();

  let diaSemanaActual = DIAS[hoy.getDay()];
  let diaActual = hoy.getDate();
  let mesActual = MESES[hoy.getMonth()];
  let anioActual = hoy.getFullYear();

  fechaHoy.innerText = `${diaSemanaActual}, ${diaActual} de ${mesActual} de ${anioActual}`;
}

// 2. Muestra la hora actual (05:29:51), que se actualiza sola cada segundo.

/**
 * Función que muestra la hora actual
 */
function muestraHora() {
  let hoy = new Date();

  let hora = String(hoy.getHours()).padStart(2, "0");
  let minutos = String(hoy.getMinutes()).padStart(2, "0");
  let segundos = String(hoy.getSeconds()).padStart(2, "0");

  horaActual.innerText = `${hora}:${minutos}:${segundos}`;
}

muestraFecha();
muestraHora();
setInterval(muestraFecha,1000);
setInterval(muestraHora, 1000);
