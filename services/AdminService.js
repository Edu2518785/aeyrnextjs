const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const adminFetch = async (endpoint) => {
  const token = typeof window !== "undefined" ? sessionStorage.getItem("token") : null;

  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!res.ok) throw new Error("No autorizado");

  return res.json();
};