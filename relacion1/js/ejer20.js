const miP = document.getElementById("miP");
const input = document.getElementById("input");

let numSecreto = parseInt(Math.random() * 100 + 1);
let numIntentos = 0;

input.addEventListener("blur", () => {
  let miNum = input.value;

  if (miNum > numSecreto) {
    numIntentos++;
    miP.innerHTML += "El número secreto es menor. Intento número " + numIntentos + "<br>";
  } else if (miNum < numSecreto) {
    numIntentos++;
    miP.innerHTML += "El número secreto es mayor. Intento número " + numIntentos + "<br>";
  } else {
    numIntentos++;
    miP.innerHTML += "<br>Has descubierto el número secreto. Enhorabuena<br>";
    miP.innerHTML += "El número secreto era " + numSecreto + " y se ha descubierto en " + numIntentos + " intentos<br>";
  }
});