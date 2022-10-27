import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userUid!:string;
  userRol!:string | undefined;
  user!:Usuario | undefined;
  constructor(private authService: AuthService, private userService: UsuarioService) { }

  ngOnInit(): void {
    this.authService.getUserLogged().subscribe(async data =>{
      this.user = await this.userService.obtenerUsuario(data?.uid);
      this.userRol = this.user?.rol;
    })
  }

}
