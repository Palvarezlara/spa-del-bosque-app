import { useEffect, useState } from "react";
import ServicioForm from "../../components/admin/servicios/ServicioForm";
import ServicioTable from "../../components/admin/servicios/ServicioTable";
import {
  getServicios,
  createServicio,
  updateServicio,
  deleteServicio,
} from "../../api/catalogApi";

export default function AdminServicios() {
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [servicioEditando, setServicioEditando] = useState(null);
  const [error, setError] = useState(null);

  // ====== Cargar desde backend ======
  const cargarServicios = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getServicios();
      setServicios(data);
    } catch (err) {
      console.error("Error cargando servicios:", err);
      setError("Ocurrió un error al cargar los servicios.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarServicios();
  }, []);

  // Normalizar servicio backend → datos para el formulario
  const mapToFormData = (s) => ({
    id: s.id,
    sku: s.sku ?? "",
    nombre: s.nombre ?? "",
    categoria: s.categoria ?? "",
    precio: s.precio ?? "",
    duracion: s.duracionMin ?? "",
    estado: s.activo ? "activo" : "inactivo",
  });

  // ====== Crear / Editar ======
  const guardarServicio = async (formData) => {
    try {
      setError(null);

      const payload = {
        sku: formData.sku.trim(),
        nombre: formData.nombre.trim(),
        categoria: formData.categoria || "otros",
        precio: Number(formData.precio ?? 0),
        duracionMin: Number(formData.duracion || 0),
        // por ahora sin descripcion ni imageUrl
        activo: formData.estado === "activo",
      };

      if (formData.id) {
        await updateServicio(formData.id, payload);
      } else {
        await createServicio(payload);
      }

      await cargarServicios();
      setServicioEditando(null);
    } catch (err) {
      console.error("Error guardando servicio:", err);
      setError("No se pudo guardar el servicio. Intenta nuevamente.");
    }
  };

  // ====== Eliminar ======
  const eliminarServicio = async (id) => {
    const confirmar = window.confirm(
      "¿Seguro que deseas eliminar este servicio? Esta acción no se puede deshacer."
    );
    if (!confirmar) return;

    try {
      setError(null);
      await deleteServicio(id);
      await cargarServicios();
    } catch (err) {
      console.error("Error eliminando servicio:", err);
      setError("No se pudo eliminar el servicio.");
    }
  };

  const cancelarEdicion = () => setServicioEditando(null);

  const handleEditClick = (servicio) => {
    setServicioEditando(mapToFormData(servicio));
  };

  return (
    <section>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="h4 mb-0">Administrar servicios</h2>
        <button
          className="btn btn-success"
          onClick={() => setServicioEditando(null)}
        >
          <i className="bi bi-plus-circle me-2" />
          Nuevo servicio
        </button>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {/* Formulario */}
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h5 className="card-title mb-3">
            {servicioEditando ? "Editar servicio" : "Crear nuevo servicio"}
          </h5>
          <ServicioForm
            initialData={servicioEditando}
            onSubmit={guardarServicio}
            onCancel={cancelarEdicion}
          />
        </div>
      </div>

      {/* Tabla */}
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title mb-3">Listado de servicios</h5>

          {loading ? (
            <p>Cargando servicios...</p>
          ) : (
            <ServicioTable
              servicios={servicios}
              onEdit={handleEditClick}
              onDelete={eliminarServicio}
            />
          )}
        </div>
      </div>
    </section>
  );
}
