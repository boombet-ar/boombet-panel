export type Afiliador = {
  id: string | number;
  nombre_completo: string;     
  token_afiliador: string;     
  cant_afiliaciones: number;
  dni: string;
  telefono: string;
  activo: boolean;
};