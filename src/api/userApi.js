import { http } from './httpClient';

// Listado para Admin
export async function getUsuarios() {
  const res = await http.get('/users');
  return res.data;
}

// Crear usuario desde Admin
export async function createUsuario(data) {
  const res = await http.post('/users', data);
  return res.data;
}

// Actualizar usuario
export async function updateUsuario(id, data) {
  const res = await http.put(`/users/${id}`, data);
  return res.data;
}

// Eliminar usuario
export async function deleteUsuario(id) {
  await http.delete(`/users/${id}`);
}

export async function login(credentials) {
  const res = await http.post('/auth/login', credentials);
  // res.data debería traer el token JWT
  return res.data;
}