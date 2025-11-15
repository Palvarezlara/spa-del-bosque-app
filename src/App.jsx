import { Routes, Route} from 'react-router-dom';
import AppLayout from './layout/AppLayout';
import AdminLayout from './layout/AdminLayout';

import Home from './pages/Home';
import Servicios from './pages/Servicios';
import Nosotros from './pages/Nosotros';
import Contacto from './pages/Contacto';
import Blogs from './pages/Blogs';
import BlogDetalle from './pages/BlogDetalle';
import Login from './pages/Login';
import Registro from './pages/Registro';
import Carrito from './pages/Carrito';
import Perfil from './pages/Perfil';
import CompraExitosa from './pages/CompraExitosa';
import CompraError from './pages/CompraError';
import Checkout from './pages/Checkout';
import RequireAuth from './components/RequireAuth';
import ServicioDetalle from './pages/ServicioDetalle';

// Páginas admin
import AdminServicios from "./pages/admin/AdminServicios";
import AdminUsuarios from "./pages/admin/AdminUsuarios";
import AdminBlogs from "./pages/admin/AdminBlogs";
import AdminReporte from "./pages/admin/AdminReporte";
import AdminDashboard from './pages/Admin/AdminDashboard';

export default function App() {
  return (
    <Routes>
      {/* Rutas públicas con el layout principal */}
      <Route path="/" element={<AppLayout />}>  
        <Route index element={<Home />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/servicio/:sku" element={<ServicioDetalle />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blog/:id" element={<BlogDetalle />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route
          path="/perfil"
          element={
            <RequireAuth>
              <Perfil />
            </RequireAuth>
          }
        />
        <Route
          path="/checkout"
          element={
            <RequireAuth>
              <Checkout />
            </RequireAuth>
          }
        />
        <Route path="/compra-exitosa" element={<CompraExitosa />} />
        <Route path="/compra-error" element={<CompraError />} />

        {/* 404 para rutas públicas */}
        <Route
          path="*"
          element={
            <div className="container py-4">
              404 — Ruta no encontrada
            </div>
          }
        />
      </Route>

      {/* ===== RUTAS ADMIN (usa AdminLayout) ===== */}
      <Route
        path="/admin"
        element={
          // Luego aquí puedes cambiar por un guard de rol (admin)
          <RequireAuth>
            <AdminLayout />
          </RequireAuth>
        }
      >
        {/* /admin → Dashboard */}
        <Route index element={<AdminDashboard />} />
        {/* /admin/servicios */}
        <Route path="servicios" element={<AdminServicios />} />
        {/* /admin/usuarios */}
        <Route path="usuarios" element={<AdminUsuarios />} />
        {/* /admin/blogs */}
        <Route path="blogs" element={<AdminBlogs />} />
        {/* /admin/reportes */}
        <Route path="reportes" element={<AdminReporte />} />
      </Route>
    </Routes>
  );
}

