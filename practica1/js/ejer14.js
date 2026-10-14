let miP = document.getElementById("miP");
let num;
let miArray = new Array();

do {
   num = Number(prompt("Introduce un número (0 para salir)"));
   miArray.push(num);

}
while (num!=0);

miArray.sort((a,b)=>b-a);

for (let elem of miArray) {
    miP.innerHTML += elem + " ";
}