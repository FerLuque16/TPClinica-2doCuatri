import { Usuario } from "./usuario.interface";

export interface Disponibilidad{
    especialista: Usuario,
    especialidad: string,
    horaDesde: string,
    horaHasta:string
}