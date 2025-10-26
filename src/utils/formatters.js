import React from 'react';

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