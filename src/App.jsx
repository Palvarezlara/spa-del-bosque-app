import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import AppLayout from './layout/AppLayout';
import Home from './pages/Home';
import Servicios from './pages/Servicios';
import Nosotros from './pages/Nosotros';
import Contacto from './pages/Contacto';
import Blogs from './pages/Blogs';
import Login from './pages/Login';
import Registro from './pages/Registro';
import Carrito from './pages/Carrito';
import Perfil from './pages/Perfil';
import CompraExitosa from './pages/CompraExitosa';
import CompraError from './pages/CompraError';
import Checkout from './pages/Checkout';
import RequireAuth from './components/RequireAuth';
import ServicioDetalle from './pages/ServicioDetalle';

//falta proteger las rutas 


export default function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/servicio/:sku" element={<ServicioDetalle />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/perfil" element={<RequireAuth><Perfil /></RequireAuth>} />
        <Route path="/checkout" element={<RequireAuth><Checkout /></RequireAuth>} /> 
        <Route path="/compra-exitosa" element={<CompraExitosa />} />
        <Route path="/compra-error" element={<CompraError />} />
        <Route path="*" element={<div className="container py-4">404 — Ruta no encontrada</div>} />
      </Routes>
    </AppLayout>
  )
}

