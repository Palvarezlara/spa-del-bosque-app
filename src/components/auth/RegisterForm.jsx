import { useState } from 'react';
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import REGIONES_COMUNAS from '../../data/regiones';

export default function RegisterForm() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const [form, setForm] = useState({
  nombre: "",
  apellido: "",
  email: "",
  password: "",
  password2: "",
  telefono: "",
  region: "",
  comuna: ""
});

  const handleChange = (field) => (e) => {
  const value = e.target.value;

  setForm((prev) => ({
    ...prev,
    [field]: value,
    // Si cambia la región, limpiamos comuna
    ...(field === "region" ? { comuna: "" } : {}),
    }));
  };
  const comunasDisponibles = form.region
            ? REGIONES_COMUNAS[form.region]
            : [];


  const [err, setErr] = useState('');

  const onChange = (e) =>
    setForm(f => ({ ...f, [e.target.id]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { nombre, apellido, email, password, password2, telefono, region, comuna } = form;
    if (password !== password2) {
    setErr("Las contraseñas no coinciden.");
    return;
   }
    const payload = { nombres: nombre, apellidos: apellido, email, password, telefono, region, comuna };
    const res = await register(payload);

    if (!res.ok) {
      // muestra error (toast/alert)
      setErr(res.error || "No se pudo registrar.");
      return;
    }

        // guardar email para pre-fill en login
    sessionStorage.setItem("prefillEmail", email);

    
    const returnTo = params.get("returnTo") || "/perfil";

    // redirigir al login con mensaje de éxito
    navigate(`/login?registered=1&returnTo=${encodeURIComponent(returnTo)}`);
  };
 

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="mb-3">
        <label htmlFor="nombre" className="form-label">Nombres</label>
        <input id="nombre" className="form-control" required maxLength={50}
               value={form.nombre} onChange={onChange} />
      </div>

      <div className="mb-3">
        <label htmlFor="apellido" className="form-label">Apellidos</label>
        <input id="apellido" className="form-control" required maxLength={100}
               value={form.apellido} onChange={onChange} />
      </div>

      <div className="mb-3">
        <label htmlFor="email" className="form-label">Correo</label>
        <input id="email" type="email" className="form-control"
               placeholder="usuario@duoc.cl" required maxLength={100}
               value={form.email} onChange={onChange} />
        <div className="form-text">
          Dominios permitidos: @duoc.cl, @duocuc.cl, @profesor.duoc.cl, @gmail.com
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="password" className="form-label">Contraseña</label>
        <input id="password" type="password" className="form-control"
               required minLength={4} maxLength={10}
               value={form.password} onChange={onChange} />
      </div>

      <div className="mb-3">
        <label htmlFor="password2" className="form-label">Confirmar contraseña</label>
        <input id="password2" type="password" className="form-control"
               required minLength={4} maxLength={10}
               value={form.password2} onChange={onChange} />
      </div>

      <div className="mb-3">
        <label htmlFor="telefono" className="form-label">Teléfono</label>
        <input id="telefono" type="tel" className="form-control"
               placeholder="9 1234 5678"
               value={form.telefono} onChange={onChange} />
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="region" className="form-label">Región</label>
          <select
              id="region"
              className="form-select"
              value={form.region}
              onChange={handleChange("region")}
            >
              <option value="">Selecciona tu región</option>
              {Object.keys(REGIONES_COMUNAS).map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
          </select>

        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="comuna" className="form-label">Comuna</label>
              <select
                  id="comuna"
                  className="form-select"
                  value={form.comuna}
                  onChange={handleChange("comuna")}
                  disabled={!form.region}   // 👈 deshabilitado si no hay región
                >
                  <option value="">Selecciona tu comuna</option>
                  {comunasDisponibles.map((comuna) => (
                    <option key={comuna} value={comuna}>
                      {comuna}
                    </option>
                  ))}
              </select>

        </div>
      </div>

      {err && <div className="alert alert-danger py-2 small">{err}</div>}

      <button type="submit" className="btn btn-success w-100">Registrarse</button>
    </form>
  );
}
