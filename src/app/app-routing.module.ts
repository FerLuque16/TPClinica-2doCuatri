import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router'
import { BienvenidoComponent } from './components/bienvenido/bienvenido.component';
import { HomeComponent } from './components/home/home.component';
import { PerfilComponent } from './components/perfil/perfil.component';

const routes: Routes = [
  {
    path:'bienvenido',
    component:BienvenidoComponent,
    data:{animation:'Bienvenido'}
  },
  {
    path:'home',
    component:HomeComponent,
    data:{animation:'Home'}
    
  },
  {
    path:'perfil',
    component:PerfilComponent,
    data:{animation:'Perfil'}
  },
  {
    path:'auth',
    loadChildren:()=>import('./components/auth/auth.module').then(m => m.AuthModule),
    data:{animation: 'Auth'}
    
    
  },
  {
    path:'usuarios',
    loadChildren:()=>import('./components/usuarios/usuario.module').then(m => m.UsuarioModule),
    data:{animation: 'Usuarios'}
  },
  { 
    path: 'turnos',
    loadChildren: () => import('./components/turnos/turnos.module').then(m => m.TurnosModule),
    data:{animation: 'Turnos'} 
  },
  {
    path:'',redirectTo: 'bienvenido', pathMatch:'full'
  },
  { 
    path: 'pacientes-atendidos',
    loadChildren: () => import('./components/pacientes-atendidos/pacientes-atendidos.module').then(m => m.PacientesAtendidosModule),
    data:{animation: 'PacientesAtendidos'} 
  },
  { 
    path: 'estadisticas',
    loadChildren: () => import('./components/estadisticas/estadisticas.module').then(m => m.EstadisticasModule),
    data:{animation: 'Estadisticas'} 
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
