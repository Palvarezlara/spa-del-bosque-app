
import { SERVICIOS } from '../data/data';
import CardServicio from '../components/CardServicio';


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
                <CardServicio key={serv.sku} servicio={serv} />
              ))}
             </div>
          </section>
        )
      })}
    </div>
  )
}
