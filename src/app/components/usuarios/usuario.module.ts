import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { EspecialistasComponent } from './especialistas/especialistas.component';
import { PacientesComponent } from './pacientes/pacientes.component';
import { MaterialModule } from 'src/app/material/material.module';
import { UsuariosComponent } from './usuarios.component';
import { UtilsModule } from 'src/app/utils/utils.module';


@NgModule({
  declarations: [
    UsuariosComponent,
    EspecialistasComponent,
    PacientesComponent
  ],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    MaterialModule,
    UtilsModule
    
  ]
})
export class UsuarioModule { }
