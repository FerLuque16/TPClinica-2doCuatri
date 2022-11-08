import { Usuario } from "./usuario.interface";

export interface Turno{
    id:string,
    especialista: Usuario,
    paciente: Usuario,
    especialidad: string,
    fecha:string,
    hora:string,
    estado:string,
    comentario?:string
    
}