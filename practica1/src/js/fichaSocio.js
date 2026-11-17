const formFicha = document.getElementById("form-ficha"); // El formulario donde se escribe el DNI
const inputDniFicha = document.getElementById("ficha-dni"); // El campo donde se escribe el DNI

const fichaError = document.getElementById("ficha-error"); // Mensaje rojo si el DNI no existe
const fichaResultado = document.getElementById("ficha-resultado"); // Cuadro entero de la ficha (oculto hasta que se encuentra un socio)

const fichaNombre = document.getElementById("ficha-nombre"); // Cabecera: nombre completo
const fichaId = document.getElementById("ficha-id"); // Cabecera: id del socio (SOC-0001)
const fichaDniValor = document.getElementById("ficha-dni-valor"); // DNI
const fichaEmail = document.getElementById("ficha-email"); // Email completo
const fichaActividades = document.getElementById("ficha-actividades"); // Actividades, separadas por comas
const fichaCuota = document.getElementById("ficha-cuota"); // Cuota mensual con dos decimales y €
const fichaCuriosidad = document.getElementById("ficha-curiosidad"); // Curiosidad que diga número de vocales del socio (sin distinguir tildes)

const fichaDominio = document.getElementById("ficha-dominio"); // Dominio del email (lo que va tras la @)
const fichaTelefono = document.getElementById("ficha-telefono"); // Teléfono agrupado de 3 en 3
const fichaNacimiento = document.getElementById("ficha-nacimiento"); // Fecha de nacimiento escrita en texto
const fichaEdad = document.getElementById("ficha-edad"); // Años cumplidos
const fichaAlta = document.getElementById("ficha-alta"); // Fecha de alta en formato dd/mm/aaaa
const fichaDiasClub = document.getElementById("ficha-dias-club"); // Días que lleva el socio en el club
const fichaDiasCumple = document.getElementById("ficha-dias-cumple"); // Días que faltan para su próximo cumpleaños

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

  let dni = inputDniFicha.value.trim().toUpperCase(); // DNI escrito en el campo
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

  fichaCuriosidad.innerText = curiosidadSocio(socio.nombre, socio.apellidos); // Número de vocales del socio

  let dominioEmail = socio.email.split("@");
  fichaDominio.innerText = dominioEmail[1];

  fichaTelefono.innerText =
    socio.telefono.slice(0, 3) +
    " " +
    socio.telefono.slice(3, 6) +
    " " +
    socio.telefono.slice(6, 9);

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

/**
 * Función que cuenta el número de vocales del nombre y apellido del socio
 * @param {string} nombre
 * @param {string} apellido
 * @returns Cadena con el número de vocales del nombre y apellido del socio
 */
function curiosidadSocio(nombre, apellido) {
  let expresion = /[aeiou]/gi;
  let numVocales = 0;

  let nombreLimpio = limpiarTexto(nombre);
  let arrayApellido = apellido.split(" ");

  let apellidoLimpio1 = limpiarTexto(arrayApellido[0]);

  for (let index = 0; index < nombreLimpio.length; index++) {
    if (expresion.test(nombreLimpio.length[index])) {
      numVocales++;
    }
  }

  for (let index = 0; index < apellidoLimpio1.length; index++) {
    if (expresion.test(apellidoLimpio1.length[index])) {
      numVocales++;
    }
  }

  if (arrayApellido.length > 1) {
    let apellidoLimpio2 = limpiarTexto(arrayApellido[1]);
    for (let index = 0; index < apellidoLimpio2.length; index++) {
      if (expresion.test(apellidoLimpio2.length[index])) {
        numVocales++;
      }
    }
  }

  return "El socio tiene " + numVocales + " vocales en su nombre y apellido";
}
