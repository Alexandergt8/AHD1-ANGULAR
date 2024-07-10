import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AplicacionComponent } from './aplicacion/aplicacion.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AplicacionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AHD1';
}
