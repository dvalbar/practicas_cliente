let miP = document.getElementById("miP");
let miInput = document.getElementById("miInput");

/**
 * Funcion esPar() que al pasarle un num entero dice si es par o impar
 */
let esPar = (numEntero) => {
  if (numEntero % 2 == 0) {
    miP.innerText = "El número " + numEntero + " es par";
  } else {
    miP.innerText = "El número " + numEntero + " es impar";
  }
};

miInput.addEventListener("blur", function () {
  let miNum = miInput.value;
  esPar(miNum);
});
