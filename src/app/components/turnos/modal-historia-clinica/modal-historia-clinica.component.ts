import { Component, OnInit, Input } from '@angular/core';
import { Turno } from 'src/app/interfaces/turno.interface';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { TurnosService } from 'src/app/services/turnos.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HistoriaClinica } from 'src/app/interfaces/historiaClinica.interface';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-modal-historia-clinica',
  templateUrl: './modal-historia-clinica.component.html',
  styleUrls: ['./modal-historia-clinica.component.css']
})
export class ModalHistoriaClinicaComponent implements OnInit {

  @Input() dataTurno!: Turno;

  historiaClinica! : HistoriaClinica;
  historiaClinicaForm!: FormGroup
  constructor(private fb:FormBuilder, private turnoService: TurnosService, private snackBar: MatSnackBar,
    private userService: UsuarioService) { 
    this.historiaClinicaForm = fb.group({
      altura:['',Validators.required],
      peso:['',Validators.required],
      temperatura:['',Validators.required],
      presion:['',Validators.required],
      dato1:['',Validators.required],
      valorDato1:['',Validators.required],
      dato2:[''],
      valorDato2:[''],
      dato3:[''],
      valorDato3:['']
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
  enviar(){
    console.log(this.dataTurno.paciente.uid);
    console.log(this.historiaClinicaForm.value);

    let altura = this.historiaClinicaForm.get('altura')?.value;
    let peso = this.historiaClinicaForm.get('peso')?.value;
    let temperatura = this.historiaClinicaForm.get('temperatura')?.value;
    let presion = this.historiaClinicaForm.get('presion')?.value;
    let datosDinamicos = {
      [this.historiaClinicaForm.get('dato1')?.value] : this.historiaClinicaForm.get('valorDato1')?.value,
      [this.historiaClinicaForm.get('dato2')?.value] : this.historiaClinicaForm.get('valorDato2')?.value,
      [this.historiaClinicaForm.get('dato3')?.value] : this.historiaClinicaForm.get('valorDato3')?.value,
    }

    for(const key in datosDinamicos){
      if(!key){
        delete datosDinamicos[key];
      }
      
    }

    
    this.historiaClinica ={
      altura: altura,
      peso: peso,
      temperatura: temperatura,
      presion: presion,
      datosDinamicos: datosDinamicos,
      turno: this.dataTurno.id
    }

    let data = {
      historiaClinica: this.historiaClinica
    }

   
    this.userService.actualizarUsuario(data, this.dataTurno.paciente.uid);
    this.historiaClinicaForm.reset();
    this.snackBar.open('Se guardo la historia clinica correctamente','Cerrar');
  }

  // HistoriaClinica ={
  //   altura:'',
  //   peso:'',
  //   temperatura:'',
  //   presion:'',
  //   [key:string]:string | number

  // }

}
