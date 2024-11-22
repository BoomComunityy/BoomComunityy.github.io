<?php

$servidor = "Localhost";
$usuario = "root";
$clave = "";
$basededatos = "boom_login";

$enlace = mysqli_connect($servidor, $usuario, $clave, $basededatos);

if(isset($_POST['Registrarse'])){

    $username = $_POST ['username'];
    $correo = $_POST ['email'];
    $contraseña = $_POST ['password'];
    $confirmarcontraseña = $_POST ['confirm_password'];
    $fechadenacimineto = $_POST ['birthdate'];

    if ($contraseña !== $confirmarcontraseña) {
        die("Las contraseñas no coinciden.");
    }
    
    $insertarDatos = "INSERT INTO datos (username, correo, contraseña, confirmar_contraseña, fecha_nacimiento) 
    VALUES ('$username','$correo', '$contraseña', '$confirmarcontraseña', '$fechadenacimineto')";
   
    $ejecutarInsertar = mysqli_query($enlace, $insertarDatos);

    if ($ejecutarInsertar) {
        // Redirige a una página HTML de éxito
        header("Location: index.html");
        exit(); // Asegúrate de detener el script después de la redirección
    } else {
        echo "Error al insertar datos: " . mysqli_error($enlace);
    }
    }
?>