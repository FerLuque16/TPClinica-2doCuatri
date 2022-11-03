import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EspecialidadesService } from 'src/app/services/especialidades.service';
import { Especialidad } from 'src/app/interfaces/especialidad.interface';

@Component({
  selector: 'app-especialidades',
  templateUrl: './especialidades.component.html',
  styleUrls: ['./especialidades.component.css']
})
export class EspecialidadesComponent implements OnInit {

  listaEspecialidades : Especialidad[] = [];
  formEspecialidad:FormGroup;
  especialidadNueva !: Especialidad;

  mostrarModal:boolean = false;

  @Output() especialidadSeleccionada : EventEmitter<any> = new EventEmitter<any>();


  @Output() especialidadAAgregar: EventEmitter<any> = new EventEmitter<any>();

  constructor(private servEsp : EspecialidadesService, private fb : FormBuilder) {
    this.formEspecialidad = this.fb.group(
      {
        'descripcion':['',[Validators.required,Validators.minLength(5)]]
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
      }
    )
  }

  async nuevaEspecialidad(){
    this.especialidadNueva = this.formEspecialidad.value;
    
    //console.log(this.especialidadNueva);
    // this.servEsp.guardarEspecialidad(this.especialidadNueva);
    this.especialidadAAgregar.emit(this.formEspecialidad.value)
   
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

}
