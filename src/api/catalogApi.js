import { http } from './httpClient';

// Servicios públicos (para la web)
export async function getServicios() {
  const res = await http.get('/catalog/servicios');
  return res.data; // array de servicios
}

// Endpoint por id:
export async function getServicioById(id) {
  const res = await http.get(`/catalog/servicios/${id}`);
  return res.data;
}

// Endpoints pensados para Admin (CRUD)
export async function createServicio(data) {
  const res = await http.post('/catalog/servicios', data);
  return res.data;
}

export async function updateServicio(id, data) {
  const res = await http.put(`/catalog/servicios/${id}`, data);
  return res.data;
}

export async function toggleEstadoServicio(id, activo) {
  const res = await http.patch(`/catalog/servicios/${id}/estado`, null, {
    params: { activo },
  });
  return res.data;
}

export async function deleteServicio(id) {
  await http.delete(`/catalog/servicios/${id}`);
}
