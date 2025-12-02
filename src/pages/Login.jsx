import { useEffect } from 'react';
import { Link, useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoginForm from '../components/auth/LoginForm';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const returnTo = params.get('returnTo') || '/';
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  useEffect(() => { document.title = 'SPA del Bosque — Iniciar sesión'; }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // email/password del formulario
    const { ok, user, error } = await login(email, password, remember);

    if (!ok) {
      // mostrar error en pantalla
      setError(error);
      return;
    }

    const rol = String(user.rol || user.role || "").toUpperCase();

    if (rol === "ADMIN") {
      //si es admin, lo mandamos directo al panel
      navigate("/admin", { replace: true });
    } else {
      // si no, a la ruta original o al home
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="container" style={{ maxWidth: 520 }}>
      <h1 className="h3 mb-4 text-center">Ingresa a tu cuenta</h1>
      <div className="card shadow-sm">
        <div className="card-body">
          <LoginForm onSubmit={handleSubmit} />
          <hr className="my-4" />
          <p className="mb-0 small text-center">
            ¿No tienes una cuenta?{' '}
            <Link to={`/registro?returnTo=${encodeURIComponent(returnTo)}`}>Regístrate</Link>
          </p>
        </div>
      </div>
    </div>
  );
}