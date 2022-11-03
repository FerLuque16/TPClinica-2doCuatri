import { Component, Input, OnInit } from '@angular/core';
import { Especialidad } from 'src/app/interfaces/especialidad.interface';
import { EspecialidadesService } from 'src/app/services/especialidades.service';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FormBuilder,FormGroup, SelectControlValueAccessor, Validators } from '@angular/forms';
import { Disponibilidad } from 'src/app/interfaces/disponibilidad.interface';
import { DisponibilidadService } from 'src/app/services/disponibilidad.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-disponibilidad-especialista',
  templateUrl: './disponibilidad-especialista.component.html',
  styleUrls: ['./disponibilidad-especialista.component.css']
})
export class DisponibilidadEspecialistaComponent implements OnInit {

  // especialidades: Especialidad[] = [];

  horas:string[] = ['8','9','10','11','12','13','14','15','16','17','18'];
  minutos:string[] = ['00','15','30','45'];

  especialidadSeleccionada:string = "";

  disponibilidadForm!: FormGroup;

  disponibilidad!: Disponibilidad;

  @Input() especialidades!:string[];
  @Input() especialista!: Usuario;
  constructor(private especialidadService: EspecialidadesService, private userService: UsuarioService,private disponibilidadService: DisponibilidadService,
    private fb :FormBuilder,private snackBar: MatSnackBar) {
    this.disponibilidadForm = fb.group({
      horaDesde:['',[Validators.required]],
      horaHasta:['',[Validators.required]]
    })
   }

  ngOnInit(): void {
    // console.log(this.especialista);
    // console.log(this.crearIntervalos(30));
  }

  guardarDisponibilidad(){



    // let horaParseada = this.formatearHorario(this.disponibilidadForm.get('horaDesde')?.value,this.disponibilidadForm.get('horaHasta')?.value);


    this.disponibilidad = {
      especialista: this.especialista,
      especialidad: this.especialidadSeleccionada,
      horaDesde: this.disponibilidadForm.get('horaDesde')?.value,
      horaHasta: this.disponibilidadForm.get('horaHasta')?.value
    }


    // console.log(this.disponibilidad);
    this.disponibilidadService.guardarDisponibilidad(this.disponibilidad);
    this.especialidadSeleccionada = '';

    this.snackBar.open('Disponibilidad guardada correctamente','Cerrar');

    // console.log(this.crearIntervalos(30, parseInt(disponibilidad.horaDesde), parseInt(disponibilidad.horaHasta)));

    

  }

  seleccionarEspecialidad($event:any){
    // console.log($event.target.value);
    this.especialidadSeleccionada = $event.target.value
  }

  validarHora(){
    let horaDesde = parseInt(this.disponibilidadForm.get('horaDesde')?.value);
    let horaHasta = parseInt(this.disponibilidadForm.get('horaHasta')?.value);

    console.log(horaDesde,typeof(horaDesde));
    console.log(horaHasta,typeof(horaHasta));
    if(horaDesde == horaHasta || horaDesde > horaHasta){

      
      this.disponibilidadForm.get('horaHasta')?.setErrors({'igualMayor':true});
    }else{
      this.disponibilidadForm.get('horaHasta')?.setErrors(null);
    }

    // console.log(this.disponibilidadForm.value);
  }
  formatearHorario(hora:string,minutos:string):string{
    return `${hora}:${minutos}`;
  }


  

};

// console.log(everyNminutes(15));


