import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { AuthService } from 'src/app/services/auth.service';
import { ImagenService } from 'src/app/services/imagen.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  spinner = true;
  hide = true;

  usuarioVerificado : boolean = false;
  esAdmin : boolean = false;
  listaUsuarios : Usuario[] = [];
  pacientes : number = 3;
  medicos : number = 2;


  //64863abec5@inboxmail.life 


  loginForm!: FormGroup
  constructor(private fb :FormBuilder,private auth:AuthService,private userService: UsuarioService, private imagenService: ImagenService) {
    this.loginForm = fb.group({
      email:['',[Validators.required, Validators.email]],
      password:['',[Validators.required]]
    })
   }

  ngOnInit(): void {
    setTimeout(() => {
      this.spinner = false;
    }, 500);
    this.cargarIngresoRapido();
  }

  async login(){
    try {
      await this.auth.login(this.loginForm.value.email,this.loginForm.value.password);
      this.listaUsuarios  = [];
      this.pacientes  = 3;
      this.medicos  = 2;  
    } catch (error:any) {
      // console.log(error)
    }
  }

  // async loginRapido(email:string, password:string){
  //   try {
  //     await this.auth.loginSinVerificacion(email,password)

      
  //     this.listaUsuarios  = [];
  //     this.pacientes  = 3;
  //     this.medicos  = 2;  
  //   } catch (error:any) {
  //     console.log('Error');
  //   }
  // }
  cargarDatos(email:string, password:string){
    this.loginForm.controls['email'].setValue(email);
    this.loginForm.controls['password'].setValue(password);
    
  }

  cargarIngresoRapido(){    
    this.userService.traerUsuarios().subscribe(
      usuarios =>{
        // console.log(usuarios);
        usuarios.forEach(usuario => {          
          if(usuario.email == "64863abec5@inboxmail.life" && this.listaUsuarios.length < 6){
            this.listaUsuarios.push(usuario);
            // console.log(this.listaUsuarios)
          }
          //el paciente tiene 2 fotos, asi que tomo la primera
          if(usuario.rol == 'paciente' && this.pacientes>0){
            // usuario.fotos = usuario.fotos.split(',')[0];
            this.listaUsuarios.push(usuario);
            this.pacientes--;
            // console.log(this.listaUsuarios)
          }
          if(usuario.rol == 'especialista' && this.medicos>0){
            this.listaUsuarios.push(usuario);
            this.medicos--;
            // console.log(this.listaUsuarios)
          }
          
          this.imagenService.descargarImagen(usuario.imagen1).subscribe(
            url =>{
              usuario.imagen1 = url;
            }
          )
        });
        
      }
    )
  }

}
