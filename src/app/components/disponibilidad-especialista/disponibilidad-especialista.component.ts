import { Component, Input, OnInit } from '@angular/core';
import { Especialidad } from 'src/app/interfaces/especialidad.interface';
import { EspecialidadesService } from 'src/app/services/especialidades.service';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FormBuilder,FormGroup, SelectControlValueAccessor, Validators } from '@angular/forms';
import { Disponibilidad } from 'src/app/interfaces/disponibilidad.interface';
import { DisponibilidadService } from 'src/app/services/disponibilidad.service';


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
  constructor(private especialidadService: EspecialidadesService, private userService: UsuarioService,private disponibilidadService: DisponibilidadService,private fb :FormBuilder) {
    this.disponibilidadForm = fb.group({
      horaDesde:['',[Validators.required]],
      horaHasta:['',[Validators.required]]
    })
   }

  ngOnInit(): void {
    console.log(this.especialista);
    // console.log(this.crearIntervalos(30));

    this.crearTurno();
  }

  guardarDisponibilidad(){



    // let horaParseada = this.formatearHorario(this.disponibilidadForm.get('horaDesde')?.value,this.disponibilidadForm.get('horaHasta')?.value);


    this.disponibilidad = {
      especialista: this.especialista,
      especialidad: this.especialidadSeleccionada,
      horaDesde: this.disponibilidadForm.get('horaDesde')?.value,
      horaHasta: this.disponibilidadForm.get('horaHasta')?.value
    }


    console.log(this.disponibilidad);
    this.disponibilidadService.guardarDisponibilidad(this.disponibilidad);
    this.especialidadSeleccionada = '';

    // console.log(this.crearIntervalos(30, parseInt(disponibilidad.horaDesde), parseInt(disponibilidad.horaHasta)));

    

  }

  seleccionarEspecialidad($event:any){
    console.log($event.target.value);
    this.especialidadSeleccionada = $event.target.value
  }

  validarHora(){
    let horaDesde = this.disponibilidadForm.get('horaDesde')?.value;
    let horaHasta = this.disponibilidadForm.get('horaHasta')?.value;

    if(horaDesde == horaHasta || horaDesde > horaHasta){
      this.disponibilidadForm.get('horaHasta')?.setErrors({'igualMayor':true});
    }else{
      this.disponibilidadForm.get('horaHasta')?.setErrors(null);
    }

    console.log(this.disponibilidadForm.value);
  }
  formatearHorario(hora:string,minutos:string):string{
    return `${hora}:${minutos}`;
  }

  crearTurno(){
    var foo = [];
    for (var i = 10; i <= 12; i++) {
      var n = i%2==0 ? i/2+':00' : (i+1)/2-1+':30';
        if(parseInt(n)<10) //zero-left padding
      n = '0'+n;
      foo.push(n);
    }
    console.log(foo);
  }

  

};

// console.log(everyNminutes(15));


