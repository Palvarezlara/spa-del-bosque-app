// src/components/admin/AdminHeader.jsx
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function AdminHeader() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); // vuelves a la web pública
  };

  const displayName =
    user?.nombres ||
    user?.nombre ||
    user?.email ||
    "Admin";

  const displayRol = user?.rol || "ADMIN";

  return (
    <header className="admin-header d-flex justify-content-between align-items-center px-4 py-3 border-bottom bg-white">
      <h1 className="h4 m-0">Administración SPA del Bosque</h1>

      <div className="d-flex align-items-center gap-3">
        {/* Nombre y rol del usuario autenticado */}
        <span className="small text-muted">
          {displayName} ({displayRol})
        </span>

        {/* Atajo adicional para ir al sitio (opcional, pero útil) */}
        <Link to="/" className="btn btn-outline-success btn-sm">
          Ir al sitio web
        </Link>

        <button
          className="btn btn-sm btn-outline-danger"
          onClick={handleLogout}
        >
          Cerrar sesión
        </button>
      </div>
    </header>
  );
}

export default AdminHeader;

