import React from "react";

function AdminDashboard() {
  // Por ahora son datos estáticos (dummy)
  const stats = {
    serviciosActivos: 8,
    usuariosRegistrados: 125,
    blogsPublicados: 12,
    reservasHoy: 5,
  };

  return (
    <section>
      <h2 className="h4 mb-4">Dashboard administrador</h2>
      <p className="text-muted mb-4">
        Resumen general del SPA del Bosque. Más adelante estos datos se
        conectarán al backend.
      </p>

      <div className="row g-3">
        <div className="col-12 col-md-6 col-lg-3">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">Servicios activos</h5>
              <p className="display-6 mb-0">{stats.serviciosActivos}</p>
              <small className="text-muted">Terapias disponibles en la web</small>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-3">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">Usuarios registrados</h5>
              <p className="display-6 mb-0">{stats.usuariosRegistrados}</p>
              <small className="text-muted">Clientes con cuenta activa</small>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-3">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">Blogs publicados</h5>
              <p className="display-6 mb-0">{stats.blogsPublicados}</p>
              <small className="text-muted">Artículos de bienestar y spa</small>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-3">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">Reservas hoy</h5>
              <p className="display-6 mb-0">{stats.reservasHoy}</p>
              <small className="text-muted">Citas agendadas para hoy</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AdminDashboard;
