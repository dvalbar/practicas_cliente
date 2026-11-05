const info = document.getElementById("info");
const listaPaises = document.getElementById("paises");
const opcionesRadio = document.getElementsByName("edad");

// getElementsByClassName
// =============================================================================
const opcionesPares = Array.from(document.getElementsByClassName("pares"));
const opcionesImpares = Array.from(document.getElementsByClassName("impares"));
// =============================================================================

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
      document.getElementById("paises").appendChild(nuevoNodo);
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
