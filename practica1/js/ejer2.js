let miP = document.getElementById("miP");
let input1 = document.getElementById("input1");
let input2 = document.getElementById("input2");
let boton = document.getElementById("boton");

boton.onclick = function () {
  let valorBinario1 = Number(input1.value);
  let valorBinario2 = Number(input2.value);

  if (
    (valorBinario1 !== 0 && valorBinario1 !== 1) ||
    (valorBinario2 !== 0 && valorBinario2 !== 1)
  ) {
    miP.innerText = "Error: Los números deben ser 0 o 1";
    return;
  }

  let resultado = calcularXOR(valorBinario1, valorBinario2);

  miP.innerText = resultado;
};

/**
 * Funcion que calcula XOR
 */
function calcularXOR(val1, val2) {
  if (val1 !== val2) {
    return 1;
  } else {
    return 0;
  }
}