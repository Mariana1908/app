import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
// 1. Añade RouterLink aquí en la importación
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  // 2. Añade RouterLink aquí en el arreglo de imports
  imports: [FormsModule, RouterOutlet, RouterLink],
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
