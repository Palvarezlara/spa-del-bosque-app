// src/pages/BlogDetalle.jsx
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getBlogById, getBlogs } from '../api/blogApi';
import { formatCLDate } from '../utils/formatters';
import BlogContent from '../components/blog/BlogContent';

export default function BlogDetalle() {
  const { id } = useParams();
  const [post, setPost] = useState(undefined); // undefined = cargando, null = no existe
  const [otros, setOtros] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setPost(undefined);

    (async () => {
      try {
        const [p, lista] = await Promise.all([
          getBlogById(id),
          getBlogs(),
        ]);

        if (!mounted) return;

        setPost(p || null);

        const all = Array.isArray(lista) ? lista : lista?.blogs ?? [];
        const sugerencias = all
          .filter(o => String(o.id) !== String(id))
          .slice(0, 3);

        setOtros(sugerencias);
      } catch (err) {
        console.error(err);
        if (mounted) {
          setPost(null);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [id]);

  if (loading || post === undefined) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-3 text-muted">Cargando artículo...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container py-5 text-center">
        <h5 className="text-danger">Artículo no encontrado</h5>
        <Link to="/blogs" className="btn btn-outline-success mt-3">
          ← Volver al blog
        </Link>
      </div>
    );
  }

  const portada =
    post.imageUrl ||   // viene de la BD
    post.portada ||    // por compatibilidad con data local antigua
    null;
  const fecha = post.fechaPublicacion || post.fecha_publicacion || post.fecha || null;

  return (
    <>
      <header className="py-5 bg-light border-bottom">
        <div className="container">
          <Link to="/blogs" className="btn btn-outline-secondary btn-sm mb-3">
            ← Volver al blog
          </Link>
          <h1 className="h3 mb-1">{post.titulo}</h1>
          {fecha && (
            <p className="text-muted small mb-0">
              Por {post.autor || "SPA del Bosque"} — {formatCLDate(fecha)}
            </p>
          )}
        </div>
      </header>

      <main className="py-5">
        <div className="container">
          <div className="row g-5">
            {/* Columna principal */}
            <div className="col-12 col-lg-8">
              {portada && (
                <img
                  src={portada}
                  alt={post.titulo}
                  className="img-fluid rounded shadow-sm mb-4"
                  style={{ height: 420, objectFit: 'cover', width: '100%' }}
                />
              )}

              <article className="article-content">
                <BlogContent contenido={post.contenido} />
              </article>
            </div>

            {/* Columna lateral: Te puede interesar */}
            <aside className="col-12 col-lg-4">
              <h4 className="h6 mb-3">Te puede interesar</h4>

              {otros.map((o) => {
                const portadaO=
                o.imageUrl ||   // viene de la BD
                o.portada ||    // por compatibilidad con data local antigua
                null;
                return (
                  <div key={o.id} className="card mb-3 shadow-sm border-0">
                    {portadaO && (
                      <img
                        src={portadaO}
                        alt={o.titulo}
                        className="card-img-top"
                        style={{ height: 120, objectFit: 'cover' }}
                      />
                    )}
                    <div className="card-body p-2">
                      <h5 className="h6 mb-2">{o.titulo}</h5>
                      <Link
                        to={`/blog/${o.id}`}
                        className="stretched-link text-success small"
                      >
                        Leer más
                      </Link>
                    </div>
                  </div>
                );
              })}
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}
