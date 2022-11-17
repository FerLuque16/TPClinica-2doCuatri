import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdenarPorEstadoPipe } from './pipes/ordenar-por-estado.pipe';
import { OrdenarFechaDescPipe } from './pipes/ordenar-fecha-desc.pipe';
import { FiltrarPorEspecialidadPipe } from './pipes/filtrar-por-especialidad.pipe';
import { FiltrarPorEspecialistaPipe } from './pipes/filtrar-por-especialista.pipe';
import { FiltrarPorHistoriaClinicaPipe } from './pipes/filtrar-por-historia-clinica.pipe';



@NgModule({
  declarations: [
    OrdenarPorEstadoPipe,
    OrdenarFechaDescPipe,
    FiltrarPorEspecialidadPipe,
    FiltrarPorEspecialistaPipe,
    FiltrarPorHistoriaClinicaPipe
  ],
  imports: [
    CommonModule
  ],
  exports:[
    OrdenarPorEstadoPipe,
    OrdenarFechaDescPipe,
    FiltrarPorEspecialidadPipe,
    FiltrarPorEspecialistaPipe,
    FiltrarPorHistoriaClinicaPipe
  ]
})
export class UtilsModule { }
