import { API_URLS } from '../constants';
import { IAfiliador } from '../types';

// --- Servicio de Autenticación ---

export const apiLogin = async (user: string, password: string): Promise<boolean> => {
  const response = await fetch(API_URLS.LOGIN, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user, password }),
  });
  return response.ok;
};

// --- Servicios de Afiliadores ---

export const apiGetAfiliadores = async (): Promise<IAfiliador[]> => {
  const response = await fetch(API_URLS.GET_AFILIADORES);
  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('No autorizado. Vuelva a iniciar sesión.');
    }
    throw new Error(`Error HTTP: ${response.status}`);
  }
  return response.json();
};

export const apiUpdateAfiliadorStatus = async (id: number): Promise<boolean> => {
  const response = await fetch(`${API_URLS.UPDATE_AFILIADOR_STATUS}/${id}`, {
    method: 'POST',
  });
  if (!response.ok) {
    throw new Error(`Error en la API: ${response.statusText}`);
  }
  return response.ok;
};

export const apiDeleteAfiliador = async (id: number): Promise<boolean> => {
  const response = await fetch(`${API_URLS.DELETE_AFILIADOR}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error(`Error en la API: ${response.statusText}`);
  }
  return response.ok;
};