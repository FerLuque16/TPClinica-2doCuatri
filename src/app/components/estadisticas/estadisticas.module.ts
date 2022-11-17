import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EstadisticasRoutingModule } from './estadisticas-routing.module';
import { EstadisticasComponent } from './estadisticas.component';
import { MaterialModule } from 'src/app/material/material.module';
import { UtilsModule } from 'src/app/utils/utils.module';



@NgModule({
  declarations: [
    EstadisticasComponent
  ],
  imports: [
    CommonModule,
    EstadisticasRoutingModule,
    MaterialModule,
    UtilsModule
  ]
})
export class EstadisticasModule { }
