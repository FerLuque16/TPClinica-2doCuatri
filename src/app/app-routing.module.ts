import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router'
import { BienvenidoComponent } from './components/bienvenido/bienvenido.component';
import { HomeComponent } from './components/home/home.component';
import { PerfilComponent } from './components/perfil/perfil.component';

const routes: Routes = [
  {
    path:'bienvenido',
    component:BienvenidoComponent
  },
  {
    path:'home',
    component:HomeComponent
  },
  {
    path:'perfil',
    component:PerfilComponent
  },
  {
    path:'auth',
    loadChildren:()=>import('./components/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path:'usuarios',
    loadChildren:()=>import('./components/usuarios/usuario.module').then(m => m.UsuarioModule)
  },
  { 
    path: 'turnos',
    loadChildren: () => import('./components/turnos/turnos.module').then(m => m.TurnosModule) 
  },
  {
    path:'',redirectTo: 'bienvenido', pathMatch:'full'
  },
  
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
