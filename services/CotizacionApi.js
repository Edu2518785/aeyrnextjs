import { apiFetch } from "./Api";

export const crearCotizacion = async (data) => {
  return apiFetch("/api/public/cotizaciones", {
    method: "POST",
    body: JSON.stringify(data)
  });
};