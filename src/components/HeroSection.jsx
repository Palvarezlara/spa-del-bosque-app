import React from 'react'
import { Link } from 'react-router-dom'

export default function HeroSection() {
  return (
    <header className="py-4 bg-light border-bottom">
      <div className="container">
        <div className="row align-items-center g-4">
          <div className="col-12 col-md-6">
            <h1 className="display-6 mb-2">Relajo y desconexión</h1>
            <p className="lead mb-3">
              <br />
              Descubra los espacios ideales para el descanso y la calma en Spa del Bosque.
              Contamos con el único circuito de aguas de la V Región, acondicionadas naturalmente a tres temperaturas.
              Un mágico lugar donde el silencio, la paz, las vertientes y la naturaleza son protagonistas.
              <br />
              <br />
              Explore nuestros servicios, masajes, tratamientos corporales y terapias de relajación que estimularán la
              concentración, salud y bienestar integralmente.
            </p>
            <Link to="/servicios" className="btn btn-success btn-lg">Ver servicios</Link>
          </div>
          <div className="col-12 col-md-6">
            <img 
            src="src\assets\categorias\sala-masajes.png" 
            className="img-fluid rounded shadow-sm"
            alt="Sala de terapias del SPA" />

          </div>
        </div>
      </div>
    </header>
  )
}
