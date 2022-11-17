import { Pipe, PipeTransform } from '@angular/core';
import { p } from 'chart.js/dist/chunks/helpers.core';
import { filter } from 'rxjs';
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
        if(t.historiaClinica){
          // console.log(t);

          for (const key in t.historiaClinica) {
            // console.log(key,t.historiaClinica[key as keyof HistoriaClinica], filterText);
            if(t.historiaClinica[key as keyof HistoriaClinica].toString().toLowerCase().includes(filterText.toLowerCase()) 
                || key.toLowerCase().includes(filterText)){
                  // console.log('Entre');
              turnosFiltrados.push(t);
            }
            if(key == 'datosDinamicos'){
              

              // console.log(t.historiaClinica[key]);
              for (const clave in t.historiaClinica[key]) {
                // console.log('Entre a datos dinamicos');
                if(t.historiaClinica[key][clave]){
                  if(t.historiaClinica[key][clave].toString().toLowerCase().includes(filterText.toLowerCase()) || clave.toLowerCase().includes(filterText)){
                    turnosFiltrados.push(t);
                  }
                    //             turnosFiltrados.push(t);
                    //           }
                }
                // if(t.historiaClinica[key][clave].toString().toLowerCase().includes(filterText)){
                //   console.log('Incluye');
                // }
              }
            }
          }

        }
        // if(`${t.especialista.nombre} ${t.especialista.apellido}`.toLowerCase().includes(filterText.toLowerCase())){
        //   if(!turnosFiltrados.includes(t)){
        //     turnosFiltrados.push(t)
        //   }
        // }

        
        // if(t.historiaClinica){
        //   for (const key in t.historiaClinica) {
        //     if(t.estado == 'realizado'){
        //       if(t.historiaClinica[key as keyof HistoriaClinica].toString().toLowerCase().includes(filterText.toLowerCase()) 
        //           || key.toLowerCase().includes(filterText)){

        //         turnosFiltrados.push(t);
        //       }
        //       if(key == 'datosDinamicos'){
        //         for (const clave in t.historiaClinica[key]) { 
                  
        //           console.log(t.historiaClinica[key][clave],clave,filterText );
        //           if(t.historiaClinica[key][clave].toString().toLowerCase().includes(filterText.toLowerCase()) || clave.toLowerCase().includes(filterText)){
        //             turnosFiltrados.push(t);
        //           }
        //         }
        //       }
        //     }
            
        //   }
        // }
      })

      console.log(turnosFiltrados);
      return turnosFiltrados;
    }
  }

}
