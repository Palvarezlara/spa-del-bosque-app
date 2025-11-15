// components/admin/servicios/ServicioTable.jsx

export default function ServicioTable({ servicios, onEdit, onDelete }) {
  if (!servicios || servicios.length === 0) {
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
          {servicios.map((s) => (
            <tr key={s.id}>
              <td>{s.sku}</td>
              <td>{s.nombre}</td>
              <td>{s.categoria}</td>
              <td>${s.precio.toLocaleString("es-CL")}</td>
              <td>{s.duracion} min</td>
              <td>
                <span
                  className={
                    "badge " +
                    (s.estado === "activo" ? "bg-success" : "bg-secondary")
                  }
                >
                  {s.estado}
                </span>
              </td>

              <td>
                <div className="btn-group btn-group-sm">
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => onEdit(s)}
                  >
                    <i className="bi bi-pencil"></i>
                  </button>

                  <button
                    className="btn btn-outline-danger"
                    onClick={() => onDelete(s.id)}
                  >
                    <i className="bi bi-trash"></i>
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
