import { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function CompraError() {
  const navigate = useNavigate();
  const { state } = useLocation(); // opcional: { reason }

  useEffect(() => {
    document.title = 'SPA del Bosque — Error en la reserva';
  }, []);

  return (
    <div className="container py-5">
      <div className="text-center mb-4">
        <div className="display-6 mb-2" role="img" aria-label="Error">
          ⚠️
        </div>
        <h1 className="h3">No pudimos completar tu pago / reserva</h1>
        <p className="text-muted">
          {state?.reason ||
            'Ocurrió un problema al procesar el pago simulado. Inténtalo nuevamente en unos minutos.'}
        </p>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card border-soft">
            <div className="card-body text-center">
              <p className="mb-4">
                Revisa tu conexión y vuelve a intentarlo. Si el problema persiste, contáctanos en{' '}
                <Link to="/contacto">Contacto</Link>.
              </p>
              <div className="d-flex gap-2 justify-content-center">
                <button className="btn btn-success" onClick={() => navigate(-1)}>
                  Reintentar
                </button>
                <Link className="btn btn-outline-success" to="/carrito">
                  Volver al carrito
                </Link>
                <Link className="btn btn-outline-secondary" to="/servicios">
                  Seguir agregando
                </Link>
              </div>
            </div>
          </div>
          <p className="text-center text-muted small mt-3">
            Consejo: limpia el carrito y vuelve a agregar los servicios si el error continúa.
          </p>
        </div>
      </div>
    </div>
  );
}

