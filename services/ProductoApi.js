import { apiFetch } from "./Api";

export const getProductos = async () => {
  return apiFetch("/api/public/productos");
};