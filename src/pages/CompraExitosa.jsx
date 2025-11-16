import { useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';

const CLP = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0,
});

export default function CompraExitosa() {
  const { state } = useLocation(); // { total, itemsCount, orderId, reserva? }

  useEffect(() => {
    document.title = 'SPA del Bosque — Reserva exitosa';
  }, []);

  const orderId = useMemo(() => {
    if (state?.orderId) return state.orderId;
    const t = Date.now().toString(36).toUpperCase();
    return `ORD-${t.slice(-6)}`;
  }, [state]);

  const reserva = state?.reserva;

  return (
    <div className="container py-5">
      <div className="text-center mb-4">
        <div className="display-6 mb-2" role="img" aria-label="Éxito">
          ✅
        </div>
        <h1 className="h3">¡Reserva registrada con éxito!</h1>
        <p className="text-muted mb-1">
          Gracias por confiar en <strong>SPA del Bosque</strong>.
        </p>
        <p className="text-muted">
          N.º de orden: <strong>{orderId}</strong>
        </p>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card border-soft">
            <div className="card-body">
              <ul className="list-unstyled mb-3">
                <li>
                  <span className="text-muted">Total pagado (simulado): </span>
                  <strong>
                    {state?.total != null ? CLP.format(state.total) : '—'}
                  </strong>
                </li>
                <li>
                  <span className="text-muted">Ítems: </span>
                  <strong>{state?.itemsCount ?? '—'}</strong>
                </li>
              </ul>

              {reserva && (
                <div className="mb-3">
                  <h2 className="h6">Preferencias de reserva</h2>
                  <ul className="list-unstyled mb-0 small">
                    {reserva.fechaPreferida && (
                      <li>
                        <span className="text-muted">Fecha preferida: </span>
                        <strong>{reserva.fechaPreferida}</strong>
                      </li>
                    )}
                    {reserva.horarioPreferido && (
                      <li>
                        <span className="text-muted">Horario: </span>
                        <strong>
                          {reserva.horarioPreferido === 'MANANA'
                            ? 'Mañana (09:00 - 13:00)'
                            : reserva.horarioPreferido === 'TARDE'
                            ? 'Tarde (15:00 - 19:00)'
                            : reserva.horarioPreferido}
                        </strong>
                      </li>
                    )}
                    {reserva.numeroPersonas && (
                      <li>
                        <span className="text-muted">Número de personas: </span>
                        <strong>{reserva.numeroPersonas}</strong>
                      </li>
                    )}
                    {reserva.comentarios && (
                      <li>
                        <span className="text-muted">Comentarios: </span>
                        <span>{reserva.comentarios}</span>
                      </li>
                    )}
                  </ul>
                </div>
              )}

              <p className="mb-4">
                Enviaremos un correo con el detalle de tu reserva/compra. Si necesitas
                reprogramar, contáctanos desde la sección{' '}
                <Link to="/contacto">Contacto</Link>.
              </p>

              <div className="d-flex gap-2 justify-content-center">
                <Link to="/" className="btn btn-outline-success">
                  Ir al inicio
                </Link>
                <Link to="/servicios" className="btn btn-success">
                  Seguir explorando servicios
                </Link>
              </div>
            </div>
          </div>
          <p className="text-center text-muted small mt-3">
            Si no ves tus reservas, actualiza la página o vuelve al inicio.
          </p>
        </div>
      </div>
    </div>
  );
}
