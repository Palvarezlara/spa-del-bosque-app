// src/components/blog/BlogContent.jsx
export default function BlogContent({ contenido }) {
  if (!contenido) return null;

  // Caso nuevo: contenido es un string plano
  if (typeof contenido === "string") {
    return (
      <article className="content">
        {contenido
          .split(/\n{2,}/) // separa en párrafos por dobles saltos de línea
          .map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
      </article>
    );
  }

  // Caso antiguo: array con bloques tipados
  return (
    <article className="content">
      {contenido.map((b, idx) => {
        if (b.type === 'p') return <p key={idx}>{b.text}</p>;
        if (b.type === 'h2') return <h2 key={idx} className="h5 mt-4">{b.text}</h2>;
        if (b.type === 'ul')
          return <ul key={idx}>{b.items?.map((it, i) => <li key={i}>{it}</li>)}</ul>;
        if (b.type === 'ol')
          return <ol key={idx}>{b.items?.map((it, i) => <li key={i}>{it}</li>)}</ol>;
        if (b.type === 'blockquote')
          return (
            <blockquote key={idx} className="blockquote border-start ps-3 my-4">
              <p className="mb-0">{b.text}</p>
            </blockquote>
          );
        return null;
      })}
    </article>
  );
}
