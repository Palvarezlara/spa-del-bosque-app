import React from 'react'
import { SERVICIOS } from '../data/data'
import CardServicio from './CardServicio'

export default function ServiciosDestacados() {
  const destacados = SERVICIOS.filter(s =>
    ['BOSQUE60', 'PIED60', 'OLIVO90', 'RELAX60'].includes(s.sku)
  )

  return (
    <section className="py-5 border-bottom" id="destacados">
      <div className="container">
        <header className="d-flex justify-content-between align-items-end mb-3">
          <h2 className="h4 mb-0">Destacados</h2>
          <a href="/servicios" className="btn btn-outline-secondary btn-sm">Ver todos</a>
        </header>

        <div className="row g-4">
          {destacados.map(s => (
            <CardServicio key={s.sku} servicio={s} />
          ))}
        </div>
      </div>
    </section>
  )
}
