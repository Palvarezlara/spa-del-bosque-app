import { http } from './httpClient';

// Listar todos los blogs (para la página pública)
export async function getBlogs() {
  const res = await http.get('/catalog/blogs');
  return res.data; // array de blogs
}

// Obtener un blog por ID
export async function getBlogById(id) {
  const res = await http.get(`/catalog/blogs/${id}`);
  return res.data;
}

// CRUD para Admin
export async function createBlog(data) {
  const res = await http.post('/catalog/blogs', data);
  return res.data;
}

export async function updateBlog(id, data) {
  const res = await http.put(`/catalog/blogs/${id}`, data);
  return res.data;
}

export async function deleteBlog(id) {
  await http.delete(`/catalog/blogs/${id}`);
}
