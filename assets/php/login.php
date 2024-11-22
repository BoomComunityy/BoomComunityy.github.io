<?php

session_start();

$servidor = "Localhost";
$usuario = "root";
$clave = "";
$basededatos = "boom_login";

$enlace = mysqli_connect($servidor, $usuario, $clave, $basededatos);

if(isset($_POST['username']) && isset($_POST['email']) && isset($_POST['password'])){
    function validate($data){
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
    }

    $username = validate ($_POST['username']);
    $email = validate ($_POST['email']);
    $password = validate ($_POST['password']);

    if (empty($username)){
        header("Location: sing_up.php?error=El username es requerido");
        exit();
    } elseif (empty($email)){
        header("Location: sing_up.php?error=El email es requerido");
        exit();
    } elseif (empty($password)){
        header("Location: sing_up.php?error=El password es requerido");
        exit();
    } else {
        $password = md5($password);

        $Sql = "SELECT * FROM datos WHERE username = '$username' AND email = '$email' AND password = '$password'";
        $result = mysqli_query($enlace, $Sql);

        if (mysqli_num_rows($result) === 1) {
            $row = mysqli_fetch_assoc($result);
            if ($row['username'] === $username && $row['email'] === $email && $row['password'] === $password) {
                $_SESSION['username'] = $row['username']; 
                $_SESSION['Id'] = $row['Id']; 
                header("Location: index.html");  // Redirige a la página bienvenida.php
                exit();
            } else {
                header("Location: sing_up.php?error=Algún dato está incorrecto");
                exit();
            }
        } else {
            header("Location: sing_up.php?error=Algún dato está incorrecto");
            exit();
        }
    }
}
?>
