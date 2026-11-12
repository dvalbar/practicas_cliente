const info = document.getElementById("info");
const listaPaises = document.getElementById("paises");
const opcionesRadio = document.getElementsByName("edad");
const sections1 = document.getElementsByClassName("section1");
const lista = document.getElementById("paises");

sections1[1]
  .getElementsByTagName("img")[0]
  .setAttribute("src", "./src/img/paisaje1.jpg"); // setAttribute
// getElementsByClassName
// =============================================================================
const opcionesPares = Array.from(document.getElementsByClassName("pares"));
const opcionesImpares = Array.from(document.getElementsByClassName("impares"));
// =============================================================================

// =======================================================================================================================
/** Propiedades de los nodos */
console.log("Atributos: " + lista.attributes[0].name + ". Valor atributo: " + lista.attributes[0].value);
console.log("Atributos: " + lista.attributes[1].name + ". Valor atributo: " + lista.attributes[1].value);

// for (const element of lista.childNodes) {
//   console.log(element);
// }

// console.log("=============================");

// for (const element of lista.children) {
//   console.log(element);
// }

// console.dir(lista.children); // Hijos de la lista (todos los li de la lista)

// console.log(lista.firstChild); // Devuelve la primera cosa que pille
// console.log(lista.firstElementChild); // Devuelve el primer nodo

// console.log(lista.childElementCount); // Cuantas etiquetas HTML tiene dentro

// console.dir(lista.children[2].nextSibling); // Lo siguiente seria un comentario
// console.dir(lista.children[2].nextElementSibling); // Si quiero el siguiente nodo es con esto

// console.dir(lista.nodeName); // su etiqueta
// console.dir(lista.localName); // su etiqueta
// console.dir(lista.nodeType); // tipo nodo  // 1 elemento(es un nodo). 2 atributo. 3 texto

// =======================================================================================================================


// Crear nodos
let nuevoNodo = createNode("a", "Registrarse", "", [
  { href: "#" },
  { name: "menu" },
]); // Hacer lo de pasarle un array de objetos para los atributos

if (nuevoNodo) {
  document.getElementById("nav1").appendChild(nuevoNodo);
}

// Botón para cambiar los colores de la lista de países
const btnCambiarColores = document.getElementById("btnCambiarColores");

try {
  // getElementsByTagName
  // const opcionesPaises = document.getElementById("paises").document.getElementsByTagName("li");
  const opcionesPaises = listaPaises.getElementsByTagName("li");

  if (opcionesPaises.length > 0) {
    console.log(
      "Número de opcionesPaises de la lista: " + opcionesPaises.length,
    );
    console.log(opcionesPaises);
    info.innerHTML = opcionesPaises[2].innerHTML;
  } else {
    throw Error("No existe opciones en la lista");
  }
} catch (err) {
  console.error(err);
}

info.innerHTML = "Opciones del radio edad: ";
for (const element of opcionesRadio) {
  info.innerHTML += element.value + ", ";
}

// Cambiar colores
btnCambiarColores.addEventListener("click", () => {
  for (let element of opcionesPares) {
    if (element.className == "pares") {
      element.className = "impares";
    } else {
      element.className = "pares";
    }
  }

  for (let element of opcionesImpares) {
    if (element.className == "impares") {
      element.className = "pares";
    } else {
      element.className = "impares";
    }
  }
});

// LOS NUEVOS ELEMENTOS CREADOS DE LA LISTA YA NO CAMBIARAN SUS COLORES
// ===================================================================================
// Añadir un nuevo nodo a la lista de países
const btnNuevoPais = document.getElementById("btnNuevoPais");
let listaPaisesActualizada = document.getElementsByTagName("li");

btnNuevoPais.addEventListener("click", () => {
  let nuevoPais = document.getElementById("nuevoPais").value;

  if (nuevoPais == "") {
    info.innerHTML = "Debe escribir un país";
  } else {
    // pilla la lista actualizada con
    // los países agregados

    // Añadimos los estilos de la clase

    // if (listaPaisesActualizada.length % 2 == 0) {
    //   // Depende la longitud de la lista
    //   // averiguamos si el siguiente país sera par o impar
    //   nuevoNodoPais.className = "impares";
    // } else {
    //   nuevoNodoPais.className = "pares";
    // }

    let nuevoNodo = createNode(
      "li",
      nuevoPais,
      "",
      "background-color:blue; color:white",
    );
    if (nuevoNodo) {
      // document.getElementById("paises").appendChild(nuevoNodo);
      let insertado = document
        .getElementById("paises")
        .insertBefore(nuevoNodo, listaPaisesActualizada[2]); // Devuelve el nodo
      listaPaisesActualizada[2].before(nuevoNodo); // No devuelve el nodo
      console.log("Insertado: " + insertado);

      info.innerHTML =
        "<span style='color:lightgreen; background-color:green'>Se ha insertado el nodo</span>";
    } else {
      info.innerHTML =
        "<span style='color:lightsalmon; background-color:red'>No se ha podido insertar el nodo</span>";
    }

    document.getElementById("nuevoPais").value = ""; // Dejamos el input vacío para añadir otro país
  }
});

