import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reportes',
  standalone: true,
  templateUrl: './reportes.html',
  styleUrl: './reportes.css'
})
export class ReportesComponent {

  constructor(private router: Router) {}

  volverAlPanel(): void {
    this.router.navigate(['/dashboard']);
  }

}