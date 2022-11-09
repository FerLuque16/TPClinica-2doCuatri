import { Component, OnInit, Input } from '@angular/core';
import { Turno } from 'src/app/interfaces/turno.interface';

@Component({
  selector: 'app-modal-comentario',
  templateUrl: './modal-comentario.component.html',
  styleUrls: ['./modal-comentario.component.css']
})
export class ModalComentarioComponent implements OnInit {

  @Input() comentarioTurno!: Turno;
  constructor() { }

  ngOnInit(): void {
  }

}
