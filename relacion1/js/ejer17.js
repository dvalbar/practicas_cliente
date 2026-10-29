const miP = document.getElementById("miP");
const input1 = document.getElementById("input1");
const input2 = document.getElementById("input2");
const boton = document.getElementById("boton");

boton.addEventListener("click", () => {
    let contadorNum = 0;
  try {
    miP.innerHTML = "";

    if (isNaN(input1.value) || isNaN(input2.value)) {
      throw "Escribe un número";
    }

    let num1 = Number(input1.value);
    let num2 = Number(input2.value);

    let numMenor = calculaMenor(num1, num2);

    if (num1 > num2) {
      let aux = num2;
      num2 = num1;
      num1 = aux;
    }
    for (let i = num1; i <= num2; i++) {
      miP.innerHTML += i + ", ";
      contadorNum++;
    }
    miP.innerHTML += "<br><br>Hay " + contadorNum + " números";
    miP.innerHTML += "<br>Número menor: " + numMenor;
  } catch (err) {
    miP.innerHTML += "Error: " + err;
  }
});

/**Funciones */
function calculaMenor(num1, num2) {
  let numMenor;
  if (num1 < num2) {
    numMenor = num1;
  } else {
    numMenor = num2;
  }
  return numMenor;
}