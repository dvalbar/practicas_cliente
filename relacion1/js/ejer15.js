const miP = document.getElementById("miP");

let miArray = [6, "Cadena", [4, 7, 9], 3.1416, true];

miP.innerHTML += "MiArray:<br>"
for (let elem of miArray) {
  miP.innerHTML += elem + ", ";
}

invertirArray(miArray);

miP.innerHTML += "<br><br>MiArray invertido:<br>";
for (let elem of miArray) {
  miP.innerHTML += elem + ", ";
}

/**Funciones */
function invertirArray(miArray) {
  miArray.reverse();
}