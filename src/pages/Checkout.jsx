import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const CLP = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 });

export default function Checkout() {
    const { items, total, clear } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    // Formulario de datos de cliente / reserva
    const [form, setForm] = useState({
        telefono: user?.telefono || '',
        fechaPreferida: '',
        horarioPreferido: '',
        numeroPersonas: 1,
        comentarios: '',
    });

    const isEmpty = !items.length === 0;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: name === 'numeroPersonas' ? Number(value) : value,
        }));
    };

    const handlePay = async () => {
        if (isEmpty) return;
        setLoading(true);

        // Simula proceso de pago
        await new Promise(r => setTimeout(r, 1200));
        const success = Math.random() > 0.15; // Simula un 15% de probabilidad de fallo

        setLoading(false);

        const orderPayload = {
            total,
            itemsCount: items.length,
            orderId: `ORD-${Date.now().toString(36).toUpperCase().slice(-6)}`,
            reserva: {
                telefono: form.telefono,
                fechaPreferida: form.fechaPreferida || null,
                horarioPreferido: form.horarioPreferido || null,
                numeroPersonas: form.numeroPersonas || 1,
                comentarios: form.comentarios || null,
            },
        };

        if (success) {
            clear();
            navigate('/compra-exitosa', {
                replace: true,
                state: orderPayload,
            });
        } else {
            navigate('/compra-error', {
                replace: true,
                state:
                    { reason: 'No pudimos completar el pago / reserva (simulación).' }
            });
        }
    };

    return (
        <div className="container py-4">
            <h1 className="h3 mb-3">Checkout</h1>
            <p className="text-muted mb-4">
                {user ? (
                    <>
                        Comprador:{' '}
                        <strong>{user.nombre}</strong> ({user.email})
                    </>
                ) : (
                    'Debes iniciar sesión para completar la reserva.'
                )}
            </p>

            {isEmpty ? (
                <div className="alert alert-info">No tienes items en el carrito.</div>
            ) : (
                <>
                    <div className="table-responsive mb-3">
                        <table className="table align-middle">
                            <thead className="table-light">
                                <tr>
                                    <th>Servicio</th>
                                    <th className="text-end">Precio</th>
                                    <th className="text-center">Cantidad</th>
                                    <th className="text-end">Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map(it => {
                                    const qty = it.qty ?? 1;
                                    const subtotal = (it.precio ?? 0) * qty;
                                    return (
                                        <tr key={it.sku}>
                                            <td>
                                                <div className="fw-semibold">{it.nombre}</div>
                                                <div className="text-muted small">{it.sku}</div>
                                            </td>
                                            <td className="text-end">{CLP.format(it.precio ?? 0)}</td>
                                            <td className="text-center">{qty}</td>
                                            <td className="text-end">{CLP.format(subtotal)}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th className="text-end" colSpan={3}>Total</th>
                                    <th className="text-end">{CLP.format(total)}</th>
                                </tr>
                            </tfoot>
                        </table>
                    </div>

                    <div className="row g-4">
            {/* Información del cliente */}
            <div className="col-md-6">
              <div className="card border-soft">
                <div className="card-body">
                  <h2 className="h5 mb-3">Información del cliente</h2>
                  <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input
                      type="text"
                      className="form-control"
                      value={user?.nombre || ''}
                      disabled
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Correo</label>
                    <input
                      type="email"
                      className="form-control"
                      value={user?.email || ''}
                      disabled
                    />
                  </div>
                  <div className="mb-0">
                    <label className="form-label">Teléfono de contacto</label>
                    <input
                      type="tel"
                      className="form-control"
                      name="telefono"
                      placeholder="9 1234 5678"
                      value={form.telefono}
                      onChange={handleChange}
                    />
                    <div className="form-text">
                      Usaremos este número solo para coordinar tu reserva.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Preferencias de reserva */}
            <div className="col-md-6">
              <div className="card border-soft">
                <div className="card-body">
                  <h2 className="h5 mb-3">Preferencias de reserva</h2>

                  <div className="mb-3">
                    <label className="form-label">Fecha preferida</label>
                    <input
                      type="date"
                      className="form-control"
                      name="fechaPreferida"
                      value={form.fechaPreferida}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Horario aproximado</label>
                    <select
                      className="form-select"
                      name="horarioPreferido"
                      value={form.horarioPreferido}
                      onChange={handleChange}
                    >
                      <option value="">Selecciona un rango</option>
                      <option value="MANANA">Mañana (09:00 - 13:00)</option>
                      <option value="TARDE">Tarde (15:00 - 19:00)</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Número de personas</label>
                    <input
                      type="number"
                      min={1}
                      className="form-control"
                      name="numeroPersonas"
                      value={form.numeroPersonas}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-0">
                    <label className="form-label">Comentarios para el SPA (opcional)</label>
                    <textarea
                      className="form-control"
                      rows={3}
                      name="comentarios"
                      value={form.comentarios}
                      onChange={handleChange}
                      placeholder="Ej.: Prefiero terapeuta mujer, tengo lesión en el hombro derecho, etc."
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Botón de acción */}
          <div className="d-flex gap-2 justify-content-end mt-4">
            <button
              className="btn btn-success"
              onClick={handlePay}
              disabled={loading}
            >
              {loading ? 'Procesando…' : 'Pagar ahora / reservar (simulación)'}
            </button>
          </div>
        </>
      )}
    </div>
  );
}