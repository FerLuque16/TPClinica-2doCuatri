import { Component, OnInit } from '@angular/core';
import { Especialidad } from 'src/app/interfaces/especialidad.interface';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { AuthService } from 'src/app/services/auth.service';
import { ImagenService } from 'src/app/services/imagen.service';
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

  constructor(private authService: AuthService, private userService: UsuarioService, private imagenService: ImagenService) { }

  ngOnInit(): void {
    this.authService.getUserLogged().subscribe(async data =>{
      this.user = await this.userService.obtenerUsuario(data?.uid);
      console.log(this.user);
      this.userRol = this.user?.rol;
      this.listaEspecialidades = this.user?.especialidades!;

      this.imagenService.descargarImagen(this.user?.imagen1).subscribe(url =>{
        this.urlImagen = url;

        console.log(this.urlImagen);
      })
    })
  }

  coleccionDisponibilidad={
    medico:{},
    especialidad:{},
    duracion:{},
    desde:'',
    hasta:'',
    dias:{
      lunes:{
        duracion:30,
        cantidadDeTurnos:4,
        desde:'12:00',
        hasta:'14:00'
      },
      martes:{
        duracion:30,
        cantidadDeTurnos:4,
        desde:'desde',
        hasta:'12:00'},
      miercoles:{
        duracion:30,
        cantidadDeTurnos:4,
        desde:'desde',
        hasta:'14:00'},
      jueves:{
        duracion:30,
        cantidadDeTurnos:4,
        desde:'desde',
        hasta:'hasta'
      },
      viernes:{
        duracion:30,
        cantidadDeTurnos:4,
        desde:'desde',
        hasta:'hasta'
      },
      sabado:{
        duracion:30,
        cantidadDeTurnos:4,
        desde:'desde',
        hasta:'hasta'
      }
    }

  }

  coleccionTurnos={
    turno:{
      medico:{},
      paciente:{},
      especialidad:{},
      estado:'',
      dia:'Lunes',
      desde:'12:00',
      hasta:'12:30',
    }

  }
}
