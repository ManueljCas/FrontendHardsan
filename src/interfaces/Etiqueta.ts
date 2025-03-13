export interface Etiqueta {
    id_Etiqueta: number;
    fechaInicio: string; // o Date si vas a convertirlo
    fechaFin: string | null; // null si puede estar vacío
    nombre: string;
    descripcion: string;
  }
  