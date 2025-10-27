export default function ValuesGrid({
  values = ["Respeto", "Excelencia", "Empatía", "Confianza"],
}) {
  return (
    <section className="mb-5">
      <h2 className="h4 mb-3">Nuestros valores</h2>
      <div className="row g-3">
        {values.map((v) => (
          <div key={v} className="col-6 col-md-3">
            <div className="border rounded p-3 text-center">{v}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
