
import { SERVICIOS as SEED_SERVICIOS } from "./data";

// Claves LS
const LS_SERVICIOS = "spa_servicios";
const LS_USUARIOS  = "spa_users";

// ---- utilidades comunes ----
function readJSON(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
  catch { return fallback; }
}
function writeJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
  // notificación simple (por si otros tabs/ventanas)
  window.dispatchEvent(new CustomEvent("spa-store-changed", { detail: { key } }));
}

// ---- seed inicial (solo si está vacío) ----
export function ensureSeed() {
  const cur = readJSON(LS_SERVICIOS, []);
  if (!cur.length) writeJSON(LS_SERVICIOS, SEED_SERVICIOS);
}

// =============== SERVICIOS ===============
export function getServicios() {
  return readJSON(LS_SERVICIOS, []);
}

export function getServicioBySKU(sku) {
  const list = getServicios();
  return list.find(s => String(s.sku) === String(sku)) || null;
}

// C: crear servicio (sku único)
export function createServicio(servicio) {
  const list = getServicios();
  if (list.some(s => s.sku === servicio.sku)) {
    throw new Error("SKU ya existe");
  }
  const nuevo = { ...servicio };
  list.push(nuevo);
  writeJSON(LS_SERVICIOS, list);
  return nuevo;
}

// U: actualizar por sku (parcial o total)
export function updateServicio(sku, patch) {
  const list = getServicios();
  const idx = list.findIndex(s => s.sku === sku);
  if (idx === -1) throw new Error("Servicio no encontrado");
  list[idx] = { ...list[idx], ...patch };
  writeJSON(LS_SERVICIOS, list);
  return list[idx];
}

// D: eliminar por sku
export function deleteServicio(sku) {
  const list = getServicios();
  const next = list.filter(s => s.sku !== sku);
  if (next.length === list.length) throw new Error("Servicio no encontrado");
  writeJSON(LS_SERVICIOS, next);
  return true;
}

// =============== USUARIOS ===============
const LS_SESSION = "spa_session"; // ya lo usas en AuthContext

export function getUsuarios() {
  return readJSON(LS_USUARIOS, []);
}

export function getUsuarioById(id) {
  return getUsuarios().find(u => u.id === id) || null;
}

/** Crear usuario (simple demo, sin hash aquí).
 *  Si quieres, puedes exportar también un “createUsuarioHasheado”.
 */
export function createUsuario(u) {
  const list = getUsuarios();
  if (list.some(x => x.email?.toLowerCase() === u.email?.toLowerCase())) {
    throw new Error("Correo ya registrado");
  }
  const nuevo = { ...u, id: u.id || "U" + Date.now() };
  list.push(nuevo);
  writeJSON(LS_USUARIOS, list);
  return nuevo;
}

export function updateUsuario(id, patch) {
  const list = getUsuarios();
  const idx = list.findIndex(u => u.id === id);
  if (idx === -1) throw new Error("Usuario no encontrado");
  list[idx] = { ...list[idx], ...patch };
  writeJSON(LS_USUARIOS, list);

  // si este usuario es la sesión activa, la refrescamos
  const sess = readJSON(LS_SESSION, null);
  if (sess && sess.id === id) {
    const merged = { ...sess, ...patch, nombre: patch.nombre ?? sess.nombre, email: patch.email ?? sess.email };
    localStorage.setItem(LS_SESSION, JSON.stringify(merged));
    window.dispatchEvent(new StorageEvent("storage", { key: LS_SESSION, newValue: JSON.stringify(merged) }));
  }
  return list[idx];
}

export function deleteUsuario(id) {
  const list = getUsuarios();
  const next = list.filter(u => u.id !== id);
  if (next.length === list.length) throw new Error("Usuario no encontrado");
  writeJSON(LS_USUARIOS, next);
  return true;
}
