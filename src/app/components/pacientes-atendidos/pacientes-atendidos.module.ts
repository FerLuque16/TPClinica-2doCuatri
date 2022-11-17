import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PacientesAtendidosRoutingModule } from './pacientes-atendidos-routing.module';
import { PacientesAtendidosComponent } from './pacientes-atendidos.component';
import { MaterialModule } from 'src/app/material/material.module';
import { TurnosModule } from '../turnos/turnos.module';
import { AppModule } from 'src/app/app.module';
import { MostrarHistoriaClinicaComponent } from '../mostrar-historia-clinica/mostrar-historia-clinica.component';



@NgModule({
  declarations: [
    PacientesAtendidosComponent,
    MostrarHistoriaClinicaComponent
  ],
  imports: [
    CommonModule,
    PacientesAtendidosRoutingModule,
    MaterialModule,
    TurnosModule
    
    
  ],
  exports:[
    MostrarHistoriaClinicaComponent
  ]
})
export class PacientesAtendidosModule { }
