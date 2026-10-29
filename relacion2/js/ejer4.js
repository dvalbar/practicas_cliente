const btnCalcularEdad = document.getElementById("btnCalcularEdad");
const inputEdad = document.getElementById("inputEdad");
const miP = document.getElementById("miP");

btnCalcularEdad.addEventListener(("click"), () => {
    try {
    let fechaActual = new Date();
    
    let fechaNacimiento = new Date(inputEdad.value);

    let restaFechas = fechaActual - fechaNacimiento;
    console.log(restaFechas);
    miP.innerHTML = "Días que llevas vivo: " + getdat
    }
    catch (err) {
        miP.innerHTML = "Error: " + err;
    }
});