import { obstaculos } from "./obstaculo.js";

const pj = document.getElementById("pj");
const cssPersonaje = window.getComputedStyle(pj);

let positionLeft = parseFloat(cssPersonaje.getPropertyValue("left")) || 0;
let positionTop = parseFloat(cssPersonaje.getPropertyValue("top")) || 0;
let anchoPj = parseFloat(cssPersonaje.getPropertyValue("width")) || 0;
const VELOCIDAD_PJ = 10;

function dibujaObstaculos() {
  for (const elem of obstaculos) {
    let divObstaculo = document.createElement("div");
    divObstaculo.style.position = "absolute";
    divObstaculo.style.left = elem.x + "px";
    divObstaculo.style.top = elem.y + "px";
    divObstaculo.style.width = elem.ancho + "px";
    divObstaculo.style.height = elem.alto + "px";
    divObstaculo.style.backgroundColor = elem.colorFondo;
    document.body.appendChild(divObstaculo);
  }
}

dibujaObstaculos();

document.addEventListener("keydown", function (e) {
  switch (e.key) {
    case "ArrowRight":
      if (!colision(e.key)) {
        positionLeft += VELOCIDAD_PJ;
        pj.style.left = positionLeft + "px";
        break;
      }
    case "ArrowLeft":
      if (!colision(e.key)) {
        positionLeft -= VELOCIDAD_PJ;
        pj.style.left = positionLeft + "px";
        break;
      }
    case "ArrowDown":
      if (!colision(e.key)) {
        positionTop += VELOCIDAD_PJ;
        pj.style.top = positionTop + "px";
        break;
      }
    case "ArrowUp":
      if (!colision(e.key)) {
        positionTop -= VELOCIDAD_PJ;
        pj.style.top = positionTop + "px";
        break;
      }
  }
});

function colision(direc) {
  let colision = false;
  switch (direc) {
    case "ArrowRight":
      for (const elem of obstaculos) {
        if (positionLeft + anchoPj >= elem.x) {
          if (positionTop < elem.y + elem.alto) {
            colision = true;
            break;
          }
        }
      }

    case "ArrowLeft":
      break;

    case "ArrowDown":
      break;

    case "ArrowUp":
      break;
  }
  return colision;
}
