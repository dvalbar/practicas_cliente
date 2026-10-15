// a. Número de horas trabajadas. [Campo numérico]
// b. Turno realizado: Mañanas (m), Tardes (t) o Noches (n). [Campo Radio Button]

// Para el cálculo del salario bruto se tendrá en cuenta que el turno de mañana se paga a 25
// €/hora, el de tarde se paga a 30 €/hora y el turno de noche se paga 35 €/hora.

// Para el cálculo del salario neto se realizan determinados descuentos destinados al pago de
// impuestos de la siguiente forma:

// Si el salario bruto es menor de 600 € el descuento es del 8%.
// Si el salario bruto está entre 600 € y 1000 € el descuento es del 10%.
// Si el salario bruto es mayor de 10000 € el descuento es del 12%.

// Se desea calcular el salario neto de cada trabajador. Para ello la aplicación irá pidiendo uno a
// uno los trabajadores: Nombre, apellido, Horas trabajadas, turno, hasta que el usuario indique
// lo contrario. Para cada trabajador se mostrará su salario neto y bruto.

// Antes de finalizar la aplicación mostrará el importe total de salarios brutos abonados.
// El script se escribirá usando tantas funciones como sea posible con el fin de poder reutilizar la
// máxima cantidad de código en un futuro.

// parrafo
const miP = document.getElementById("miP");

// inputs
const nombre = document.getElementById("nombre");
const apellidos = document.getElementById("apellidos");
const horas = document.getElementById("horas");

// radioButtons
const maniana = document.getElementById("maniana");
const tarde = document.getElementById("tarde");
const noche = document.getElementById("noche");

// buttons
const empleado = document.getElementById("empleado");
const final = document.getElementById("final");

// constantes
const PAGO_TURNO_MANIANA = 25;
const PAGO_TURNO_TARDE = 30;
const PAGO_TURNO_NOCHE = 35;

let totalBruto = 0;

empleado.addEventListener("click", () => {
  if (horas.value == "" || isNaN(horas.value)) {
    miP.innerHTML += "<br>Los campos no pueden estar vacíos<br><br>";
  } else if (!maniana.checked && !tarde.checked && !noche.checked) {
    miP.innerHTML += "<br>Los turnos no pueden estar desmarcados<br><br>";
  } else {
    let nombreEmpleado = nombre.value;
    let apellidosEmpleado = apellidos.value;
    let numHorasTrabajadas = Number(horas.value);

    let salarioNeto = salarioNetoDeCadaTrabajador(numHorasTrabajadas);

    miP.innerHTML +=
      nombreEmpleado +
      " " +
      apellidosEmpleado +
      " | Horas trabajadas: " +
      numHorasTrabajadas +
      " horas | Salario bruto: " +
      calcularSalarioBruto(numHorasTrabajadas) +
      " | Salario neto: " +
      salarioNeto +
      "<br>";

    nombre.value = "";
    apellidos.value = "";
    horas.value = "";
    maniana.checked = false;
    tarde.checked = false;
    noche.checked = false;
    totalBruto += calcularSalarioBruto(numHorasTrabajadas);
  }
});

final.addEventListener("click", () => {
  miP.innerHTML +=
    "<br>Importe total de salarios brutos abonados: " + totalBruto + "<br><br>";
});

// ---------------------------------------------------------
/**Funciones */
function calcularSalarioBruto(horas) {
  let salarioBruto;
  if (maniana.checked) {
    salarioBruto = horas * PAGO_TURNO_MANIANA;
  } else if (tarde.checked) {
    salarioBruto = horas * PAGO_TURNO_TARDE;
  } else if (noche.checked) {
    salarioBruto = horas * PAGO_TURNO_NOCHE;
  }
  return salarioBruto;
}

// Si el salario bruto es menor de 600 € el descuento es del 8%.
// Si el salario bruto está entre 600 € y 1000 € el descuento es del 10%.
// Si el salario bruto es mayor de 10000 € el descuento es del 12%.
function calcularSalarioNeto(salarioBruto) {
  if (salarioBruto < 600) {
    salarioBruto -= (salarioBruto * 8) / 100;
  } else if (salarioBruto < 1000) {
    salarioBruto -= (salarioBruto * 10) / 100;
  } else if (salarioBruto > 10000) {
    salarioBruto -= (salarioBruto * 12) / 100;
  }
  return salarioBruto;
}

function salarioNetoDeCadaTrabajador(horas) {
  let salarioBruto = calcularSalarioBruto(horas);
  let salarioNeto = calcularSalarioNeto(salarioBruto);
  return salarioNeto;
}