import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCambiarColorLogin]'
})
export class CambiarColorLoginDirective {

  constructor(private el:ElementRef, private renderer: Renderer2) { }

  ngOnInit(){

  }

  @HostListener('mouseenter') mouseHover(eventData: Event){
    
    
    this.renderer.setStyle(this.el.nativeElement,'font-weight','bold')
    this.renderer.setStyle(this.el.nativeElement,'color','green')
    
  }
  @HostListener('mouseleave') mouseLeave(eventData: Event){
    this.renderer.setStyle(this.el.nativeElement,'font-weight','normal')
    this.renderer.setStyle(this.el.nativeElement,'color','black')
  }
  

}
