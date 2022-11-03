import { Component, OnInit } from '@angular/core';
import { Turno } from 'src/app/interfaces/turno.interface';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { AuthService } from 'src/app/services/auth.service';
import { DisponibilidadService } from 'src/app/services/disponibilidad.service';
import { TurnosService } from 'src/app/services/turnos.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { mergeMap } from 'rxjs';

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

  constructor(private userService: UsuarioService, private disponibilidadService: DisponibilidadService, private turnoService: TurnosService, private authService: AuthService) { }

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
}
