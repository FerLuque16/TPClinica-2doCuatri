import { Component, OnInit } from '@angular/core';
import { merge, mergeMap } from 'rxjs';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AuthService } from 'src/app/services/auth.service';
import { TurnosService } from 'src/app/services/turnos.service';
import { ImagenService } from 'src/app/services/imagen.service';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { Turno } from 'src/app/interfaces/turno.interface';
import { HistoriaClinica } from 'src/app/interfaces/historiaClinica.interface';


@Component({
  selector: 'app-pacientes-atendidos',
  templateUrl: './pacientes-atendidos.component.html',
  styleUrls: ['./pacientes-atendidos.component.css']
})
export class PacientesAtendidosComponent implements OnInit {

  turnosMedico !: Turno[];
  medicoLogueado !: Usuario | undefined;
  pacientesAtendidos : Usuario[] = [];
  pacientesAtendidosAux : string[] = [];
  displayedColumns: string[] = ['fecha', 'especialidad', 'acciones'];
  detalleTurnosPaciente : Turno[] = []

  mostrarModalComentario:boolean = false;
  mostrarModalHistoria:boolean = false;


  turnoResenia !: any;
  historiaClinicaPaciente !: any;

  pacienteSeleccionado!:Usuario;

  constructor(private userService: UsuarioService, private authService: AuthService, private turnoService: TurnosService,
              private imagenService : ImagenService) { }

  ngOnInit(): void {
    this.traerPacientes();
  }


  traerPacientes(){
    this.authService.getUserLogged().pipe(
      mergeMap(async res1 => this.medicoLogueado = await this.userService.devolverDataUsuarioDB(res1?.uid))
    ).subscribe(data =>{

      this.turnoService.traerTurnos().subscribe(turnos =>{
        
        this.turnosMedico = turnos.filter( t => t.especialista.uid == data?.uid && t.estado == 'realizado')

        this.turnosMedico.forEach(tm =>{
          if(!this.pacientesAtendidosAux.includes(tm.paciente.uid)){
            this.pacientesAtendidosAux.push(tm.paciente.uid)
          }
        })

        for (let j = 0; j < this.pacientesAtendidosAux.length; j++) {
          for (let i = 0; i < this.turnosMedico.length; i++) {
            if(this.turnosMedico[i].paciente.uid == this.pacientesAtendidosAux[j]){
              
              this.pacientesAtendidos.push(this.turnosMedico[i].paciente);              
              break;
            }
          }
        }

        this.pacientesAtendidos.forEach(
          pac=>{            
            this.imagenService.descargarImagen(pac.imagen1).subscribe(
              url=>{
                pac.imagen1 = url;
              }
            )
          }
        )


      })
    })
  }

  verTurnosPaciente(paciente:Usuario){
    this.detalleTurnosPaciente = this.turnosMedico.filter(t=> t.paciente.uid == paciente.uid);
    this.pacienteSeleccionado = paciente;
    console.log(this.detalleTurnosPaciente);
  }

  verResenia(turno : Turno){
    this.turnoResenia = turno;
    // this.turnoResenia.verResenia = true;

    this.mostrarModalComentario;
  }

  verHistClin(historiaClinica: HistoriaClinica){
    // let pacAux = await this.userService.devolverDataUsuarioDB(paciente.uid.toString())
    
    // this.historiaClinicaPac = pacAux?.historiaClinica;

    this.historiaClinicaPaciente = historiaClinica;
    this.mostrarModalHistoria;
    
    
  }
}
