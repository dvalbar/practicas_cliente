const miP = document.getElementById("miP");

let num = Number(prompt("Escribe un número"));

if (isNaN(num)) {
    miP.innerHTML += "Número no válido. Saliendo del programa..."
}
else {
let opcionMenu = prompt(
  "Menú \n" +
    "---- \n" +
    "1. Calcular si es múltiplo de 2. \n" +
    "2. Calcular si es múltiplo de 3. \n" +
    "3. Calcular si es múltiplo de 5. \n" +
    "0. Salir",
);

switch (Number(opcionMenu)) {
  case 1:
    multiploDos(num);
    break;
  case 2:
    multiploTres(num);
    break;
  case 3:
    multiploCinco(num);
    break;
  case 0:
    miP.innerHTML = "Has salido del programa";
    break;
  default:
    miP.innerHTML = "Error. Elige una opción del menú";
    break;
}
}

/**Funciones */
function multiploDos(num) {
  if (num % 2 == 0) miP.innerHTML = "Es múltiplo de 2";
  else miP.innerHTML = "No es múltiplo de 2";
}

function multiploTres(num) {
  if (num % 3 == 0) miP.innerHTML = "Es múltiplo de 3";
  else miP.innerHTML = "No es múltiplo de 3";
}

function multiploCinco(num) {
  if (num % 5 == 0) miP.innerHTML = "Es múltiplo de 5";
  else miP.innerHTML = "No es múltiplo de 5";
}