const h11 = document.getElementById("h11");
const info = document.getElementById("info");
const email = document.getElementById("email");
const password = document.getElementById("password");
const login = document.getElementById("login");
const exp = document.getElementById("exp");

const RUTA = "http://127.0.0.1:5500";
const TEXTO =
  "La luz de la cAteDral caía en ángulos imposibles sobre los tejados de pizarra de la antigua ciudad, tiñendo las chimeneas de un tono ámbar casi irreal. Desde lo alto del mirador de piedra, el horizonte se extendía en una sucesión infinita de colinas verdes que parecían fundirse con el cielo nublado. El viento traía consigo el eco lejano del río discurriendo entre los matorrales, un murmullo constante que competía con el repicar pausado de las campanas de la catedral.";

const textoNav = document.getElementById("nav1").innerHTML;

const dni = document.getElementById("dni");
const btnDni = document.getElementById("btnDni");
const infoDni = document.getElementById("infoDni");

const inputEmail = document.getElementById("inputEmail");
const btnEmail = document.getElementById("btnEmail");
const infoEmail = document.getElementById("infoEmail");

const inputTlfn = document.getElementById("inputTlfn");
const btnTlfn = document.getElementById("btnTlfn");
const infoTlfn = document.getElementById("infoTlfn");

const btnLimpiar = document.getElementById("btnLimpiar");

info.innerHTML = TEXTO;

let re1 = /catedral/gi;

document.getElementById("nav1").innerHTML = textoNav.replaceAll(
  'href="#"',
  'href="#"' + 'style="color:green;"',
);

// Expresión regular DNI
let expRegDni = /^([XYZ]\d{7}|\d{8}[A-Z])$/i;

btnDni.addEventListener("click", (e) => {
  e.preventDefault;
  if (expRegDni.test(dni.value.trim())) infoDni.innerHTML = "DNI correcto";
  else infoDni.innerHTML = "DNI incorrecto";
});

// Expresión regular Email
let expRegEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

btnEmail.addEventListener("click", (e) => {
  e.preventDefault;
  if (expRegEmail.test(inputEmail.value.trim()))
    infoEmail.innerHTML = "EMAIL correcto";
  else infoEmail.innerHTML = "EMAIL incorrecto";
});

// Expresión regular Tlfn
let expRegTlfn = /^((\+\d{2})?\d{9})$/;

btnTlfn.addEventListener("click", (e) => {
  e.preventDefault;
  let myPhone = inputTlfn.value.trim();
  myPhone = myPhone.replaceAll(" ", "");

  if (expRegTlfn.test(myPhone)) infoTlfn.innerHTML = "Teléfono correcto";
  else infoTlfn.innerHTML = "Teléfono incorrecto";
});

inputTlfn.addEventListener("input", function () {
  if (this.value.length % 3 == 0 && this.value.length < 9) {
    this.value = this.value + " ";
  }
});

// Expresión regular URL
//  /https?:\/\/|www\.\S+/i

/**
 * Botón limpiar
 */
btnLimpiar.addEventListener("click", () => {
  infoDni.innerHTML = "";
  dni.value = "";
  infoEmail.innerHTML = "";
  inputEmail.value = "";
  infoTlfn.innerHTML = "";
  inputTlfn.value = "";
});

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
