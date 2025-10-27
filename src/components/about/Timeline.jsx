
export default function Timeline({
  title = "Nuestra historia",
  items = [],
}) {
  return (
    <section>
      <h2 className="h4 mb-3">{title}</h2>
      <ul className="list-group">
        {items.map((it, idx) => (
          <li key={idx} className="list-group-item d-flex justify-content-between">
            <span>{it.primary}</span>
            <span className="text-muted">{it.secondary}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
