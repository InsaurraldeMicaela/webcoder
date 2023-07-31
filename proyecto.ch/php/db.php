<?php


//config para acceder a la base de datos
function conn(){
    $hostname = "localhost";
    $usuariosdb= "root";
    $passworddb = "";
    $dbname = "proyecto.ch";

    //se genera la conexion con el servidor
    $conectar = mysqli_connect($hostname, $usuariosdb, $passworddb, $dbname);
    return $conectar;
}
?>