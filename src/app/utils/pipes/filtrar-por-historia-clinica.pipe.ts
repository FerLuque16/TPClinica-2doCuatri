import { Pipe, PipeTransform } from '@angular/core';
import { p } from 'chart.js/dist/chunks/helpers.core';
import { HistoriaClinica } from 'src/app/interfaces/historiaClinica.interface';
import { Turno } from 'src/app/interfaces/turno.interface';

@Pipe({
  name: 'filtrarPorHistoriaClinica'
})
export class FiltrarPorHistoriaClinicaPipe implements PipeTransform {

  transform(turnos: Turno[], filterText: string): Turno[] {


    let turnosFiltrados:Turno[] = [];

    if(turnos.length === 0 || filterText ===''){
      return turnos;
    }
    else{
      turnos.forEach(t =>{
        // if(`${t.especialista.nombre} ${t.especialista.apellido}`.toLowerCase().includes(filterText.toLowerCase())){
        //   if(!turnosFiltrados.includes(t)){
        //     turnosFiltrados.push(t)
        //   }
        // }

        
        if(t.paciente.historiaClinica){
          for (const key in t.paciente.historiaClinica) {
            if(t.estado == 'realizado'){
              if(t.paciente.historiaClinica[key as keyof HistoriaClinica].toString().toLowerCase().includes(filterText.toLowerCase()) 
                  || key.toLowerCase().includes(filterText)){

                turnosFiltrados.push(t);
              }
              if(key == 'datosDinamicos'){
                for (const clave in t.paciente.historiaClinica[key]) { 
                  
                  console.log(t.paciente.historiaClinica[key][clave],clave,filterText );
                  if(t.paciente.historiaClinica[key][clave].toString().toLowerCase().includes(filterText.toLowerCase()) || clave.toLowerCase().includes(filterText)){
                    turnosFiltrados.push(t);
                  }
                }
              }
            }
            
          }
        }
      })
      return turnosFiltrados;
    }
  }

}
