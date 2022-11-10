import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usuario : any;

  rolUsuario: any;

  usuarioDB : any;

  constructor(private afAuth: AngularFireAuth, private router:Router, private userService:UsuarioService, private snackBar: MatSnackBar) { }

  registrar(email:string,password:string){
    return  this.afAuth
            .createUserWithEmailAndPassword(email,password)
            .then(result =>{
              this.usuario = result.user;
              console.log(this.usuario)
              // console.log(this.user)
              this.enviarMailVerificacion();
            })
  }

  enviarMailVerificacion(){
    return  this.afAuth.currentUser
            .then(user =>{
              return user?.sendEmailVerification();
            })
            .then(()=>{
              // this.router.navigate(['/auth/verificar-email'])
            })
  }

  async login(email:string,password:string){
    return  this.afAuth.signInWithEmailAndPassword(email,password)
            .then(async result =>{       
              this.usuarioDB = await this.userService.devolverDataUsuarioDB(result.user?.uid);
              
              console.log(this.usuarioDB);
                if(result.user?.emailVerified !== true){
                  this.logout();
                  this.enviarMailVerificacion();
                  this.snackBar.open(`Su cuenta no esta verficada. Consulte a su casilla de mensajes en ${result.user?.email}`,'Cerrar');
                }
                else if (result.user?.emailVerified){
                  switch (this.usuarioDB.rol) {
                    case 'especialista':
                      if(this.usuarioDB.habilitado){
                        this.snackBar.open(`Bienvenido ${this.usuarioDB.nombre} ${this.usuarioDB.apellido}`,'Cerrar');
                        this.router.navigate(['/home'])
                      }
                      else{
                        this.logout();
                        this.snackBar.open('Su cuenta no fue habilitada, comuniquese con un administrador','Cerrar');
                      }
                      break;
                    case 'paciente':
                      this.snackBar.open(`Bienvenido ${this.usuarioDB.nombre} ${this.usuarioDB.apellido}`,'Cerrar');
                      this.router.navigate(['/home'])
                      
                      break;
                    case 'admin':
                      this.snackBar.open(`Bienvenido ${this.usuarioDB.nombre} ${this.usuarioDB.apellido}`,'Cerrar');
                      this.router.navigate(['/home'])
                      break;
                  
                    default:
                      break;
                  }
                  
                }
                else{
                  this.router.navigate(['/home'])
                }
              }            
            )
  }

  loginSinVerificacion(email:string,password:string){
    return  this.afAuth.signInWithEmailAndPassword(email,password)
            .then( async result =>{
                  console.log(result.user?.uid)
                  // this.userService.obtenerUsuario(result.user?.uid).subscribe(doc =>{
                  //   this.rolUsuario = doc.data()?.rol;
                  //   // console.log(this.rolUsuario.rol)
                  // });
                  this.rolUsuario = await this.userService.obtenerUsuario(result.user?.uid);
                  console.log(this.rolUsuario)
                  this.router.navigate(['/home'])
            })
              

              
            
  }

  logout(){
    return this.afAuth.signOut();
  }

  getUserLogged(){
    return this.afAuth.authState;
  }

  verificarUser(email:string|null|undefined):boolean{
    if(email !== 'admin@test.com'){
      return true;
    }

    return false;
  }

  ruteoSegunRol(rol:string, email:string){
    if(rol == 'admin'){
      this.snackBar.open(`¡Registro exitoso!. Hemos enviado un mail de verificacion a ${email}`,'Cerrar');
      this.router.navigate(['/usuarios']);
    }
    else{
      this.snackBar.open(`¡Registro exitoso!. Hemos enviado un mail de verificacion a ${email}`,'Cerrar');
      // this.logout();
      this.router.navigate(['/bienvenido']);
    }
  }

}
