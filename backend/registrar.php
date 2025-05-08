<?php
// Mostrar errores para debug
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Cabeceras necesarias para CORS y JSON
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Conexión a la base de datos
include 'db.php';

// Leer y decodificar los datos recibidos desde React
$data = json_decode(file_get_contents("php://input"), true);

// Validar y asignar datos
$nombre = $data["nombre"] ?? '';
$email = $data["email"] ?? '';

if ($nombre && $email) {
    $stmt = $conn->prepare("INSERT INTO usuarios (nombre, email) VALUES (?, ?)");
    $stmt->bind_param("ss", $nombre, $email);

    if ($stmt->execute()) {
        echo json_encode(["mensaje" => "Usuario registrado correctamente"]);
    } else {
        echo json_encode(["error" => "Error al registrar el usuario"]);
    }

    $stmt->close();
} else {
    echo json_encode(["error" => "Nombre y email son obligatorios"]);
}

$conn->close();
?>
