
const API_BASEURL = import.meta.env.VITE_API_BASEURL;

if (!API_BASEURL) {
  console.error("Error: VITE_API_BASEURL no está definida en el archivo .env");
}

export const API_URLS = {
  LOGIN: `${API_BASEURL}/afiliadores/af_admin_login`,
  GET_AFILIADORES: `${API_BASEURL}/afiliadores`,
  UPDATE_AFILIADOR_STATUS: `${API_BASEURL}/afiliadores/toggleActivo`,
  DELETE_AFILIADOR: `${API_BASEURL}/afiliadores/delete`,
};

export const N8N_FORM_URL = 'https://autom.boombet-ar.com/form/crear-afiliador';