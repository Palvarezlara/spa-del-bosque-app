import { useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoginForm from '../components/auth/LoginForm';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const returnTo = params.get('returnTo') || '/';

  useEffect(() => { document.title = 'SPA del Bosque — Iniciar sesión'; }, []);

  const handleSubmit = async ({ email, pass, remember }) => {
    const res = await login(email, pass, remember);
    if (res.ok) navigate(returnTo, { replace: true });
    return res; 
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