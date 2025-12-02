import { http } from './httpClient';

// Listado para Admin
export async function getUsuarios() {
  const res = await http.get('/api/v1/users');
  return res.data;
}

// Crear usuario desde Admin
export async function createUsuario(data) {
  const res = await http.post('/api/v1/users/register', data);
  return res.data;
}

// Actualizar usuario
export async function updateUsuario(id, data) {
  const res = await http.put(`/api/v1/users/${id}`, data);
  return res.data;
}

// Eliminar usuario
export async function deleteUsuario(id) {
  await http.delete(`/api/v1/users/${id}`);
}

export async function updateUsuarioRol(id, rol) {
  const res = await http.patch(`/api/v1/users/${id}/rol`, { rol });
  return res.data;            // UsuarioResponse
}

export async function updateUsuarioEstado(id, estado) {
  const res = await http.patch(`/api/v1/users/${id}/estado`, { estado });
  return res.data;            // UsuarioResponse
}

export async function login(credentials) {
  const res = await http.post('/api/v1/users/login', credentials);
  return res.data;
}