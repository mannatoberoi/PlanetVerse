/**
 * Future API client placeholder.
 * When the Express/MySQL backend is ready, point BASE_URL at that server.
 */
const BASE_URL = import.meta.env.VITE_API_URL || "/api";

export async function apiGet(path) {
  const response = await fetch(`${BASE_URL}${path}`);
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }
  return response.json();
}

export async function apiPost(path, body) {
  const response = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }
  return response.json();
}
