import { useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import RegisterForm from '../components/auth/RegisterForm';


export default function Registro() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const returnTo = params.get('returnTo') || '/';

  useEffect(() => { document.title = 'SPA del Bosque — Registro'; }, []);

  const handleSubmit = async (payload) => {
    const res = await register(payload);
    if (res.ok) navigate(returnTo, { replace: true });
    return res; 
  };

  return (
    <div className="container" style={{ maxWidth: 600 }}>
      <h1 className="h3 mb-4 text-center">Crea tu cuenta</h1>
      <div className="card shadow-sm">
        <div className="card-body">
          <RegisterForm onSubmit={handleSubmit} />
          <hr className="my-4" />
          <p className="mb-0 small text-center">
            ¿Ya tienes cuenta?{' '}
            <Link to={`/login?returnTo=${encodeURIComponent(returnTo)}`}>Ingresa aquí</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
