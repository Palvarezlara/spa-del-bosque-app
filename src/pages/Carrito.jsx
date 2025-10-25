import { useEffect } from 'react';
import { useCart } from '../context/CartContext'; 
import { Link } from 'react-router-dom';

const CLP = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0,
});


function showToast(msg, variant = 'success') {
  const areaId = 'toastArea';
  let area = document.getElementById(areaId);
  if (!area) {
    area = document.createElement('div');
    area.id = areaId;
    area.className = 'toast-container position-fixed bottom-0 end-0 p-3';
    document.body.appendChild(area);
  }

  const el = document.createElement('div');
  el.className = `toast align-items-center text-bg-${variant} border-0`;
  el.setAttribute('role', 'status');
  el.setAttribute('aria-live', 'polite');
  el.setAttribute('aria-atomic', 'true');
  el.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">${msg}</div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Cerrar"></button>
    </div>
  `;
  area.appendChild(el);


  if (window.bootstrap?.Toast) {
    const toast = new window.bootstrap.Toast(el, { delay: 1600 });
    toast.show();
    el.addEventListener('hidden.bs.toast', () => el.remove());
  }
}

export default function Carrito() {
  const { items, inc, dec, removeBySku, clear, total } = useCart();

  useEffect(() => {
    document.title = 'SPA del Bosque — Carrito';
  }, []);

  const isEmpty = items.length === 0;

  const handleInc = (sku) => {
    inc(sku);
  };

  const handleDec = (sku) => {
    dec(sku);
  };

  const handleRemove = (sku, nombre) => {
    removeBySku(sku);
    showToast(`Eliminado: ${nombre}`, 'warning');
  };

  const handleClear = () => {
    if (!confirm('¿Vaciar el carrito?')) return;
    clear();
    showToast('Carrito vaciado', 'secondary');
  };

  return (
    <div className="container py-4">
      <h1 className="h3 mb-4">Tu Carrito</h1>

      {/* Estado vacío */}
      {isEmpty && (
        <div className="alert alert-info">
          Tu carrito está vacío. <Link to="/servicios" className="alert-link">Servicios</Link> para agregar terapias.
        </div>
      )}

      {/* Tabla */}
      {!isEmpty && (
        <div className="table-responsive">
          <table className="table align-middle">
            <thead className="table-light">
              <tr>
                <th>Servicio</th>
                <th className="text-end">Precio</th>
                <th className="text-center">Cantidad</th>
                <th className="text-end">Subtotal</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {items.map((it) => {
                const qty = it.qty ?? 1;
                const subtotal = (it.precio ?? 0) * qty;
                return (
                  <tr key={it.sku}>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <div>
                          <div className="fw-semibold">{it.nombre}</div>
                          <div className="text-muted small">{it.sku}</div>
                        </div>
                      </div>
                    </td>
                    <td className="text-end">{CLP.format(it.precio ?? 0)}</td>
                    <td className="text-center">
                      <div className="btn-group" role="group" aria-label={`Cantidad ${it.nombre}`}>
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          title="Disminuir"
                          onClick={() => handleDec(it.sku)}
                        >
                          –
                        </button>
                        <span className="px-3">{qty}</span>
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          title="Aumentar"
                          onClick={() => handleInc(it.sku)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="text-end">{CLP.format(subtotal)}</td>
                    <td className="text-center">
                      <button
                        className="btn btn-outline-danger btn-sm"
                        title="Eliminar"
                        onClick={() => handleRemove(it.sku, it.nombre)}
                      >
                        <i className="bi bi-trash"></i>
                        <span className="ms-1 d-none d-md-inline">Eliminar</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <th className="text-end" colSpan={3}>Total</th>
                <th className="text-end"><span>{CLP.format(total)}</span></th>
                <th></th>
              </tr>
            </tfoot>
          </table>
        </div>
      )}

      {/* Acciones */}
      <div className="d-flex gap-2 justify-content-end">
        <Link className="btn btn-outline-secondary" to="/servicios">
          Seguir agregando servicios
        </Link>
        <button className="btn btn-outline-secondary" onClick={handleClear} disabled={isEmpty}>
          Vaciar carrito
        </button>
       
        <Link className={`btn btn-success ${isEmpty ? 'disabled' : ''}`} to={isEmpty ? '#' : '/checkout'}>
          Proceder a Pagar
        </Link>
      </div>
    </div>
  );
}




