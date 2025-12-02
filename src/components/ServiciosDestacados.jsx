// src/components/ServiciosDestacados.jsx
import { useEffect, useState } from "react";
import CardServicio from "./CardServicio";
import { getServicios } from "../api/catalogApi";

const DEST_SKUS = ["BOSQUE60", "PIED60", "OLIVO90", "RELAX60"];

export default function ServiciosDestacados() {
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await getServicios();
        setServicios(data);
      } catch (e) {
        console.error("Error cargando servicios destacados", e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const destacados = servicios.filter((s) => DEST_SKUS.includes(s.sku));

  return (
    <section className="py-5 border-bottom" id="destacados">
      <div className="container">
        <header className="d-flex justify-content-between align-items-end mb-3">
          <h2 className="h4 mb-0">Destacados</h2>
          <a href="/servicios" className="btn btn-outline-secondary btn-sm">
            Ver todos
          </a>
        </header>

        {loading ? (
          <p>Cargando servicios...</p>
        ) : (
          <div className="row g-4">
            {destacados.map((s) => (
              <CardServicio key={s.sku} servicio={s} />
            ))}
            {!destacados.length && (
              <p className="text-muted">
                Por ahora no hay destacados configurados.
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

