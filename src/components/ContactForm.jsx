import { useEffect, useState } from "react";
import { showToast } from "../utils/toast";
import { useAuth } from "../context/AuthContext";

const NAME_RE = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ ]{2,}$/;
const isValidEmailDomain = (email) =>
  /^[\w.%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i.test(String(email));

export default function ContactForm() {
  const { user } = useAuth(); // si está logeado, prellenamos
  const [nombre, setNombre]   = useState("");
  const [email, setEmail]     = useState("");
  const [asunto, setAsunto]   = useState("");
  const [mensaje, setMensaje] = useState("");
  const [tyc, setTyc]         = useState(false);

  const [errors, setErrors]   = useState({});
  const [wasValidated, setWasValidated] = useState(false);

  useEffect(() => {
    if (user) {
      setNombre(user.nombre ?? "");
      setEmail(user.email ?? "");
    }
  }, [user]);

  const validate = () => {
    const e = {};

    if (!NAME_RE.test(nombre.trim())) e.nombre = "Ingresa solo letras y espacios (mín. 2 caracteres).";

    if (!email.trim() || !isValidEmailDomain(email)) {
      e.email = "Ingresa un correo válido (@duoc.cl, @profesor.duoc.cl o @gmail.com).";
    }

    if (!mensaje.trim()) e.mensaje = "Escribe tu mensaje (máximo 500 caracteres).";
    if (mensaje.length > 500) e.mensaje = "Máximo 500 caracteres.";

    if (!tyc) e.tyc = "Debes aceptar los términos.";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    setWasValidated(true);

    if (!validate()) return;

    // Persistimos para demo/traza
    try {
      const payload = {
        nombre: nombre.trim(),
        email: email.trim(),
        asunto: asunto.trim(),
        mensaje: mensaje.trim(),
        ts: new Date().toISOString(),
      };
      const prev = JSON.parse(localStorage.getItem("spa_contact_msgs") || "[]");
      prev.push(payload);
      localStorage.setItem("spa_contact_msgs", JSON.stringify(prev));
    } catch { /* noop */ }

    showToast("¡Mensaje enviado! Te contactaremos pronto.", "success");

    // Reset
    setNombre(user?.nombre ?? "");
    setEmail(user?.email ?? "");
    setAsunto("");
    setMensaje("");
    setTyc(false);
    setWasValidated(false);
    setErrors({});
  };

  return (
    <form noValidate onSubmit={handleSubmit} className={wasValidated ? "was-validated" : ""}>
      <div className="mb-3">
        <label className="form-label" htmlFor="nombre">Nombre</label>
        <input
          id="nombre"
          type="text"
          className={`form-control ${errors.nombre ? "is-invalid" : ""}`}
          placeholder="Tu nombre completo"
          maxLength={80}
          value={nombre}
          onChange={(e) => { setNombre(e.target.value); if (wasValidated) validate(); }}
          required
        />
        <div className="invalid-feedback">{errors.nombre}</div>
      </div>

      <div className="mb-3">
        <label className="form-label" htmlFor="email">Correo</label>
        <input
          id="email"
          type="email"
          className={`form-control ${errors.email ? "is-invalid" : ""}`}
          placeholder="usuario@duoc.cl"
          maxLength={100}
          value={email}
          onChange={(e) => { setEmail(e.target.value); if (wasValidated) validate(); }}
          required
        />
        <div className="invalid-feedback">{errors.email}</div>
      </div>

      <div className="mb-3">
        <label className="form-label" htmlFor="asunto">Asunto (opcional)</label>
        <input
          id="asunto"
          type="text"
          className="form-control"
          placeholder="Reserva, información, sugerencia…"
          maxLength={120}
          value={asunto}
          onChange={(e) => setAsunto(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label d-flex justify-content-between" htmlFor="mensaje">
          <span>Mensaje</span>
          <small className="text-muted">{mensaje.length}/500</small>
        </label>
        <textarea
          id="mensaje"
          className={`form-control ${errors.mensaje ? "is-invalid" : ""}`}
          rows={4}
          placeholder="Cuéntanos en qué podemos ayudarte"
          maxLength={500}
          value={mensaje}
          onChange={(e) => { setMensaje(e.target.value); if (wasValidated) validate(); }}
          required
        />
        <div className="invalid-feedback">{errors.mensaje}</div>
      </div>

      <div className="form-check mb-3">
        <input
          id="tyc"
          className={`form-check-input ${errors.tyc ? "is-invalid" : ""}`}
          type="checkbox"
          checked={tyc}
          onChange={(e) => { setTyc(e.target.checked); if (wasValidated) validate(); }}
          required
        />
        <label className="form-check-label" htmlFor="tyc">Acepto términos y condiciones.</label>
        <div className="invalid-feedback">{errors.tyc}</div>
      </div>

      <button type="submit" className="btn btn-success w-100">Enviar</button>
    </form>
  );
}
