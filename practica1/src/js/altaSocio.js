const formAlta = document.getElementById("form-alta"); // Formulario
const altaExito = document.getElementById("alta-exito"); // Aviso verde de alta correcta

// Campos del formulario (donde escribe el usuario)
const altaNombre = document.getElementById("alta-nombre");
const altaApellidos = document.getElementById("alta-apellidos");
const altaDni = document.getElementById("alta-dni");
const altaEmail = document.getElementById("alta-email");
const altaTelefono = document.getElementById("alta-telefono");
const altaNacimiento = document.getElementById("alta-nacimiento");
const altaActividades = document.getElementById("alta-actividades");

const checksActividades = document.getElementsByName("actividades"); // Checkboxes

// Los <span> donde escribiremos el mensaje de error de cada campo
const errorNombre = document.getElementById("error-nombre");
const errorApellidos = document.getElementById("error-apellidos");
const errorDni = document.getElementById("error-dni");
const errorEmail = document.getElementById("error-email");
const errorTelefono = document.getElementById("error-telefono");
const errorNacimiento = document.getElementById("error-nacimiento");
const errorActividades = document.getElementById("error-actividades");

// Datos informativos que se enseñan encima del formulario
const altaFechaHoy = document.getElementById("alta-fecha-hoy");
const altaIdSiguiente = document.getElementById("alta-id-siguiente");

// Cadena para calcular la letra del DNI: se divide el número entre 23 y la
// letra es la que ocupa la posición del resto
const LETRAS_DNI = "TRWAGMYFPDXBNJZSQVHLCKE";
const EDAD_MINIMA = 14; // Edad mínima para ser socio
const PRECIO_ACTIVIDAD = 10; // Euros al mes por cada actividad

// Al cargar la página, rellenar la fecha de hoy y el id siguiente
mostrarInfoAlta();

// El botón "Limpiar" también quita los errores y el aviso
formAlta.addEventListener("reset", () => {
  limpiarErrores();
});

formAlta.addEventListener("submit", (e) => {
  e.preventDefault();

  let nombre = altaNombre.value.trim();
  let apellidos = altaApellidos.value.trim();
  let dni = altaDni.value.trim().toUpperCase(); // DNI a mayus
  let email = altaEmail.value.trim();
  let telefono = altaTelefono.value.trim();
  let nacimiento = altaNacimiento.value.trim();

  let actividadesMarcadas = [];
  for (const check of checksActividades) {
    if (check.checked) {
      actividadesMarcadas.push(check.value);
    }
  }

  limpiarErrores(); // Quitar los errores

  let errores = 0;

  if (marcarError(altaNombre, errorNombre, validarNombre(nombre))) {
    errores++;
  }
  if (marcarError(altaApellidos, errorApellidos, validarNombre(apellidos))) {
    errores++;
  }
  if (marcarError(altaDni, errorDni, validarDni(dni))) {
    errores++;
  }
  if (marcarError(altaEmail, errorEmail, validarEmail(email))) {
    errores++;
  }
  if (marcarError(altaTelefono, errorTelefono, validarTelefono(telefono))) {
    errores++;
  }
  if (
    marcarError(altaNacimiento, errorNacimiento, validarNacimiento(nacimiento))
  ) {
    errores++;
  }
  if (
    marcarError(
      altaActividades,
      errorActividades,
      validarActividades(actividadesMarcadas),
    )
  ) {
    errores++;
  }

  // Si hay algún error, no se añade el socio
  if (errores > 0) {
    return;
  }

  let nuevoSocio = {
    id: siguienteId(),
    nombre: ponerMayusculas(nombre),
    apellidos: ponerMayusculas(apellidos),
    dni: dni,
    email: email.toLowerCase(),
    telefono: telefono.replaceAll(" ", ""),
    fechaNacimiento: nacimientoAISO(nacimiento),
    fechaAlta: fechaHoyISO(),
    actividades: actividadesMarcadas,
    cuota: actividadesMarcadas.length * PRECIO_ACTIVIDAD,
  };

  socios.push(nuevoSocio); // Añadir nuevo socio a mi array de socios

  // Vaciar el formulario (reset lo deja todo como estaba al cargar la página)
  formAlta.reset();

  // Aviso verde: Socio Ana dado de alta con id SOC-0013
  altaExito.innerText =
    "Socio " + nuevoSocio.nombre + " dado de alta con id " + nuevoSocio.id;
  altaExito.hidden = false;

  // Actualizar la pantalla con el socio nuevo
  mostrarInfoAlta();
  actualizarTabla();
  actualizarEstadisticas();
});

/**
 * ==============================================================================================
 * FUNCIONES
 * ==============================================================================================
 */

