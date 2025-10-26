import React from 'react';
import { Link } from 'react-router-dom';
import { CAT_LABEL, CLP } from '../utils/formatters';
import { showToast } from '../utils/toast';


// ─── Tarjeta de resumen y acciones ───────────────────────────────────────
export default function ServiceSummaryCard({ s, onAdd, onAgenda }) {
  const handleAdd = () => {
    onAdd?.(s);                     
    showToast(`Agregado: ${s.nombre}`, 'success');
  };
  const handleAgenda = () => {
    // proximamente aqui va la logica de agendar
    navigate("/carrito");
  };

  return (
    <div className="card h-100">
      <div className="card-body">
        {/* Chip categoría */}
        <span className="badge rounded-pill bg-brand-soft text-brand mb-2">
          {CAT_LABEL[s.categoria] || s.categoria}
        </span>

        {/* Nombre SOLO aquí */}
        <h2 className="h4 mb-2">{s.nombre}</h2>

        {/* Precio */}
        <div className="display-6 mb-3">{CLP.format(s.precio)}</div>

        {/* Descripción */}
        <p className="text-secondary">{s.descripcion || "Este servicio ofrece una experiencia de bienestar diseñada para relajar cuerpo y mente."}</p>

        {/* Acciones */}
        <div className="d-grid gap-2">
          <button className="btn btn-success d-flex justify-content-center align-items-center gap-2" onClick={handleAdd}>
            <i className="bi bi-cart3" /> Agregar
          </button>
          <button className="btn btn-outline-success d-flex justify-content-center align-items-center gap-2" onClick={handleAgenda}>
            <i className="bi bi-calendar-check" /> Agendar
          </button>
          <Link to="/servicios" className="btn btn-light">
            ← Volver a servicios
          </Link>
        </div>
      </div>
    </div>
  );
}