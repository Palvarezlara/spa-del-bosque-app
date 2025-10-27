import { Link, useParams } from 'react-router-dom';
import { blogGetById, blogList } from '../data/blogs';
import { formatCLDate } from '../utils/formatters';
import BlogContent from '../components/blog/BlogContent';

export default function BlogDetalle() {
  const { id } = useParams();
  const post = blogGetById(id);

  if (!post) {
    return (
      <div className="container py-5 text-center">
        <h5 className="text-danger">Artículo no encontrado</h5>
        <Link to="/blogs" className="btn btn-outline-success mt-3">← Volver al blog</Link>
      </div>
    );
  }

  // Sugerencias: otros posts
  const otros = blogList().filter(p => p.id !== id).slice(0, 3);

  return (
    <>
      <header className="py-5 bg-light border-bottom">
        <div className="container">
          <Link to="/blogs" className="btn btn-outline-secondary btn-sm mb-3">
            ← Volver al blog
          </Link>
          <h1 className="h3 mb-1">{post.titulo}</h1>
          <p className="text-muted small mb-0">
            Por {post.autor} — {formatCLDate(post.fecha)}
          </p>
        </div>
      </header>

      <main className="py-5">
        <div className="container">
          <div className="row g-5">
            {/* Columna principal */}
            <div className="col-12 col-lg-8">
              {post.portada && (
                <img
                  src={post.portada}
                  alt={post.titulo}
                  className="img-fluid rounded shadow-sm mb-4"
                  style={{ height: 420, objectFit: 'cover', width: '100%' }}
                />
              )}

              {/* Contenido del post */}
              <article className="article-content">
                <BlogContent contenido={post.contenido} />
              </article>
            </div>

            {/* Columna lateral: Te puede interesar */}
            <aside className="col-12 col-lg-4">
              <h4 className="h6 mb-3">Te puede interesar</h4>

              {otros.map(o => (
                <div key={o.id} className="card mb-3 shadow-sm border-0">
                  {o.portada && (
                    <img
                      src={o.portada}
                      alt={o.titulo}
                      className="card-img-top"
                      style={{ height: 120, objectFit: 'cover' }}
                    />
                  )}
                  <div className="card-body p-2">
                    <h5 className="h6 mb-2">{o.titulo}</h5>
                    <Link to={`/blog/${o.id}`} className="stretched-link text-success small">
                      Leer más
                    </Link>
                  </div>
                </div>
              ))}
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}
