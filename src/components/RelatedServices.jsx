import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CAT_LABEL, CLP } from '../utils/formatters';
import { showToast } from '../utils/toast';

export default function RelatedServices({ all =[], actual }) {
  const {addItem} = useCart();

  const relacionados = (all || [])
    .filter(x => x.categoria === actual?.categoria && x.sku !== actual?.sku)
    .slice(0, 3);

  if (!relacionados.length) return null;

  const handleAdd = (r) => {
    addItem({ sku: r.sku, nombre: r.nombre, precio: r.precio, img: r.img || r.imageUrl || null, qty: 1 });
    showToast(`Agregado: ${r.nombre}`, "success");
  };

  return (
    <section className="mt-5">
      <h3 className="h5 mb-3">También te puede interesar</h3>
      <div className="row g-3">
        {relacionados.map((r) => {
          const image = r.img || r.imageUrl;   // 👈 aquí el truco

          return (
            <div key={r.sku} className="col-12 col-md-6 col-lg-4">
              <div className="card h-100 hover-card">
                {image && (
                  <img
                    src={image}
                    alt={r.nombre}
                    className="card-img-top"
                    style={{ height: 200, objectFit: "cover" }}
                  />
                )}

                <div className="card-body d-flex flex-column">
                  <span className="badge rounded-pill bg-brand-soft text-brand mb-2">
                    {CAT_LABEL[r.categoria] || r.categoria}
                  </span>

                  <h4 className="h6 mb-1">{r.nombre}</h4>
                  <p className="text-muted mb-3">{CLP.format(r.precio)}</p>

                  <div className="mt-auto d-grid gap-2">
                    <Link
                      to={`/servicio/${encodeURIComponent(r.sku)}`}
                      className="btn btn-outline-success btn-sm"
                    >
                      Ver detalle
                    </Link>
                    <button
                      type="button"
                      className="btn btn-success btn-sm"
                      onClick={() => handleAdd(r)}
                    >
                      Agregar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}