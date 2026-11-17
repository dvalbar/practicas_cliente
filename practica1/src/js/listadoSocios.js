const tablaBody = document.getElementById("tabla-socios-body"); // Contenido de la tabla
const mensajeVacio = document.getElementById("sin-resultados"); // Mensaje si no hay contenido en la tabla

const buscador = document.getElementById("buscador"); // Buscador de la página

const filtroActividad = document.getElementById("filtro-actividad"); // Actividades
const ordenSocios = document.getElementById("orden"); // Orden

const ACTIVIDADES = [
  "natación",
  "yoga",
  "pádel",
  "musculación",
  "spinning",
  "pilates",
];

const seccionListado = document.getElementById("listado");
const btnPantallaCompleta = document.getElementById("btn-pantalla-completa");

// 1. Al cargar la página aparece una tabla con una fila por cada socio con estas columnas:
//      o Id: un círculo con las dos primeras iniciales del socio (LM para Lucía Martín Ruiz) seguido
//       de su id.
//      o Nombre: nombre, primer apellido y la inicial del segundo apellido: Lucía Martín R.
//      o Email: parcialmente oculto, dejando visibles las 2 primeras letras y el dominio:
//      lu**********@correo.es.
//      o Edad: años cumplidos a día de hoy.
//      o Actividades: actividades en las que está matriculado.
//      o Cuota: con dos decimales y el símbolo del euro: 35.00 €.

cargarActividades(); // Añade las actividades al desplegable
actualizarTabla(); // Muestra la tabla nada mas abrir la página

filtroActividad.addEventListener("change", actualizarTabla); // Actualiza la tabla al cambiar la actividad del desplegable
ordenSocios.addEventListener("change", actualizarTabla); // Actualiza la tabla al seleccionar el orden
buscador.addEventListener("input", actualizarTabla); // Actualiza la tabla al buscar en el buscador

// 6. Pantalla completa: incorpora un botón o enlace que muestra la tabla de socios ocupando toda
// la pantalla; al pulsarlo otra vez (o con Esc) se vuelve a la vista normal.
// INFO: investiga el atributo fullscreenElement requestFullscreen() y exitFullscreen() del objeto
// document.

btnPantallaCompleta.addEventListener("click", () => {
  if (document.fullscreenElement) {
    // Si está en pantalla completa
    document.exitFullscreen(); // Salir de pantalla completa
  } else {
    // Si no está en pantalla completa
    seccionListado.requestFullscreen(); // Entra en pantalla completa
  }
});

/**
 * ==============================================================================================
 * FUNCIONES
 * ==============================================================================================
 */

// 5. Buscador, filtro y orden funcionan a la vez. Si ningún socio coincide, la tabla muestra No hay
// socios que coincidan.

/**
 * Aplica buscador, filtro de actividad y orden a la vez y pinta la tabla
 */
