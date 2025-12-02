import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getServicios } from "../api/catalogApi";
import { useCart } from "../context/CartContext";
import ServiceBreadcrumb from "../components/Breadcrumb";
import ServiceMetaBar from "../components/ServiceMetaBar";
import ServiceSummaryCard from "../components/ServiceSummaryCard";
import RelatedServices from "../components/RelatedServices";

export default function ServicioDetalle() {
  const { sku } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [s, setS] = useState(undefined); // undefined = cargando, null = no encontrado

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        setLoading(true);
        const data = await getServicios();        // array
        if (!mounted) return;

        setServicios(data);
        const found = data.find(x => String(x.sku) === String(sku)) || null;
        setS(found);
      } catch (e) {
        console.error("Error cargando servicio:", e);
        if (!mounted) return;
        setS(null);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => { mounted = false; };
  }, [sku]);

  // Estado de carga
  if (loading || s === undefined) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-3 text-muted">Cargando servicio...</p>
      </div>
    );
  }

  // No encontrado
  if (!s) {
    return (
      <div className="container py-5 text-center">
        <h5 className="text-danger">Servicio no encontrado.</h5>
        <Link to="/servicios" className="btn btn-outline-success mt-3">
          ← Volver a servicios
        </Link>
      </div>
    );
  }

  const handleAdd = (item) => {
    addItem({
      sku: item.sku,
      nombre: item.nombre,
      precio: item.precio,
      qty: 1,
    });
  };

  const handleAgenda = () => {
    navigate("/carrito");
  };

  // Imagen: usar imageUrl del backend o img local si existe
  const imageSrc = s.imageUrl || s.img || null;

  return (
    <div className="container py-4">
      <ServiceBreadcrumb categoria={s.categoria} />

      <h1 className="h3 mb-1">{s.nombre}</h1>
      <ServiceMetaBar duracionMin={s.duracionMin} categoria={s.categoria} />

      <div className="row g-4 align-items-start mt-2">
        {/* Imagen principal */}
        <div className="col-12 col-lg-7">
          <div className="card border-0 shadow-sm">
            {imageSrc ? (
              <img
                src={imageSrc}
                alt={s.nombre}
                className="w-100 rounded"
                style={{ objectFit: "cover", maxHeight: "460px" }}
              />
            ) : (
              <div className="ratio ratio-16x9 bg-light rounded" />
            )}
          </div>
        </div>

        {/* Resumen / CTA */}
        <div className="col-12 col-lg-5">
          <ServiceSummaryCard
            s={s}
            onAdd={handleAdd}
            onAgenda={handleAgenda}
          />
        </div>
      </div>

      <RelatedServices all={servicios} actual={s} />
    </div>
  );
}
