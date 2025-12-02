import { useEffect, useState } from 'react';
import { getServicios } from "../api/catalogApi";
import { SERVICIOS as LOCAL_SERV } from '../data/data';
import CardServicio from '../components/CardServicio';
import CategoriaChips from '../components/CategoriaChips';

const CATEGORIAS = [
  { id: 'masajes',           label: 'Masajes' },
  { id: 'corporales',        label: 'Tratamientos corporales' },
  { id: 'circuitos',         label: 'Circuitos de agua y sauna' },
  { id: 'individuales',      label: 'Programas individuales' },
  { id: 'parejas',           label: 'Programas en pareja' },
  { id: 'escapada-amigas',   label: 'Escapada de amigas' },
];

export default function Servicios() {
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showButton, setShowButton] = useState(false);

  // Cargar servicios desde backend (con fallback a LOCAL_SERV)
  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        setLoading(true);
        const data = await getServicios();      // data es un array
        if (!mounted) return;
        setServicios(data ?? []);
      } catch (e) {
        console.error("Error cargando servicios, usando LOCAL_SERV:", e);
        if (!mounted) return;
        setServicios(LOCAL_SERV ?? []);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => { mounted = false; };
  }, []);

  // Botón “volver arriba”
  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return <div className="container py-4">Cargando servicios...</div>;
  }

  return (
    <div className="container py-4">
      <h1 className="h3 mb-4">Nuestros servicios</h1>
      <CategoriaChips categories={CATEGORIAS} />

      {CATEGORIAS.map(cat => {
        const serviciosCat = servicios.filter(s => s.categoria === cat.id);

        if (!serviciosCat.length) return null;

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
  );
}
