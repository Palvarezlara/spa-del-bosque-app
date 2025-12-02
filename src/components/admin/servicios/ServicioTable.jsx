export default function ServicioTable({ servicios, onEdit, onDelete }) {
  const lista = Array.isArray(servicios) ? servicios : [];

  if (!lista.length) {
    return <p className="text-muted">No hay servicios registrados.</p>;
  }

  return (
    <div className="table-responsive">
      <table className="table table-striped align-middle">
        <thead>
          <tr>
            <th>SKU</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Duración</th>
            <th>Estado</th>
            <th style={{ width: "120px" }}>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {lista.map((s) => (
            <tr key={s.id}>
              <td>{s.sku}</td>
              <td>{s.nombre}</td>
              <td>{s.categoria}</td>
              <td>${(s.precio ?? 0).toLocaleString("es-CL")}</td>
              <td>{s.duracionMin} min</td>
              <td>
                <span
                  className={
                    "badge " + (s.activo ? "bg-success" : "bg-secondary")
                  }
                >
                  {s.activo ? "ACTIVO" : "INACTIVO"}
                </span>
              </td>

              <td>
                <div className="btn-group btn-group-sm">
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => onEdit(s)}
                  >
                    <i className="bi bi-pencil" />
                  </button>

                  <button
                    className="btn btn-outline-danger"
                    onClick={() => onDelete(s.id)}
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
