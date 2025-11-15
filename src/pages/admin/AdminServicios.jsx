// pages/admin/AdminServicios.jsx

import { useEffect, useState } from "react";
import ServicioForm from "../../components/admin/servicios/ServicioForm";
import ServicioTable from "../../components/admin/servicios/ServicioTable";

export default function AdminServicios() {
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [servicioEditando, setServicioEditando] = useState(null);

  const API_URL = "http://localhost:7000/api/servicios"; 
  // Cuando esté tu API-Gateway, reemplazas aquí.

  // ---- GET servicios ----
  const cargarServicios = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setServicios(data);
    } catch (err) {
      console.error("Error cargando servicios:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarServicios();
  }, []);

  // ---- POST & PUT ----
  const guardarServicio = async (servicio) => {
    try {
      const metodo = servicioEditando ? "PUT" : "POST";
      const url = servicioEditando
        ? `${API_URL}/${servicioEditando.id}`
        : API_URL;

      const res = await fetch(url, {
        method: metodo,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(servicio),
      });

      if (!res.ok) throw new Error("Error al guardar servicio");

      await cargarServicios();
      setServicioEditando(null);
    } catch (err) {
      console.error(err);
    }
  };

  // ---- DELETE ----
  const eliminarServicio = async (id) => {
    if (!confirm("¿Eliminar servicio?")) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Error eliminando servicio");

      await cargarServicios();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="h4">Administrar Servicios</h2>
        <button
          className="btn btn-success"
          onClick={() => setServicioEditando(null)}
        >
          <i className="bi bi-plus-circle me-2"></i>
          Nuevo Servicio
        </button>
      </div>

      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <ServicioForm
            initialData={servicioEditando}
            onSubmit={guardarServicio}
            onCancel={() => setServicioEditando(null)}
          />
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          {loading ? (
            <p>Cargando...</p>
          ) : (
            <ServicioTable
              servicios={servicios}
              onEdit={(s) => setServicioEditando(s)}
              onDelete={eliminarServicio}
            />
          )}
        </div>
      </div>
    </section>
  );
}
