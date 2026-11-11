// All communication with the backend API lives in this file.
//
// VITE_API_URL comes from .env.local (local) or from the Amplify console (AWS).
// Vite replaces import.meta.env.VITE_API_URL with the real value at BUILD time.
export const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3000').replace(/\/+$/, '');

async function request(path, options = {}) {
  let response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    });
  } catch {
    // fetch only throws when the server can't be reached at all
    // (wrong URL, server down, blocked by CORS or by mixed content).
    throw new Error(`Cannot reach the API at ${API_URL}.`);
  }

  if (response.status === 204) return null; // e.g. after DELETE

  const data = await response.json().catch(() => null);
  if (!response.ok) {
    const message = data?.details?.join(' ') || data?.error || `Request failed (HTTP ${response.status}).`;
    throw new Error(message);
  }
  return data;
}

export function listTasks(status) {
  const query = status ? `?status=${encodeURIComponent(status)}` : '';
  return request(`/api/tasks${query}`);
}

export function createTask(task) {
  return request('/api/tasks', { method: 'POST', body: JSON.stringify(task) });
}

export function updateTask(id, task) {
  return request(`/api/tasks/${id}`, { method: 'PUT', body: JSON.stringify(task) });
}

export function deleteTask(id) {
  return request(`/api/tasks/${id}`, { method: 'DELETE' });
}

// Health check used by the connection banner.
// Returns { api: boolean, database: boolean, detail: string }.
export async function checkHealth() {
  try {
    const response = await fetch(`${API_URL}/api/health`);
    const data = await response.json().catch(() => ({}));
    return {
      api: true,
      database: data.database === 'ok',
      detail: data.database === 'ok' ? '' : `Database error: ${data.code || `HTTP ${response.status}`}`,
    };
  } catch {
    return { api: false, database: false, detail: `Cannot reach the API at ${API_URL}.` };
  }
}
