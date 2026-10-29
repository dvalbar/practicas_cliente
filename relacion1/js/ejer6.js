let miP = document.getElementById("miP");
let input1 = document.getElementById("input1");
let input2 = document.getElementById("input2");
let boton = document.getElementById("boton");

boton.addEventListener("click", () => {
  try {
    miP.innerHTML = "";
    if (isNaN(input1.value) || isNaN(input2.value)) {
      throw "Escribe un número";
    }

    let num1 = Number(input1.value);
    let num2 = Number(input2.value);

    miP.innerHTML += "Suma: " + (num1 + num2) + "<br>";
    miP.innerHTML += "Resta: " + (num1 - num2) + "<br>";
    miP.innerHTML += "Multiplicación: " + num1 * num2 + "<br>";
    if (num2 == 0) {
      miP.innerHTML += "División: No se puede dividir entre 0<br>";
    } else {
      miP.innerHTML += "División: " + num1 / num2 + "<br>";
    }
  } catch (err) {
    miP.innerHTML = "Error: " + err;
  }
});