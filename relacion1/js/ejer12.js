let miP = document.getElementById("miP");
let contador = 0;

for (let i = 1; i <= 300; i++) {
  if (contador == 10) { // Cada 10 números se ejecuta un salto de página
    contador = 0; // Volvemos a poner el contador a 0
    miP.innerHTML += "<br>";
  }

  if (i % 4 == 0) { // Múltiplo de 4, texto en verde
    miP.innerHTML +=
      "<span style='color: green; font-size: 20px'>" + i + " </span>";
  }
  else if (i % 9 == 0) { // Múltiplo de 9, texto en rojo
     miP.innerHTML +=
       "<span style='color: red; font-size: 18px'>" + i + " </span>";
  }
  else { // Número normal (aparece en negro)
    miP.innerHTML += i + " ";
  }
  contador++;
}