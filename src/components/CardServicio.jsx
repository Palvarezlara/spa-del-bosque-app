import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function CardServicio({ input}) {
  const s = input.servicio ?? input; 
  if (!s || !s.sku) return null;

  const { sku, nombre, precio, img, categoria, duracionMin } = s;

  // Manejo de imagen: si es URL o path, usar directamente; si es import, usar .default
  const imgSrc = typeof img === 'string' ? img : (img?.default ?? '');


  const precioCLP = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0
  }).format(precio)

  const { addItem } = useCart();

  const handleAdd = () => {
      addItem({ sku, nombre, precio, img: imgSrc, categoria, duracionMin, qty: 1 });
  };

  return (
    <div className="col-12 col-md-6 col-lg-3">
      <div className="card h-100 shadow-sm">
        <img
          src={`${img}`} 
          className="card-img-top"
          alt={nombre}
        />
        <div className="card-body d-flex flex-column">
          <h3 className="h6">{nombre} {duracionMin ? <i className="bi bi-clock"></i> : null}</h3>
          <p className="text-muted mb-2">{precioCLP}</p>
          <div className="d-grid gap-2 mt-auto">
            <Link to={`/producto/${sku}`} className="btn btn-outline-success btn-sm">Ver detalle</Link>
            <button type="button" className="btn btn-outline-success btn-sm">Agendar</button>
            <button type="button" className="btn btn-success btn-sm" onClick={handleAdd}>Agregar</button>
          </div>
        </div>
      </div>
    </div>
  )
}
