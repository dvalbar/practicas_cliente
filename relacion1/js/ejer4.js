let miP = document.getElementById("miP");
let miP2 = document.getElementById("miP2");
let input1 = document.getElementById("input1");

input1.addEventListener("blur", () => {
    radio = input1.value;
    miP.innerText = "Área: " + 2 * Math.PI * Math.pow(radio,2)
    miP2.innerText = "Perímetro: " + 2 * Math.PI * radio;
});