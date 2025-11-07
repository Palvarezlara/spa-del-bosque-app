import { SERVICIOS as LOCAL_SERV } from "./data";

const MOCK_HOST ="https://demo6694663.mockable.io";
const PROD_BASE = `${MOCK_HOST}/api/v1/spadelbosque`;
const DEV_BASE  = "/mock/api/v1/spadelbosque";

//aqui usamos la variable de entorno VITE_API_BASE para determinar la base de la API
const BASE_URL = import.meta.env.VITE_API_BASE || (import.meta.env.DEV ? DEV_BASE : PROD_BASE);

// Proxy público para saltar CORS si hace falta (solo en prod)
const USE_PROXY_IN_PROD = true;
const PROXY = "https://api.allorigins.win/raw?url=";

async function http(url, options) {
  try {
    const r = await fetch(url, options);
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return await r.json();
  } catch (err) {
    // Reintento con proxy si estamos en prod y aún no lo usamos
    const shouldProxy =
      !import.meta.env.DEV && USE_PROXY_IN_PROD && !url.startsWith(PROXY);
    if (shouldProxy) {
      const proxied = PROXY + encodeURIComponent(url);
      const r2 = await fetch(proxied, options);
      if (!r2.ok) throw new Error(`HTTP ${r2.status}`);
      return await r2.json();
    }
    throw err;
  }
}

export async function getServicios() {
  try {
    const data = await http(`${BASE_URL}/servicios`);
    // Si el mock devuelve un array directo, lo normalizamos
    return Array.isArray(data) ? { servicios: data } : (data ?? { servicios: [] });
  } catch {
    // Fallback local
    return { servicios: LOCAL_SERV };
  }
}

export async function getUsuarios() {
  return http(`${BASE_URL}/usuarios`);
}

export async function postUsuario(u) {
  return http(`${BASE_URL}/usuarios`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(u),
  });
}