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
import { ModalTurnoComponent } from './modal-turno/modal-turno.component';
import { ModalComentarioComponent } from './modal-comentario/modal-comentario.component';
import { ModalEncuestaComponent } from './modal-encuesta/modal-encuesta.component';
import { ModalHistoriaClinicaComponent } from './modal-historia-clinica/modal-historia-clinica.component';


@NgModule({
  declarations: [
    TurnosComponent,
    SolicitarTurnoComponent,
    TurnoPacienteComponent,
    TurnoEspecialistaComponent,
    TurnoTodosComponent,
    ModalTurnoComponent,
    ModalComentarioComponent,
    ModalEncuestaComponent,
    ModalHistoriaClinicaComponent
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
