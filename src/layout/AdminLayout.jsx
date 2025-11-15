import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminHeader from "../components/admin/AdminHeader";

function AdminLayout() {
  return (
    <div className="admin-layout d-flex min-vh-100">
      {/* Sidebar a la izquierda */}
      <AdminSidebar />

      {/* Zona principal: Header arriba + contenido */}
      <div className="admin-main flex-grow-1 d-flex flex-column">
        <AdminHeader />

        <main className="admin-content flex-grow-1 p-4">
          {/* Aquí se renderizan AdminDashboard, AdminServicios, etc. */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
