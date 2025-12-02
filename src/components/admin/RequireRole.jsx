import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function RequireRole({ children, allowed }) {
  const { user } = useAuth();
  const location = useLocation();

  // Si no hay usuario, que lo mande a login igual que RequireAuth
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // rol que viene del backend: "ADMIN", "CLIENTE", etc.
  const rolActual = String(user.rol || user.role || "").toUpperCase();

  const allowedRoles = Array.isArray(allowed)
    ? allowed.map((r) => String(r).toUpperCase())
    : [String(allowed).toUpperCase()];

  // Si el rol no está permitido → lo mandamos al home (o a 403 si quieres)
  if (!allowedRoles.includes(rolActual)) {
    return <Navigate to="/" replace />;
  }

  // Si el rol sí está permitido, renderizamos el contenido
  return children;
}
