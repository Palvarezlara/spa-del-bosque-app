import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";


export default function LoginForm({ onSubmit, defaultEmail = '' }) {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState(""); 
  const [remember, setRemember] = useState(false);
  const [show, setShow] = useState(false);
  const [info, setInfo] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    const saved = sessionStorage.getItem("prefillEmail");
    if (saved) setEmail(saved);
    if (params.get("registered") === "1") 
      setInfo("Registro exitoso. Inicia sesión para continuar.");
  }, [params]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");

    const res = await login(email, pass, remember);  
    if (!res.ok) {
      setErr("Correo o contraseña incorrectos");
      return;
    }

    const returnTo = params.get("returnTo") || "/";
    sessionStorage.removeItem("prefillEmail");
    navigate(returnTo, { replace: true });
  };

  return (
    <form onSubmit={handleSubmit}  noValidate>
      {info && <div className="alert alert-success py-2 small">{info}</div>}
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
