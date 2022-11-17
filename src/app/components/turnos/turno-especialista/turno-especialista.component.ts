import { Component, OnInit } from '@angular/core';
import { Turno } from 'src/app/interfaces/turno.interface';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { AuthService } from 'src/app/services/auth.service';
import { DisponibilidadService } from 'src/app/services/disponibilidad.service';
import { TurnosService } from 'src/app/services/turnos.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { mergeMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HistoriaClinica } from 'src/app/interfaces/historiaClinica.interface';

@Component({
  selector: 'app-turno-especialista',
  templateUrl: './turno-especialista.component.html',
  styleUrls: ['./turno-especialista.component.css']
})
export class TurnoEspecialistaComponent implements OnInit {

  turnos:Turno[] = [];

  turnosAux :Turno[] = [];
  user!: Usuario | undefined;
  userUid!:string;
  userRol!:string | undefined;

  turnoAEnviar!: Turno;

  comentarioAEnviar!: Turno;

  historiaClinica!:HistoriaClinica;

  textoFiltroEstado:string ='';
  textoFiltroEspecialidad:string ='';
  textoFiltroPaciente:string ='';
  textoFiltroEspecialista:string ='';
  textoFiltroHistoriaClinica:string ='';

  constructor(private userService: UsuarioService, private disponibilidadService: DisponibilidadService, private turnoService: TurnosService, private authService: AuthService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.authService.getUserLogged().pipe(
      mergeMap( async res1 => this.user = await this.userService.obtenerUsuario(res1?.uid)) 
    ).subscribe( data => {
      this.turnoService.traerTurnos().subscribe(turnos =>{
        this.turnos = turnos.filter( tur => tur.especialista.uid == data?.uid)

        // console.log(data);
        // console.log(turnos);
      })
    })
  }

  // Utilizar la funcion modificar del turnos service, si no está crearla, es igual que el editar que esta en el usuarioService
  // mostrarResenia(turno:Turno){
  //   this.comentarioAEnviar = turno.comentario!;
  // }
  mostrarResenia(turno:Turno){
    this.comentarioAEnviar = turno;
  }

  mostrarCalificacion(turno:Turno){
    this.comentarioAEnviar = turno;
  }

  modificarEstadoTurno(turno:Turno, estado: string){

    const data ={
      estado: estado
    }
    this.turnoService.modificarTurno(data, turno.id);
  }

  enviarComentario(turno:Turno, estado: string){

    this.turnoAEnviar = {...turno, estado:estado};

    // console.log(this.turnoAEnviar);

    // this.turnoService.modificarTurno(data, turno.id);
  }

  filtrarTabla(event: Event | any) {
    
    const filterValue = (event.target as HTMLInputElement).value.toLocaleLowerCase();
    
    let filtrar = true;
    
    if(filterValue.length == 1 && event.key != 'Backspace'){
      this.turnosAux = this.turnos;      
      
      //console.log('entro');      
    }else if(filterValue.length == 0 && event.key == 'Backspace'){
      this.turnos = this.turnosAux;
      filtrar=false;
    }
    //console.log(this.turnosAux);
    
    if(filtrar){
      //console.log(this.todosLosTurnos);
      let turnosFiltrados : Turno[] = [];
      
      
      this.turnosAux.forEach(
        
        t=>{
          
          if(t.especialidad.toLowerCase().includes(filterValue)){
            //console.log('entro');            
            if(!turnosFiltrados.includes(t)){
              turnosFiltrados.push(t)
            }
          }
          if(`${t.paciente.nombre} ${t.paciente.apellido}`.toLowerCase().includes(filterValue)){
            //console.log('entro al 2');
            
            if(!turnosFiltrados.includes(t)){
              turnosFiltrados.push(t)
            }
          }
          if(t.fecha.includes(filterValue)){
            //console.log('entro al 2');
            if(!turnosFiltrados.includes(t)){
              turnosFiltrados.push(t)
            }
          }
          if(t.hora.includes(filterValue)){
            //console.log('entro al 2');
            if(!turnosFiltrados.includes(t)){
              turnosFiltrados.push(t)
            }
          }
          if(t.estado.toLowerCase().includes(filterValue)){
            //console.log('entro al 2');
            if(!turnosFiltrados.includes(t)){
              turnosFiltrados.push(t)
            }
          }
          if(`${t.especialista.nombre} ${t.especialista.apellido}`.toLowerCase().includes(filterValue)){
            //console.log('entro al 2');
            if(!turnosFiltrados.includes(t)){
              turnosFiltrados.push(t)
            }
          }
          
        }
      )
      this.turnos = turnosFiltrados;
    }
    
  }

  mostrarHistoriaClinica(historiaClinica:HistoriaClinica){
    console.log(historiaClinica);
    this.historiaClinica = historiaClinica!;
    console.log(historiaClinica);
  }

  
}
