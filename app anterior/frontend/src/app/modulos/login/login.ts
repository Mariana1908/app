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
export class Login {
  usuario: string = '';
  password: string = '';

  constructor(private router: Router) {}

  iniciarSesion(): void {
    if (this.usuario.trim() !== '' && this.password.trim() !== '') {
      this.router.navigate(['/dashboard']);
    } else {
      alert('Por favor, ingresa tu usuario y contraseña.');
    }
  }
}