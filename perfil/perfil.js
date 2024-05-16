// Función para mostrar/ocultar el modal de edición
function toggleModal() {
    var modal = document.getElementById('editModal');
    if (modal.style.display === 'block') {
        modal.style.display = 'none';
    } else {
        // Cargar los datos existentes en los campos del modal
        document.getElementById('modal-username').value = document.getElementById('nombre-usuario').innerText;
        document.getElementById('modal-email').value = document.getElementById('correo-usuario').innerText;
        document.getElementById('modal-phone').value = document.getElementById('telefono-usuario').innerText;
        document.getElementById('modal-address').value = document.getElementById('direccion-usuario').innerText;
        document.getElementById('modal-postal').value = document.getElementById('codigo-postal').innerText;
        document.getElementById('modal-birthday').value = document.getElementById('fecha-nacimiento').innerText;
        modal.style.display = 'block';
    }
}

// Funciones para actualizar la información del usuario
function updateUsername() {
    var username = document.getElementById('modal-username').value;
    document.getElementById('nombre-usuario').innerText = username;
}

function updateEmail() {
    var email = document.getElementById('modal-email').value;
    document.getElementById('correo-usuario').innerText = email;
}

function updatePhone() {
    var phone = document.getElementById('modal-phone').value;
    document.getElementById('telefono-usuario').innerText = phone;
}

function updateAddress() {
    var address = document.getElementById('modal-address').value;
    document.getElementById('direccion-usuario').innerText = address;
}

function updatePostal() {
    var postal = document.getElementById('modal-postal').value;
    document.getElementById('codigo-postal').innerText = postal;
}

function updateBirthday() {
    var birthday = document.getElementById('modal-birthday').value;
    document.getElementById('fecha-nacimiento').innerText = birthday;
}

// Función para manejar la edición de datos en el formulario del modal
function handleEditFormSubmit(event) {
    event.preventDefault(); // Previene el comportamiento por defecto del formulario (recarga de página)
    updateUsername();
    updateEmail();
    updatePhone();
    updateAddress();
    updatePostal();
    updateBirthday();
    toggleModal(); // Cierra el modal después de la actualización
}

// Evento para manejar el envío del formulario
document.getElementById('editForm').addEventListener('submit', handleEditFormSubmit);

// Función para cargar los datos del perfil desde el archivo JSON
function cargarDatosPerfil() {
    fetch('../jsons/datosPerfil.json')
        .then(response => response.json())
        .then(data => {
            document.getElementById('nombre-usuario').innerText = data.nombre;
            document.getElementById('correo-usuario').innerText = data.correo;
            document.getElementById('telefono-usuario').innerText = data.telefono;
            document.getElementById('direccion-usuario').innerText = data.direccion;
            document.getElementById('codigo-postal').innerText = data.codigo_postal;
            document.getElementById('fecha-nacimiento').innerText = data.fecha_nacimiento;
            document.getElementById('pais-region').innerText = data.pais_region;
        })
        .catch(error => console.error('Error al cargar los datos del perfil:', error));
}

// Función para cargar los datos del historial de pedidos desde el archivo JSON
function cargarHistorialPedidos() {
    fetch('../jsons/historialPedidos.json')
        .then(response => response.json())
        .then(data => {
            const tablaPedidos = document.getElementById('tabla-pedidos');
            data.forEach(pedido => {
                const fila = document.createElement('tr');
                fila.innerHTML = `
                    <td>${pedido.id}</td>
                    <td>${pedido.producto}</td>
                    <td>${pedido.descripcion}</td>
                    <td>${pedido.cantidad}</td>
                    <td>${pedido.total}</td>
                    <td>${pedido.fecha}</td>
                    <td>${pedido.estado_pago}</td>
                    <td>${pedido.estado_pedido}</td>
                `;
                tablaPedidos.appendChild(fila);
            });
        })
        .catch(error => console.error('Error al cargar el historial de pedidos:', error));
}

// Llamar a las funciones para cargar los datos del perfil y el historial de pedidos al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    cargarDatosPerfil();
    cargarHistorialPedidos();
});
