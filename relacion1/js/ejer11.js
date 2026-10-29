let miP = document.getElementById("miP");

const LONG_JUEGO = 100;
let numCadena;

for (let i = 1; i <= LONG_JUEGO; i++) {
  numCadena = String(i).split("");
  if (i == LONG_JUEGO) {
    miP.innerHTML += i;
  } else {
    if (i % 7 == 0 || numCadena[numCadena.length - 1] == 7) {
      miP.innerHTML += i + ", PUM<br>";
    } else {
      miP.innerHTML += i + ", ";
    }
  }
}