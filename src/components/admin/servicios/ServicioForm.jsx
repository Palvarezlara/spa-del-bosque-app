import { useState, useEffect } from "react";

export default function ServicioForm({ onSubmit, initialData, onCancel }) {
  const [form, setForm] = useState({
    sku: "",
    nombre: "",
    categoria: "",
    precio: "",
    duracion: "",
    estado: "activo",
  });

  // Cuando initialData cambia → rellenar para modo edición
  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    } else {
      setForm({
        sku: "",
        nombre: "",
        categoria: "",
        precio: "",
        duracion: "",
        estado: "activo",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.sku || !form.nombre || !form.precio) {
      alert("Debes completar al menos SKU, Nombre y Precio.");
      return;
    }

    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="row g-3">
      <div className="col-md-4">
        <label className="form-label">SKU</label>
        <input
          name="sku"
          className="form-control"
          value={form.sku}
          onChange={handleChange}
          required
        />
      </div>

      <div className="col-md-8">
        <label className="form-label">Nombre</label>
        <input
          name="nombre"
          className="form-control"
          value={form.nombre}
          onChange={handleChange}
          required
        />
      </div>

      <div className="col-md-4">
        <label className="form-label">Categoría</label>
        <input
          name="categoria"
          className="form-control"
          value={form.categoria}
          onChange={handleChange}
        />
      </div>

      <div className="col-md-4">
        <label className="form-label">Precio (CLP)</label>
        <input
          type="number"
          name="precio"
          className="form-control"
          value={form.precero}
          onChange={handleChange}
          required
        />
      </div>

      <div className="col-md-4">
        <label className="form-label">Duración (min)</label>
        <input
          type="number"
          name="duracion"
          className="form-control"
          value={form.duracion}
          onChange={handleChange}
        />
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
        </select>
      </div>

      <div className="col-12 d-flex gap-2 mt-3">
        <button type="submit" className="btn btn-primary">
          Guardar
        </button>

        {onCancel && (
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
