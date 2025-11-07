import { NavLink, Link, useLocation , useNavigate } from "react-router-dom";
import { useCart } from '../context/CartContext';
import {useAuth} from '../context/AuthContext';
import logo from '../assets/logo.webp';

export default function Navigation() {
  const { count } = useCart();     
  const {isLoggedIn, user, logout} = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const returnTo = encodeURIComponent(location.pathname + location.search);
          
  // Más adelante esto vendrá de un AuthContext (o localStorage).
  const usuario = null; // O un objeto { nombre: "Ana" }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        {/* Marca con logo */}
        <Link className="navbar-brand text-brand fw-semibold d-flex align-items-center" to="/">
          {logo && (
            <img
              src={logo}
              width="32"
              className="me-2 rounded align-text-bottom"
              alt="SPA del Bosque"
            />
          )}
          SPA del Bosque
        </Link>

        {/* Hamburguesa */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMain"
          aria-controls="navbarMain"
          aria-expanded="false"
          aria-label="Menú"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Contenido colapsable */}
        <div className="collapse navbar-collapse" id="navbarMain">
          {/* Links izquierda */}
          <ul className="navbar-nav me-lg-auto">
            <li className="nav-item">
              <NavLink to="/" end className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/servicios" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
                Servicios
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/blogs" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
                Blogs
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/nosotros" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
                Nosotros
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/contacto" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
                Contacto
              </NavLink>
            </li>
          </ul>

          {/* Acciones derecha (carrito + auth) */}
          <div className="d-flex align-items-center gap-2 mt-3 mt-lg-0" id="authArea">
            {/* Carrito: outline success + badge */}
            <NavLink
              to="/carrito"
              className={({ isActive }) =>
                "btn btn-outline-success position-relative" + (isActive ? " active" : "")
              }
            >
              
              <i className="bi bi-cart3 me-1" aria-hidden="true"></i>
              {count > 0 && (
                <span
                  id="cartCount"
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success badge-cart"
                >
                  {count}
                </span>
              )}
              <span className="visually-hidden">items en el carrito</span>
            </NavLink>

            {/* Botón Ingresar (si no hay sesión) o saludo + cerrar (si hay) */}
            {!isLoggedIn ? (
              <NavLink to={`/login?returnTo=${returnTo}`} className="btn btn-success">
                Ingresar
              </NavLink>
            ) : (
              <div className="dropdown">
                <button
                  className="btn btn-outline-success dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Hola, {user?.nombre?.split(" ")[0] || "Usuario"}
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <NavLink className="dropdown-item" to="/perfil">
                      Mi cuenta
                    </NavLink>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => {
                        logout();
                        navigate("/", { replace: true });
                      }}
                    >
                      Cerrar sesión
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}