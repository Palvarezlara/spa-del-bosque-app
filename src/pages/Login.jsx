import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { loginMock } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const returnTo = params.get('returnTo') || '/';

  const handleMock = () => {
    loginMock({ nombre: 'Pamela', email: 'pamela@example.com' });
    navigate(returnTo, { replace: true });
  };

  return (
    <div className="container py-4">
      <h1 className="h3 mb-3">Login</h1>
      <p className="text-muted">Vista temporal para probar el flujo.</p>
      <button className="btn btn-success" onClick={handleMock}>Iniciar sesión (mock)</button>
    </div>
  );
}

