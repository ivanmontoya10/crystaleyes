abrir.addEventListener("click", () => {
    nav.classList.add("visible");
});

cerrar.addEventListener("click", () => {
    nav.classList.remove("visible");
});

document.addEventListener('DOMContentLoaded', function () {
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const productosContainer = document.getElementById('productos');

    searchForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Evita que el formulario se envíe por defecto

        const query = searchInput.value.trim(); // Obtiene el valor del campo de búsqueda

        // Realiza una solicitud GET para obtener los resultados de búsqueda
        fetch('http://localhost/crystaleyes/jsons/productos.json')
            .then(response => response.json())
            .then(data => {

                const resultados = data.filter(producto => producto.nombre.toLowerCase().includes(query.toLowerCase()));
                // Borra el contenido anterior en el contenedor de productos
                productosContainer.innerHTML = '';

                // Agrega los resultados de búsqueda al contenedor de productos
                data.forEach(producto => {
                    const productoElement = document.createElement('div');
                    productoElement.textContent = producto.nombre; // Ejemplo: Mostrar el nombre del producto
                    productosContainer.appendChild(productoElement);
                });
            })
            .catch(error => {
                console.error('Error al obtener resultados de búsqueda:', error);
            });
    });
});