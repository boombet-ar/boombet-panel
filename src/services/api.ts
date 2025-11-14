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
 */
export const afAdminLogin = async (username: string, password: string): Promise<{ token: string, message?: string }> => {
  const response = await fetch(`${VITE_API_BASEURL}/af_admin_login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    // Asegúrate que tu backend espera 'username' o cámbialo por el campo correcto
    body: JSON.stringify({ username, password }),
  });
  return handleResponse(response);
};

/**
 * GET /
 * Obtiene la lista de todos los afiliados.
 */
export const getAfiliadores = async (token: string): Promise<Afiliador[]> => {
  const response = await fetch(`${VITE_API_BASEURL}/`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  return handleResponse(response);
};

/**
 * POST /toggleActivo/:id
 * Activa o desactiva un afiliador.
 */
export const toggleAfiliadorActivo = async (id: string | number, token: string): Promise<any> => {
  const response = await fetch(`${VITE_API_BASEURL}/toggleActivo/${id}`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` },
  });
  return handleResponse(response);
};

/**
 * DELETE /delete/:id
 * Elimina un afiliador.
 */
export const deleteAfiliador = async (id: string | number, token: string): Promise<any> => {
  const response = await fetch(`${VITE_API_BASEURL}/delete/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` },
  });
  return handleResponse(response);
};