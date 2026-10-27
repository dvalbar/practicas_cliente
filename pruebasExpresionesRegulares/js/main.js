const h11 = document.getElementById("h11");
const info = document.getElementById("info");
const email = document.getElementById("email");
const password = document.getElementById("password");
const login = document.getElementById("login");
const exp = document.getElementById("exp");
const RUTA = "http://127.0.0.1:5500";
const TEXTO ="La luz de la cAteDral caía en ángulos imposibles sobre los tejados de pizarra de la antigua ciudad, tiñendo las chimeneas de un tono ámbar casi irreal. Desde lo alto del mirador de piedra, el horizonte se extendía en una sucesión infinita de colinas verdes que parecían fundirse con el cielo nublado. El viento traía consigo el eco lejano del río discurriendo entre los matorrales, un murmullo constante que competía con el repicar pausado de las campanas de la catedral.";
const textoNav = document.getElementById("nav1").innerHTML;

info.innerHTML = TEXTO;

let re1 = /catedral/ig;

document.getElementById("nav1").innerHTML = textoNav.replaceAll('href="#"', 'href="#"' + 'style="color:green;"');

// let re2 = new RegExp("imposibles", "img");

// let result = null;
// let myIndex = re1.lastIndex;

// if (TEXTO.search(re1)) {
//   result = TEXTO.matchAll(re1);
//   for (encontrado of result) {
//     console.log(`Encontrado ${encontrado[0]} en la posición ${encontrado.index}.`);
//     console.log("------------------------------------------");
//   }
// }

// while (re1.test(TEXTO)) {
//   re1.lastIndex = myIndex
//   result = re1.exec(TEXTO);
//   myIndex = re1.lastIndex;
//   console.log(`Encontrado ${result[0]} en la posición ${result.index}.`);
//   console.log("------------------------------------------");
// }

// if (re1.test(TEXTO)) {
//   exp.innerHTML = "Encontrado"
// }
// else {
//   exp.innerHTML = "No encontrado"
// }

// TEXTO.match(re1);