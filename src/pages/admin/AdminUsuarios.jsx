// src/pages/admin/AdminUsuarios.jsx
import { useEffect, useState } from "react";
import UsuarioForm from "../../components/admin/usuarios/UsuarioForm";
import UsuarioTable from "../../components/admin/usuarios/UsuarioTable";

export default function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usuarioEditando, setUsuarioEditando] = useState(null);
  const [error, setError] = useState(null);

  // Ajusta esta URL cuando el API-Gateway esté definido
  const API_URL = "http://localhost:7000/api/usuarios";

  // ====== Cargar usuarios (GET) ======
  const cargarUsuarios = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(API_URL);
      if (!res.ok) {
        throw new Error("No se pudo obtener la lista de usuarios");
      }

      const data = await res.json();
      setUsuarios(data);
    } catch (err) {
      console.error("Error cargando usuarios:", err);
      setError("Ocurrió un error al cargar los usuarios.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  // ====== Crear / Editar usuario (POST / PUT) ======
  const guardarUsuario = async (formData) => {
    try {
      setError(null);

      const esEdicion = Boolean(usuarioEditando);
      const url = esEdicion ? `${API_URL}/${usuarioEditando.id}` : API_URL;
      const metodo = esEdicion ? "PUT" : "POST";

      const res = await fetch(url, {
        method: metodo,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Error al guardar usuario");
      }

      // Recargar lista desde backend para mantener verdad única
      await cargarUsuarios();
      setUsuarioEditando(null);
    } catch (err) {
      console.error(err);
      setError("No se pudo guardar el usuario. Intenta nuevamente.");
    }
  };

  // ====== Eliminar usuario (DELETE) ======
  const eliminarUsuario = async (id) => {
    const confirmar = window.confirm(
      "¿Seguro que deseas eliminar este usuario? Esta acción no se puede deshacer."
    );
    if (!confirmar) return;

    try {
      setError(null);

      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Error al eliminar usuario");
      }

      await cargarUsuarios();
    } catch (err) {
      console.error(err);
      setError("No se pudo eliminar el usuario.");
    }
  };

  // ====== Cambiar estado (ej: activo ↔ inactivo) ======
  const toggleEstadoUsuario = async (usuario) => {
    const nuevoEstado =
      usuario.estado === "activo" ? "inactivo" : "activo";

    try {
      setError(null);

      const res = await fetch(`${API_URL}/${usuario.id}/estado`, {
        method: "PATCH", // o "PUT" según como lo diseñes en backend
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ estado: nuevoEstado }),
      });

      if (!res.ok) {
        throw new Error("Error al actualizar estado de usuario");
      }

      await cargarUsuarios();
    } catch (err) {
      console.error(err);
      setError("No se pudo actualizar el estado del usuario.");
    }
  };

  // ====== Reset formulario ======
  const cancelarEdicion = () => {
    setUsuarioEditando(null);
  };

  return (
    <section>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="h4 mb-0">Administrar usuarios</h2>
        <button
          className="btn btn-success"
          onClick={() => setUsuarioEditando(null)}
        >
          <i className="bi bi-person-plus me-2" />
          Nuevo usuario
        </button>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {/* Formulario */}
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h5 className="card-title mb-3">
            {usuarioEditando ? "Editar usuario" : "Crear nuevo usuario"}
          </h5>
          <UsuarioForm
            initialData={usuarioEditando}
            onSubmit={guardarUsuario}
            onCancel={cancelarEdicion}
          />
        </div>
      </div>

      {/* Tabla */}
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title mb-3">Listado de usuarios</h5>

          {loading ? (
            <p>Cargando usuarios...</p>
          ) : (
            <UsuarioTable
              usuarios={usuarios}
              onEdit={setUsuarioEditando}
              onDelete={eliminarUsuario}
              onToggleEstado={toggleEstadoUsuario}
            />
          )}
        </div>
      </div>
    </section>
  );
}
