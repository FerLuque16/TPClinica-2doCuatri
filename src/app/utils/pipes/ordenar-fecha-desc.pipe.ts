import { Pipe, PipeTransform } from '@angular/core';
import { Log } from 'src/app/interfaces/log.interface';

@Pipe({
  name: 'ordenarFechaDesc'
})
export class OrdenarFechaDescPipe implements PipeTransform {

  transform(value: Log[], ...args: unknown[]): Log[] {
    let arrayOrdenado = value.sort((a,b)=>{
      return Date.parse(b.fecha) - Date.parse(a.fecha);
      
    })


    return arrayOrdenado;
  }

}
