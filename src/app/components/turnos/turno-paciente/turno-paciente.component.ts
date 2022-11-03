import { Component, OnInit } from '@angular/core';
import { Turno } from 'src/app/interfaces/turno.interface';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { AuthService } from 'src/app/services/auth.service';
import { DisponibilidadService } from 'src/app/services/disponibilidad.service';
import { TurnosService } from 'src/app/services/turnos.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { mergeMap } from 'rxjs';

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


  constructor(private userService: UsuarioService, private disponibilidadService: DisponibilidadService, private turnoService: TurnosService, private authService: AuthService) { }

  ngOnInit(): void {
    // this.authService.getUserLogged().subscribe(async data =>{
    //   this.user = await this.userService.obtenerUsuario(data?.uid);
    //   this.userRol = this.user?.rol;

    //   console.log(this.user);
      
    // })

    // this.turnoService.traerTurnos().subscribe(data => {
    //   console.log(data);
    //   data.forEach(tur =>{

        
    //     console.log(tur.paciente.uid, this.user?.uid);
    //   });

      
    // })

    this.authService.getUserLogged().pipe(
      mergeMap( async res1 => this.user = await this.userService.obtenerUsuario(res1?.uid)) 
    ).subscribe( data => {
      this.turnoService.traerTurnos().subscribe(turnos =>{
        this.turnos = turnos.filter( tur => tur.paciente.uid == data?.uid)

        // console.log(data);
        // console.log(turnos);
      })
    })
  }

  verResenia(){

  }

  calificarAtencion(){

  }

  cancelarTurno(){
    
  }
}
