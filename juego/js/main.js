const ball = document.getElementById("ball");

ball.style.top = parseInt(screen.availHeight / 2 - 50) + "px";
ball.style.left = "0px";

let seguir = false;

// Intervalo que mueve de derecha a izquierda una bola
let intervalo = setInterval(function () {
  let izq = parseInt(ball.style.left.substring(0, ball.style.left.length - 2));
  if (seguir == false) {
    if (izq < screen.width - 100) {
      ball.style.left = izq + 10 + "px";
    } else {
      seguir = true;
    }
  } else {
    if (seguir == true) {
      if (izq > 0) {
        ball.style.left = izq - 10 + "px";
      } else {
        seguir = false;
      }
    }
  }
}, 100);

// A los 3 segundos se para el intervalo y la bola se queda quieta y cambia de color
// setTimeout(function () {
//   clearInterval(intervalo);
//   ball.style.backgroundColor = "pink";
// }, 3000);

/*************************** */
// Al pulsar el boton la bola se detiene y cambia de color
document.getElementById("stop").addEventListener("click", () => {
  clearInterval(intervalo);
  ball.style.backgroundColor = "pink";
});

document.getElementById("ball").addEventListener("click", () => {
  ball.style.backgroundColor = "white";
  intervalo = setInterval(function () {
    let izq = parseInt(
      ball.style.left.substring(0, ball.style.left.length - 2),
    );
    if (seguir == false) {
      if (izq < screen.width - 100) {
        ball.style.left = izq + 10 + "px";
      } else {
        seguir = true;
      }
    } else {
      if (seguir == true) {
        if (izq > 0) {
          ball.style.left = izq - 10 + "px";
        } else {
          seguir = false;
        }
      }
    }
  }, 100);
});