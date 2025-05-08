import { useState } from "react";

export default function Formulario() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
  });
  const [mensaje, setMensaje] = useState({
    texto: "",
    tipo: "", // 'exito' o 'error'
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const enviarDatos = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMensaje({ texto: "", tipo: "" });

    try {
      const respuesta = await fetch("http://localhost:3001/registrar.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Verificar si la respuesta es JSON válido
      const texto = await respuesta.text();
      let data;

      try {
        data = texto ? JSON.parse(texto) : {};
      } catch (error) {
        console.error("Error al parsear JSON:", texto);
        throw new Error("Respuesta inválida del servidor");
      }

      if (!respuesta.ok) {
        throw new Error(data.error || "Error en la solicitud");
      }

      setMensaje({
        texto: data.mensaje || "Registro exitoso",
        tipo: "exito",
      });

      // Resetear formulario solo si fue exitoso
      setFormData({
        nombre: "",
        email: "",
      });
    } catch (error) {
      console.error("Error:", error);
      setMensaje({
        texto: error.message || "Error al conectar con el servidor",
        tipo: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "0 auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Registrar usuario
      </h2>

      <form
        onSubmit={enviarDatos}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <div>
          <label
            htmlFor="nombre"
            style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}
          >
            Nombre:
          </label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            placeholder="Ingrese su nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            minLength="2"
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "16px",
            }}
          />
        </div>

        <div>
          <label
            htmlFor="email"
            style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}
          >
            Email:
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Ingrese su email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "16px",
            }}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          style={{
            padding: "12px",
            backgroundColor: isLoading ? "#ccc" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: isLoading ? "not-allowed" : "pointer",
            fontSize: "16px",
            fontWeight: "500",
            transition: "background-color 0.3s",
            marginTop: "10px",
          }}
        >
          {isLoading ? "Enviando..." : "Registrar"}
        </button>
      </form>

      {mensaje.texto && (
        <div
          style={{
            marginTop: "20px",
            padding: "12px",
            backgroundColor: mensaje.tipo === "exito" ? "#d4edda" : "#f8d7da",
            color: mensaje.tipo === "exito" ? "#155724" : "#721c24",
            borderRadius: "4px",
            border: `1px solid ${
              mensaje.tipo === "exito" ? "#c3e6cb" : "#f5c6cb"
            }`,
            textAlign: "center",
          }}
        >
          {mensaje.texto}
        </div>
      )}
    </div>
  );
}
