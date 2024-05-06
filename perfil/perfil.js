// Función para mostrar/ocultar el modal de edición
function toggleModal() {
    var modal = document.getElementById('editModal');
    modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
}

// Funciones para actualizar la información del usuario
function updateUsername() {
    var username = document.getElementById('modal-username').value;
    console.log('Nombre de usuario actualizado a: ' + username);
}

function updateEmail() {
    var email = document.getElementById('modal-email').value;
    console.log('Correo electrónico actualizado a: ' + email);
}

function updatePhone() {
    var phone = document.getElementById('modal-phone').value;
    console.log('Teléfono actualizado a: ' + phone);
}

function updateAddress() {
    var address = document.getElementById('modal-address').value;
    console.log('Dirección actualizada a: ' + address);
}

// Función para manejar la edición de datos en el formulario del modal
function handleEditFormSubmit(event) {
    event.preventDefault(); // Previene el comportamiento por defecto del formulario (recarga de página)
    updateUsername();
    updateEmail();
    updatePhone();
    updateAddress();
    toggleModal(); // Cierra el modal después de la actualización
}

// Evento para manejar el envío del formulario
document.getElementById('editModal').addEventListener('submit', handleEditFormSubmit);
