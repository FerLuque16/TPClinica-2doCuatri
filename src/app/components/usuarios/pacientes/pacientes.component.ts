import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css']
})
export class PacientesComponent implements OnInit {

  displayedColumns: string[] = ['nombre','apellido','dni','email','obraSocial']

  pacientes: Usuario[]=[];
  constructor(private userService:UsuarioService) { }

  ngOnInit(): void {
    this.userService.traerUsuarios().subscribe( users =>{
      this.pacientes = users.filter( pac => pac.rol === 'paciente');
      // console.log(this.pacientes)
    })
  }

}
