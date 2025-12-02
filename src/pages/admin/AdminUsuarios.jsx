
import { useEffect, useState } from "react";
import UsuarioForm from "../../components/admin/usuarios/UsuarioForm";
import UsuarioTable from "../../components/admin/usuarios/UsuarioTable";
import {
  getUsuarios,
  createUsuario,
  updateUsuario,
  deleteUsuario,
  updateUsuarioRol,
  updateUsuarioEstado,
} from "../../api/userApi";
import { showToast } from "../../utils/toast";

export default function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usuarioEditando, setUsuarioEditando] = useState(null);
  const [error, setError] = useState(null);

  // =========================
  // Helpers
  // =========================
  const splitNombre = (fullName) => {
    const texto = (fullName || "").trim();
    if (!texto) return { nombres: "", apellidos: "" };

    const partes = texto.split(/\s+/);
    if (partes.length === 1) return { nombres: partes[0], apellidos: "" };

    return {
      nombres: partes.slice(0, -1).join(" "),
      apellidos: partes.slice(-1).join(" "),
    };
  };

  const resetForm = () => {
    setUsuarioEditando(null);
  };

  // =========================
  // Cargar usuarios (GET)
  // =========================
  const cargarUsuarios = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getUsuarios();

      const normalizados = (Array.isArray(data) ? data : []).map((u) => ({
      ...u,
      nombreCompleto: `${u.nombres ?? ""} ${u.apellidos ?? ""}`.trim(),
    }));
    
      setUsuarios(Array.isArray(data) ? data : []);
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

  // =========================
  // Crear / editar usuario
  // =========================
  const guardarUsuario = async (formData) => {
    try {
      setError(null);

      const nombreCompleto = formData.nombreCompleto ?? formData.nombre ?? "";
      const { nombres, apellidos } = splitNombre(nombreCompleto);
      const email = (formData.email || "").trim();
      const rol = (formData.rol || "CLIENTE").toUpperCase();
      const estado = (formData.estado || "ACTIVO").toUpperCase();

      if (!email || !nombreCompleto.trim()) {
        showToast("error", "Nombre y correo son obligatorios.");
        return;
      }

      if (!usuarioEditando) {
        // -------- CREAR (POST /register) --------
        let creado = await createUsuario({
          nombres,
          apellidos,
          email,
          password: "12345678", // password por defecto
          telefono: null,
          region: null,
          comuna: null,
          fechaNacimiento: null,
        });

        // Ajustar rol / estado si el admin eligió algo distinto
        if (rol && rol !== (creado.rol || "CLIENTE")) {
          creado = await updateUsuarioRol(creado.id, rol);
        }
        if (estado && estado !== (creado.estado || "ACTIVO")) {
          creado = await updateUsuarioEstado(creado.id, estado);
        }

        showToast(
          "success",
          "Usuario creado correctamente. Password por defecto: 12345678."
        );
      } else {
        // -------- EDITAR (PUT + PATCH) --------
        const id = usuarioEditando.id;
        const original = usuarios.find((u) => u.id === id) || {};

        let actualizado = await updateUsuario(id, {
          nombres,
          apellidos,
          telefono: original.telefono ?? null,
          region: original.region ?? null,
          comuna: original.comuna ?? null,
          fechaNacimiento: original.fechaNacimiento ?? null,
        });

        actualizado = await updateUsuarioRol(id, rol);
        actualizado = await updateUsuarioEstado(id, estado);

        showToast("success", "Usuario actualizado correctamente.");
      }

      resetForm();
      await cargarUsuarios();
    } catch (err) {
      console.error("Error guardando usuario:", err);
      setError("No se pudo guardar el usuario. Intenta nuevamente.");
    }
  };

  // =========================
  // Eliminar usuario
  // =========================
  const eliminarUsuario = async (id) => {
    const confirmar = window.confirm(
      "¿Seguro que deseas eliminar este usuario? Esta acción no se puede deshacer."
    );
    if (!confirmar) return;

    try {
      setError(null);

      await deleteUsuario(id);
      showToast("success", "Usuario eliminado correctamente.");
      await cargarUsuarios();
    } catch (err) {
      console.error(err);
      setError("No se pudo eliminar el usuario.");
    }
  };

  // =========================
  // Cambiar estado (ACTIVO / INACTIVO)
  // =========================
  const toggleEstadoUsuario = async (usuario) => {
    const estadoActual = (usuario.estado || "ACTIVO").toUpperCase();
    const nuevoEstado =
      estadoActual === "ACTIVO" ? "INACTIVO" : "ACTIVO";

    try {
      setError(null);

      await updateUsuarioEstado(usuario.id, nuevoEstado);
      showToast("success", "Estado actualizado correctamente.");
      await cargarUsuarios();
    } catch (err) {
      console.error(err);
      setError("No se pudo actualizar el estado del usuario.");
    }
  };

  // =========================
  // Reset formulario
  // =========================
  const cancelarEdicion = () => {
    resetForm();
  };

  // Para que el formulario reciba "nombre completo" ya combinado
  const initialFormData = usuarioEditando
    ? {
        ...usuarioEditando,
        nombreCompleto: `${usuarioEditando.nombres ?? ""} ${
          usuarioEditando.apellidos ?? ""
        }`.trim(),
      }
    : null;

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
            initialData={initialFormData}
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
