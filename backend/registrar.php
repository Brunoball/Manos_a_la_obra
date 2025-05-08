<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Manejar solicitud OPTIONS (preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include 'db.php'; // Asegúrate de que este archivo contiene la conexión a la base de datos

// Recibir datos JSON desde React
$data = json_decode(file_get_contents("php://input"), true);
$nombre = $data["nombre"] ?? '';
$email = $data["email"] ?? '';

if ($nombre && $email) {
    // Preparar y ejecutar la inserción
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
