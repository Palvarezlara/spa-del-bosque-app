export default function MissionVision({
  mission = "Entregar experiencias de bienestar y descanso integral, combinando técnicas tradicionales y un entorno natural único.",
  vision  = "Ser el SPA referente de la V Región por calidad, calidez humana e innovación en terapias.",
}) {
  return (
    <section className="mb-5">
      <div className="row g-4">
        <div className="col-md-6">
          <div className="p-4 border rounded h-100">
            <h2 className="h4">Misión</h2>
            <p className="mb-0">{mission}</p>
          </div>
        </div>
        <div className="col-md-6">
          <div className="p-4 border rounded h-100">
            <h2 className="h4">Visión</h2>
            <p className="mb-0">{vision}</p>
          </div>
        </div>
      </div>
    </section>
  );
}