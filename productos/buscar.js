let productos = []; // Variable para almacenar los productos cargados

document.addEventListener("DOMContentLoaded", () => {
    // Verificar si los productos ya se cargaron antes
    if (productos.length === 0) {
        cargarProductos();
    }
});

// Función para cargar todos los productos
const cargarProductos = () => {
    fetch('http://localhost/crystaleyes/jsons/productos.json', {
        method: 'GET',
        credentials: 'include'
    })
        .then(response => response.json())
        .then(data => {
            productos = data;
            console.log('Productos cargados:', productos); // Verificar que los productos se carguen correctamente
            renderizarProductos();
        })
        .catch(error => console.error('Error al cargar el archivo JSON:', error));
};

const renderizarProductos = () => {
    const productosFiltrados = filtrarProductos();
    console.log('Productos filtrados:', productosFiltrados); // Verificar que los productos se filtren correctamente
    const productosOrdenados = ordenarProductos(productosFiltrados);

    const productosDiv = document.getElementById('productos-todos');
    const resultadosDiv = document.getElementById('resultados');

    productosDiv.innerHTML = '';

    if (productosOrdenados.length === 0) {
        resultadosDiv.innerHTML = '<p>No se encontraron productos.</p>';
    } else {
        resultadosDiv.innerHTML = `<p>Se encontraron ${productosOrdenados.length} productos.</p>`;
        productosOrdenados.forEach(producto => {
            const productoDiv = crearCardProducto(producto);
            productosDiv.appendChild(productoDiv);
        });
    }
};

const filtrarProductos = () => {
    const params = new URLSearchParams(window.location.search);
    const query = params.get('query');
    const categoria = obtenerCategoriaActual();

    let productosFiltrados = productos.slice(); // Copia de todos los productos

    if (query) {
        const queryLowerCase = query.toLowerCase().trim();
        productosFiltrados = productosFiltrados.filter(producto =>
            producto.nombre.toLowerCase().includes(queryLowerCase)
        );
    }

    if (categoria) {
        productosFiltrados = productosFiltrados.filter(producto => producto.categoria === categoria);
    }

    return productosFiltrados;
};

const ordenarProductos = (productosFiltrados) => {
    const selector = document.getElementById('ordenar');
    const criterio = selector ? selector.value : '';

    switch (criterio) {
        case 'precio_asc':
            productosFiltrados.sort((a, b) => a.precio - b.precio);
            break;
        case 'precio_desc':
            productosFiltrados.sort((a, b) => b.precio - a.precio);
            break;
        case 'nombre_asc':
            productosFiltrados.sort((a, b) => a.nombre.localeCompare(b.nombre));
            break;
        case 'nombre_desc':
            productosFiltrados.sort((a, b) => b.nombre.localeCompare(a.nombre));
            break;
        default:
            break;
    }

    return productosFiltrados;
};

const obtenerCategoriaActual = () => {
    const path = window.location.pathname;
    if (path.includes('oftalmico')) {
        return 'Oftálmico';
    } else if (path.includes('lentescontacto')) {
        return 'Contacto';
    } else if (path.includes('lentesol')) {
        return 'Sol';
    }
    return null;
};

// Función para crear una tarjeta de producto
const crearCardProducto = (producto) => {
    const productoDiv = document.createElement('div');
    //productoDiv.classList.add('producto-card');
    productoDiv.classList.add('producto-card-todos');
    productoDiv.innerHTML = `
        <!--<div>
            <img src="${producto.img1}">
            <h2>${producto.nombre}</h2>
            <p class="precio">$${producto.precio}</p>
            <p>${producto.descripcion_larga}</p>
            <center><button onclick="verDetalle(${producto.id})">Ver producto</button></center>
        </div>-->
        
        <div class="producto-img">
            <img src="/crystaleyes/imgs/${producto.img1}">
        </div>
        <div class="producto-info">
            <h2>${producto.nombre}</h2>
            <p class="precio-des">$${producto.precio} MXN</p>
            <p>${producto.descripcion_larga}</p>
            <div class="producto-btn">
                <center><button onclick="verDetalle(${producto.id})">Ver producto</button></center>
            </div>
        </div>

    `;
    return productoDiv;
};

// Event listener para el cambio de orden
const selectorOrden = document.getElementById('ordenar');
if (selectorOrden) {
    selectorOrden.addEventListener('change', () => {
        renderizarProductos();
    });
}

// Event listener para el formulario de búsqueda
const searchForm = document.querySelector('.search-form');
searchForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevenir el envío del formulario por defecto

    const formData = new FormData(searchForm);
    const query = formData.get('query');

    if (query) {
        const url = `/crystaleyes/productos/busqueda.html?query=${encodeURIComponent(query)}`;
        history.pushState(null, '', url);
    } else {
        history.pushState(null, '', '/crystaleyes/productos/busqueda.html');
    }

    renderizarProductos();
});

// Función para ver detalle del producto
const verDetalle = (id) => {
    console.log(`Ver detalle del producto con ID: ${id}`);
    // Lógica para mostrar el detalle del producto
};
