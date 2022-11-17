import { Pipe, PipeTransform } from '@angular/core';
import { filter } from 'rxjs';
import { Turno } from 'src/app/interfaces/turno.interface';

@Pipe({
  name: 'filtrarPorPaciente'
})
export class FiltrarPorPacientePipe implements PipeTransform {

  transform(turnos: Turno[], filterText:string): Turno[]  {
    let turnosFiltrados:Turno[] = [];

    if(turnos.length === 0 || filterText ===''){
      return turnos;
    }
    else{
      turnos.forEach(t =>{
        console.log(filterText, filterText.length);
        console.log(`${t.paciente.nombre} ${t.paciente.apellido}`.toLowerCase().length);
        if(`${t.paciente.nombre} ${t.paciente.apellido}`.toLowerCase().includes(filterText.toLowerCase())){
          if(!turnosFiltrados.includes(t)){
            turnosFiltrados.push(t)
          }
        }
      })

      return turnosFiltrados;
    }
  }

}
