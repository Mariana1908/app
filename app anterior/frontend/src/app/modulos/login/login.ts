import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // 👈 Importante para habilitar [(ngModel)]
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule], // 👈 Asegúrate de agregarlo aquí
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  usuario: string = '';
  password: string = '';

  constructor(private router: Router) {}

  iniciarSesion(): void {
    // Aquí puedes meter tu validación de credenciales
    if (this.usuario && this.password) {
      // Redirige al panel principal
      this.router.navigate(['/app/dashboard']);
    }
  }
}