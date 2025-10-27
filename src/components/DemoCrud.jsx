import { createServicio, updateServicio, removeServicio } from "../data/store";
import { showToast } from "../utils/toast"; 

function DemoCrudServicios() {
  const handleCreate = () => {
    const nuevo = createServicio({
      sku: "", 
      nombre: "Masaje Express 20 min",
      categoria: "masajes",
      duracionMin: 20,
      precio: 18000,
      img: "/img/masaje-express.jpg",
      descripcion: "Relajación breve y efectiva."
    });
    showToast(`Creado: ${nuevo.nombre}`, "success");
  };

  const handleUpdate = () => {
    const ok = updateServicio("RELAX30", { precio: 36000 }); // ejemplo
    showToast(ok ? "Actualizado RELAX30" : "No existe RELAX30", ok ? "success" : "warning");
  };

  const handleDelete = () => {
    const ok = removeServicio("RELAX30");
    showToast(ok ? "Eliminado RELAX30" : "No existe RELAX30", ok ? "success" : "warning");
  };

  return (
    <div className="d-flex gap-2">
      <button className="btn btn-outline-success btn-sm" onClick={handleCreate}>Crear demo</button>
      <button className="btn btn-outline-primary btn-sm" onClick={handleUpdate}>Actualizar demo</button>
      <button className="btn btn-outline-danger btn-sm" onClick={handleDelete}>Eliminar demo</button>
    </div>
  );
}
export default DemoCrudServicios;
