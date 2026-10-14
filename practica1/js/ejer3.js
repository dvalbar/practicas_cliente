let miP = document.getElementById("miP");
let miP2 = document.getElementById("miP2");
let input1 = document.getElementById("input1");

const CAMBIO_DOLAR = 1.11;
const CAMBIO_YEN = 176.62;

input1.addEventListener("blur", function () {
    miP.innerHTML = "Dólares: " + input1.value * CAMBIO_DOLAR;
    miP2.innerHTML = "Yenes: " + input1.value * CAMBIO_YEN;
});