let productos = [];
let productosOftalmicos = []; // Variable para almacenar los productos oftálmicos mostrados

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
    fetch('http://localhost/crystaleyes/jsons/productos.json', {
        method: 'GET',
        credentials: 'include'
    })
        .then(response => response.json())
        .then(data => {
            productos = data;

            productosOftalmicos = data.filter(producto => producto.categoria === "Oftálmico");

            const productosDiv = document.getElementById('productos');
            productosDiv.innerHTML = '';

            productosOftalmicos.forEach(producto => {
                const productoDiv = document.createElement('div');
                productoDiv.classList.add('producto-card');
                productoDiv.innerHTML = `
                    <div>
                        <img src="${producto.img1}">
                        <h2>${producto.nombre}</h2>
                        <p class="precio">$${producto.precio}</p>
                        <center><button onclick="verDetalle(${producto.id})">Ver producto</button></center>
                    </div>
                `;

                productosDiv.appendChild(productoDiv);
            });
        })
        .catch(error => console.error('Error al cargar el archivo JSON:', error));

    const ordenarSelect = document.getElementById('ordenar');

    ordenarSelect.addEventListener('change', () => {
        const valorSeleccionado = ordenarSelect.value;

        switch (valorSeleccionado) {
            case 'precio_asc':
                productosOftalmicos.sort((a, b) => a.precio - b.precio);
                break;
            case 'precio_desc':
                productosOftalmicos.sort((a, b) => b.precio - a.precio);
                break;
            case 'nombre_asc':
                productosOftalmicos.sort((a, b) => a.nombre.localeCompare(b.nombre));
                break;
            case 'nombre_desc':
                productosOftalmicos.sort((a, b) => b.nombre.localeCompare(a.nombre));
                break;
            default:
                renderizarProductos(productosOftalmicos);
                break;
        }

        // Vuelve a renderizar los productos ordenados
        renderizarProductos(productosOftalmicos);
    });

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
