import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EspecialidadesService } from 'src/app/services/especialidades.service';
import { Especialidad } from 'src/app/interfaces/especialidad.interface';
import { ImagenService } from 'src/app/services/imagen.service';


@Component({
  selector: 'app-especialidades',
  templateUrl: './especialidades.component.html',
  styleUrls: ['./especialidades.component.css']
})
export class EspecialidadesComponent implements OnInit {

  listaEspecialidades : Especialidad[] = [];
  formEspecialidad:FormGroup;
  especialidadNueva !: Especialidad;

  selectedFile1: any = null;
  imagenPath1:string = '';

  mostrarModal:boolean = false;

  @Output() especialidadSeleccionada : EventEmitter<any> = new EventEmitter<any>();


  @Output() especialidadAAgregar: EventEmitter<any> = new EventEmitter<any>();

  constructor(private servEsp : EspecialidadesService, private fb : FormBuilder,
    private imgService: ImagenService) {
    this.formEspecialidad = this.fb.group(
      {
        'descripcion':['',[Validators.required,Validators.minLength(5)]],
        'urlFoto':[]
      }
    )
   }

  ngOnInit(): void {
    this.cargarEspecialidades();
  }
  cargarEspecialidades(){
    this.servEsp.traerTodasLasEspecialidades().subscribe(
      esp => {
        this.listaEspecialidades = esp;

        this.listaEspecialidades.forEach(espec =>{
          this.imgService.descargarImagen(espec.urlFoto).subscribe(url =>{
            espec.urlFoto = url;
          })   
        })
           
      }
    )
  }

  async nuevaEspecialidad(){
    this.especialidadNueva = this.formEspecialidad.value;
    console.log(this.formEspecialidad.get('imagen')?.value);
    if(this.imagenPath1 == ''){
      this.especialidadNueva.urlFoto = 'protesis.png';
      console.log('No tiene foto');
    }
    else{
      this.especialidadNueva.urlFoto = this.imagenPath1;
      this.imgService.subirArchivo(this.selectedFile1,this.especialidadNueva.urlFoto!);
      console.log(this.selectedFile1,this.especialidadNueva.urlFoto! );
    }
    // this.especialidadNueva = this.formEspecialidad.value;
    console.log(this.selectedFile1,this.especialidadNueva.urlFoto! );
    console.log(this.especialidadNueva); 
    
    this.servEsp.guardarEspecialidad(this.especialidadNueva);
    // this.especialidadAAgregar.emit(this.formEspecialidad.value)
   
    this.imagenPath1 = '';
    this.selectedFile1 = null;
    this.cerrarModal();
    this.formEspecialidad.reset();    
    //@ts-ignore
    // $('#altaEspecialidad').modal('hide')
  }

  abrirModal(){
    this.mostrarModal = true;
    console.log('Aprete el boton')
  }

  cerrarModal(){
    this.mostrarModal = false;
  }

  pasarEspecialidad(event:any){
  
    
    this.especialidadSeleccionada.emit(event);
  }

  onFileSelected1(event: any): void {
    const file: File = event.target.files[0] ?? null;
    this.selectedFile1 = file;

    this.imagenPath1 = event.target.files[0].name.replaceAll(' ','-');

    

    console.log(this.imagenPath1)



  }

}
