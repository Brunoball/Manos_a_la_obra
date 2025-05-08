<?php
$servername = "localhost";  // Puede ser "127.0.0.1" también
$username = "root";         // Tu usuario de MySQL
$password = "Gastex2233";             // Tu contraseña de MySQL (si tienes una)
$dbname = "prueba_php_mysql";  // La base de datos que creaste

// Crear la conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}
echo "Conexión exitosa";
?>
