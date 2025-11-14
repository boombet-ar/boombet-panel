export interface IAfiliador {
  id: number;
  nombre_completo: string | null;
  token_afiliador: string | null;
  afiliaciones: number | null;
  email: string | null;
  dni: string | null;
  telefono: string | null;
  activo: boolean | null;
}