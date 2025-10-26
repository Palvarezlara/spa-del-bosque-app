import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getServicios } from "../data/api";
import { useCart } from "../context/CartContext";
import {SERVICIOS as LOCAL_SERV} from "../data/data";
import ServiceBreadcrumb from "../components/Breadcrumb";
import ServiceMetaBar from "../components/ServiceMetaBar";
import ServiceSummaryCard from "../components/ServiceSummaryCard";
import RelatedServices from "../components/relacionados";
import { showToast } from "../utils/toast";

export default function ServicioDetalle() {
  const { sku } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [s, setS] = useState(undefined);

  useEffect(() => {
    let mounted = true;
    getServicios()
      .then(data => {
        if (!mounted) return;
        const list = data?.servicios ?? [];
        setServicios(list);
        setS(list.find(x => String(x.sku) === String(sku)) || null);
      })
      .catch(() => {
        if (!mounted) return;
        const list = LOCAL_SERV ?? [];
        setServicios(list);
        setS(list.find(x => String(x.sku) === String(sku)) || null);
      })
      .finally(() => setLoading(false));

    return () => { mounted = false };
  }, [sku]);

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
  addItem({ sku: item.sku, nombre: item.nombre, precio: item.precio, qty: 1 });

};
  const handleAgenda = () => {
    // proximamente aqui va la logica de agendar
    navigate("/carrito");
  };

  return (
    <div className="container py-4">
      <ServiceBreadcrumb categoria={s.categoria} />

     
      <h1 className="h3 mb-1">{s.nombre}</h1>
      <ServiceMetaBar duracionMin={s.duracionMin} categoria={s.categoria} />

      <div className="row g-4 align-items-start mt-2">
        {/* Galería / imagen */}
        <div className="col-12 col-lg-7">
          <div className="card border-0 shadow-sm">
            {s.img ? (
              <img src={s.img} alt={s.nombre} className="w-100 rounded" style={{ objectFit: "cover", maxHeight: "460px" }} />
            ) : (
              <div className="ratio ratio-16x9 bg-light rounded" />
            )}
          </div>
        </div>

        {/* Resumen y CTA (contiene nombre, precio y desc – no repetimos fuera) */}
        <div className="col-12 col-lg-5">
          <ServiceSummaryCard s={s} onAdd={handleAdd} onAgenda={handleAgenda} />
        </div>
      </div>

      <RelatedServices all={servicios} actual={s}/>
    </div>
  );
}