function actualizarTabla() {
  let texto = limpiarTexto(buscador.value.trim()); // Texto introducido en el buscador
  let actividad = filtroActividad.value; // Actividad elegida en el desplegable
  let orden = ordenSocios.value; // Orden elegido en el desplegable

  // 2. Buscador: mientras se escribe, la tabla cambia su contenido y mostrará solo los socios cuyo
  // nombre, apellidos o email contienen el texto. La búsqueda empezará a partir de que el usuario
  // escriba 2 caracteres. No debe distinguir mayúsculas ni tildes: alvaro encuentra a Álvaro.

  let resultado = [];

  for (const socio of socios) {
    let pasaBuscador = true; // Pasa el buscador

    if (texto.length >= 2) {
      let datos = limpiarTexto(
        socio.nombre + " " + socio.apellidos + " " + socio.email,
      );
      pasaBuscador = datos.includes(texto);
    }

    // 3. Filtro de actividad: añade una lista desplegable con las actividades que se practican en el club,
    // más la opción Todas las actividades. Al pulsar en una actividad, en la tabla solo se verán los
    // socios que están matriculados en esa actividad.

    let pasaFiltro = true; // Pasa el filtro de actividad
    if (actividad != "todas") {
      pasaFiltro = socio.actividades.includes(actividad);
    }

    // Si pasa las dos, se añade
    if (pasaBuscador && pasaFiltro) {
      resultado.push(socio);
    }
  }

  // 4. Orden: añade una lista desplegable que ordene la tabla de todos los socios: por nombre,
  // apellidos, más jóvenes primero o más antiguos primero.

  switch (orden) {
    case "nombre":
      resultado.sort((a, b) => a.nombre.localeCompare(b.nombre));
      break;
    case "apellidos":
      resultado.sort((a, b) => a.apellidos.localeCompare(b.apellidos));
      break;
    case "jovenes":
      resultado.sort((a, b) =>
        b.fechaNacimiento.localeCompare(a.fechaNacimiento),
      );
      break;
    case "antiguos":
      resultado.sort((a, b) =>
        a.fechaNacimiento.localeCompare(b.fechaNacimiento),
      );
      break;
    case "cuota": // Cuota más alta primero
      resultado.sort((a, b) => Number(b.cuota) - Number(a.cuota));
      break;
  }

  pintarTabla(resultado); // Muestra la tabla con los socios que haya encontrado segun los filtros y busquedas
}

/**
 * Función que muestra la tabla en la interfaz
 * @param {array} lista
 */
function pintarTabla(lista) {
  tablaBody.innerHTML = "";

  if (lista.length === 0) {
    mensajeVacio.hidden = false; // Lista vacía: se ve el mensaje
  } else {
    mensajeVacio.hidden = true; // Hay socios: se oculta
  }

  for (const socio of lista) {
    // Crear fila del socio
    let filaTablaSocio = createNode("tr", "", "", "");

    // Crear celda de cada campo de la linea

    // ID
    let celdaId = createNode("td", "", "", "");

    // Círculo con iniciales y id del socio
    let circulo = createNode(
      "span",
      iniciales(socio.nombre, socio.apellidos),
      "",
      "",
      [{ class: "avatar" }],
    ); // Circulo con las iniciales
    let textoId = createNode("span", socio.id, "", "", [{ class: "id-socio" }]); // ID del socio

    // Añadir datos a las celdas
    celdaId.appendChild(circulo);
    celdaId.appendChild(textoId);

    // Nombre
    let celdaNombre = createNode(
      "td",
      nombreCorto(socio.nombre, socio.apellidos),
      "",
      "",
    );

    // Email
    let celdaEmail = createNode("td", emailCifrado(socio.email), "", "");

    // Edad
    let celdaEdad = createNode(
      "td",
      calcularEdadSocio(socio.fechaNacimiento),
      "",
      "",
    );

    // Antiguedad
    let celdaAntiguedad = createNode(
      "td",
      antiguedadEnAnios(socio.fechaAlta),
      "",
      "",
    );

    // Actividades
    let celdaActividades = createNode(
      "td",
      socio.actividades.join(", "),
      "",
      "",
    );

    // Cuota
    let celdaCuota = createNode("td", socio.cuota.toFixed(2) + " €", "", "");

    // Añadir celdas a la fila
    filaTablaSocio.appendChild(celdaId);
    filaTablaSocio.appendChild(celdaNombre);
    filaTablaSocio.appendChild(celdaEmail);
    filaTablaSocio.appendChild(celdaEdad);
    filaTablaSocio.appendChild(celdaAntiguedad);
    filaTablaSocio.appendChild(celdaActividades);
    filaTablaSocio.appendChild(celdaCuota);

    // Añadir fila al body de la tabla
    tablaBody.appendChild(filaTablaSocio);
  }
}

/**
 * Pasa el texto a minúsculas y le quita las tildes
 * @param {string} texto
 * @returns {string} Texto limpio
 */
