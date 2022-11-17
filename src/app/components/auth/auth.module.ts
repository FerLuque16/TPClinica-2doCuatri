import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { VerificarEmailComponent } from './verificar-email/verificar-email.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EspecialidadesComponent } from './especialidades/especialidades.component';
import { CaptchaComponent } from './captcha/captcha.component';
import { UtilsModule } from 'src/app/utils/utils.module';


@NgModule({
  declarations: [
    LoginComponent,
    RegistroComponent,
    VerificarEmailComponent,
    EspecialidadesComponent,
    CaptchaComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    UtilsModule
  ]
})
export class AuthModule { }
