let miP = document.getElementById("miP");

let alumnos = [
  ["David", "Valverde", "2ºDAW", [8, 9, 7]],
  ["Carlos", "Repullo", "1ºBachillerato", [10, 2, 5]],
  ["Noemí", "Parejo", "2ºDAW", [10, 9, 10]],
  ["Ana", "Moyano", "2ºBachillerato", [3, 4, 1]],
  ["Pepe", "Gonzalez", "2ºESO", [9, 5, 3]],
];

for (let elem of alumnos) {
     miP.innerHTML += `${elem[0]}; ${elem[1]}; ${elem[2]}; Notas[${elem[3][0]}; ${elem[3][1]}; ${elem[3][2]}].<br>`;
}