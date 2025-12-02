// src/api/catalogApi.js
import { http } from "./httpClient";

// ===== PUBLICO WEB =====
export async function getServicios() {
  const res = await http.get("/api/v1/catalog/servicios");
  return res.data; // array de ServicioModel
}

export async function getServicioById(id) {
  const res = await http.get(`/api/v1/catalog/servicios/${id}`);
  return res.data;
}

// ===== ADMIN CRUD =====
export async function createServicio(data) {
  const res = await http.post("/api/v1/catalog/servicios", data);
  return res.data;
}

export async function updateServicio(id, data) {
  const res = await http.put(`/api/v1/catalog/servicios/${id}`, data);
  return res.data;
}

export async function toggleEstadoServicio(id, activo) {
  // 👈 body JSON, NO params
  const res = await http.patch(
    `/api/v1/catalog/servicios/${id}/estado`,
    { activo }
  );
  return res.data;
}

export async function deleteServicio(id) {
  await http.delete(`/api/v1/catalog/servicios/${id}`);
}
