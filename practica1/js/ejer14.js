let miP = document.getElementById("miP");
let num,
  numMayor = 0,
  numMenor = 0;
let miArray = new Array();

do {
  num = Number(prompt("Introduce un número (0 para salir)"));
  miArray.push(num);

  if (num > numMayor && num != 0)
    numMayor = num;
  else if (num < numMenor && num != 0)
    numMenor = num;
}
while (num != 0);

miArray.sort((a, b) => b - a);

for (let elem of miArray) {
  if (elem != 0) miP.innerHTML += elem + " ";
}

miP.innerHTML += "<br>Número mayor: " + numMayor + "<br>";
miP.innerHTML += "Número menor: " + numMenor;