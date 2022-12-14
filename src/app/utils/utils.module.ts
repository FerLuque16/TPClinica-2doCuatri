import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdenarPorEstadoPipe } from './pipes/ordenar-por-estado.pipe';
import { OrdenarFechaDescPipe } from './pipes/ordenar-fecha-desc.pipe';
import { FiltrarPorEspecialidadPipe } from './pipes/filtrar-por-especialidad.pipe';
import { FiltrarPorEspecialistaPipe } from './pipes/filtrar-por-especialista.pipe';
import { FiltrarPorHistoriaClinicaPipe } from './pipes/filtrar-por-historia-clinica.pipe';
import { FiltrarPorPacientePipe } from './pipes/filtrar-por-paciente.pipe';
import { CambiarColorEstadoDirective } from './directivas/cambiarColorEstado/cambiar-color-estado.directive';
import { CambiarColorLoginDirective } from './directivas/cambiarColorLogin/cambiar-color-login.directive';
import { CambiarColorCardDirective } from './directivas/cambiarColorCard/cambiar-color-card.directive';
import { FiltrarPorFechaPipe } from './pipes/filtrar-por-fecha.pipe';
import { FiltrarPorHoraPipe } from './pipes/filtrar-por-hora.pipe';



@NgModule({
  declarations: [
    OrdenarPorEstadoPipe,
    OrdenarFechaDescPipe,
    FiltrarPorEspecialidadPipe,
    FiltrarPorEspecialistaPipe,
    FiltrarPorHistoriaClinicaPipe,
    FiltrarPorPacientePipe,
    CambiarColorEstadoDirective,
    CambiarColorLoginDirective,
    CambiarColorCardDirective,
    FiltrarPorFechaPipe,
    FiltrarPorHoraPipe
  ],
  imports: [
    CommonModule
  ],
  exports:[
    OrdenarPorEstadoPipe,
    OrdenarFechaDescPipe,
    FiltrarPorEspecialidadPipe,
    FiltrarPorEspecialistaPipe,
    FiltrarPorHistoriaClinicaPipe,
    FiltrarPorPacientePipe,
    CambiarColorEstadoDirective,
    CambiarColorLoginDirective,
    CambiarColorCardDirective,
    FiltrarPorFechaPipe,
    FiltrarPorHoraPipe
  ]
})
export class UtilsModule { }
