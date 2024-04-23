let productos = [];

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

        const productosDiv = document.getElementById('productos');
        productosDiv.innerHTML = '';

        data.forEach(producto => {
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

            //Cambiar propiedad para algun producto en especifico

            // if (producto.id === 2) { 
            //     productoDiv.innerHTML = `
            //         <div>
            //             <img src="${producto.img1}">
            //             <h2>${producto.nombre}</h2>
            //             <p class="precio">$${producto.precio}</p>
            //             <p>${producto.descripcion_larga}</p>
            //             <center><button onclick="verDetalle(${producto.id})">Hola</button></center> <!-- Botón original -->
            //         </div>
            //     `;
            // } else {
            //     productoDiv.innerHTML = `
            //         <div>
            //             <img src="${producto.img1}">
            //             <h2>${producto.nombre}</h2>
            //             <p class="precio">$${producto.precio}</p>
            //             <p>${producto.descripcion_larga}</p>
            //             <center><button onclick="verDetalle(${producto.id})">Ver producto</button></center>
            //         </div>
            //     `;
            // }

            productosDiv.appendChild(productoDiv);
        });
    })
    .catch(error => console.error('Error al cargar el archivo JSON:', error));

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