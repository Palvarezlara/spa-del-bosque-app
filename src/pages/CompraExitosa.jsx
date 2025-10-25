import { useEffect, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const CLP = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0,
});

export default function CompraExitosa() {
  const { state } = useLocation(); // opcional: { total, itemsCount, orderId }
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'SPA del Bosque — Compra exitosa';
  }, []);

  // Genera un ID cuando no venga por state
  const orderId = useMemo(() => {
    if (state?.orderId) return state.orderId;
    // fallback: AAA999 a partir de fecha (simple y legible)
    const t = Date.now().toString(36).toUpperCase();
    return `ORD-${t.slice(-6)}`;
  }, [state]);

  // (Opcional) auto-redirección a /servicios después de 8s
  // useEffect(() => {
  //   const id = setTimeout(() => navigate('/servicios'), 8000);
  //   return () => clearTimeout(id);
  // }, [navigate]);

  return (
    <div className="container py-5">
      <div className="text-center mb-4">
        <div className="display-6 mb-2" role="img" aria-label="Éxito">✅</div>
        <h1 className="h3">¡Compra realizada con éxito!</h1>
        <p className="text-muted mb-1">Gracias por confiar en <strong>SPA del Bosque</strong>.</p>
        <p className="text-muted">N° de orden: <strong>{orderId}</strong></p>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card border-soft">
            <div className="card-body">
              <ul className="list-unstyled mb-3">
                <li>
                  <span className="text-muted">Total pagado: </span>
                  <strong>{state?.total != null ? CLP.format(state.total) : '—'}</strong>
                </li>
                <li>
                  <span className="text-muted">Ítems: </span>
                  <strong>{state?.itemsCount ?? '—'}</strong>
                </li>
              </ul>
              <p className="mb-4">
                Enviaremos un correo con el detalle de tu reserva/compra. Si necesitas reprogramar,
                contáctanos desde la sección <Link to="/contacto">Contacto</Link>.
              </p>

              <div className="d-flex gap-2 justify-content-center">
                <Link to="/" className="btn btn-outline-success">Ir al inicio</Link>
                <Link to="/servicios" className="btn btn-success">Seguir explorando servicios</Link>
              </div>
            </div>
          </div>
          <p className="text-center text-muted small mt-3">
            Si no ves tus compras, actualiza la página o vuelve al inicio.
          </p>
        </div>
      </div>
    </div>
  );
}
// Nota: este componente asume que la compra fue exitosa.