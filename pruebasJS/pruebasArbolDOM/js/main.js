const info = document.getElementById("info");
const listaPaises = document.getElementById("paises");
const opcionesRadio = document.getElementsByName("edad");

// getElementsByClassName
// =============================================================================
const opcionesPares = Array.from(document.getElementsByClassName("pares"));
const opcionesImpares = Array.from(document.getElementsByClassName("impares"));
// =============================================================================

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
    // Insertamos nodo a la lista
    let nuevoNodoPais = document.createElement("li"); // Cada vez que se pulsa el botón
                                                      // pilla la lista actualizada con
                                                      // los países agregados
    // Añadimos los estilos de la clase
    if (listaPaisesActualizada.length % 2 == 0) { // Depende la longitud de la lista
                                                  // averiguamos si el siguiente país sera par o impar
      nuevoNodoPais.className = "impares";
    }
    else {
      nuevoNodoPais.className = "pares";
    }

    let nuevoNodoPaisText = document.createTextNode(nuevoPais);
    nuevoNodoPais.appendChild(nuevoNodoPaisText);
    listaPaises.appendChild(nuevoNodoPais);

    document.getElementById("nuevoPais").value = ""; // Dejamos el input vacío para añadir otro país
  }
});
// ===================================================================================
