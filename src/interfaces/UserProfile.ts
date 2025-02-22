export interface UserProfile {
  ID_Usuario: number;
  nombre: string;
  fechaNacimiento: string | null; 
  correoElectronico: string;
  telefono: string;
  contrasena?: string;
}
