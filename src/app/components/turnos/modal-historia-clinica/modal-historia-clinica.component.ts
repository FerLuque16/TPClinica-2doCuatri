import { Component, OnInit, Input } from '@angular/core';
import { Turno } from 'src/app/interfaces/turno.interface';

@Component({
  selector: 'app-modal-historia-clinica',
  templateUrl: './modal-historia-clinica.component.html',
  styleUrls: ['./modal-historia-clinica.component.css']
})
export class ModalHistoriaClinicaComponent implements OnInit {

  @Input() dataTurno!: Turno;
  constructor() { }

  ngOnInit(): void {
  }

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value);
    }

    return value;
  }
  enviar(){
    console.log(this.dataTurno);
  }

  // HistoriaClinica ={
  //   altura:'',
  //   peso:'',
  //   temperatura:'',
  //   presion:'',
  //   [key:string]:string | number

  // }

}
