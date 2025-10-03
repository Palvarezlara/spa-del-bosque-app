import React from 'react'
import { Link } from 'react-router-dom'

export default function CardServicio({ servicio }) {
  const { sku, nombre, precio, img, categoria, duracionMin } = servicio

  const precioCLP = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0
  }).format(precio)

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
            <button className="btn btn-outline-success btn-sm">Agendar</button>
            <button className="btn btn-success btn-sm">Agregar</button>
          </div>
        </div>
      </div>
    </div>
  )
}
