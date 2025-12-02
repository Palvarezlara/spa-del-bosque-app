import { useEffect, useState } from "react";
import BlogForm from "../../components/admin/blog/BlogForm";
import BlogTable from "../../components/admin/blog/BlogTable";
import {
  getBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  updateBlogEstado,
  updateBlogDestacado,
} from "../../api/blogApi";

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [blogEditando, setBlogEditando] = useState(null);
  const [error, setError] = useState(null);

  const normalizarLista = (data) =>
    Array.isArray(data) ? data : data?.blogs ?? [];


  // ====== GET blogs ======
  const cargarBlogs = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getBlogs();
      setBlogs(normalizarLista(data));
    } catch (err) {
      console.error(err);
      setError("Ocurrió un error al cargar los blogs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarBlogs();
  }, []);

  // ====== POST / PUT ======
  const guardarBlog = async (formData) => {
    try {
      setError(null);

      const payload = {
        ...formData,
        // si quieres asegurar valores:
        destacado: !!formData.destacado,
      };

      if (blogEditando) {
        await updateBlog(blogEditando.id, payload);
      } else {
        await createBlog(payload);
      }

      await cargarBlogs();
      setBlogEditando(null);
      
    } catch (err) {
      console.error(err);
      setError("No se pudo guardar el blog. Intenta nuevamente.");
    }
  };


  // ====== DELETE ======
  const eliminarBlog = async (id) => {
    const confirmar = window.confirm(
      "¿Seguro que deseas eliminar este blog? Esta acción no se puede deshacer."
    );
    if (!confirmar) return;

    try {
      setError(null);
      await deleteBlog(id);
      await cargarBlogs();
    } catch (err) {
      console.error(err);
      setError("No se pudo eliminar el blog.");
    }
  };

  // ====== Cambiar estado borrador/publicado ======
  const toggleEstadoBlog = async (blog) => {
    const nuevoEstado =
      blog.estado === "publicado" ? "borrador" : "publicado";

    try {
      setError(null);
      await updateBlogEstado(blog.id, nuevoEstado);
      await cargarBlogs();
    } catch (err) {
      console.error(err);
      setError("No se pudo actualizar el estado del blog.");
    }
  };

  // ====== Cambiar destacado ======
  const toggleDestacadoBlog = async (blog) => {
    const nuevoDestacado = !blog.destacado;

    try {
      setError(null);
      await updateBlogDestacado(blog.id, nuevoDestacado);
      await cargarBlogs();
    } catch (err) {
      console.error(err);
      setError("No se pudo actualizar el destacado del blog.");
    }
  };

  const cancelarEdicion = () => setBlogEditando(null);

  return (
    <section>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="h4 mb-0">Administrar blogs</h2>
        <button
          className="btn btn-success"
          onClick={() => setBlogEditando(null)}
        >
          <i className="bi bi-journal-plus me-2" />
          Nuevo blog
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
            {blogEditando ? "Editar blog" : "Crear nuevo blog"}
          </h5>
          <BlogForm
            initialData={blogEditando}
            onSubmit={guardarBlog}
            onCancel={cancelarEdicion}
          />
        </div>
      </div>

      {/* Tabla */}
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title mb-3">Listado de blogs</h5>

          {loading ? (
            <p>Cargando blogs...</p>
          ) : (
            <BlogTable
              blogs={blogs}
              onEdit={setBlogEditando}
              onDelete={eliminarBlog}
              onToggleEstado={toggleEstadoBlog}
              onToggleDestacado={toggleDestacadoBlog}
            />
          )}
        </div>
      </div>
    </section>
  );
}