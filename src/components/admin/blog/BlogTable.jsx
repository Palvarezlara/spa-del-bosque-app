export default function BlogTable({
  blogs,
  onEdit,
  onDelete,
  onToggleEstado,
  onToggleDestacado,
}) {
  if (!blogs || blogs.length === 0) {
    return <p className="text-muted mb-0">No hay blogs registrados.</p>;
  }

  return (
    <div className="table-responsive">
      <table className="table table-striped align-middle">
        <thead>
          <tr>
            <th>Título</th>
            <th>Categoría</th>
            <th>Autor</th>
            <th>Estado</th>
            <th>Destacado</th>
            <th>Fecha publicación</th>
            <th style={{ width: "220px" }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((b) => (
            <tr key={b.id}>
              <td>{b.titulo}</td>
              <td>{b.categoria || "-"}</td>
              <td>{b.autor || "-"}</td>
              <td>
                <span
                  className={
                    "badge text-capitalize " +
                    (b.estado === "publicado" ? "bg-success" : "bg-secondary")
                  }
                >
                  {b.estado}
                </span>
              </td>
              <td>
                {b.destacado ? (
                  <span className="badge bg-warning text-dark">Sí</span>
                ) : (
                  <span className="badge bg-light text-muted">No</span>
                )}
              </td>
              <td>{b.fechaPublicacion ? b.fechaPublicacion.slice(0, 10) : "-"}</td>
              <td>
                <div className="btn-group btn-group-sm" role="group">
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => onEdit(b)}
                    title="Editar"
                  >
                    <i className="bi bi-pencil" />
                  </button>

                  <button
                    className="btn btn-outline-success"
                    onClick={() => onToggleEstado(b)}
                    title={
                      b.estado === "publicado"
                        ? "Pasar a borrador"
                        : "Publicar"
                    }
                  >
                    <i className="bi bi-megaphone" />
                  </button>

                  <button
                    className="btn btn-outline-warning"
                    onClick={() => onToggleDestacado(b)}
                    title={
                      b.destacado
                        ? "Quitar de destacados"
                        : "Marcar como destacado"
                    }
                  >
                    <i className="bi bi-star" />
                  </button>

                  <button
                    className="btn btn-outline-danger"
                    onClick={() => onDelete(b.id)}
                    title="Eliminar"
                  >
                    <i className="bi bi-trash" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
