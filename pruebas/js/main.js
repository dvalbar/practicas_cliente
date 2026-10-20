const h11 = document.getElementById("h11");

let usersWindow = null;

document.getElementById("sendEmail").onclick = function () {
  if (!usersWindow || usersWindow.closed) {
    h11.innerHTML = "";
    usersWindow = window.open(
      "src/email.html",
      "_blank",
      "width=750px,height=500,top=100px,left=300px",
    );
  } else {
    alert("Ya tienes la ventana abierta")
    usersWindow.focus();
  }
};

document.getElementById("moveWindow").onclick = function () {
    if (usersWindow) {
        usersWindow.moveTo(500,300);
        usersWindow.focus();
    }
    else {
        alert("La ventana ya se cerró")
    }
}

/**WINDOW */

// h11.innerText += "Número de frames: " + window.frames.length;
// h11.innerText += "\nPrimer iframe: " + window.frames[0];

/**SCREEN */

// h11.innerHTML += `Ancho disponible: ${screen.availWidth}, Alto disponible: ${screen.availHeight}<br>`
// h11.innerHTML += `Ancho total: ${screen.width}, Alto total: ${screen.height}<br>`;
// h11.innerHTML += `Número bits colores: ${screen.colorDepth}<br>`;
// h11.innerHTML += `Orientación pantalla: ${screen.orientation.angle} grados<br>`;
// h11.innerHTML += `Primera posición izquierda disponible: ${screen.availLeft}<br><br>`

// if (screen.height < screen.width) {
//   h11.innerHTML = "La pantalla está en horizontal (landscape)";
// } else {
//   h11.innerHTML = "La pantalla está en vertical (portrait)";
// }
// h11.innerHTML += " - Ángulo pantalla: " + screen.orientation.angle;

// document.body.onresize = function () {
//   if (screen.height < screen.width) {
//     h11.innerHTML = "La pantalla está en horizontal (landscape)";
//   } else {
//     h11.innerHTML = "La pantalla está en vertical (portrait)";
//   }
//   h11.innerHTML += " - Ángulo pantalla: " + screen.orientation.angle;
// };

/**NAVIGATOR */

// let navigatorObject = new Object({
//   userAgent: navigator.userAgent,
//   platform: navigator.platform,
//   language: navigator.language,
//   onLine: navigator.onLine,
//   cookieEnabled: navigator.cookieEnabled,
//   hardwareConcurrency: navigator.hardwareConcurrency,
//   memory: navigator.deviceMemory,
//   vendor: navigator.vendor,
// });

// h11.innerHTML += "Navegador y Sistema: " + navigatorObject.userAgent + "<br>";
// h11.innerHTML += "Sistema: " + navigatorObject.platform + "<br>";
// h11.innerHTML += "Idiomas: " + navigatorObject.language + "<br>";
// h11.innerHTML += "Conectado a Internet: " + navigatorObject.onLine + "<br>";
// h11.innerHTML += "Permitido cookies: " + navigatorObject.cookieEnabled + "<br>";
// h11.innerHTML += "Número núcleos CPU: " + navigatorObject.hardwareConcurrency + "<br>";
// h11.innerHTML += "RAM: " + navigatorObject.memory + "<br>";
// h11.innerHTML += "Fabricante: " + navigatorObject.vendor + "<br>";