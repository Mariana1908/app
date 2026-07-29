import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [FormsModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  servicios = [
    'Desarrollo web',
    'Diseño UI/UX',
    'Mantenimiento',
    'Soporte técnico',
    'Consultoría'
  ];
  servicioSeleccionado = this.servicios[0];
}
