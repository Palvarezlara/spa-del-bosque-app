import React from 'react';
import { Link } from 'react-router-dom';
import masajesImg from '../assets/Categorias/Masajes.png';
import corporalesImg from '../assets/Categorias/corporales.png';
import circuitoSaunaImg from '../assets/Categorias/Circuito-Sauna.png';
import programaIndividualesImg from '../assets/Categorias/Programas-individuales.png';
import programaParejasImg from '../assets/categorias/Programas-en-pareja.png';
import escapadaAmigasImg from '../assets/categorias/EscapadaAmigas.png';



// Cada categoría tiene título, imagen y ancla 
const categorias = [
  { nombre: 'Masajes', img: masajesImg, id: 'masajes' },
  { nombre: 'Tratamientos corporales', img: corporalesImg , id: 'corporales' },
  { nombre: 'Circuitos de agua y sauna', img: circuitoSaunaImg , id: 'circuitos' },
  { nombre: 'Programas individuales', img: programaIndividualesImg , id: 'individuales' },
  { nombre: 'Programas en pareja', img: programaParejasImg , id: 'parejas' },
  { nombre: 'Escapada de Amigas', img: escapadaAmigasImg , id: 'escapada-amigas' },
]

export default function Categorias() {
  return (
    <>
      <section className="py-5 border-bottom">
        <div className="container">
          <header className="d-flex justify-content-between align-items-end mb-3">
            <h2 className="h4 mb-0">Categorías</h2>
            <Link to="/servicios" className="btn btn-outline-secondary btn-sm">
              Ver todos los servicios
            </Link>
          </header>

          <div className="row g-3">
            {categorias.map(({ id, nombre, img }) => (
              <div className="col-6 col-md-4 col-lg-3" key={id}>
                <Link to={`/servicios#${id}`} className="text-decoration-none">
                  <div className="card h-100 shadow-sm hover-card">
                    <img
                      src={img}
                      alt={nombre}
                      className="card-img-top"
                    />
                    <div className="card-body">
                      <h3 className="h6 m-0 text-center">{nombre}</h3>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
