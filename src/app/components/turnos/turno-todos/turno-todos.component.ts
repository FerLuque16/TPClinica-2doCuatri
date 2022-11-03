import { Component, OnInit } from '@angular/core';
import { Turno } from 'src/app/interfaces/turno.interface';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { AuthService } from 'src/app/services/auth.service';
import { DisponibilidadService } from 'src/app/services/disponibilidad.service';
import { TurnosService } from 'src/app/services/turnos.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { mergeMap } from 'rxjs';

@Component({
  selector: 'app-turno-todos',
  templateUrl: './turno-todos.component.html',
  styleUrls: ['./turno-todos.component.css']
})
export class TurnoTodosComponent implements OnInit {

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
        this.turnos = turnos;
      })
    })
  }

  cancelarTurno(){
    
  }

}
