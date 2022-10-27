import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  especialistas : Usuario[] = [];
  pacientes: Usuario[]=[];

  columnasPacientes: string[] = ['nombre','apellido','dni','email','obraSocial'];
  columnasEspecialistas : string[] = ['nombre', 'apellido', 'dni', 'email','especialidad','habilitado'];
  constructor(private userService:UsuarioService) { }

  ngOnInit(): void {
    this.userService.traerUsuarios().subscribe( users =>{
      this.pacientes = users.filter( pac => pac.rol === 'paciente');
      this.especialistas = users.filter( med => med.rol === 'especialista')

      // console.log(this.pacientes)
    })
  }

  cambiarEstados(event:any,id:string){
    let atributo = event.source.name;
    let valor = event.checked;
    const data = {
      [atributo]:valor
    };

    this.userService.actualizarUsuario(data,id);
  }

}