// =================
// BOTÓN BORRAR PAIS
// =================
const btnBorraPais = document.getElementById("btnBorraPais");

btnBorraPais.addEventListener("click", () => {
  let arrayListaPais = document
    .getElementById("paises")
    .getElementsByTagName("li");

  if (arrayListaPais.length > 3) {
    arrayListaPais[2].remove(); // Esto no me guarda el nodo, no me permite mover nodos (Más rápido pero no guarda el nodo)
  }

  // if (arrayListaPais.length>3) {
  //   let elemBorrado = arrayListaPais[2].parentNode.removeChild(arrayListaPais[2]);

  //   console.log(elemBorrado); // Al borrar, ese nodo se puede guardar y nos permite mover nodos
  // }
});

let enlaceImagen = createNode(
  "a",
  "Cambiar imagen",
  "",
  "background-color:#1276af;border-radius:8px;color:white;padding:0.2%;margin:0.2%;cursor:pointer;",
);

let enlaceBorrarImagen = createNode(
  "a",
  "Borrar atributo",
  "",
  "background-color:#1276af;border-radius:8px;color:white;padding:0.2%;margin:0.2%;cursor:pointer;",
);

let inputBloquear = createNode("input", "", "inputBloquear");
let botonBloquear = createNode("button", "Bloquear", "botonBloquear");

// ========================
//       NODO ENLACE
// ========================
if (sections1.length >= 2) {
  sections1[1].appendChild(enlaceImagen);
  sections1[1].appendChild(enlaceBorrarImagen);
  sections1[2].appendChild(inputBloquear);
  sections1[2].appendChild(botonBloquear);

  enlaceImagen.onclick = function () {
    sections1[1]
      .getElementsByTagName("img")[0]
      .setAttribute("src", "./src/img/paisaje2.jpg");
  };

  enlaceBorrarImagen.onclick = function () {
    sections1[1].getElementsByTagName("img")[0].removeAttribute("src");
  };
}

botonBloquear.addEventListener("click", () => {
  if (botonBloquear.innerText == "Bloquear") {
    botonBloquear.innerText = "Desbloquear";
    inputBloquear.setAttribute("style", "background-color:gray");
    inputBloquear.setAttribute("readonly", "true");
  } else {
    botonBloquear.innerText = "Bloquear";
    inputBloquear.style.backgroundColor = "white";
    inputBloquear.removeAttribute("readonly");
  }
});

// Btn Devuelve Impares
document.getElementById("btnDevuelveImpares").onclick = function () {
  let lista2 = document.querySelectorAll("#paises li");
  let arrayImpares = new Array();

  for (let i = 0; i < lista2.length; i += 2) {
    arrayImpares.push(lista2[i].innerText);
  }

  console.dir(arrayImpares);
};

// ==================================================================================
// MODO NOCHE MODO DIA
document.getElementById("aModoNoche").addEventListener("click", function () {
  const buttons = document.getElementsByTagName("button");
  let buttonStyle = window.getComputedStyle(buttons[0]);

  if (
    buttonStyle.getPropertyValue("background-color") == "rgb(152, 151, 151)"
  ) {
    // Estoy en modo noche

    this.innerText = "Cambiar a modo noche";
    document.body.className = "";

    // console.log("Color de los botones: " + buttonStyle.getPropertyValue("color"));
    // console.log("Fondo de los botones: " + buttonStyle.getPropertyValue("background-color"));
  } else {
    document.body.className = "modoNoche";
    this.innerText = "Cambiar a modo día";
  }
});

// Sustituir paises
document.getElementById("btnSustituye").addEventListener("click", () => {
    let textoNuevo = document.getElementById("nuevoPais").value;
    let itemsLista = lista.getElementsByTagName("li"); // Obtenemos los <li> actuales

    if (textoNuevo !== "" && itemsLista.length > 2) {
        let paisSustituir = createNode("li", textoNuevo, "", "");
        lista.replaceChild(paisSustituir, itemsLista[2]);
        document.getElementById("nuevoPais").value = ""; // Limpiamos el input
    } else {
        info.innerHTML = "Escribe un país y asegúrate de que hay al menos 3 elementos.";
    }
});

// Clonar
document.getElementById("btnClonar").addEventListener(("click"),()=> {
  let section4 = document.getElementById("section4");
  let clon = lista.cloneNode(true); // Poner a true (si no pones nada es false y no se ve nada)

  console.log(clon);

  clon.appendChild(createNode("li","Noruega","","")); // Añadir cosas a la lista clonada

  section4.appendChild(clon); // Añadir toda la lista clonada
});

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
