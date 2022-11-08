import { Component, OnInit } from '@angular/core';
import { Turno } from 'src/app/interfaces/turno.interface';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { AuthService } from 'src/app/services/auth.service';
import { DisponibilidadService } from 'src/app/services/disponibilidad.service';
import { TurnosService } from 'src/app/services/turnos.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { mergeMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-turno-especialista',
  templateUrl: './turno-especialista.component.html',
  styleUrls: ['./turno-especialista.component.css']
})
export class TurnoEspecialistaComponent implements OnInit {

  turnos:Turno[] = [];
  user!: Usuario | undefined;
  userUid!:string;
  userRol!:string | undefined;

  turnoAEnviar!: Turno;

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
  aceptarTurno(){

  }
  finalizarTurno(){

  }

  cancelarTurno(){

  }
  rechazarTurno(){

  }
  mostrarResenia(){

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
}
