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

    const isEmpty = !items.length === 0;

    const handlePay = async () => {
        if (isEmpty) return;
        setLoading(true);

        // Simula proceso de pago
        await new Promise(r => setTimeout(r, 1200));
        const success = Math.random() > 0.85; // Simula un 15% de probabilidad de fallo

        setLoading(false);
        if (success) {
            clear();
            navigate('/compra-exitosa', {
                replace: true, state: {
                    total,
                    itemsCount: items.length,
                    orderId: `ORD-${Date.now().toString(36).toUpperCase().slice(-6)}`
                }
            });
        } else {
            navigate('/compra-error', { replace: true, state: 
                { reason: 'Transacción rechazada por el emisor.'} });
        }
    };
    return (
        <div className="container py-4">
            <h1 className="h3 mb-3">Checkout</h1>
            <p className="text-muted mb-4">
                {user ? <>Comprador: <strong>{user.nombre}</strong> ({user.email})</> : '—'}
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

                    <div className="d-flex gap-2 justify-content-end">
                        <button
                            className="btn btn-success"
                            onClick={handlePay}
                            disabled={loading}
                        >
                            {loading ? 'Procesando…' : 'Pagar ahora (simulación)'}
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}