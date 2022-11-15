import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, SelectControlValueAccessor, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { ImagenService } from 'src/app/services/imagen.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario!:Usuario;
  spinner = true;

  // especialidades: any[]=[
  //   {value:'Kinesiologia'},
  //   {value:'Pediatria'},
  //   {value: 'Otro'}
  // ]
  especialidades:string[] = [];
  selectedFile1: any = null;
  imagenPath1:string = '';


  selectedFile2: any = null;
  imagenPath2:string = '';

  selected = '';

  hide = true;

  tipoUsuario = '';
  registroForm! : FormGroup;

  user:any;

  rolLogueado:string = '';

  esHumano: boolean = false;

  

  constructor(private fb :FormBuilder, private usuarioService: UsuarioService
    ,private imgService: ImagenService, private auth:AuthService,private router:Router, private snackBar: MatSnackBar) {
      this.registroForm =  fb.group({
        nombre:['',[Validators.required]],
        apellido:['',[Validators.required]],
        edad:['',[Validators.required]],
        dni:['',[Validators.required, Validators.min(11111111),Validators.max(99999999)]],
        rol:[''],
        obraSocial:['',[Validators.required,Validators.minLength(4)]],
        especialidades:[''],
        imagen1:['',[Validators.required]],
        imagen2:['',[Validators.required]],
        email:['',[Validators.required,Validators.email]],
        password:['',[Validators.required,Validators.minLength(6)]],
        captcha:['',[Validators.required]]
      })
     }

  ngOnInit(): void {
    this.auth.getUserLogged().subscribe(async data =>{
      this.user = await this.usuarioService.obtenerUsuario(data?.uid);
      this.rolLogueado = this.user?.rol;
      
      
    })
    setTimeout(() => {
      this.spinner = false;
    }, 500);
  }

  cambio(){
    
    // if(this.selected == 'Otro'){
    //   //this.registroForm.controls['especialidad'].setValue('');
    // }
    // else{

    // }
    
  }

  onFileSelected1(event: any): void {
    const file: File = event.target.files[0] ?? null;
    this.selectedFile1 = file;

    this.imagenPath1 = event.target.files[0].name.replaceAll(' ','-');

    

    



  }
  onFileSelected2(event: any): void {
    // this.selectedFile2 = event.target.files[0] ?? null;
    const file: File = event.target.files[0] ?? null;
    this.selectedFile2 = file;

    this.imagenPath2 = event.target.files[0].name.replaceAll(' ','-');

    

  }

  onEspecialidadSeleccionada(event:any){
    // console.log(this.registroForm.value.tipo);
    if(this.registroForm.value.rol == 'paciente')
    {
      this.tipoUsuario = 'paciente';
      // console.log(this.registroForm.get('obraSocial'))
      this.registroForm.get('obraSocial')?.setValidators([Validators.required])
      this.registroForm.get('obraSocial')?.updateValueAndValidity();

      this.registroForm.get('especialidades')?.clearValidators();
      this.registroForm.get('especialidades')?.updateValueAndValidity();

      this.registroForm.get('imagen2')?.setValidators([Validators.required])
      this.registroForm.get('imagen2')?.updateValueAndValidity();

      
      // console.log(this.registroForm.get('obraSocial'))
    }
    else{
      this.tipoUsuario = 'especialista';

      

      this.registroForm.get('obraSocial')?.clearValidators();
      this.registroForm.get('obraSocial')?.updateValueAndValidity();

      this.registroForm.get('especialidades')?.setValidators([Validators.required])
      this.registroForm.get('especialidades')?.updateValueAndValidity();

      this.registroForm.get('imagen2')?.clearValidators();
      this.registroForm.get('imagen2')?.updateValueAndValidity();    
      
    } 
  }

  

  async registrar(){
    this.usuario = {...this.registroForm.value,imagen1:this.imagenPath1,imagen2:this.imagenPath2};
    this.usuario.rol = this.tipoUsuario;
    delete this.usuario.captcha;

    this.tipoUsuario == 'paciente' ? delete this.usuario.especialidades : delete this.usuario.obraSocial;

    // if(this.tipoUsuario == 'admin'){
    //   delete this.usuario.especialidad;
    //   delete this.usuario.obraSocial;
    //   delete this.usuario.habilitado;
    // }
    this.usuario.imagen1 = this.usuario.email + this.usuario.imagen1;

    this.usuario.imagen2 = (this.tipoUsuario == 'paciente') ? this.usuario.email + this.usuario.imagen2 : '';
    
    try {
      await this.auth.registrar(this.usuario.email,this.registroForm.value.password);

      if(this.tipoUsuario == 'paciente'){

        delete this.usuario.habilitado;
        this.imgService.subirArchivo(this.selectedFile1,this.usuario.imagen1,this.selectedFile2,this.usuario.imagen2);

      }else if(this.tipoUsuario == 'especialista'){
        delete this.usuario.historiaClinica;
        this.imgService.subirArchivo(this.selectedFile1,this.usuario.imagen1);
        this.usuario.habilitado = false;

      }else{
        delete this.usuario.historiaClinica;
        delete this.usuario.especialidades;
        delete this.usuario.obraSocial;
        delete this.usuario.habilitado;
        this.imgService.subirArchivo(this.selectedFile1,this.usuario.imagen1);

      }

      await this.usuarioService.guardarUsuario(this.usuario,this.auth.usuario.uid);
      this.usuarioService.actualizarUsuario({uid: this.auth.usuario.uid},this.auth.usuario.uid);     
      this.auth.logout();
      this.snackBar.open(`¡Registro exitoso!. Hemos enviado un mail de verificacion a ${this.usuario.email}`,'Cerrar');
      this.router.navigate(['/bienvenido']);
      this.registroForm.reset();

    } catch (error) {
      
      this.snackBar.open(`Error en el registro`,`Cerrar`)
    }


  }


  onRolSeleccionado(event:any){
    // console.log(this.registroForm.value.tipo);
    
    if(event.target.dataset.tipo == 'paciente')
    {
      this.tipoUsuario = 'paciente';

      this.registroForm.get('rol')?.setValue('paciente');
      // console.log(this.registroForm.get('obraSocial'))
      this.registroForm.get('obraSocial')?.setValidators([Validators.required])
      this.registroForm.get('obraSocial')?.updateValueAndValidity();

      this.registroForm.get('especialidades')?.clearValidators();
      this.registroForm.get('especialidades')?.updateValueAndValidity();

      this.registroForm.get('imagen2')?.setValidators([Validators.required])
      this.registroForm.get('imagen2')?.updateValueAndValidity();

      
      // console.log(this.registroForm.get('obraSocial'))
    }
    else if (event.target.dataset.tipo == 'especialista'){
      this.tipoUsuario = 'especialista';
      this.registroForm.get('rol')?.setValue('especialista');

      this.registroForm.get('obraSocial')?.clearValidators();
      this.registroForm.get('obraSocial')?.updateValueAndValidity();

      this.registroForm.get('especialidades')?.setValidators([Validators.required])
      this.registroForm.get('especialidades')?.updateValueAndValidity();

      this.registroForm.get('imagen2')?.clearValidators();
      this.registroForm.get('imagen2')?.updateValueAndValidity();    
      
    } 
    else{
      this.tipoUsuario = 'admin';
      this.registroForm.get('rol')?.setValue('admin');

      this.registroForm.get('obraSocial')?.clearValidators();
      this.registroForm.get('obraSocial')?.updateValueAndValidity();

      this.registroForm.get('especialidades')?.clearValidators();
      this.registroForm.get('especialidades')?.updateValueAndValidity();

      this.registroForm.get('imagen2')?.clearValidators();
      this.registroForm.get('imagen2')?.updateValueAndValidity();
    }
  }
  mostrarAlgo(event:any){
    
  }

  volver(){
    this.tipoUsuario = '';
    this.registroForm.reset();
  }

  agregarEspecialidad(checkbox:any){
    //me llega el checkbox, obtengo el value y si esta checkeado o no
    
    let espec = checkbox.source.value;
    let agregar = checkbox.checked
    
    if(agregar){       
      this.especialidades.push(espec)
    }else{
      this.especialidades = this.especialidades.filter(espe => espe != espec);
    }    
    this.registroForm.controls['especialidades'].patchValue(this.especialidades)
  }

  subirEspecialidad(event:any){

  }

  captchaValido(valor:boolean){
    this.esHumano = valor;
    this.registroForm.controls['captcha'].patchValue(valor);
    
  }

}
