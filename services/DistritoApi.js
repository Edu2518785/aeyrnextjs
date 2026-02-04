import { apiFetch } from "./Api";

export const getDistritos = async () => {
  return apiFetch("/api/public/distritos");
};