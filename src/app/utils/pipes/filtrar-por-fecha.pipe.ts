import { Pipe, PipeTransform } from '@angular/core';
import { Turno } from 'src/app/interfaces/turno.interface';

@Pipe({
  name: 'filtrarPorFecha'
})
export class FiltrarPorFechaPipe implements PipeTransform {

  transform(turnos: Turno[], filterText: string): Turno[]  {
    let turnosFiltrados:Turno[] = [];

    if(turnos.length === 0 || filterText ===''){
      return turnos;
    }
    else{
      turnos.forEach(t =>{
        if(t.fecha.toLowerCase().includes(filterText.toLowerCase())){
          if(!turnosFiltrados.includes(t)){
            turnosFiltrados.push(t)
          }
        }
      })

      return turnosFiltrados;
    }
  }

}
