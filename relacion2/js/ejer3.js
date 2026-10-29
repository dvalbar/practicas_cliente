const miP = document.getElementById("miP");

let numPi1 = Math.PI.toFixed(4); // Formateado con toFixed(4)
let numPi2 = Math.PI.toPrecision(4); // Formateado con toPrecision(4)

miP.innerHTML = "Número PI: " + Math.PI + "<br>Con toFixed(4): " + numPi1 + "<br>Con toPrecision(4): " + numPi2;