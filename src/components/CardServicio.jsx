import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { showToast } from '../utils/toast';
import { CLP } from '../utils/formatters';


export default function CardServicio({ servicio, ...rest}) {
  const s = servicio ?? rest;
  if (!s || !s.sku) return null;

  const { sku, nombre, precio, img, categoria, duracionMin } = s;

  // Manejo de imagen
  const imgSrc = typeof img === 'string' ? img : (img?.default ?? '');

  const { addItem } = useCart();

  const handleAdd = () => {
      addItem({ sku, nombre, precio, img: imgSrc, categoria, duracionMin, qty: 1 });
      showToast(`Agregado: ${servicio.nombre}`, 'success');
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
          <p className="text-muted mb-2">{CLP.format(precio)}</p>
          <div className="d-grid gap-2 mt-auto">
            <Link to={`/servicio/${sku}`} className="btn btn-outline-success btn-sm">Ver detalle</Link>
            <button type="button" className="btn btn-outline-success btn-sm">Agendar</button>
            <button type="button" className="btn btn-success btn-sm" onClick={handleAdd}>Agregar</button>
          </div>
        </div>
      </div>
    </div>
  )
}
