import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PacientesAtendidosComponent } from './pacientes-atendidos.component';

const routes: Routes = [{ path: '', component: PacientesAtendidosComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacientesAtendidosRoutingModule { }
