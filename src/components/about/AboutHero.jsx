const heroImg = "https://spa-del-bosque-media.s3.us-east-1.amazonaws.com/spa/banners/front.webp";

export default function AboutHero({
  title = "Sobre nosotros",
  lead = "Un refugio de calma en medio de la naturaleza. Desde 2009 ofrecemos terapias de relajación, circuitos de aguas y programas personalizados.",
  img = heroImg,
}) {
  return (
    <header className="py-5 bg-light border-bottom">
      <div className="container">
        <div className="row g-4 align-items-center">
          <div className="col-12 col-md-6">
            <h1 className="display-6">{title}</h1>
            <p className="lead mb-0">{lead}</p>
          </div>
          <div className="col-12 col-md-6">
            <img className="img-fluid rounded shadow-sm" src={img} alt="Dependencias del SPA" />
          </div>
        </div>
      </div>
    </header>
  );
}
