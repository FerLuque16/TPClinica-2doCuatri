import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { misAnimaciones} from './app.animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations:[misAnimaciones]
})
export class AppComponent {
  title = 'TpClinica';

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
