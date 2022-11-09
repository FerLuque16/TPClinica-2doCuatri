import { Component, Input, OnInit } from '@angular/core';
import { Turno } from 'src/app/interfaces/turno.interface';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { TurnosService } from 'src/app/services/turnos.service';

@Component({
  selector: 'app-modal-encuesta',
  templateUrl: './modal-encuesta.component.html',
  styleUrls: ['./modal-encuesta.component.css']
})
export class ModalEncuestaComponent implements OnInit {

  encuestaForm!:FormGroup;

  @Input() turno!: Turno;
  constructor(private fb:FormBuilder, private turnoService: TurnosService) {
    this.encuestaForm = fb.group({
      puntaje:['',Validators.required],
      calidadDeAtencion:['',Validators.required],
      texto:['',[Validators.required,Validators.minLength(5)]]
    })
   }

  ngOnInit(): void {
  }

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value);
    }

    return value;
  }
  enviarEncuesta(){
    console.log(this.turno);
    // let encuesta = {...this.encuestaForm.value};

    let data={
      encuesta: this.encuestaForm.value
    }
    

    // let encuesta ={

    // }



    this.turnoService.modificarTurno(data,this.turno.id);



    console.log(this.encuestaForm.value);
  }

}
