import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { BienvenidoComponent } from './components/bienvenido/bienvenido.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { UsuarioModule } from './components/usuarios/usuario.module';
import { DisponibilidadEspecialistaComponent } from './components/disponibilidad-especialista/disponibilidad-especialista.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MostrarHistoriaClinicaComponent } from './components/mostrar-historia-clinica/mostrar-historia-clinica.component';
import { PacientesAtendidosModule } from './components/pacientes-atendidos/pacientes-atendidos.module';




@NgModule({
  declarations: [
    AppComponent,
    BienvenidoComponent,
    NavbarComponent,
    HomeComponent,
    PerfilComponent,
    DisponibilidadEspecialistaComponent,
    // MostrarHistoriaClinicaComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    UsuarioModule,
    FormsModule,
    ReactiveFormsModule,
    PacientesAtendidosModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
