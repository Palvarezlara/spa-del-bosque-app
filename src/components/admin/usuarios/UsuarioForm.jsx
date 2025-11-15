import { useEffect, useState } from "react";

export default function UsuarioForm({ initialData, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    rol: "cliente",
    estado: "activo",
  });

  // Rellenar formulario en modo edición
  useEffect(() => {
    if (initialData) {
      setForm({
        nombre: initialData.nombre || "",
        email: initialData.email || "",
        rol: initialData.rol || "cliente",
        estado: initialData.estado || "activo",
      });
    } else {
      setForm({
        nombre: "",
        email: "",
        rol: "cliente",
        estado: "activo",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.nombre.trim() || !form.email.trim()) {
      alert("Debes completar al menos nombre y email.");
      return;
    }

    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="row g-3">
      <div className="col-md-6">
        <label className="form-label">Nombre completo</label>
        <input
          type="text"
          name="nombre"
          className="form-control"
          value={form.nombre}
          onChange={handleChange}
          placeholder="Ej: Ana Pérez"
          required
        />
      </div>

      <div className="col-md-6">
        <label className="form-label">Email</label>
        <input
          type="email"
          name="email"
          className="form-control"
          value={form.email}
          onChange={handleChange}
          placeholder="correo@ejemplo.com"
          required
        />
      </div>

      <div className="col-md-4">
        <label className="form-label">Rol</label>
        <select
          name="rol"
          className="form-select"
          value={form.rol}
          onChange={handleChange}
        >
          <option value="cliente">Cliente</option>
          <option value="terapeuta">Terapeuta</option>
          <option value="admin">Administrador</option>
        </select>
      </div>

      <div className="col-md-4">
        <label className="form-label">Estado</label>
        <select
          name="estado"
          className="form-select"
          value={form.estado}
          onChange={handleChange}
        >
          <option value="activo">Activo</option>
          <option value="inactivo">Inactivo</option>
          <option value="bloqueado">Bloqueado</option>
        </select>
      </div>

      <div className="col-12 d-flex gap-2 mt-3">
        <button type="submit" className="btn btn-primary">
          Guardar
        </button>

        {onCancel && (
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={onCancel}
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
