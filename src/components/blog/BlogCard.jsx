// src/components/blog/BlogCard.jsx
import { Link } from 'react-router-dom';
import { formatCLDate } from '../../utils/formatters';

export default function BlogCard({ post }) {
  const portada =
    post.imageUrl ||   // viene de la BD
    post.portada ||    // por compatibilidad con data local antigua
    null;
  const fecha = post.fechaPublicacion || post.fecha_publicacion || post.fecha || null;

  return (
    <article className="card h-100 shadow-sm hover-card">
      {portada && (
        <img
          src={portada}
          alt={post.titulo || "Imagen del blog"}
          className="card-img-top"
          style={{ height: 220, objectFit: 'cover' }}
        />
      )}
      <div className="card-body d-flex flex-column">
        <h3 className="h5">{post.titulo}</h3>
        {fecha && (
          <p className="text-muted small mb-2">
            Por {post.autor || "SPA del Bosque"} — {formatCLDate(fecha)}
          </p>
        )}
        <p className="flex-grow-1">{post.resumen}</p>
        <Link
          to={`/blog/${post.id}`}
          className="btn btn-outline-success mt-auto"
        >
          Leer más
        </Link>
      </div>
    </article>
  );
}

