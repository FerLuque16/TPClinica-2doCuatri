import { Pipe, PipeTransform } from '@angular/core';
import { Turno } from 'src/app/interfaces/turno.interface';

@Pipe({
  name: 'filtrarPorEspecialista'
})
export class FiltrarPorEspecialistaPipe implements PipeTransform {

  transform(turnos: Turno[], filterText:string): Turno[] {
    let turnosFiltrados:Turno[] = [];

    if(turnos.length === 0 || filterText ===''){
      return turnos;
    }
    else{
      turnos.forEach(t =>{
        if(`${t.especialista.nombre} ${t.especialista.apellido}`.toLowerCase().includes(filterText.toLowerCase())){
          if(!turnosFiltrados.includes(t)){
            turnosFiltrados.push(t)
          }
        }
      })

      return turnosFiltrados;
    }
  }

}
