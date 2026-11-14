const tablaBody = document.getElementById("tabla-socios-body");

// 1. Al cargar la página aparece una tabla con una fila por cada socio con estas columnas:
//      o Id: un círculo con las dos primeras iniciales del socio (LM para Lucía Martín Ruiz) seguido
//       de su id.
//      o Nombre: nombre, primer apellido y la inicial del segundo apellido: Lucía Martín R.
//      o Email: parcialmente oculto, dejando visibles las 2 primeras letras y el dominio:
//      lu**********@correo.es.
//      o Edad: años cumplidos a día de hoy.
//      o Actividades: actividades en las que está matriculado.
//      o Cuota: con dos decimales y el símbolo del euro: 35.00 €.

for (const socio of socios) {
  // Crear fila del socio
  let filaTablaSocio = createNode("tr", "", "", "");

  // Crear celda de cada campo de la linea
  let celdaId = createNode("td", "", "", "");

    // Círculo con iniciales y id del socio
    let circulo = createNode("span", "Iniciales", "", "", [{ class: "avatar" }]); // TO-DO
    let textoId = createNode("span", socio.id, "", "", [{ class: "id-socio" }]);

  let celdaNombre = createNode("td", socio.nombre, "", "");
  let celdaEmail = createNode("td", socio.email, "", "");
  let celdaEdad = createNode("td", "Calcular edad", "", "");

    // Calcular edad del socio
    let fechaActual = new Date();
    let fechaNacimientoSocio = new Date(socio.fechaNacimiento);
    let edadSocio = fechaActual - fechaNacimientoSocio; // TO-DO
    console.log(edadSocio);

  let celdaActividades = createNode("td",socio.actividades, "", "");
  let celdaCuota = createNode("td", socio.cuota, "", "");

    // Añadir datos a las celdas
    celdaId.appendChild(circulo);
    celdaId.appendChild(textoId);

  // Añadir celdas a la fila
  filaTablaSocio.appendChild(celdaId);
  filaTablaSocio.appendChild(celdaNombre);
  filaTablaSocio.appendChild(celdaEmail);
  filaTablaSocio.appendChild(celdaEdad);
  filaTablaSocio.appendChild(celdaActividades);
  filaTablaSocio.appendChild(celdaCuota);

  // Añadir fila al body de la tabla
  tablaBody.appendChild(filaTablaSocio);
}

/**
 * ==============================================================================================
 * FUNCIONES
 * ==============================================================================================
 */

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
