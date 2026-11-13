/**
 * Eventos
 */
let veces = false;

for (const elemDiv of document.getElementsByTagName("div")) {
  // Pasamos la MISMA función 'gestionarEventos' a los 3 eventos
  elemDiv.addEventListener("mouseenter", gestionarEventos);
  elemDiv.addEventListener("mouseleave", gestionarEventos);

  // Al primer div le ponemos { once: true } en el click; a los demás no
  if (!veces) {
    elemDiv.addEventListener("click", gestionarEventos, { once: true });
    veces = true;
  } else {
    elemDiv.addEventListener("click", gestionarEventos);
  }
}

// Una sola función maneja todos los eventos usando switch(e.type)
function gestionarEventos(e) {
  switch (e.type) {
    case "click":
      e.currentTarget.style.backgroundColor = "blue";
      let pLocal = e.currentTarget.querySelector("p");

      if (pLocal.style.visibility === "hidden") {
        pLocal.style.visibility = "visible";
      } else {
        pLocal.style.visibility = "hidden";
      }
      break;

    case "mouseenter":
      e.currentTarget.style.backgroundColor = "red";
      break;

    case "mouseleave":
      e.currentTarget.style.backgroundColor = "green";
      break;
  }
}

// ===================================================================================

const btnClickMe = document.getElementById("btnClickMe");
const primerParrafo = document.getElementById("p1");
const segundoParrafo = document.getElementById("p2");
const tercerParrafo = document.getElementById("p3");

// Evento para crear un nuevo párrafo al pulsar el botón
btnClickMe.addEventListener(
  "click",
  () => {
    let nuevoNodo = createNode("p", "Hola", "", "");
    document.body.appendChild(nuevoNodo);
  },
  true,
);

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

  return elemento; // Devolvemos el nodo creado
}
