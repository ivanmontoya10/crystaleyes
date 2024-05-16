let productos = [];

// Función para cargar y mostrar los productos
const cargarProductos = () => {
    fetch('http://localhost/crystaleyes/jsons/productos.json', {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
        productos = data;
        renderizarProductos();
    })
    .catch(error => console.error('Error al cargar el archivo JSON:', error));
};

// Función para renderizar y filtrar los productos
const renderizarProductos = () => {
    const params = new URLSearchParams(window.location.search);
    const query = params.get('query');
    const categoria = obtenerCategoriaActual();

    // Filtrar productos según la búsqueda
    let productosFiltrados = [];
    if (query) {
        const queryLowerCase = query.toLowerCase().trim();
        productosFiltrados = productos.filter(producto => 
            producto.nombre.toLowerCase().includes(queryLowerCase)
        );
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
            productos.sort((a, b) => a.precio - b.precio);
            break;
        case 'precio_desc':
            productos.sort((a, b) => b.precio - a.precio);
            break;
        case 'nombre_asc':
            productos.sort((a, b) => a.nombre.localeCompare(b.nombre));
            break;
        case 'nombre_desc':
            productos.sort((a, b) => b.nombre.localeCompare(a.nombre));
            break;
        default:
            break;
    }

    // Limpia y vuelve a renderizar los productos
    renderizarProductos();
};

// Event listener para el cambio en el selector de orden
const selectorOrden = document.getElementById('ordenar');
selectorOrden.addEventListener('change', ordenarProductos);

// Cargar los productos al inicio
cargarProductos();

