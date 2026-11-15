const formFicha = document.getElementById("form-ficha");
const inputDniFicha = document.getElementById("ficha-dni");

const fichaError = document.getElementById("ficha-error");
const fichaResultado = document.getElementById("ficha-resultado");

const fichaNombre = document.getElementById("ficha-nombre");
const fichaId = document.getElementById("ficha-id");
const fichaDniValor = document.getElementById("ficha-dni-valor");
const fichaEmail = document.getElementById("ficha-email");
const fichaActividades = document.getElementById("ficha-actividades");
const fichaCuota = document.getElementById("ficha-cuota");

const fichaDominio = document.getElementById("ficha-dominio");
const fichaTelefono = document.getElementById("ficha-telefono");
const fichaNacimiento = document.getElementById("ficha-nacimiento");
const fichaEdad = document.getElementById("ficha-edad");
const fichaAlta = document.getElementById("ficha-alta");
const fichaDiasClub = document.getElementById("ficha-dias-club");
const fichaDiasCumple = document.getElementById("ficha-dias-cumple");

const DIAS_SOCIO = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];
const MESES_SOCIO = [
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

formFicha.addEventListener("submit", (e) => {
  e.preventDefault();

  // Ocultamos lo que hubiera de la búsqueda anterior
  fichaError.hidden = true;
  fichaResultado.hidden = true;

  let dni = inputDniFicha.value.trim().toUpperCase();
  let socioEncontrado = null;

  for (const socio of socios) {
    if (socio.dni == dni) {
      socioEncontrado = socio;
    }
  }

  if (socioEncontrado == null) {
    fichaError.innerText = "No existe ningún socio con ese DNI";
    fichaError.hidden = false;
  } else {
    fichaResultado.hidden = false;
    mostrarFichaSocio(socioEncontrado);
  }
});

/**
 * ==============================================================================================
 * FUNCIONES
 * ==============================================================================================
 */

/**
 * Muestra los datos del socio en la ficha
 * @param {object} socio
 */
function mostrarFichaSocio(socio) {
  fichaNombre.innerText = socio.nombre + " " + socio.apellidos;

  fichaId.innerText = socio.id;

  fichaDniValor.innerText = socio.dni;

  fichaEmail.innerText = socio.email;

  fichaActividades.innerText = socio.actividades.join(", ");

  fichaCuota.innerText = socio.cuota.toFixed(2) + " €";

  let dominioEmail = socio.email.split("@");
  fichaDominio.innerText = dominioEmail[1];

  fichaTelefono.innerText = socio.telefono.slice(0, 3) + " " + socio.telefono.slice(3, 6) + " " + socio.telefono.slice(6, 9);

  fichaNacimiento.innerText = fechaEnTexto(socio.fechaNacimiento);

  fichaEdad.innerText = calcularEdadSocio(socio.fechaNacimiento) + " años";

  fichaAlta.innerText = fechaCorta(socio.fechaAlta);

  fichaDiasClub.innerText = calcularDiasClub(socio.fechaAlta);

  fichaDiasCumple.innerText = calcularDiasCumple(socio.fechaNacimiento);
}

/**
 * Función que calcula la edad del socio
 * @param {string} fechaNacimiento
 * @returns Edad del socio
 */
function calcularEdadSocio(fechaNacimiento) {
  const hoy = new Date();
  const nacimiento = new Date(fechaNacimiento);

  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const mes = hoy.getMonth() - nacimiento.getMonth();

  // Si aún no ha llegado su cumpleaños este año, restamos 1
  if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--;
  }

  return edad;
}

/**
 * Función que calcula los días que lleva un socio en el club
 * @param {string} fechaAlta
 * @returns Días que lleva en el club un socio
 */
function calcularDiasClub(fechaAlta) {
  const hoy = new Date();
  const alta = new Date(fechaAlta);

  const MS_POR_DIA = 1000 * 60 * 60 * 24;

  let dias = Math.floor((hoy - alta) / MS_POR_DIA);

  return dias;
}

/**
 * Función que calcula los días que faltan para el próximo cumpleaños
 * @param {string} fechaNacimiento
 * @returns Días que faltan para su cumpleaños
 */
function calcularDiasCumple(fechaNacimiento) {
  const hoy = new Date();

  hoy.setHours(0, 0, 0, 0); // Hoy a medianoche, para comparar solo dias
  const nacimiento = new Date(fechaNacimiento);

  const MS_POR_DIA = 1000 * 60 * 60 * 24;

  // Cumpleaños de este año: año de hoy, mes y dia del nacimiento
  let cumple = new Date(
    hoy.getFullYear(),
    nacimiento.getMonth(),
    nacimiento.getDate(),
  );

  // Si ese cumple ya pasó, toca el del año que viene
  if (cumple < hoy) {
    cumple = new Date(
      hoy.getFullYear() + 1,
      nacimiento.getMonth(),
      nacimiento.getDate(),
    );
  }

  // Restar, pasar a días y redondear
  return Math.round((cumple - hoy) / MS_POR_DIA);
}

/**
 * Función que muestra la fecha en el siguiente formato "Miércoles, 28 de octubre de 2026"
 * @param {string} fechaNacimiento
 * @returns La fecha en texto ("Miércoles, 28 de octubre de 2026")
 */
function fechaEnTexto(fechaNacimiento) {
  let fecha = new Date(fechaNacimiento);

  let diaSemanaActual = DIAS_SOCIO[fecha.getDay()];
  let diaActual = fecha.getDate();
  let mesActual = MESES_SOCIO[fecha.getMonth()];
  let anioActual = fecha.getFullYear();

  return `${diaSemanaActual}, ${diaActual} de ${mesActual} de ${anioActual}`;
}

/**
 * Función que muestra la fecha con el formato dd/mm/aaaa
 * @param {string} fechaAlta 
 * @returns La fecha con el siguiente formato dd/mm/aaaa
 */
function fechaCorta(fechaAlta) {
  let fechaSeparada = fechaAlta.split("-");
  return fechaSeparada[2] + "/" + fechaSeparada[1] + "/" + fechaSeparada[0];
}
