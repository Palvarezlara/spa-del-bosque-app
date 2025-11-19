
export const CAT_LABEL = {
  masajes: "Masajes",
  corporales: "Tratamientos corporales",
  circuitos: "Circuitos de agua y sauna",
  individuales: "Programas individuales",
  parejas: "Programas en pareja",
  "escapada-amigas": "Escapada de amigas",
};

export const CLP = new Intl.NumberFormat("es-CL", {
  style: "currency",
  currency: "CLP",
  maximumFractionDigits: 0,
});

export function formatCLDate(iso) {
  try {
    return new Date(iso).toLocaleDateString('es-CL', {
      year: 'numeric', month: '2-digit', day: '2-digit'
    });
  } catch { return iso; }
}