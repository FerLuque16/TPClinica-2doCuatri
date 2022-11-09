import { Component, OnInit } from '@angular/core';
import { Disponibilidad } from 'src/app/interfaces/disponibilidad.interface';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { Turno } from 'src/app/interfaces/turno.interface';
import { AuthService } from 'src/app/services/auth.service';
// import { UsuarioService } from 'src/app/services/turnos.service';
import { DisponibilidadService } from 'src/app/services/disponibilidad.service';
import { TurnosService } from 'src/app/services/turnos.service';
import { UsuarioService } from '../../../services/usuario.service';
import { EspecialidadesService } from '../../../services/especialidades.service';
import { FormBuilder,FormGroup, SelectControlValueAccessor, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Especialidad } from 'src/app/interfaces/especialidad.interface';
import { mergeMap } from 'rxjs';
import { ImagenService } from 'src/app/services/imagen.service';


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
  paciente!:Usuario;

  horarios:any[] = [];

  botonesHorarios:any[] = [];

  fechas: any[] = [];

  fechasParseadas: string[] = [];

  userUid!:string;
  userRol!:string | undefined;
  user!:Usuario | undefined;

  turnosForm!:FormGroup;
  formInvalido: boolean = true;

  idPaciente:string = '';

  turno!:Turno;

  especialidadesObjeto: Especialidad[] = [];
  especialidadesFiltradasObjeto: Especialidad[] = [];

  esAdmin : boolean = false;
  mostrarEspec : boolean = true;
  todosLosPacientes : Usuario[] = []

  

  constructor(private userService: UsuarioService, private disponibilidadService: DisponibilidadService,
     private turnoService: TurnosService, private authService: AuthService, private fb:FormBuilder, private snackBar: MatSnackBar,
     private especialidadService: EspecialidadesService, private imagenService: ImagenService){
    this.turnosForm = fb.group({
      especialista:[],
      especialidad:[],
      fecha:[],
      hora:[],
      paciente:[]
    })
  }

  ngOnInit(): void {
    this.authService.getUserLogged().subscribe(async data =>{
      this.user = await this.userService.obtenerUsuario(data?.uid);
      this.paciente = this.user!;
      this.userRol = this.user?.rol;

      if(this.user?.rol == 'admin'){
        this.esAdmin = true;
        this.mostrarEspec = false;
        this.userService.traerUsuarios().subscribe(usuarios =>{
          this.todosLosPacientes = usuarios;
          this.todosLosPacientes = this.todosLosPacientes.filter( pac => pac.rol == 'paciente');
        })
      }

      // console.log(this.user);
      
    })

    // this.authService.getUserLogged().pipe(
    //   mergeMap( async res1 => this.user = await this.userService.obtenerUsuario(res1?.uid)) 
    // ).subscribe( data => {
    //   this.turnoService.traerTurnos().subscribe(turnos =>{
    //     this.turnos = turnos.filter( tur => tur.paciente.uid == data?.uid)
    //     this.dataSource = new MatTableDataSource(turnos)
        
    //   })
    // })

    this.especialidadService.traerTodasLasEspecialidades().pipe(
      mergeMap( res1 => this.especialidadesObjeto = res1)
    ).subscribe( dataEspecialidad =>{
      this.disponibilidadService.traerDisponibilidades().subscribe( data =>{
        data.forEach(el => {
          // console.log(this.especialistas.includes(el.especialista));
  
          if(!this.especialidades.includes(el.especialidad)){
  
            this.especialidades.push(el.especialidad);
          }
        })
        this.todasLasDisponibilidades = data;

        this.especialidadesObjeto.forEach(data =>{
          this.especialidades.forEach(e =>{
            if(e == data.descripcion && !this.especialidadesFiltradasObjeto.includes(data)){
              this.imagenService.descargarImagen(data.urlFoto).subscribe(url =>{
                console.log(url);
                data.urlFoto = url;
              })
              this.especialidadesFiltradasObjeto.push(data)
            }
          }
  
          )
        })
        
        
       
      })
      
      
    })

    
    // this.especialidadesObjeto 

    // this.disponibilidadService.traerDisponibilidades().subscribe( data =>{
    //   data.forEach(el => {
    //     console.log(this.especialistas.includes(el.especialista));

    //     if(!this.especialidades.includes(el.especialidad)){

    //       this.especialidades.push(el.especialidad);
    //     }




    //     this.especialistas =  this.especialistas.filter(esp => {

    //       console.log(esp.uid,el.especialista.uid);
    //       esp.uid != el.especialista.uid
    //     });
        

    //     Object.keys()
    //     if(!this.especialistas.includes(el.especialista)){
    //       console.log(this.especialistas);
    //       console.log(el.especialista);
    //       this.especialistas.push(el.especialista)
    //     }
    //   })



    //   // console.log(this.especialidades);

    //   this.todasLasDisponibilidades = data;

    //   // console.log(this.disponibilidades);
    //   // console.log(this.especialistas);
    // })
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

    // console.log(this.disponibilidadesFiltradas);

    this.disponibilidadesFiltradas.forEach( disp =>{

      // console.log(disp.especialista);
      if(!disp.especialista.imagen1.startsWith('https')){
        this.imagenService.descargarImagen(disp.especialista.imagen1).subscribe(url =>{
          disp.especialista.imagen1 = url;
        })
      }
      
      this.especialistas.push(disp.especialista);

    })

    this.turnosForm.controls['especialidad']?.patchValue(especialidad);
    this.turnosForm.controls['especialista']?.patchValue('');
    this.turnosForm.controls['fecha']?.patchValue('');
    this.turnosForm.controls['hora']?.patchValue('');

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
    this.turnosForm.controls['fecha']?.patchValue('');
    this.turnosForm.controls['hora']?.patchValue('');
    
    this.horarios = this.disponibilidadesFiltradas.filter( disp => disp.especialista.uid == especialista.uid)

    // console.log(this.horarios);

    let hoy = new Date();

    let fechaFutura = new Date(hoy.getFullYear(),hoy.getMonth(),hoy.getDate() + 14);

    this.fechas = this.getDatesInRange(hoy,fechaFutura);

    this.fechasParseadas = this.fechas.map(fecha =>{
      return `${fecha.getDate()}/${fecha.getMonth()+1}/${fecha.getFullYear()}`
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
    this.turnosForm.controls['hora']?.patchValue('');
    // console.log(fecha);
  }

  horaSeleccionada(hora:string){
    this.hora = hora;
    this.formInvalido = false;
    this.turnosForm.controls['hora']?.patchValue(hora);
  }

  async guardarTurno(){
  //   especialidad: string = '';
  // especialista!: Usuario;
  // fecha: string = '';
  // hora:string = '';

  this.idPaciente = this.user?.uid!;
  

  let anio = this.fecha.split('/')[2]
  let mes = this.fecha.split('/')[1]
  let dia = this.fecha.split('/')[0]
  let fechaParse = anio+'/'+mes+'/'+dia;

  this.turno ={
    especialidad: this.especialidad,
    especialista: this.especialista,
    paciente: this.paciente,
    fecha: this.fecha,
    hora: this.hora,
    estado: 'solicitado',
    id: this.especialista.uid + this.especialidad + Date.parse(fechaParse) + this.hora 
  }

    

    let turnoInvalido:Turno|undefined = await this.turnoService.devolverTurnoDB(this.turno.id);

    if(turnoInvalido) {
      this.snackBar.open('No se puede solicitar este turno porque ya está tomado or otro paciente','Cerrar')
    }
    else{
      this.turnoService.guardarTurno(this.turno);
      this.snackBar.open('Turno solicitado correctamente','Cerrar')
      
    }

    this.formInvalido = true;
    this.especialidadesFiltradas = [];
    this.especialistas = [];
    this.fechasParseadas = [];
    this.botonesHorarios = [];
    this.turnosForm.controls['especialidad']?.patchValue('');
    this.turnosForm.controls['especialista']?.patchValue('');
    this.turnosForm.controls['fecha']?.patchValue('');
    this.turnosForm.controls['hora']?.patchValue('');
    this.turnosForm.controls['paciente']?.patchValue(''); 

    
    // console.log(this.turno);
  }

  getDatesInRange(startDate:Date, endDate:Date){
    const date = new Date(startDate.getTime());
  
    const dates = [];

    let fechasParseadas = [];
  
    while (date <= endDate) {
      dates.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }

    // console.log(dates);

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

  cargarPaciente(paciente: Usuario){

    
    // this.especialidadesFiltradas = [];
    this.especialistas = [];
    this.fechasParseadas = [];
    this.botonesHorarios = [];
    this.turnosForm.controls['paciente']?.patchValue(`${paciente.nombre} ${paciente.apellido}`);
    this.turnosForm.controls['especialidad']?.patchValue('');
    this.turnosForm.controls['especialista']?.patchValue('');
    this.turnosForm.controls['fecha']?.patchValue('');
    this.turnosForm.controls['hora']?.patchValue(''); 


    this.formInvalido = true;
    this.mostrarEspec = true;
    this.paciente = paciente;

  }
  
  proximasDosSemanas(){
    var today = new Date();
    var nextweek = new Date(today.getFullYear(), today.getMonth(), today.getDate()+14);
    return nextweek;
}

formatoHora(){
  // console.log(Date.parse());
}

}
