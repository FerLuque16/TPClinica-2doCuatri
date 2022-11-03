import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SolicitarTurnoComponent } from './solicitar-turno/solicitar-turno.component';
import { TurnoEspecialistaComponent } from './turno-especialista/turno-especialista.component';
import { TurnoPacienteComponent } from './turno-paciente/turno-paciente.component';
import { TurnoTodosComponent } from './turno-todos/turno-todos.component';
import { TurnosComponent } from './turnos.component';

const routes: Routes = [
{
  path: '', component: TurnosComponent 
},
{
  path:'solicitar-turno',
  component:SolicitarTurnoComponent
},
{
  path:'turnos-paciente',
  component:TurnoPacienteComponent
},
{
  path:'turnos-especialista',
  component:TurnoEspecialistaComponent
},
{
  path:'turnos-todos',
  component:TurnoTodosComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TurnosRoutingModule { }
