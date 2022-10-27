import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-especialistas',
  templateUrl: './especialistas.component.html',
  styleUrls: ['./especialistas.component.css']
})
export class EspecialistasComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'apellido', 'dni', 'email','especialidad','habilitado'];
  especialistas : Usuario[] = [];

  constructor(private userService:UsuarioService) { }

  ngOnInit(): void {
    this.userService.traerUsuarios().subscribe( users =>{
      this.especialistas = users.filter( med => med.rol === 'especialista')
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
