import { Routes, Route } from 'react-router-dom'
import AppLayout from './layout/AppLayout'

// Páginas mínimas para probar
function Home() { return <h1 className="mt-3">Home</h1> }
function Servicios() { return <h1>Servicios</h1> }

export default function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/servicios" element={<Servicios />} />
        {/* …el resto de tus rutas */}
      </Routes>
    </AppLayout>
  )
}

