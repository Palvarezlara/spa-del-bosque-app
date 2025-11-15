
export default function UsuarioTable({
  usuarios,
  onEdit,
  onDelete,
  onToggleEstado,
}) {
  if (!usuarios || usuarios.length === 0) {
    return <p className="text-muted mb-0">No hay usuarios registrados.</p>;
  }

  return (
    <div className="table-responsive">
      <table className="table table-striped align-middle">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Estado</th>
            <th>Fecha registro</th>
            <th style={{ width: "180px" }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id}>
              <td>{u.nombre}</td>
              <td>{u.email}</td>
              <td>
                <span className="badge bg-info text-dark text-capitalize">
                  {u.rol}
                </span>
              </td>
              <td>
                <span
                  className={
                    "badge text-capitalize " +
                    (u.estado === "activo"
                      ? "bg-success"
                      : u.estado === "bloqueado"
                      ? "bg-danger"
                      : "bg-secondary")
                  }
                >
                  {u.estado}
                </span>
              </td>
              <td>{u.fechaRegistro || "-"}</td>
              <td>
                <div className="btn-group btn-group-sm" role="group">
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => onEdit(u)}
                    title="Editar usuario"
                  >
                    <i className="bi bi-pencil" />
                  </button>

                  <button
                    className="btn btn-outline-warning"
                    onClick={() => onToggleEstado(u)}
                    title={
                      u.estado === "activo"
                        ? "Marcar como inactivo"
                        : "Marcar como activo"
                    }
                  >
                    <i className="bi bi-shield-exclamation" />
                  </button>

                  <button
                    className="btn btn-outline-danger"
                    onClick={() => onDelete(u.id)}
                    title="Eliminar usuario"
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
