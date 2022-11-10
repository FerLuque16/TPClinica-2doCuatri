import { Component, OnInit, Input, Output } from '@angular/core';
import { Turno } from 'src/app/interfaces/turno.interface';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { TurnosService } from 'src/app/services/turnos.service';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-modal-turno',
  templateUrl: './modal-turno.component.html',
  styleUrls: ['./modal-turno.component.css']
})
export class ModalTurnoComponent implements OnInit {

  mostrarModalHistoriaClinica: boolean = false;
  @Input() dataTurno!:Turno;
  
  dataForm!: FormGroup;
  constructor(private fb:FormBuilder, private turnoService: TurnosService, private snackBar: MatSnackBar) {
    this.dataForm = fb.group({
      comentario:['',Validators.required]
    })
   }

  ngOnInit(): void {
    // console.log(this.dataTurno);
  }


  enviarDatos(){
    console.log(this.dataTurno);

    

    if(this.dataTurno.estado == 'calificar'){
      this.dataTurno.calificacion = this.dataForm.get('comentario')?.value;
      this.dataTurno.estado = 'realizado';
    }
    else{
      this.dataTurno.comentario = this.dataForm.get('comentario')?.value;
    }
    
    this.turnoService.modificarTurno(this.dataTurno, this.dataTurno.id);
    this.dataForm.reset();
    // this.mostrarModalHistoriaClinica = true;
  }

  resetForm(){
    console.log(this.dataTurno);
    this.dataForm.reset();
  }

}
