import { http } from './httpClient';


// Listar todos los blogs (para la página pública)
export async function getBlogs() {
  const res = await http.get('/api/v1/catalog/blogs');
  return res.data; // array de blogs
}

// Obtener un blog por ID
export async function getBlogById(id) {
  const res = await http.get(`/api/v1/catalog/blogs/${id}`);
  return res.data;
}

// CRUD para Admin
export async function createBlog(data) {
  const res = await http.post('/api/v1/catalog/blogs', data);
  return res.data;
}

export async function updateBlog(id, data) {
  const res = await http.put(`/api/v1/catalog/blogs/${id}`, data);
  return res.data;
}

export async function deleteBlog(id) {
  await http.delete(`/api/v1/catalog/blogs/${id}`);
}

// Cambiar estado (borrador / publicado)
export async function updateBlogEstado(id, estado) {
  const res = await http.patch(`/api/v1/catalog/blogs/${id}/estado`, { estado });
  return res.data;
}

// Cambiar destacado (true / false)
export async function updateBlogDestacado(id, destacado) {
  const res = await http.patch(`/api/v1/catalog/blogs/${id}/destacado`, { destacado });
  return res.data;
}
