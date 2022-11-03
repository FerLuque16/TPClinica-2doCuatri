import { Component, OnInit } from '@angular/core';
import { Disponibilidad } from 'src/app/interfaces/disponibilidad.interface';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { AuthService } from 'src/app/services/auth.service';
// import { UsuarioService } from 'src/app/services/turnos.service';
import { DisponibilidadService } from 'src/app/services/disponibilidad.service';
import { TurnosService } from 'src/app/services/turnos.service';
import { UsuarioService } from '../../../services/usuario.service';
import { FormBuilder,FormGroup, SelectControlValueAccessor, Validators } from '@angular/forms';

@Component({
  selector: 'app-solicitar-turno',
  templateUrl: './solicitar-turno.component.html',
  styleUrls: ['./solicitar-turno.component.css']
})
export class SolicitarTurnoComponent implements OnInit {

  especialistas : Usuario[] = [];
  todasLasDisponibilidades: Disponibilidad[] = [];

  especialidades: string[] = [];

  disponibilidadesFiltradas : Disponibilidad[] = [];

  especialidadesFiltradas : string[] = [];

  especialidad: string = '';
  especialista!: Usuario;
  fecha: string = '';
  hora:string = '';

  horarios:any[] = [];

  botonesHorarios:any[] = [];

  fechas: any[] = [];

  fechasParseadas: string[] = [];

  userUid!:string;
  userRol!:string | undefined;
  user!:Usuario | undefined;

  turnosForm!:FormGroup;
  formInvalido: boolean = true;

  

  constructor(private userService: UsuarioService, private disponibilidadService: DisponibilidadService, private turnoService: TurnosService, private authService: AuthService, private fb:FormBuilder){
    this.turnosForm = fb.group({
      especialista:[],
      especialidad:[],
      fecha:[],
      hora:[]
    })
  }

  ngOnInit(): void {
    this.authService.getUserLogged().subscribe(async data =>{
      this.user = await this.userService.obtenerUsuario(data?.uid);
      this.userRol = this.user?.rol;

      console.log(this.user);
      
    })

    this.disponibilidadService.traerDisponibilidades().subscribe( data =>{
      data.forEach(el => {
        // console.log(this.especialistas.includes(el.especialista));

        if(!this.especialidades.includes(el.especialidad)){

          this.especialidades.push(el.especialidad);
        }




        // this.especialistas =  this.especialistas.filter(esp => {

        //   console.log(esp.uid,el.especialista.uid);
        //   esp.uid != el.especialista.uid
        // });
        

        // Object.keys()
        // if(!this.especialistas.includes(el.especialista)){
        //   console.log(this.especialistas);
        //   console.log(el.especialista);
        //   this.especialistas.push(el.especialista)
        // }
      })



      console.log(this.especialidades);

      this.todasLasDisponibilidades = data;

      // console.log(this.disponibilidades);
      // console.log(this.especialistas);
    })
  }

  especialidadSeleccionada(especialidad:any){


    // console.log(especialista);
    this.formInvalido = true;
    this.especialidadesFiltradas = [];

    this.especialistas = [];

    this.fechasParseadas = [];

    this.botonesHorarios = []; 

    this.disponibilidadesFiltradas = this.todasLasDisponibilidades.filter(disp => disp.especialidad == especialidad);

    this.especialidad = especialidad;

    console.log(this.disponibilidadesFiltradas);

    this.disponibilidadesFiltradas.forEach( disp =>{

      this.especialistas.push(disp.especialista); 
    })

    this.turnosForm.controls['especialidad']?.patchValue(especialidad);

    // this.disponibilidadesFiltradas.forEach( disp => {
    //   this.especialidadesFiltradas.push(disp.especialidad)
    // })

    // console.log(this.disponibilidadesFiltradas);
    // console.log(this.especialidadesFiltradas);
  }

  especialistaSeleccionada(especialista:any){
    // console.log( especialista);
    // console.log(this.disponibilidadesFiltradas);

    // this.disponibilidadesFiltradas.forEach(disp =>{
    //   console.log(disp.especialista);
    //   console.log(especialista);
    // })

    this.especialista = especialista;
    this.botonesHorarios = [];
    this.formInvalido = true;
    this.turnosForm.controls['especialista']?.patchValue(`${especialista.nombre} ${especialista.apellido}`);
    
    this.horarios = this.disponibilidadesFiltradas.filter( disp => disp.especialista.uid == especialista.uid)

    console.log(this.horarios);

    let hoy = new Date();

    let fechaFutura = new Date(hoy.getFullYear(),hoy.getMonth(),hoy.getDate() + 14);

    this.fechas = this.getDatesInRange(hoy,fechaFutura);

    this.fechasParseadas = this.fechas.map(fecha =>{
      return `${fecha.getDate()}/${fecha.getMonth()+1}`
    })

    // console.log(fecha.getDate()+14, fecha.getMonth()+1);

    // console.log(fecha.getMonth()+1, fecha.getDay());

    // console.log(hoy);

    // console.log(fechaFutura.getMonth()+1, fechaFutura.getDate());
  }

  fechaSeleccionada(fecha:string){

    this.botonesHorarios = [];

    this.botonesHorarios = [...this.turnoService.crearIntervalos(30,parseInt(this.horarios[0].horaDesde),parseInt(this.horarios[0].horaHasta))];
    this.fecha = fecha;
    this.formInvalido = true;
    this.turnosForm.controls['fecha']?.patchValue(fecha);
    console.log(fecha);
  }

  horaSeleccionada(hora:string){
    this.hora = hora;
    this.formInvalido = false;
    this.turnosForm.controls['hora']?.patchValue(hora);
  }

  guardarTurno(){
  //   especialidad: string = '';
  // especialista!: Usuario;
  // fecha: string = '';
  // hora:string = '';
    let turno ={
      especialidad: this.especialidad,
      especialista: this.especialista,
      paciente: this.user,
      fecha: this.fecha,
      hora: this.hora
    }

    console.log(turno);
  }

  getDatesInRange(startDate:Date, endDate:Date){
    const date = new Date(startDate.getTime());
  
    const dates = [];

    let fechasParseadas = [];
  
    while (date <= endDate) {
      dates.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }

    console.log(dates);

    dates.forEach( date => {
      // console.log(`${date.getDate()}/${date.getMonth()+1}`);
      fechasParseadas.push(`${date.getDate()}/${date.getMonth()+1}`);
    })
    fechasParseadas = dates.map( date => {
      // console.log(`${date.getDate()}/${date.getMonth()+1}`);
      return `${date.getDate()}/${date.getMonth()+1}`;
    })
    
  
    // return fechasParseadas;
    return dates;
  }
  
  proximasDosSemanas(){
    var today = new Date();
    var nextweek = new Date(today.getFullYear(), today.getMonth(), today.getDate()+14);
    return nextweek;
}



}
