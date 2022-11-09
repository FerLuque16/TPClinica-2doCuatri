import { Component, OnInit } from '@angular/core';
import { Turno } from 'src/app/interfaces/turno.interface';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { AuthService } from 'src/app/services/auth.service';
import { DisponibilidadService } from 'src/app/services/disponibilidad.service';
import { TurnosService } from 'src/app/services/turnos.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { mergeMap } from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-turno-paciente',
  templateUrl: './turno-paciente.component.html',
  styleUrls: ['./turno-paciente.component.css']
})
export class TurnoPacienteComponent implements OnInit {

  turnos:Turno[] = [];
  user!: Usuario | undefined;
  userUid!:string;
  userRol!:string | undefined;

  turnoAEnviar!: Turno;
  comentarioAEnviar!:Turno;

  

  constructor(private userService: UsuarioService, private disponibilidadService: DisponibilidadService, private turnoService: TurnosService, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getUserLogged().pipe(
      mergeMap( async res1 => this.user = await this.userService.obtenerUsuario(res1?.uid)) 
    ).subscribe( data => {
      this.turnoService.traerTurnos().subscribe(turnos =>{
        this.turnos = turnos.filter( tur => tur.paciente.uid == data?.uid)
        
        console.log(turnos);
        // console.log(data);
        // console.log(turnos);
      })
    })
  }

  
  // mostrarResenia(turno:Turno){
  //   this.comentarioAEnviar = turno.comentario!;
  // }
  mostrarResenia(turno:Turno){
    this.comentarioAEnviar = turno;
  }


  enviarComentario(turno:Turno, estado: string){

    this.turnoAEnviar = {...turno, estado:estado};

    // console.log(this.turnoAEnviar);

    // this.turnoService.modificarTurno(data, turno.id);
  }
  enviarEncuesta(turno:Turno){
    this.turnoAEnviar = {...turno};
  }
  calificarAtencion(){

  }

  cancelarTurno(){
    
  }
}
