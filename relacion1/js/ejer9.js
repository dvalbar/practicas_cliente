let miP = document.getElementById("miP");
const longitudPiramide = 50;

for (let i = 0; i <= longitudPiramide; i++) {
  for (let j = 0; j < i; j++) {
    miP.innerText += j+1;
  }
  miP.innerHTML += "<br>";
}