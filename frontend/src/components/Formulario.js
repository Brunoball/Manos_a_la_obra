import { useState } from "react";

export default function Formulario() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");

  const enviarDatos = async (e) => {
    e.preventDefault();

    try {
      const respuesta = await fetch("http://localhost:3001/registrar.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre, email }),
      });

      const texto = await respuesta.text();
      console.log("Respuesta del servidor:", texto); // Debug útil

      const data = JSON.parse(texto);
      setMensaje(data.mensaje || data.error);
    } catch (error) {
      console.error("Error al enviar datos:", error);
      setMensaje("Error al conectar con el servidor");
    }

    setNombre("");
    setEmail("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Registrar usuario</h2>
      <form onSubmit={enviarDatos}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <br />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <button type="submit">Registrar</button>
      </form>
      <p>{mensaje}</p>
    </div>
  );
}
