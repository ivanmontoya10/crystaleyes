let productos = [];
let productosDestacados = [];

const verDetalle = (productoId) => {
    if (productoId) {
        const urlDetalle = `/crystaleyes/productos/producto${productoId}.html`;
        window.location.href = urlDetalle;
    } else {
        console.log("ID fallado", productoId);
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

            const productosDestacados = data.filter(producto => producto.destacado === "yes");

            const productosDiv = document.getElementById('productos-des');
            productosDiv.innerHTML = '';

            productosDestacados.forEach(producto => {
                const productoDiv = document.createElement('div');
                productoDiv.classList.add('producto-card-des');
                productoDiv.innerHTML = `
                <div class="producto-img">
                    <img src="/crystaleyes/imgs/${producto.img1}">
                </div>
                <div class="producto-info">
                    <h2>${producto.nombre}</h2>
                    <p class="precio-des">$${producto.precio} MXN</p>
                    <p>${producto.descripcion_larga}</p>
                    <div class="producto-btn">
                    <button onclick="verDetalle(${producto.id})">Ver producto</button>
                    </div>
                </div>
            `;
                //,'${}'
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
