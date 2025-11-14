import { VITE_API_BASEURL } from '../config';
import type { Afiliador } from '../types';

// Función helper para manejar respuestas de la API
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Error: ${response.status}`);
  }
  // Devuelve una respuesta vacía si no hay contenido (ej: DELETE)
  if (response.status === 204) return null; 
  return response.json();
};

/**
 * POST /af_admin_login
 * Inicia sesión en el panel de admin.
 * (Esta función se mantiene igual)
 */
export const afAdminLogin = async (username: string, password: string): Promise<{ message?: string }> => {
  const response = await fetch(`${VITE_API_BASEURL}/afiliadores/af_admin_login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user:username, password:password }),
  });
  return handleResponse(response);
};

/**
 * GET /
 * Obtiene la lista de todos los afiliados.
 * (Token eliminado de los parámetros y headers)
 */
export const getAfiliadores = async (): Promise<Afiliador[]> => {
  const response = await fetch(`${VITE_API_BASEURL}/`, {
    // headers: { 'Authorization': `Bearer ${token}` }, // <-- Eliminado
  });
  return handleResponse(response);
};

/**
 * POST /toggleActivo/:id
 * Activa o desactiva un afiliador.
 * (Token eliminado de los parámetros y headers)
 */
export const toggleAfiliadorActivo = async (id: string | number): Promise<any> => {
  const response = await fetch(`${VITE_API_BASEURL}/toggleActivo/${id}`, {
    method: 'POST',
    // headers: { 'Authorization': `Bearer ${token}` }, // <-- Eliminado
  });
  return handleResponse(response);
};

/**
 * DELETE /delete/:id
 * Elimina un afiliador.
 * (Token eliminado de los parámetros y headers)
 */
export const deleteAfiliador = async (id: string | number): Promise<any> => {
  const response = await fetch(`${VITE_API_BASEURL}/delete/${id}`, {
    method: 'DELETE',
    // headers: { 'Authorization': `Bearer ${token}` }, // <-- Eliminado
  });
  return handleResponse(response);
};