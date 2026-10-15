const miP = document.getElementById("miP");

let miArray = [6, "Cadena", [4, 7, 9], 3.1416, true];

miP.innerHTML += "MiArray:<br>"
for (let elem of miArray) {
  miP.innerHTML += elem + ", ";
}

miArray.reverse();

miP.innerHTML += "<br><br>MiArray invertido:<br>";
for (let elem of miArray) {
  miP.innerHTML += elem + ", ";
}