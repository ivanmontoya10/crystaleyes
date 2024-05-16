let productosCargados = false; // Variable para verificar si los productos ya se cargaron

document.addEventListener("DOMContentLoaded", () => {
    // Verificar si los productos ya se cargaron antes
    if (!productosCargados) {
        cargarProductos();
        productosCargados = true; // Marcar que los productos han sido cargados
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
        renderizarProductos(data);
    })
    .catch(error => console.error('Error al cargar el archivo JSON:', error));
};
// Variable para almacenar los productos filtrados
let productosFiltrados = [];
// Función para renderizar y ordenar los productos
const renderizarProductos = (productos) => {
    const params = new URLSearchParams(window.location.search);
    const query = params.get('query');
    const categoria = obtenerCategoriaActual();

    // Limpiar productos filtrados
    productosFiltrados = [];

    // Filtrar productos según la búsqueda
    if (query) {
        productosFiltrados = productos.filter(producto => {
            const nombreProducto = producto.nombre.toLowerCase().trim();
            const queryLowerCase = query.toLowerCase().trim();
            return nombreProducto.includes(queryLowerCase);
        });
    } else {
        // Si no hay consulta de búsqueda, mostrar todos los productos
        productosFiltrados = productos.slice();
    }

    // Filtrar productos según la categoría
    if (categoria) {
        productosFiltrados = productosFiltrados.filter(producto => producto.categoria === categoria);
    }

    // Renderizar productos
    const productosDiv = document.getElementById('productos');
    productosDiv.innerHTML = '';

    productosFiltrados.forEach(producto => {
        const productoDiv = crearCardProducto(producto);
        productosDiv.appendChild(productoDiv);
    });
};


// Función para obtener la categoría actual
const obtenerCategoriaActual = () => {
    const path = window.location.pathname;
    if (path.includes('oftalmico')) {
        return 'Oftálmico';
    } else if (path.includes('lentescontacto')) {
        return 'Contacto';
    } else if (path.includes('lentesol')) {
        return 'Sol';
    }
    // Si no se encuentra ninguna categoría específica, devuelve null
    return null;
};

// Función para crear una tarjeta de producto
const crearCardProducto = (producto) => {
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
    return productoDiv;
};

// Función para ordenar los productos
const ordenarProductos = () => {
    const selector = document.getElementById('ordenar');
    const criterio = selector.value;

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

    // Limpia y vuelve a renderizar los productos
    renderizarProductos(productosFiltrados);
};

// Event listener para el cambio en el selector de orden
const selectorOrden = document.getElementById('ordenar');
selectorOrden.addEventListener('change', ordenarProductos);

// Iniciar la carga de productos al cargar la página
cargarProductos();
