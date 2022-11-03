import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TurnosRoutingModule } from './turnos-routing.module';
import { TurnosComponent } from './turnos.component';
import { SolicitarTurnoComponent } from './solicitar-turno/solicitar-turno.component';
import { TurnoPacienteComponent } from './turno-paciente/turno-paciente.component';
import { TurnoEspecialistaComponent } from './turno-especialista/turno-especialista.component';
import { TurnoTodosComponent } from './turno-todos/turno-todos.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TurnosComponent,
    SolicitarTurnoComponent,
    TurnoPacienteComponent,
    TurnoEspecialistaComponent,
    TurnoTodosComponent
  ],
  imports: [
    CommonModule,
    TurnosRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TurnosModule { }
