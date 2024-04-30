const nav = document.querySelector("#nav");
const abrir = document.querySelector("#abrir");
const cerrar = document.querySelector("#cerrar");

abrir.addEventListener("click", () => {
    nav.classList.add("visible");
});

cerrar.addEventListener("click", () => {
    nav.classList.remove("visible");
});

// Ruta del archivo del encabezado
const headerURL = 'header.html';

// Cargar el contenido del encabezado
fetch(headerURL)
    .then(response => response.text())
    .then(html => {
        // Insertar el contenido del encabezado en el contenedor
        document.getElementById('header-container').innerHTML = html;
    })
    .catch(error => console.error('Error al cargar el encabezado:', error));

