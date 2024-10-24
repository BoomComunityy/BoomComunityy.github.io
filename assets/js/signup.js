document.getElementById('signUpForm').addEventListener('submit', function(event) {
  event.preventDefault();
  // Aquí podrías agregar la lógica para manejar el registro
  alert('Sign Up form submitted!');
});

document.getElementById('signup-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const birthdate = new Date(document.getElementById('birthdate').value);
  const today = new Date();
  const age = today.getFullYear() - birthdate.getFullYear();
  const month = today.getMonth() - birthdate.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < birthdate.getDate())) {
      age--;
  }
  if (age < 16) {
      alert('You must be at least 16 years old to register.');
      return;
  }
  window.location.href = "index.html";
});
function mostrarContrasena() {
  var x = document.getElementById("password");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}


function togglePasswordVisibility(id) {
  const passwordField = document.getElementById(id);
  const type = passwordField.type === "password" ? "text" : "password";
  passwordField.type = type;
}



function togglePasswordVisibility(id) {
const passwordField = document.getElementById(id);
const type = passwordField.type === "password" ? "text" : "password";
passwordField.type = type;
}

function validateForm() {
const username = document.getElementById('username').value;
const email = document.getElementById('email').value;
const password = document.getElementById('password').value;
const confirmPassword = document.getElementById('confirm_password').value;
const birthdate = document.getElementById('birthdate').value;
const termsAccepted = document.querySelector('input[name="terminos"]').checked;

const submitButton = document.getElementById('submitButton');

// Verificar si todos los campos están llenos
if (username && email && password && confirmPassword && birthdate && termsAccepted) {
  submitButton.style.backgroundColor = '#695dac'; // Cambiar al color del placeholder
  submitButton.disabled = false; // Activar el botón
} else {
  submitButton.style.backgroundColor = ''; // Volver al color predeterminado
  submitButton.disabled = true; // Desactivar el botón
}
}

// Agregar eventos de entrada para cada campo
document.querySelectorAll('.form-container input').forEach(input => {
input.addEventListener('input', validateForm);
});
