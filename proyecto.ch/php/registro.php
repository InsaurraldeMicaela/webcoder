<?php


//recibo los datos del formulario
$nombre= $_POST['nombre'];
$mail= $_POST['mail'];
$telefono= $_POST['telefono'];
$web= $_POST['web'];
$comentario= $_POST['comentario'];

//texto plano
$header .= ¨content-type: text-plain¨;

//como me va a llegar el emial a mi
$mensaje = "este mail fue enviado por " . $nombre . ", \r\n"; //me genera saltos de lineas \r\n"
$mensaje .= "Su email es: " . $mail . " \r\n";
$mensaje .= "Su telefono es: " . $telefono ." \r\n";
$mensaje .= "Su web es: " . $web . " \r\n";
$mensaje .= "Su comentario: " .$_POST [$comentario] ." \r\n";
$mensaje .= "Enviado el: " . date('d/m/Y', time());  //para q me llegue hora y fecha de cuando me lo mandan

$para='insaurralde23a@hotmail.com';
$asunto='mensaje de mi sitio web';

//
mail($para, $asunto, utf8_decode($mensaje), $header);
//
header('Location:/index.html');

?>