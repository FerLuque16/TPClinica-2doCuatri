import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCambiarColorCard]'
})
export class CambiarColorCardDirective {

  @Input() appCambiarColorCard: string ='';
  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit(){
    this.cambiarColor(this.el);
  }
  cambiarColor(el: ElementRef){
    switch (this.appCambiarColorCard) {
      case 'paciente':

        this.renderer.setStyle(this.el.nativeElement,'border','2px solid green')
        this.renderer.setStyle(this.el.nativeElement,'background-color','rgba(76, 175, 80, 0.6)')
       
        
        break;
      case 'especialista':
        this.renderer.setStyle(this.el.nativeElement,'border','2px solid blue')
        this.renderer.setStyle(this.el.nativeElement,'background-color','rgba(10, 24, 178, 0.6)')
        break;
      case 'admin':
        
        this.renderer.setStyle(this.el.nativeElement,'border','2px solid black')
        this.renderer.setStyle(this.el.nativeElement,'background-color','rgba(167, 195, 29, 0.6)')
        break;
    
      default:
        break;
    }
  }

}
