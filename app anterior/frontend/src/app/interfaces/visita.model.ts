export type TipoVisita = 'Raiz' | 'Largo' | 'Matiz' | 'Cambio de color';
export type TipoCambio = 'Efecto de color' | 'Limpieza de Color' | 'Cambio de color';

export interface Visita {
  id?: number;
  cliente_id: number;
  estilista_id?: number;
  estilista_nombre?: string;
  
  tipo?: TipoVisita;
  retoque?: string;
  fecha: Date;
  peticiones?: string;
  tipo_cambio?: TipoCambio;
  
  created_at?: Date;
  updated_at?: Date;
}