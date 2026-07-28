export interface Estado {
  id?: number;
  cliente_id: number;
  color_nat?: string;
  porc_canas?: number;
  textura?: string;
  colorimetrista?: string;
  estructura?: string;
  form_decol?: string;
  pose_decol_largos?: number;
  pose_decol_raiz?: number;
  form_tinte?: string;
  pose_tinte_largos?: number;
  pose_tinte_raiz?: number;
  observaciones?: string;

  fecha_foto1?: Date | string;
  foto1?: string;
  fecha_foto2?: Date | string;
  foto2?: string;
  
  created_at?: Date;
  updated_at?: Date;
}