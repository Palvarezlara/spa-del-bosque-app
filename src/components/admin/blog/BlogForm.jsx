import { useEffect, useState } from "react";

export default function BlogForm({ initialData, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    titulo: "",
    slug: "",
    categoria: "",
    autor: "",
    resumen: "",
    contenido: "",
    imagenUrl: "",
    estado: "borrador",
    destacado: false,
  });

  useEffect(() => {
  if (initialData) {
    // Modo edición
    setForm({
      titulo: initialData.titulo || "",
      slug: initialData.slug || "",
      categoria: initialData.categoria || "",
      autor: initialData.autor || "",
      resumen: initialData.resumen || "",
      contenido: initialData.contenido || "",
      imagenUrl: initialData.imagenUrl || "",
      estado: initialData.estado || "borrador",
      destacado: Boolean(initialData.destacado),
    });
  } else {
    // Modo creación: limpiar
    setForm({
      titulo: "",
      slug: "",
      categoria: "",
      autor: "",
      resumen: "",
      contenido: "",
      imagenUrl: "",
      estado: "borrador",
      destacado: false,
    });
  }
}, [initialData]);


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.titulo.trim() || !form.slug.trim()) {
      alert("Debes completar al menos título y slug.");
      return;
    }

    if (!form.resumen.trim()) {
      alert("Agrega un resumen corto para mostrar en las tarjetas.");
      return;
    }

    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="row g-3">
      <div className="col-md-6">
        <label className="form-label">Título</label>
        <input
          type="text"
          name="titulo"
          className="form-control"
          value={form.titulo}
          onChange={handleChange}
          placeholder="Ej: Beneficios de la aromaterapia"
          required
        />
      </div>

      <div className="col-md-6">
        <label className="form-label">Slug (URL)</label>
        <input
          type="text"
          name="slug"
          className="form-control"
          value={form.slug}
          onChange={handleChange}
          placeholder="beneficios-aromaterapia"
          required
        />
      </div>

      <div className="col-md-4">
        <label className="form-label">Categoría</label>
        <input
          type="text"
          name="categoria"
          className="form-control"
          value={form.categoria}
          onChange={handleChange}
          placeholder="Bienestar, Masajes, Facial..."
        />
      </div>

      <div className="col-md-4">
        <label className="form-label">Autor</label>
        <input
          type="text"
          name="autor"
          className="form-control"
          value={form.autor}
          onChange={handleChange}
          placeholder="Ej: Equipo SPA del Bosque"
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
          <option value="borrador">Borrador</option>
          <option value="publicado">Publicado</option>
        </select>
      </div>

      <div className="col-md-8">
        <label className="form-label">Resumen (para tarjeta)</label>
        <textarea
          name="resumen"
          className="form-control"
          rows={2}
          value={form.resumen}
          onChange={handleChange}
          placeholder="Resumen corto para mostrar en la lista de blogs..."
        />
      </div>

      <div className="col-md-4">
        <label className="form-label">Imagen principal (URL)</label>
        <input
          type="text"
          name="imagenUrl"
          className="form-control"
          value={form.imagenUrl}
          onChange={handleChange}
          placeholder="https://..."
        />
      </div>

      <div className="col-12">
        <label className="form-label">Contenido</label>
        <textarea
          name="contenido"
          className="form-control"
          rows={6}
          value={form.contenido}
          onChange={handleChange}
          placeholder="Contenido completo del artículo..."
        />
      </div>

      <div className="col-12 d-flex align-items-center gap-2">
        <div className="form-check">
          <input
            type="checkbox"
            id="destacado"
            name="destacado"
            className="form-check-input"
            checked={form.destacado}
            onChange={handleChange}
          />
          <label htmlFor="destacado" className="form-check-label">
            Destacar en portada
          </label>
        </div>
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
