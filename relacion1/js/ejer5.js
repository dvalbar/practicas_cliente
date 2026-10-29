let miP = document.getElementById("miP");
let input1 = document.getElementById("input1");
let input2 = document.getElementById("input2");
let boton = document.getElementById("boton");

boton.addEventListener("click", () => {
  try {
    miP.innerHTML = "";

    if (isNaN(input1.value) || isNaN(input2.value)) {
      throw "Pon un número";
    }

    let num1 = Number(input1.value);
    let num2 = Number(input2.value);

    if (num1 <= -100 || num1 > 5000 || num2 <= -100 || num2 > 5000) {
      throw "El número debe ser mayor que -100 y menor o igual que 5000";
    }

    if (num2 < num1) {
      let aux = num2;
      num2 = num1;
      num1 = aux;
    }

    for (let i = num1; i <= num2; i++) {
      if (i % 2 == 0) {
        if (i == num2) {
          miP.innerHTML += i;
        } else {
          miP.innerHTML += i + ", ";
        }
      }
    }
  } catch (err) {
    miP.innerHTML = "Error: " + err;
  }
});