let miP = document.getElementById("miP");
let input1 = document.getElementById("input1");
let input2 = document.getElementById("input2");
let input3 = document.getElementById("input3");
let boton = document.getElementById("boton");

boton.addEventListener("click", () => {
  try {
    miP.innerHTML = "";
    if (isNaN(input1.value) || isNaN(input2.value) || isNaN(input3.value)) {
      throw "Escribe un número";
    }

    let nota1 = Number(input1.value);
    let nota2 = Number(input2.value);
    let nota3 = Number(input3.value);

    if (
      nota1 < 0 ||
      nota1 > 10 ||
      nota2 < 0 ||
      nota2 > 10 ||
      nota3 < 0 ||
      nota3 > 10
    ) {
      throw "La nota debe ser entre 0 y 10";
    }

    let media = (nota1 + nota2 + nota3) / 3;

    miP.innerHTML += "Media Aritmética: " + media + "<br>";

    if (media < 5) {
      miP.innerHTML += "SUSPENSO";
    } else if (media < 7) {
      miP.innerHTML += "APROBADO";
    } else if (media < 8.5) {
      miP.innerHTML += "NOTABLE";
    } else {
      miP.innerHTML += "SOBRESALIENTE";
    }
  } catch (err) {
    miP.innerHTML = "Error: " + err;
  }
});