function limpiarTexto(texto) {
  return texto
    .toLowerCase() // Pasa el texto a minusculas
    .normalize("NFD") // Convierte todas las letras a este formato ("a" + "´"), es decir, separa la letra de su tilde
    .replace(/[\u0300-\u036f]/g, ""); // El rango de códigos Unicode donde están todas las marcas de acento (de la \u0300 a la \u036f) | Se reemplazan las "´" por "" (nada)
}

/**
 * Función para sacar las iniciales del socio
 * @param {string} nombre
 * @param {string} apellidos
 * @returns Devuelve las iniciales del socio en mayúsculas
 */
function iniciales(nombre, apellidos) {
  let inicialNombre = nombre.charAt(0).toUpperCase(); // Primer caracter del nombre
  let inicialApellido = apellidos.charAt(0).toUpperCase(); // Primer caracter del apellido

  return inicialNombre + inicialApellido;
}

/**
 * Función para mostrar el nombre del socio con el formato pedido
 * @param {string} nombre
 * @param {string} apellidos
 * @returns Devuelve el nombre con el formato pedido
 */
function nombreCorto(nombre, apellidos) {
  let arrayApellido = apellidos.split(" ");

  let resultado = nombre + " " + arrayApellido[0];

  if (arrayApellido.length > 1) {
    resultado += " " + arrayApellido[1].charAt(0) + ".";
  }

  return resultado;
}

/**
 * Función que cifra el email dejando visibles las 2 primeras letras y el dominio
 * @param {string} email
 * @returns El email cifrado
 */
function emailCifrado(email) {
  let arrayEmail = email.split("@");

  if (arrayEmail[0].length <= 2) {
    return arrayEmail[0] + "*@" + arrayEmail[1];
  }

  return (
    arrayEmail[0].slice(0, 2) +
    "*".repeat(arrayEmail[0].length - 2) +
    "@" +
    arrayEmail[1]
  );
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
 * Añade al desplegable una opción por cada actividad del club
 */
function cargarActividades() {
  for (const actividad of ACTIVIDADES) {
    let opcion = createNode("option", actividad, "", "", [
      { value: actividad },
    ]);
    filtroActividad.appendChild(opcion);
  }
}

/**
 * Crea un nodo HTML
 *
 * @param {string} tipo    etiqueta del nodo ("tr", "td", "span"...)
 * @param {string|number} texto   texto que llevará dentro ("" si no lleva)
 * @param {string} id      id del nodo ("" si no lleva)
 * @param {string} estilos estilos en línea ("" si no lleva)
 * @param {Array} props    array de objetos con atributos: [{ class: "avatar" }, { title: "hola" }]
 *
 * @return {Node|null} el nodo creado, o null si no se ha podido crear
 */
function createNode(tipo, texto, id, estilos, props) {
  let elemento = null;

  if (tipo && typeof tipo === "string") {
    elemento = document.createElement(tipo);
  } else {
    return null;
  }

  if (texto !== undefined && texto !== "") {
    let elementoText = document.createTextNode(String(texto));
    elemento.appendChild(elementoText);
  }

  if (id) {
    elemento.id = id;
  }

  if (estilos && typeof estilos === "string") {
    elemento.style = estilos;
  }

  if (props && Array.isArray(props)) {
    for (const prop of props) {
      for (const clave in prop) {
        elemento.setAttribute(clave, prop[clave]);
      }
    }
  }

  return elemento;
}

/**
 * Función que calcula la antigüedad del socio en años y meses
 * @param {string} fechaAlta
 * @returns la antigüedad del socio en años y meses
 */
function antiguedadEnAnios(fechaAlta) {
  const hoy = new Date();
  const alta = new Date(fechaAlta);

  let anios = hoy.getFullYear() - alta.getFullYear();
  let meses = hoy.getMonth() - alta.getMonth();

  if (anios === 1) {
    return anios + " año y " + meses + " meses";
  } else if (meses === 1) {
    return anios + " años y " + meses + " mes";
  } else if (anios === 1 && meses === 1) {
    return anios + " año y " + meses + " mes";
  } else {
    return anios + " años y " + meses + " meses";
  }
}