/**
 * Marca un campo en rojo y muestra su mensaje de error
 * @param {HTMLElement} campo Campo que se marca en rojo
 * @param {HTMLElement} spanError Elemento donde se escribe el error
 * @param {string} mensaje Mensaje de error ("" si no hay error)
 * @returns {boolean} true si había error, false si no
 */
function marcarError(campo, spanError, mensaje) {
  // Mensaje vacío = el campo está bien, no hay nada que marcar
  if (mensaje == "") {
    return false;
  }

  // classList.add añade la clase "error", que en el CSS pone el campo en rojo
  campo.classList.add("error");
  spanError.innerText = mensaje;
  return true;
}

/**
 * Quita el rojo y los mensajes de error de todos los campos
 */
function limpiarErrores() {
  // Dos arrays con todos los campos y todos sus spans de error
  let campos = [
    altaNombre,
    altaApellidos,
    altaDni,
    altaEmail,
    altaTelefono,
    altaNacimiento,
    altaActividades,
  ];
  let spans = [
    errorNombre,
    errorApellidos,
    errorDni,
    errorEmail,
    errorTelefono,
    errorNacimiento,
    errorActividades,
  ];

  // Quitar la clase "error"
  for (const campo of campos) {
    campo.classList.remove("error");
  }
  // Quitar el texto de error
  for (const span of spans) {
    span.innerText = "";
  }

  // Ocultar el aviso verde del alta anterior
  altaExito.hidden = true;
}

/**
 * Valida un nombre o unos apellidos: solo letras (con tildes, ñ y ü)
 * y un único espacio entre palabras
 * @param {string} texto
 * @returns {string} Mensaje de error, o "" si es correcto
 */
function validarNombre(texto) {
  // Expresión regular, de izquierda a derecha:
  //   ^                      principio del texto
  //   [a-záéíóúüñ]+          una o más letras (con tildes, ü y ñ)
  //   ( [a-záéíóúüñ]+)*      cero o más veces: un espacio + una o más letras
  //   $                      final del texto
  //   i                      no distingue mayúsculas de minúsculas
  let expresion = /^[a-záéíóúüñ]+( [a-záéíóúüñ]+)*$/i;

  if (texto == "") {
    return "Este campo es obligatorio";
  }
  // .test devuelve true si el texto cumple la expresión; con ! lo negamos
  if (!expresion.test(texto)) {
    return "Solo letras y un único espacio entre palabras";
  }
  return "";
}

/**
 * Valida el DNI: formato, letra correcta y que no exista ya otro socio
 * @param {string} dni
 * @returns {string} Mensaje de error, o "" si es correcto
 */
function validarDni(dni) {
  // Formato: 8 dígitos (\d{8}) y una letra mayúscula ([A-Z])
  if (!/^\d{8}[A-Z]$/.test(dni)) {
    return "El DNI debe tener 8 dígitos y una letra";
  }

  // Calcular la letra correcta:
  // 1. slice(0, 8) coge los 8 primeros caracteres (los números)
  // 2. % 23 es el resto de dividir entre 23 (da un número de 0 a 22)
  // 3. charAt coge la letra que ocupa esa posición en LETRAS_DNI
  let numero = Number(dni.slice(0, 8));
  let letraCorrecta = LETRAS_DNI.charAt(numero % 23);

  // dni.charAt(8) es la letra que ha escrito el usuario (la novena)
  if (dni.charAt(8) != letraCorrecta) {
    return (
      "La letra del DNI no es correcta (debería ser " + letraCorrecta + ")"
    );
  }

  // Comprobar que ningún socio tiene ya ese DNI
  for (const socio of socios) {
    if (socio.dni == dni) {
      return "Ya existe un socio con ese DNI";
    }
  }

  return "";
}

/**
 * Valida el email: usuario@dominio.extensión (extensión de 2 letras o más)
 * @param {string} email
 * @returns {string} Mensaje de error, o "" si es correcto
 */
function validarEmail(email) {
  // [^\s@]+   uno o más caracteres que no sean espacio ni @  (usuario)
  // @         la arroba
  // [^\s@]+   uno o más caracteres que no sean espacio ni @  (dominio)
  // \.        un punto
  // [^\s@]{2,} dos o más caracteres  (extensión: es, com...)
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return "El email debe tener el formato usuario@dominio.es";
  }
  return "";
}

/**
 * Valida el teléfono: 9 dígitos que empiecen por 6, 7, 8 o 9 (se admiten espacios)
 * @param {string} telefono
 * @returns {string} Mensaje de error, o "" si es correcto
 */
