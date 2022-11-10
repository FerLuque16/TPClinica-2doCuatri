import { Component, OnInit, Input } from '@angular/core';
import { HistoriaClinica } from 'src/app/interfaces/historiaClinica.interface';

@Component({
  selector: 'app-mostrar-historia-clinica',
  templateUrl: './mostrar-historia-clinica.component.html',
  styleUrls: ['./mostrar-historia-clinica.component.css']
})
export class MostrarHistoriaClinicaComponent implements OnInit {

  @Input() historiaClinica! : HistoriaClinica;
  constructor() { }

  ngOnInit(): void {
  }

}
