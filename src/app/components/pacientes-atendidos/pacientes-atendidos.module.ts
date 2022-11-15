import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PacientesAtendidosRoutingModule } from './pacientes-atendidos-routing.module';
import { PacientesAtendidosComponent } from './pacientes-atendidos.component';
import { MaterialModule } from 'src/app/material/material.module';


@NgModule({
  declarations: [
    PacientesAtendidosComponent
  ],
  imports: [
    CommonModule,
    PacientesAtendidosRoutingModule,
    MaterialModule
  ]
})
export class PacientesAtendidosModule { }
