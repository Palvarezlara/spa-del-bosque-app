
import { Link } from 'react-router-dom'
import { SERVICIOS } from '../data/data'


const CATEGORIAS = [
  { id: 'masajes', label: 'Masajes' },
  { id: 'corporales', label: 'Tratamientos corporales' },
  { id: 'circuitos', label: 'Circuitos de agua y sauna' },
  { id: 'individuales', label: 'Programas individuales' },
  { id: 'parejas', label: 'Programas en pareja' },
  { id: 'escapada-amigas', label: 'Escapada de amigas' },
]

const CLP = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0,
})

export default function Servicios() {
  return (
    <div className="container py-4">
      <h1 className="h3 mb-4">Nuestros servicios</h1>

      {/* Índice */}
      <nav className="mb-4 small">
        {CATEGORIAS.map(cat => (
          <a key={cat.id} href={`#${cat.id}`} className="mx-2">
            {cat.label}
          </a>
        ))}
      </nav>

      {/* Secciones por categoría */}
      {CATEGORIAS.map(cat => {
        const serviciosCat = SERVICIOS.filter(s => s.categoria === cat.id)

        return (
          <section key={cat.id} id={cat.id} className="mb-5 anchor-section">
            <h2 className="h5 mb-3">{cat.label}</h2>
            <div className="row g-3">
              {serviciosCat.map(serv => (
                <div key={serv.sku} className="col-12 col-md-6 col-lg-4">
                  <div className="card h-100 shadow-sm">
                    <img
                      src={serv.img}
                      alt={serv.nombre}
                      className="card-img-top"
                    />
                    <div className="card-body d-flex flex-column">
                      <h3 className="h6">
                        {serv.nombre}{' '}
                        {serv.duracionMin && (
                          <i className="bi bi-clock ms-1"></i>
                        )}
                      </h3>
                      <p className="text-muted mb-2">{CLP.format(serv.precio)}</p>
                      <div className="d-grid gap-2 mt-auto">
                        <Link
                          to={`/producto/${serv.sku}`}
                          className="btn btn-outline-success"
                        >
                          Ver detalle
                        </Link>
                        <button className="btn btn-success">Agregar</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
