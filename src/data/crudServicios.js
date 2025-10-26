import { SERVICIOS } from "./data";

let servicios = [...SERVICIOS]; 

export const getAllServicios = () => servicios;

export const getServicioBySku = (sku) =>
  servicios.find((s) => s.sku === sku);

export const createServicio = (nuevo) => {
  servicios.push(nuevo);
  return nuevo;
};

export const updateServicio = (sku, cambios) => {
  const index = servicios.findIndex((s) => s.sku === sku);
  if (index !== -1) {
    servicios[index] = { ...servicios[index], ...cambios };
    return servicios[index];
  }
  return null;
};

export const deleteServicio = (sku) => {
  servicios = servicios.filter((s) => s.sku !== sku);
  return true;
};
