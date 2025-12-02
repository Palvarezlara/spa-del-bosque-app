import { NavLink, Link } from "react-router-dom";

function AdminSidebar() {
  return (
    <aside className="admin-sidebar d-flex flex-column p-3">
      <h2 className="fs-5 mb-4">Panel Admin</h2>

      <nav className="nav nav-pills flex-column">
        <NavLink to="/admin" end className="nav-link">
          Dashboard
        </NavLink>
        <NavLink to="/admin/servicios" className="nav-link">
          Servicios
        </NavLink>
        <NavLink to="/admin/usuarios" className="nav-link">
          Usuarios
        </NavLink>
        <NavLink to="/admin/blogs" className="nav-link">
          Blogs
        </NavLink>
        <NavLink to="/admin/reportes" className="nav-link">
          Reportes
        </NavLink>
      </nav>
      <div className="mt-auto">
        <Link to="/" className="btn btn-outline-success w-100 btn-sm">
          Ir al sitio web
        </Link>
      </div>
    </aside>
  );
}

export default AdminSidebar;
