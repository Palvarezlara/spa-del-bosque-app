import HeroSection from '../components/HeroSection'
import Categorias from '../components/Categorias'
import ServiciosDestacados from '../components/ServiciosDestacados'

export default function Home() {
  return (
    <>
      <HeroSection />
      <main>
        <Categorias />
        <ServiciosDestacados />
        
      </main>
    </>
  )
}
