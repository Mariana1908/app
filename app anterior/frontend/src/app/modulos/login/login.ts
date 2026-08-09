import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  usuario: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router) {}

  iniciarSesion(): void {
    // Resetea el mensaje de error al hacer click en el botón
    this.errorMessage = '';

    const usr = (this.usuario || '').trim();
    const pass = (this.password || '').trim();

    // Revisa que ambos campos tengan información
    if (!usr || !pass) {
      this.errorMessage = 'Datos incorrectos, intenta de nuevo.';
      return;
    }

    // Validación exacta con las credenciales proporcionadas
    if (usr === 'Administrador' && pass === '#3st3t!c4l30') {
      this.router.navigate(['/app/dashboard']);
    } else {
      this.errorMessage = 'Datos incorrectos, intenta de nuevo.';
    }
  }
}