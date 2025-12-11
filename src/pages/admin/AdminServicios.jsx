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
  const [error, setError] = useState(null);
  const [servicioEditando, setServicioEditando] = useState(null);

  // === Cargar servicios desde el backend ===
  const cargarServicios = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getServicios();

      // Nuestro catalogApi devuelve directamente un array
      const lista = Array.isArray(data)
        ? data
        : data?.servicios ?? [];

      setServicios(lista);
    } catch (err) {
      console.error("Error cargando servicios:", err);
      setError("Ocurrió un error al cargar los servicios.");
      setServicios([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarServicios();
  }, []);

  // === Crear / Editar servicio ===
  const guardarServicio = async (formData) => {
    try {
      setError(null);

      // Normalizamos el payload al modelo de Spring
      const payload = {
        sku: (formData.sku ?? "").trim(),
        nombre: (formData.nombre ?? "").trim(),
        categoria: formData.categoria || "masajes",
        precio: Number(formData.precio ?? 0),
        duracionMin: Number(formData.duracion ?? formData.duracionMin ?? 0),
        descripcion: (formData.descripcion ?? "").trim() || null,
        imageUrl: (formData.imageUrl ?? "").trim() || null, 
        activo:
          formData.estado === "activo" ||
          formData.activo === true
         
      };

      if (!payload.sku || !payload.nombre) {
        throw new Error("SKU y nombre son obligatorios");
      }

      if (servicioEditando?.id) {
        // UPDATE
        await updateServicio(servicioEditando.id, payload);
      } else {
        // CREATE
        await createServicio(payload);
      }

      await cargarServicios();
      setServicioEditando(null);
    } catch (err) {
      console.error("Error al guardar servicio:", err);
      setError("No se pudo guardar el servicio. Intenta nuevamente.");
    }
  };

  // === Eliminar servicio ===
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
      console.error("Error al eliminar servicio:", err);
      setError("No se pudo eliminar el servicio.");
    }
  };

  const cancelarEdicion = () => setServicioEditando(null);

  return (
    <section>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="h4 mb-0">Administrar Servicios</h2>
        <button
          className="btn btn-success"
          onClick={() => setServicioEditando(null)}
        >
          <i className="bi bi-plus-circle me-2" />
          Nuevo Servicio
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
              onEdit={setServicioEditando}
              onDelete={eliminarServicio}
            />
          )}
        </div>
      </div>
    </section>
  );
}
