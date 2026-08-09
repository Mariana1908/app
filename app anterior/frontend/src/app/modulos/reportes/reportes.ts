import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [RouterModule], // Necesario en componentes Standalone para el ruteo
  templateUrl: './reportes.html',
  styleUrl: './reportes.css'
})
export class ReportesComponent {

  constructor(private router: Router) {}

  volverAlPanel(): void {
    this.router.navigate(['/app/dashboard']); // Ruta corregida con el prefijo /app
  }

}