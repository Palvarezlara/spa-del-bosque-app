import { useState } from 'react';

export default function LoginForm({ onSubmit, defaultEmail = '' }) {
  const [email, setEmail] = useState(defaultEmail);
  const [pass, setPass] = useState('');
  const [remember, setRemember] = useState(true);
  const [show, setShow] = useState(false);
  const [err, setErr] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr('');
    if (!email || !pass) {
      setErr('Completa correo y contraseña');
      return;
    }
    const res = await onSubmit({ email, pass, remember });
    if (!res?.ok) {
      setErr(res?.error || 'Credenciales inválidas');
      setPass('');
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="mb-3">
        <label className="form-label">Correo</label>
        <input
          type="email"
          className="form-control"
          placeholder="nombre@correo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="username"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Contraseña</label>
        <div className="input-group">
          <input
            type={show ? 'text' : 'password'}
            className="form-control"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            required
            minLength={4}
            autoComplete="current-password"
          />
          <button
            type="button"
            className={`btn btn-outline-${show ? 'success' : 'secondary'}`}
            onClick={() => setShow(s => !s)}
            aria-label="Mostrar u ocultar contraseña"
          >
            <i className={`bi ${show ? 'bi-eye-slash' : 'bi-eye'}`} />
          </button>
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="form-check">
          <input
            id="remember"
            type="checkbox"
            className="form-check-input"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="remember">
            Recordarme
          </label>
        </div>
        <span className="small text-muted">¿Olvidaste tu contraseña?</span>
      </div>

      {err && <div className="alert alert-danger py-2 small">{err}</div>}

      <button className="btn btn-success w-100" type="submit">
        Ingresar
      </button>
    </form>
  );
}
