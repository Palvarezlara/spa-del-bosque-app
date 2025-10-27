import { Link } from 'react-router-dom';
import { formatCLDate } from '../../utils/formatters';

export default function BlogCard({ post }) {
  return (
    <article className="card h-100 shadow-sm hover-card">
      {post.portada && (
        <img
          src={post.portada}
          alt={post.titulo}
          className="card-img-top"
          style={{ height: 220, objectFit: 'cover' }}
        />
      )}
      <div className="card-body d-flex flex-column">
        <h3 className="h5">{post.titulo}</h3>
        <p className="text-muted small mb-2">Por {post.autor} — {formatCLDate(post.fecha)}</p>
        <p className="flex-grow-1">{post.resumen}</p>
        <Link to={`/blog/${post.id}`} className="btn btn-outline-success mt-auto">Leer más</Link>
      </div>
    </article>
  );
}
