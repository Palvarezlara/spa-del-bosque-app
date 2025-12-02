import AboutHero from "../components/about/AboutHero";
import MissionVision from "../components/about/MissionVision";
import ValuesGrid from "../components/about/ValuesGrid";
import TeamGrid from "../components/about/TeamGrid";
import Timeline from "../components/about/Timeline";

const viviImg = 'https://spa-del-bosque-media.s3.us-east-1.amazonaws.com/terapeutas/vivianaSchipp.webp';
const aliciaImg = 'https://spa-del-bosque-media.s3.us-east-1.amazonaws.com/terapeutas/terapeuta1.webp';

export default function Nosotros() {
  const team = [
    {
      img: viviImg,
      name: "Viviana Schiappacasse",
      role: "Terapeuta — Relajación y terapias holísticas.",
    },
    {
      img: aliciaImg,
      name: "Alicia Meza",
      role: "Terapeuta — Relajación y terapias holísticas.",
    },
  ];

  const history = [
    { primary: "2009 — Nacimiento de SPA del Bosque", secondary: "Viña del Mar" },
    { primary: "2018 — Nueva sala de terapias dobles", secondary: "Ampliación" },
    { primary: "2022 — Renovación circuito de aguas", secondary: "Innovación" },
  ];

  return (
    <>
      <AboutHero />
      <main className="py-5">
        <div className="container">
          <MissionVision />
          <ValuesGrid />
          <TeamGrid members={team} />
          <Timeline items={history} />
        </div>
      </main>
    </>
  );
}
