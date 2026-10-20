const cliente = document.getElementById("cliente");
const matricula = document.getElementById("matricula");
const vehiculo = document.getElementById("vehiculo");
const aceite = document.getElementById("aceite");
const filtros = document.getElementById("filtros");
const frenos = document.getElementById("frenos");
const neumaticos = document.getElementById("neumaticos");
const alineado = document.getElementById("alineado");
const pago = document.getElementById("pago");
const btnPresupuesto = document.getElementById("btnPresupuesto");
const btnLimpiar = document.getElementById("btnLimpiar"); // No hace falta programarlo
const mensaje = document.getElementById("mensaje");
const total = document.getElementById("total");
const presupuesto = document.getElementById("presupuesto");

// Catálogo de servicios: el id coincide con el id del input del HTML
const SERVICIOS = [
  { id: "aceite", nombre: "Cambio de aceite", precio: 45 },
  { id: "filtros", nombre: "Cambio de filtros", precio: 30 },
  { id: "frenos", nombre: "Pastillas de freno (eje)", precio: 80 },
  { id: "neumaticos", nombre: "Neumático", precio: 70 },
  { id: "alineado", nombre: "Alineado de dirección", precio: 35 },
];

// ---------------- btnPresupuesto ----------------
btnPresupuesto.addEventListener("click", () => {
  mensaje.innerHTML = "";
  total.value = "";
  try {
    let miMatricula = matricula.value;
    let miAceite = Number(aceite.value);
    let miFiltros = Number(filtros.value);
    let miFrenos = Number(frenos.value);
    let miNeumaticos = Number(neumaticos.value);
    let miAlineado = Number(alineado.value);
    // ------------------------------ Restricciones ------------------------------
    if (cliente.value == "") {
      throw "El nombre del cliente es obligatorio.";
    } else if (miMatricula.length != 7) {
      throw "La matrícula debe tener 7 caracteres.";
    } else if (vehiculo.value == "" || pago.value == "") {
      throw "Hay que seleccionar el tipo de vehículo y la forma de pago.";
    } else if (
      miAceite < 0 ||
      miAceite > 4 ||
      miFiltros < 0 ||
      miFiltros > 4 ||
      miFrenos < 0 ||
      miFrenos > 4 ||
      miNeumaticos < 0 ||
      miNeumaticos > 4 ||
      miAlineado < 0 ||
      miAlineado > 4
    ) {
      throw "Cada cantidad debe ser un número entero entre 0 y 4";
    } else if (
      miAceite == 0 &&
      miFiltros == 0 &&
      miFrenos == 0 &&
      miNeumaticos == 0 &&
      miAlineado == 0
    ) {
      throw "Hay que pedir al menos un servicio.";
    } else if (
      (vehiculo.value == "moto" && miNeumaticos > 2) ||
      (vehiculo.value == "moto" && miAlineado > 0)
    ) {
      throw "Una moto no puede llevar más de 2 neumáticos ni hacerse un alineado de dirección.";
    }
    // ----------------------------------------------------------------------

    let basePresupuesto = baseDelPresupuesto();
    let baseConDescuentoPorVolumen = descuentoPorVolumen(basePresupuesto);

    let baseConDescuentoRecargo = recargoFormaDePago(
      baseConDescuentoPorVolumen,
    );

    let precioIvaCalculado = calcularIVA(baseConDescuentoRecargo); // Precio Final

    // El campo con id=presupuesto muestra un título con el cliente y la matrícula, con el servicio,
    // cantidad e importe, y debajo la base (indicando el multiplicador), el descuento, el recargo y el IVA,
    // cada uno con su porcentaje y su importe.
    presupuesto.innerHTML += `<h2>Presupuesto para ${cliente.value} - ${matricula.value}</h2><br>`;

    // Campo con Id=total muestra el total con dos decimales y el símbolo €
    total.value = precioIvaCalculado + " €";

    // Campo con id=mensaje muestra un texto de confirmación
    mensaje.innerHTML = "Presupuesto generado correctamente";

    // El input con id=matricula se actualiza con la matrícula en mayúsculas.
    matricula.value = miMatricula.toUpperCase();
  } catch (err) {
    mensaje.innerHTML = "Error: " + err;
  }
});

// ---------------- btnLimpiar ----------------
// No hace falta programarlo
btnLimpiar.addEventListener("click", () => {
  cliente.value = "";
  matricula.value = "";
  vehiculo.value = "";
  pago.value = "";
  aceite.value = 0;
  filtros.value = 0;
  frenos.value = 0;
  neumaticos.value = 0;
  alineado.value = 0;
  total.value = "";

  mensaje.innerHTML = "Formulario limpiado";
});

/**FUNCIONES */

/**
 * Base del presupuesto. Para cada servicio, precio × cantidad × multiplicador; la base es la suma de
todos.
 */
function baseDelPresupuesto() {
  let base = 0;

  if (aceite.value > 0) {
    base +=
      SERVICIOS[0].precio *
      Number(aceite.value) *
      multiplicadorTipoVehiculo(vehiculo.value);
  }
  if (filtros.value > 0) {
    base +=
      SERVICIOS[1].precio *
      Number(filtros.value) *
      multiplicadorTipoVehiculo(vehiculo.value);
  }
  if (frenos.value > 0) {
    base +=
      SERVICIOS[2].precio *
      Number(frenos.value) *
      multiplicadorTipoVehiculo(vehiculo.value);
  }
  if (neumaticos.value > 0) {
    base +=
      SERVICIOS[3].precio *
      Number(neumaticos.value) *
      multiplicadorTipoVehiculo(vehiculo.value);
  }
  if (alineado.value > 0) {
    base +=
      SERVICIOS[4].precio *
      Number(alineado.value) *
      multiplicadorTipoVehiculo(vehiculo.value);
  }

  return base;
}

/**
 * Multiplicador por tipo de vehículo. Se aplica al precio de cada servicio: moto ×0,7; turismo ×1; SUV
×1,2; furgoneta ×1,35.
 */
function multiplicadorTipoVehiculo(tipoVehiculo) {
  let multiplicador = 0;
  switch (tipoVehiculo) {
    case "moto":
      multiplicador = 0.7;
      break;
    case "turismo":
      multiplicador = 1;
      break;
    case "suv":
      multiplicador = 1.2;
      break;
    case "furgoneta":
      multiplicador = 1.35;
      break;
  }
  return multiplicador;
}

/**
 * Descuento por volumen sobre la base:
 * 300 € o más, 10 %;
 * de 150 € a 299,99 €, 5 %;
 * menos de 150 €, 0 %.
 */
function descuentoPorVolumen(base) {
  let nuevaBase = 0;
  if (base < 150) {
    nuevaBase = base - (base * 0) / 100;
  } else if (base < 299.99) {
    nuevaBase = base - (base * 5) / 100;
  } else {
    nuevaBase = base - (base * 10) / 100;
  }
  return nuevaBase;
}

/**
 * Recargo por forma de pago: Se aplica sobre la base ya descontada: efectivo y tarjeta, 0 %; financiado, 5 %
 */
function recargoFormaDePago(baseDescuentada) {
  let recargo = baseDescuentada;
  if (pago.value == "financiado") {
    recargo = baseDescuentada - (baseDescuentada * 5) / 100;
  }
  return recargo;
}

/**
 * IVA. Se aplica un 21 % sobre la base con descuento y recargo.
 */
function calcularIVA(baseDescuentoRecargo) {
  let precioIVA = 0;
  return (precioIVA = baseDescuentoRecargo - (baseDescuentoRecargo * 21) / 100);
}