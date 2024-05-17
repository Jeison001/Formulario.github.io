// Importa la función viewproducts y deleteuser
import { viewproducts, deleteuser } from "../Controller/firebase.js";

// Captura el elemento vdata
const ver = document.getElementById('vdata');

async function cargar() {
    ver.innerHTML = '';
    const docref = await viewproducts(); // Espera a que se resuelva la promesa
    docref.forEach((doc) => {
        const data = doc.data(); // Obtiene todos los datos del documento
        // Crea una fila para cada documento con todos los campos de datos, incluyendo el User ID
        ver.innerHTML += `
            <tr>
                <td>${data.nombre}</td>
                <td>${data.apellido}</td>
                <td>${data.fecha}</td>
                <td>${data.cedula}</td>
                <td>${data.estado}</td>
                <td>${data.rh}</td>
                <td>${data.genero}</td>
                <td>${data.telefono}</td>
                <td>${data.direccion}</td>
                <td>${data.email}</td>
                <td>${doc.id}</td> 
                <td>${data.tipoCuenta}</td>
                <td>
                    <button type="button" class="btn btn-danger deleteUserBtn" data-bs-toggle="modal" data-bs-target="#deleteUserModal" data-userid="${doc.id}">Eliminar</button>
                </td>
            </tr>
        `;
    });



    // Escucha el evento submit del formulario de eliminación de usuario
    const deleteUserForm = document.getElementById('deleteUserForm');
    deleteUserForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Evita que el formulario se envíe por defecto
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        // Elimina al usuario
        const result = await deleteuser(email, password);

        if (result) {
            alert('Usuario eliminado correctamente');
            // Recarga la página para mostrar los cambios
            location.reload();
        } else {
            alert('Error al eliminar el usuario. Verifica el correo electrónico y la contraseña.');
        }
    });
}

// Escucha el evento DOMContentLoaded
window.addEventListener('DOMContentLoaded', async () => {
    await cargar(); // Espera a que se carguen los datos antes de renderizar
});
