import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-captcha',
  templateUrl: './captcha.component.html',
  styleUrls: ['./captcha.component.css']
})
export class CaptchaComponent implements OnInit {

  listaOpciones: string[] = ['perro','gato','tortuga','pajaro'];
  opcionesDesordenadas : string[] = [];

  @Output() enviarCaptcha : EventEmitter<any> = new EventEmitter<any>();
  constructor(private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.desordenarOpciones();
  }


  validarCaptcha(animal:string){
    let captchaValido = animal == 'perro'

    if(!captchaValido){
      this.snackBar.open("Captcha erroneo","Cerrar");
      this.opcionesDesordenadas = [];
      this.desordenarOpciones();
    }
    else{
      this.enviarCaptcha.emit(captchaValido);
    }

    
  }


  desordenarOpciones(){
    this.opcionesDesordenadas.push(this.listaOpciones[this.devolverNumeroRandom(0,3)]);

    while(this.opcionesDesordenadas.length != this.listaOpciones.length){
      let opcion = this.listaOpciones[this.devolverNumeroRandom(0,3)];
      if(!this.opcionesDesordenadas.includes(opcion)){
        this.opcionesDesordenadas.push(opcion)
      }
    } 
  }

  devolverNumeroRandom(min:number, max:number){
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1) + min);
  }

}
