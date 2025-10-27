import { useCrud } from "../data/store";
import { CLP } from "../utils/format";

export default function AdminServicios() {
  const { items, createItem, updateItem, removeItem } = useCrud("servicios");

  return (
    <div className="container py-4">
      <h1 className="h4 mb-3">Servicios (CRUD local)</h1>

      <button
        className="btn btn-success btn-sm mb-3"
        onClick={() => createItem({ sku: "", nombre: "Nuevo", categoria:"masajes", precio: 10000 }, { idField:"sku" })}
      >
        + Nuevo
      </button>

      <div className="table-responsive">
        <table className="table align-middle">
          <thead className="table-light">
            <tr>
              <th>SKU</th><th>Nombre</th><th>Precio</th><th></th>
            </tr>
          </thead>
          <tbody>
            {items.map(s => (
              <tr key={s.sku}>
                <td>{s.sku}</td>
                <td>{s.nombre}</td>
                <td>{CLP.format(s.precio || 0)}</td>
                <td className="text-end">
                  <button className="btn btn-outline-primary btn-sm me-2"
                    onClick={() => updateItem(s.sku, { precio: (s.precio||0) + 1000 }, { idField: "sku" })}>
                    +$1.000
                  </button>
                  <button className="btn btn-outline-danger btn-sm"
                    onClick={() => removeItem(s.sku, { idField: "sku" })}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
            {!items.length && <tr><td colSpan="4" className="text-center text-muted">Sin servicios.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
