let productos = [];
let productosSol = []; // Variable para almacenar los productos de la categoría Sol mostrados

const verDetalle = (productoId) => {
    const producto = productos.find(p => p.id === productoId);
    if (producto) {
        const urlDetalle = `producto${productoId}.html?nombre=${encodeURIComponent(producto.nombre)}`;
        window.location.href = urlDetalle;
    } else {
        console.log('Producto no encontrado.');
    }
};

document.addEventListener("DOMContentLoaded", () => {
    const cargarProductos = () => {

        fetch('http://localhost/crystaleyes/jsons/productos.json', {
            method: 'GET',
            credentials: 'include'
        })
            .then(response => response.json())
            .then(data => {
                productos = data;

                productosSol = data.filter(producto => producto.categoria === "Sol");
                const productosDiv = document.getElementById('productos');
                productosDiv.innerHTML = '';

                productosSol.forEach(producto => {
                    const productoDiv = document.createElement('div');
                    productoDiv.classList.add('producto-card');

                    productoDiv.innerHTML = `
                    <div>
                        <img src="${producto.img1}">
                        <h2>${producto.nombre}</h2>
                        <p class="precio">$${producto.precio}</p>
                        <p>${producto.descripcion_larga}</p>
                        <center><button onclick="verDetalle(${producto.id})">Ver producto</button></center>
                    </div>
                `;

                    productosDiv.appendChild(productoDiv);
                });
            })
            .catch(error => console.error('Error al cargar el archivo JSON:', error));
    };
    const ordenarProductos = () => {
        const selector = document.getElementById('ordenar');
        const criterio = selector.value;

        switch (criterio) {
            case 'precio_asc':
                productosSol.sort((a, b) => a.precio - b.precio);
                break;
            case 'precio_desc':
                productosSol.sort((a, b) => b.precio - a.precio);
                break;
            case 'nombre_asc':
                productosSol.sort((a, b) => a.nombre.localeCompare(b.nombre));
                break;
            case 'nombre_desc':
                productosSol.sort((a, b) => b.nombre.localeCompare(a.nombre));
                break;
            default:
                break;
        }

        renderizarProductos(productosSol);
    };

    // Función para renderizar los productos
    const renderizarProductos = (productos) => {
        const productosDiv = document.getElementById('productos');
        productosDiv.innerHTML = '';

        productos.forEach(producto => {
            const productoDiv = document.createElement('div');
            productoDiv.classList.add('producto-card');
            productoDiv.innerHTML = `
                <div>
                    <img src="${producto.img1}">
                    <h2>${producto.nombre}</h2>
                    <p class="precio">$${producto.precio}</p>
                    <p>${producto.descripcion_larga}</p>
                    <center><button onclick="verDetalle(${producto.id})">Ver producto</button></center>
                </div>
            `;

            productosDiv.appendChild(productoDiv);
        });
    };

    // Event listener para el cambio en el selector de orden
    const selectorOrden = document.getElementById('ordenar');
    selectorOrden.addEventListener('change', ordenarProductos);

    // Cargar los productos al inicio
    cargarProductos();

    const nav = document.querySelector("#nav");
    const abrir = document.querySelector("#abrir");
    const cerrar = document.querySelector("#cerrar");

    abrir.addEventListener("click", () => {
        nav.classList.add("visible");
    });

    cerrar.addEventListener("click", () => {
        nav.classList.remove("visible");
    });
});
