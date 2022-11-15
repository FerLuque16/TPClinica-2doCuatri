import { Component, OnInit } from '@angular/core';
import { mergeMap } from 'rxjs';
import { Especialidad } from 'src/app/interfaces/especialidad.interface';
import { HistoriaClinica } from 'src/app/interfaces/historiaClinica.interface';
import { Turno } from 'src/app/interfaces/turno.interface';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { AuthService } from 'src/app/services/auth.service';
import { ImagenService } from 'src/app/services/imagen.service';
import { PdfService } from 'src/app/services/pdf.service';
import { TurnosService } from 'src/app/services/turnos.service';
import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  userUid!:string;
  userRol!:string | undefined;
  user!:Usuario | undefined;

  urlImagen:string = '';

  listaEspecialidades: string[] = [];

  turnosDelUsuario: Turno[] = [];

  listaEspecialistasAux:string[] = [];

  listaEspecialistas: Usuario[] = [];

  turnosDelUsuarioFiltrado: Turno[] = [];

  constructor(private authService: AuthService, private userService: UsuarioService, private imagenService: ImagenService,
              private turnosService: TurnosService,private pdfService: PdfService ) { }

  ngOnInit(): void {
    this.traerTurnos();
    // this.authService.getUserLogged().subscribe(async data =>{
    //   this.user = await this.userService.obtenerUsuario(data?.uid);
    //   console.log(this.user);
    //   this.userRol = this.user?.rol;
    //   this.listaEspecialidades = this.user?.especialidades!;

    //   this.imagenService.descargarImagen(this.user?.imagen1).subscribe(url =>{
    //     this.urlImagen = url;

    //     console.log(this.urlImagen);
    //   })
    // })

    // this.turnosService.traerTurnos().subscribe(turnos =>{
    //   console.log(turnos);
    //   this.turnosDelUsuario = turnos.filter(t =>{
        
    //     console.log(t.paciente.uid, this.user?.uid );
    //     return t.paciente.uid == this.user?.uid;
    //   })
    //   console.log(this.turnosDelUsuario);
    // })

    


    
  }
  traerTurnos(){
    this.authService.getUserLogged().pipe(
      mergeMap(async res1 => {
        this.user = await this.userService.devolverDataUsuarioDB(res1?.uid);
        this.userRol = this.user?.rol;
        this.listaEspecialidades = this.user?.especialidades!;
        this.imagenService.descargarImagen(this.user?.imagen1).subscribe(url =>{
          this.urlImagen = url;
  
          
        })
      })
    ).subscribe(data =>{
      this.turnosService.traerTurnos().subscribe(turnos =>{
        this.turnosDelUsuario = turnos.filter(t => t.paciente.uid == this.user?.uid && t.estado == 'realizado');
        // console.log(this.turnosDelUsuario);
        this.turnosDelUsuario.forEach( tu =>{
          
          if(!this.listaEspecialistasAux.includes(tu.especialista.uid)){
            this.listaEspecialistasAux.push(tu.especialista.uid)
            
          }
        })

        for(let i = 0;i < this.listaEspecialistasAux.length; i++){
          for(let j = 0; j< this.turnosDelUsuario.length; j++){
            if(this.turnosDelUsuario[j].especialista.uid == this.listaEspecialistasAux[i]){
              this.listaEspecialistas.push(this.turnosDelUsuario[j].especialista);
              break;
            }
          }
        }

        

      })
    })
  }

  descargarHistoriaClinica(historiaClinica:HistoriaClinica){
    this.pdfService.descargarHistoriaClinica(historiaClinica);
  }

  especialistaSeleccionado(especialista:Usuario){
    

    this.turnosDelUsuarioFiltrado = this.turnosDelUsuario.filter( turno => turno.especialista.uid == especialista.uid);

    

    this.pdfService.descargarAtencionesFiltradas(this.turnosDelUsuarioFiltrado);
  }

 
}
