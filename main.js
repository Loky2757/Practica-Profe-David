let datosLotes = {
"lote-1": { precio: "$500,000 MXN", area: 250, estado: "disponible" },
"lote-2": { precio: "$550,000 MXN", area: 275, estado: "vendido" },
"lote-3": { precio: "$480,000 MXN", area: 240, estado: "disponible" }
};
// Variable para recordar qué lote acabamos de clickear
let loteSeleccionadoActual = "";
// 2. RECUPERAR DATOS GUARDADOS
// Al recargar la página, el script debe leer el localStorage primero.
if (window.localStorage.getItem('mapaLotesGuardado')) {
// Si hay datos guardados previamente, los cargamos
datosLotes =
JSON.parse(window.localStorage.getItem('mapaLotesGuardado'));
 }
// 3. PINTAR EL MAPA SEGÚN LOS DATOS
      function actualizarColoresMapa() {
// Recorremos cada lote en nuestra base de datos
for (const idLote in datosLotes) {
const elementoSVG = document.getElementById(idLote);
if (elementoSVG) {
// Limpiamos clases anteriores
elementoSVG.classList.remove('lote-disponible', 'lote-vendido');
// Asignamos la nueva clase según su estado
if (datosLotes[idLote].estado === "disponible") {
elementoSVG.classList.add('lote-disponible');
} else {
elementoSVG.classList.add('lote-vendido');
}
}
}
}
// Ejecutamos la función al iniciar para pintar el mapa
actualizarColoresMapa();

// 4. INTERACTIVIDAD (CLICS EN LOS LOTES)
const lotesSVG = document.querySelectorAll('[id^="lote"]');
const modal = document.getElementById('mi-modal');
const overlay = document.getElementById('fondo-modal');
const btnCerrar = document.getElementById('btn-cerrar');
const btnReservar = document.getElementById('btn-reservar');
lotesSVG.forEach(lote => {
lote.addEventListener('click', function() {
const idLote = this.getAttribute('id');
const infoLote = datosLotes[idLote];
// Si el lote no está en la base de datos, lo ignoramos
if (!infoLote) return;
// Guardamos en la memoria qué lote abrimos
loteSeleccionadoActual = idLote;
// Inyectamos los datos en el HTML
document.getElementById('titulo-lote').innerText = idLote.replace('-', '').toUpperCase();
document.getElementById('estado-lote').innerText =
infoLote.estado.toUpperCase();
document.getElementById('area-lote').innerText = infoLote.area;
document.getElementById('precio-lote').innerText = infoLote.precio;
// Lógica visual para el botón de reservar
if (infoLote.estado === "vendido") {
btnReservar.style.display = 'none'; // Ocultar si ya está vendido
} else {
btnReservar.style.display = 'inline-block'; // Mostrar si está
disponible
}
// Mostrar la ventana modal
modal.style.display = 'block';
overlay.style.display = 'block';
});
});
// 5. LÓGICA DE RESERVA
btnReservar.addEventListener('click', function() {
// 1. Cambiar el valor del estado en el objeto JSON de "disponible" a"vendido"[cite: 2].
datosLotes[loteSeleccionadoActual].estado = "vendido";
// 2. Guardamos los cambios en el disco duro del navegador(LocalStorage)[cite: 2].
window.localStorage.setItem('mapaLotesGuardado',
JSON.stringify(datosLotes));
// 3. Actualizamos el DOM (los colores del mapa) en tiempo real[cite: 2].
actualizarColoresMapa();
// 4. Cerramos el modal para ver el resultado
cerrarModal();
});
// 6. FUNCIONES PARA CERRAR EL MODAL
function cerrarModal() {
modal.style.display = 'none';
overlay.style.display = 'none';
}
btnCerrar.addEventListener('click', cerrarModal);
overlay.addEventListener('click', cerrarModal);
