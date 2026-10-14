let miP = document.getElementById("miP");

const NUM_LANZAMIENTOS = 36000;
let dado1, dado2;
let resultados = new Array();

for (let i = 0; i < 11; i++) {
  // Inicializar el array con todo a 0
  resultados[i] = 0;
}

for (let i = 0; i < NUM_LANZAMIENTOS; i++) {
  dado1 = parseInt(Math.random() * 6 + 1);
  dado2 = parseInt(Math.random() * 6 + 1);
  switch (dado1 + dado2) {
    case 2:
      resultados[0]++;
      break;
    case 3:
      resultados[1]++;
      break;
    case 4:
      resultados[2]++;
      break;
    case 5:
      resultados[3]++;
      break;
    case 6:
      resultados[4]++;
      break;
    case 7:
      resultados[5]++;
      break;
    case 8:
      resultados[6]++;
      break;
    case 9:
      resultados[7]++;
      break;
    case 10:
      resultados[8]++;
      break;
    case 11:
      resultados[9]++;
      break;
    case 12:
      resultados[10]++;
      break;
  }
}

// Mostrar en la interfaz
for (let elem of resultados) {
  miP.innerHTML += elem + "<br>";
}