import { Routes, Route } from 'react-router-dom'
import AppLayout from './layout/AppLayout'
import Home from './pages/Home'
import Servicios from './pages/Servicios'

// Páginas mínimas para probar


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

