import { Routes, Route } from 'react-router-dom';
import AppLayout from './layout/AppLayout';
import Home from './pages/Home';
import Servicios from './pages/Servicios';
import Nosotros from './pages/Nosotros';
import Contacto from './pages/Contacto';
import Blogs from './pages/Blogs';
import Login from './pages/Login';
import Carrito from './pages/Carrito';
import CompraExitosa from './pages/CompraExitosa';
import CompraError from './pages/CompraError';
import Checkout from './pages/Checkout';
import RequireAuth from './components/RequireAuth';


export default function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/checkout" element={<RequireAuth><Checkout /></RequireAuth>} /> 
        <Route path="/compra-exitosa" element={<CompraExitosa />} />
        <Route path="/compra-error" element={<CompraError />} />
        
      </Routes>
    </AppLayout>
  )
}

