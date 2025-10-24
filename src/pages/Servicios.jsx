import { useEffect, useState } from 'react';
import { getServicios } from '../data/api';
import { SERVICIOS as LOCAL_SERV } from '../data/data';
import CardServicio from '../components/CardServicio';
import CategoriaChips from '../components/CategoriaChips';

const CATEGORIAS = [
  { id: 'masajes', label: 'Masajes' },
  { id: 'corporales', label: 'Tratamientos corporales' },
  { id: 'circuitos', label: 'Circuitos de agua y sauna' },
  { id: 'individuales', label: 'Programas individuales' },
  { id: 'parejas', label: 'Programas en pareja' },
  { id: 'escapada-amigas', label: 'Escapada de amigas' },
];

const CLP = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0,
})

export default function Servicios() {
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showButton, setShowButton] = useState(false);
  

  useEffect(() => {
    getServicios()
      .then(data => setServicios(data.servicios ?? []))
      .catch(() => setServicios(LOCAL_SERV ?? [])) // Si no conecta con mockable usa datos locales
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
  const handleScroll = () => {
    if (window.scrollY > 300) setShowButton(true);
    else setShowButton(false);
  };
    window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);

  const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};  

  if (loading) return <div className="container py-4">Cargando servicios...</div>

  return (
    <div className="container py-4">
      <h1 className="h3 mb-4">Nuestros servicios</h1>
      <CategoriaChips categories={CATEGORIAS} />

      {/* Secciones por categoría */}
      {CATEGORIAS.map(cat => {
        const serviciosCat = servicios
          .filter(s => s.categoria === cat.id)

        return (
          <section key={cat.id} id={cat.id} className="mb-5 anchor-section">
            <h2 className="h5 mb-3">{cat.label}</h2>
            <div className="row g-3">
              {serviciosCat.map(serv => (
                <CardServicio key={serv.sku} servicio={serv} />
              ))}
            </div>
          </section>
        );
        
      })}
      {showButton && (
        <button
          className="btn btn-success position-fixed"
          style={{
            right: '1rem',
            bottom: '1rem',
            zIndex: 1030,
            boxShadow: '0 .25rem .75rem rgba(0,0,0,.2)',
            borderRadius: '50%',
            width: '2.5rem',
            height: '2.5rem',
            fontSize: '1.2rem',
          }}
          aria-label="Volver arriba"
          onClick={scrollToTop}
        >
          ↑
        </button>
      )}
    </div>
  )
}
