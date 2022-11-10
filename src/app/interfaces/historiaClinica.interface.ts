import { Turno } from "./turno.interface"

export interface HistoriaClinica{
    altura:number,
    peso: number,
    temperatura: number,
    presion: number,
    turno: Turno,
    [key: string]: string | number | Turno

    

}