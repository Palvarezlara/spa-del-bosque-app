const BASE_URL = import.meta.env.VITE_API_BASE || "https://demo6694663.mockable.io/api/v1/spadelbosque";

async function http(url, options) {
  const res = await fetch(url, options);
  if (!res.ok) throw new Error(`HTTP ${res.status} - ${url}`);
  return res.json();
}

export const getServicios = () => http(`${BASE_URL}/servicios`);
export const getUsuarios  = () => http(`${BASE_URL}/usuarios`);
export const postUsuario  = (u) =>
  http(`${BASE_URL}/usuarios`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(u),
  });
