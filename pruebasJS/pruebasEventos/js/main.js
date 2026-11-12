/**
 * Eventos
 */

const btnClickMe = document.getElementById("btnClickMe");
const primerParrafo = document.getElementById("p1");
const segundoParrafo = document.getElementById("p2");
const tercerParrafo = document.getElementById("p3");

primerParrafo.addEventListener(("click"),ocultar);

function ocultar () {
    // this.style.display = "none";
    this.style.visibility = "hidden";
}

segundoParrafo.addEventListener("click", ocultar);

function ocultar() {
  // this.style.display = "none";
  this.style.visibility = "hidden";
}

tercerParrafo.addEventListener("click", ocultar);

function ocultar() {
//   this.style.display = "none";
  this.style.visibility = "hidden";
}

btnClickMe.addEventListener(("click"),() => {
    let nuevoNodo = createNode("p","Hola","","");
    document.body.appendChild(nuevoNodo);
}, true);

// ===================================================================================

/**
 * Función para crear nodos
 *
 * @param string tipo
 * @param string texto
 * @param string id
 * @param string estilos
 * @param array props
 *
 * @return node o null si no se ha podido crear el nodo
 */
function createNode(tipo, texto, id, estilos, props) {
  let elemento = null;
  if (tipo && typeof tipo === "string") {
    elemento = document.createElement(tipo);
  } else {
    return null;
  }

  if (texto != "" && typeof texto === "string") {
    let elementoText = document.createTextNode(texto);
    elemento.appendChild(elementoText);
  }

  if (id != "") {
    elemento.id = id;
  }

  if (estilos && typeof estilos === "string" && estilos != "") {
    elemento.style = estilos;
  }

  // if (props && typeof props === "object" && estilos != "") {
  //   for (let element in props) {
  //     elemento[element] = props[element];
  //   }
  // }

  return elemento; // Devolvemos el nodo creado
}