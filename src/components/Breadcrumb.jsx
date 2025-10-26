import React from "react";
import { Link } from "react-router-dom";
import { CAT_LABEL} from '../utils/formatters';


// ─── Migas compactas: Home / Servicios / Categoría ───────────────────────
export default function ServiceBreadcrumb({ categoria }) {
  const label = CAT_LABEL[categoria] || categoria || "Servicios";
  return (
    <nav className="small mb-2" aria-label="breadcrumb">
      <ol className="breadcrumb mb-0">
        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
        <li className="breadcrumb-item"><Link to="/servicios">Servicios</Link></li>
        <li className="breadcrumb-item active" aria-current="page">{label}</li>
      </ol>
    </nav>
  );
}