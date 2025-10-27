

function TeamCard({ img, name, role }) {
  return (
    <div className="col-12 col-sm-6 col-lg-4">
      <div className="card h-100 shadow-sm">
        {img && <img src={img} className="card-img-top" alt={name} />}
        <div className="card-body">
          <h3 className="h6 mb-1">{name}</h3>
          <p className="text-muted small mb-0">{role}</p>
        </div>
      </div>
    </div>
  );
}

export default function TeamGrid({
  title = "Nuestro equipo",
  members = [],
}) {
  return (
    <section className="mb-5">
      <h2 className="h4 mb-3">{title}</h2>
      <div className="row g-4">
        {members.map((m) => (
          <TeamCard key={m.name} {...m} />
        ))}
      </div>
    </section>
  );
}
