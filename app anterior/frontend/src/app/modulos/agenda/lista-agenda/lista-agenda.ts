import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-agenda',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lista-agenda.html',
  styleUrl: './lista-agenda.css'
})
export class ListaAgendaComponent {

  constructor(private router: Router) {}

  irAlMenu(): void {
    this.router.navigate(['/dashboard']);
  }

  agendarCita(): void {
    this.router.navigate(['/agenda/nuevo']);
  }

  nuevoCliente(): void {
    this.router.navigate(['/clientes/nuevo']);
  }
}