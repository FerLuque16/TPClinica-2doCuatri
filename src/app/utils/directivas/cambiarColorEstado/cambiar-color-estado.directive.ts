import { Directive, ElementRef, Input} from '@angular/core';

@Directive({
  selector: '[appCambiarColorEstado]'
})
export class CambiarColorEstadoDirective {

  @Input() appCambiarColorEstado: string ='';

  constructor(private el:ElementRef) { }

  ngOnInit(){
    this.cambiarColor(this.el);
  }

  private cambiarColor(el:ElementRef){
    switch (this.appCambiarColorEstado) {
      case 'realizado':
      case 'aceptado':
        el.nativeElement.style.color = 'green'
        break;

      case 'solicitado':
        el.nativeElement.style.color = 'blue';
        break;

      case 'rechazado':
      case 'cancelado':
        el.nativeElement.style.color = 'red'  
        break

      default:
        break;
    }
  }
}
