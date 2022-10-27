import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { EspecialistasComponent } from './especialistas/especialistas.component';
import { PacientesComponent } from './pacientes/pacientes.component';
import { MaterialModule } from 'src/app/material/material.module';


@NgModule({
  declarations: [
    EspecialistasComponent,
    PacientesComponent
  ],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    MaterialModule
  ]
})
export class UsuarioModule { }
