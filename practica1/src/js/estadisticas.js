const statTotal = document.getElementById("stat-total");
const statIngresos = document.getElementById("stat-ingresos");
const statCuotaMedia = document.getElementById("stat-cuota-media");
const statEdadMedia = document.getElementById("stat-edad-media");
const statEdadMin = document.getElementById("stat-edad-min");
const statEdadMax = document.getElementById("stat-edad-max");
const statPopularNombre = document.getElementById("stat-popular-nombre");
const statPopularSocios = document.getElementById("stat-popular-socios");
const statMenores = document.getElementById("stat-menores");
const statTodosActividad = document.getElementById("stat-todos-actividad");
const statVeteranos = document.getElementById("stat-veteranos");
const statDominios = document.getElementById("stat-dominios");

// 3.5 Estadísticas
// Muestra, calculado siempre a partir de los datos actuales (también tras un alta):
// 1. Número total de socios.
// 2. Ingresos mensuales (suma de cuotas) y cuota media, con 2 decimales.
// 3. Edad media (1 decimal), edad mínima y edad máxima.
// 4. Actividad más popular y cuántos socios la practican.
// 5. Si hay algún socio menor de edad (sí / no).
// 6. Si todos los socios tienen al menos una actividad (sí / no).
// 7. Los 3 socios más veteranos (alta más antigua).
// 8. Los dominios de correo que usan los socios, sin repetir.

actualizarEstadisticas();

/**
 * ==============================================================================================
 * FUNCIONES
 * ==============================================================================================
 */

/**
 * Calcula las estadísticas con los socios actuales y las muestra
 */
function actualizarEstadisticas() {
  let ingresos = 0;
  let edad = 0;
  let edadMin = calcularEdadSocio(socios[0].fechaNacimiento);
  let edadMax = calcularEdadSocio(socios[0].fechaNacimiento);
  let todosConActividad = true;
  let popular = "";
  let maxSocios = 0;

  statTotal.innerText = socios.length;

  for (const socio of socios) {
    ingresos += socio.cuota;
    edad += calcularEdadSocio(socio.fechaNacimiento);
    if (edadMin > calcularEdadSocio(socio.fechaNacimiento)) {
      edadMin = calcularEdadSocio(socio.fechaNacimiento);
    }
    if (edadMax < calcularEdadSocio(socio.fechaNacimiento)) {
      edadMax = calcularEdadSocio(socio.fechaNacimiento);
    }
    if (socio.actividades.length === 0) {
      todosConActividad = false;
    }
  }

  for (const actividad of ACTIVIDADES) {
    let contador = 0;

    for (const socio of socios) {
      if (socio.actividades.includes(actividad)) contador++;
    }

    if (contador > maxSocios) {
      popular = actividad;
      maxSocios = contador;
    }
  }

  statPopularNombre.innerText = popular.toUpperCase();
  statPopularSocios.innerText = maxSocios;

  statIngresos.innerText = ingresos.toFixed(2) + " €";
  statCuotaMedia.innerText = (ingresos / socios.length).toFixed(2) + " €";

  statEdadMedia.innerText = (edad / socios.length).toFixed(1);
  statEdadMin.innerText = edadMin;
  statEdadMax.innerText = edadMax;

  if (edadMin < 18) {
    statMenores.innerText = "Sí";
  } else {
    statMenores.innerText = "No";
  }

  if (todosConActividad) {
    statTodosActividad.innerText = "Sí";
  } else {
    statTodosActividad.innerText = "No";
  }

  mostrarVeteranos();
  mostrarDominios();
}

/**
 * Muestra los 3 socios más veteranos (alta más antigua)
 */
function mostrarVeteranos() {
  // Copia del array
  let ordenados = [...socios];

  // De la fecha de alta más antigua a la más reciente
  ordenados.sort((a, b) => a.fechaAlta.localeCompare(b.fechaAlta));

  // Quitar socios si habia antes alguno puesto
  statVeteranos.innerHTML = "";

  // Dar 3 vueltas (los 3 socios más veteranos)
  for (let i = 0; i < 3 && i < ordenados.length; i++) {
    let socio = ordenados[i];
    let texto =
      socio.nombre +
      " " +
      socio.apellidos +
      " (alta: " +
      fechaCorta(socio.fechaAlta) +
      ")";

    let elemento = createNode("li", texto, "", "");
    statVeteranos.appendChild(elemento);
  }
}

/**
 * Muestra los dominios de correo de los socios, sin repetir
 */
function mostrarDominios() {
  let dominios = [];

  for (const socio of socios) {
    let dominio = socio.email.split("@")[1];

    if (!dominios.includes(dominio)) {
      dominios.push(dominio);
    }
  }

  // Quitar dominios si habia antes alguno puesto
  statDominios.innerHTML = "";

  for (const dominio of dominios) {
    let elemento = createNode("li", dominio, "", "");
    statDominios.appendChild(elemento);
  }
}
