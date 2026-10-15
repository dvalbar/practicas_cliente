const ball = document.getElementById("ball");

ball.style.top = parseInt(screen.availHeight / 2 - 50) + "px";
ball.style.left = "0px";

let seguir = false;

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