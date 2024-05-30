import { registerauth, verification, setregister } from './firebase.js';

const formulario = document.getElementById('LogUp-Form');
const boton = document.getElementById('rgsbtn');
const showPasswordButton = document.getElementById('show-password');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

async function register() {
    const nombres = formulario['edtnom'].value;
    const apellidos = formulario['edtape'].value;
    const fecha = formulario['edtfecha'].value;
    const cedula = formulario['edtcc'].value;
    const estado = formulario['edtstc'].value;
    const rh = formulario['edtrh'].value;
    const genero = formulario['edtgnr'].value;
    const telefono = formulario['edttlf'].value;
    const direccion = formulario['edtdirec'].value;
    const email = formulario['edtemail'].value;
    const psw = formulario['password'].value;
    const confirmEmail = formulario['confirmEmail'].value;
    const confirmPassword = formulario['confirmPassword'].value;
    const accountType = formulario['accountType'].value;

    if (!email || !psw || !confirmEmail || !confirmPassword || !accountType) {
        alert('Por favor completa todos los campos.');
        return;
    }

    if (!emailRegex.test(email) || !emailRegex.test(confirmEmail)) {
        alert('Por favor ingresa un correo electrónico válido.');
        return;
    }

    if (email !== confirmEmail) {
        alert('Los correos electrónicos no coinciden.');
        return;
    }

    if (psw !== confirmPassword) {
        alert('Las contraseñas no coinciden.');
        return;
    }

    if (!passwordRegex.test(psw)) {
        alert('La contraseña debe contener al menos 8 caracteres, incluyendo números, letras minúsculas y mayúsculas.');
        return;
    }

    try {
        const verificar = await registerauth(email, psw);
        
        await setregister(nombres, apellidos, fecha, cedula, estado, rh, genero, telefono, direccion, email, accountType);

        await verification();

        alert('Registro exitoso para ' + email + '. Correo de Verificación ha sido enviado.');
        formulario.reset();
    } catch (error) {
        alert('Error en el registro: ' + error.message);
    }
}

boton.addEventListener('click', async (e) => {
    e.preventDefault();
    await register();
});

showPasswordButton.addEventListener('click', () => {
    const passwordField = formulario['password'];
    const confirmPasswordField = formulario['confirmPassword'];
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        confirmPasswordField.type = 'text';
        showPasswordButton.textContent = 'Ocultar contraseña';
    } else {
        passwordField.type = 'password';
        confirmPasswordField.type = 'password';
        showPasswordButton.textContent = 'Mostrar contraseña';
    }
});