function validarTelefono(telefono) {
  // El enunciado admite espacios al escribirlo (612 345 678), así que los
  // quitamos antes de comprobar
  let sinEspacios = telefono.replaceAll(" ", "");

  // [6-9] primer dígito 6, 7, 8 o 9 + \d{8} ocho dígitos más = 9 en total
  if (!/^[6-9]\d{8}$/.test(sinEspacios)) {
    return "El teléfono debe tener 9 dígitos y empezar por 6, 7, 8 o 9";
  }
  return "";
}

/**
 * Pasa una fecha dd/mm/aaaa a aaaa-mm-dd
 * @param {string} fecha
 * @returns {string} Fecha con formato aaaa-mm-dd
 */
function nacimientoAISO(fecha) {
  // split("/") parte "05/06/2000" en ["05", "06", "2000"]
  // y las montamos al revés: año-mes-día
  let partes = fecha.split("/");
  return partes[2] + "-" + partes[1] + "-" + partes[0];
}

/**
 * Valida la fecha de nacimiento: formato dd/mm/aaaa, que exista,
 * que no sea futura y con la edad mínima
 * @param {string} fecha
 * @returns {string} Mensaje de error, o "" si es correcta
 */
function validarNacimiento(fecha) {
  // Formato: 2 dígitos / 2 dígitos / 4 dígitos
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(fecha)) {
    return "La fecha debe tener el formato dd/mm/aaaa";
  }

  // Separamos en día, mes y año y los pasamos a número
  let partes = fecha.split("/");
  let dia = Number(partes[0]);
  let mes = Number(partes[1]);
  let anio = Number(partes[2]);

  // ¿Existe la fecha? Si escribimos 31/02/2000, JavaScript la "corrige" sola
  // y la convierte en 2 de marzo. Entonces el día o el mes ya no coinciden
  // con lo que escribió el usuario, y sabemos que no existe.
  // (El mes va con -1 porque en JavaScript enero es 0)
  let fechaCreada = new Date(anio, mes - 1, dia);
  if (
    fechaCreada.getFullYear() != anio ||
    fechaCreada.getMonth() != mes - 1 ||
    fechaCreada.getDate() != dia
  ) {
    return "Esa fecha no existe en el calendario";
  }

  // No puede ser posterior a hoy
  if (fechaCreada > new Date()) {
    return "La fecha no puede ser futura";
  }

  // Edad mínima: calcularEdadSocio está en otro archivo y espera aaaa-mm-dd
  if (calcularEdadSocio(nacimientoAISO(fecha)) < EDAD_MINIMA) {
    return "La edad mínima es de " + EDAD_MINIMA + " años";
  }

  return "";
}

/**
 * Valida que haya al menos una actividad marcada
 * @param {Array} actividades
 * @returns {string} Mensaje de error, o "" si es correcto
 */
function validarActividades(actividades) {
  // Si el array está vacío es que no se ha marcado ninguna
  if (actividades.length == 0) {
    return "Marca al menos una actividad";
  }
  return "";
}

/**
 * Devuelve el id del siguiente socio: el siguiente al mayor que exista
 * @returns {string} Id con formato SOC-0000
 */
function siguienteId() {
  let mayor = 0;

  for (const socio of socios) {
    // "SOC-0012".slice(4) es "0012", y Number lo convierte en el número 12
    let numero = Number(socio.id.slice(4));
    if (numero > mayor) {
      mayor = numero;
    }
  }

  // padStart(4, "0") rellena con ceros por la izquierda hasta tener 4 cifras
  return "SOC-" + String(mayor + 1).padStart(4, "0");
}

/**
 * Devuelve la fecha de hoy con formato aaaa-mm-dd
 * @returns {string} Fecha de hoy
 */
function fechaHoyISO() {
  let hoy = new Date();
  // getMonth() empieza en 0 (enero), por eso se suma 1
  let mes = String(hoy.getMonth() + 1).padStart(2, "0");
  let dia = String(hoy.getDate()).padStart(2, "0");

  return hoy.getFullYear() + "-" + mes + "-" + dia;
}

/**
 * Pone la primera letra de cada palabra en mayúscula y el resto en minúscula
 * @param {string} texto
 * @returns {string} Texto con mayúscula inicial en cada palabra
 */
function ponerMayusculas(texto) {
  let palabras = texto.toLowerCase().split(" ");
  let resultado = [];

  for (const palabra of palabras) {
    resultado.push(palabra.charAt(0).toUpperCase() + palabra.slice(1));
  }

  return resultado.join(" ");
}

/**
 * Muestra la fecha de alta (hoy) y el id que se asignará al siguiente socio
 */
function mostrarInfoAlta() {
  altaFechaHoy.innerText = fechaCorta(fechaHoyISO());
  altaIdSiguiente.innerText = siguienteId();
}
