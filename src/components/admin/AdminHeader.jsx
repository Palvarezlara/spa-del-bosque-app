function AdminHeader() {
  return (
    <header className="admin-header d-flex justify-content-between align-items-center px-4 py-3 border-bottom">
      <h1 className="h4 m-0">Administración SPA del Bosque</h1>

      <div className="d-flex align-items-center gap-3">
        {/* Aquí luego puedes conectar AuthContext para mostrar el usuario real */}
        <span className="small text-muted">Admin (demo)</span>
        <button className="btn btn-sm btn-outline-secondary">
          Cerrar sesión
        </button>
      </div>
    </header>
  );
}

export default AdminHeader;
