import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { ServicioService, Servicio } from '../../../servicios/servicio.service';

@Component({
  selector: 'app-agendar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './agendar.component.html',
  styleUrl: './agendar.component.css'
})
export class AgendarComponent implements OnInit {

  // Propiedades del formulario
  clienteSearch: string = '';
  estilista: string = '';
  servicio: number | null = null;
  fecha: string = '';
  horaInicio: string = '';
  horaFin: string = '';
  anticipo: number = 0;
  notas: string = '';

  servicios: Servicio[] = [];

  estilistas: { id: number; nombre: string }[] = [
    { id: 1, nombre: 'Administrador' },
    { id: 2, nombre: 'Jesus' },
    { id: 3, nombre: 'Mariana' }
  ];

  constructor(
    private serviciosService: ServicioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarServicios();
  }

  cargarServicios(): void {
    this.serviciosService.getServicios().subscribe({
      next: (data) => {
        this.servicios = data;
      },
      error: (err) => console.error('Error al cargar servicios:', err)
    });
  }

  volverAlPanel(): void {
    this.router.navigate(['/dashboard']);
  }

  cancelar(): void {
    this.router.navigate(['/agenda']);
  }

  agendarCita(): void {
    const nuevaCita = {
      cliente: this.clienteSearch,
      estilista: this.estilista,
      servicioId: this.servicio,
      fecha: this.fecha,
      horaInicio: this.horaInicio,
      horaFin: this.horaFin,
      anticipo: this.anticipo,
      notas: this.notas
    };

    console.log('Cita registrada:', nuevaCita);
    alert('¡Cita agendada con éxito!');
    this.resetForm();
    this.router.navigate(['/agenda']); // Redirige a la lista de agenda
  }

  resetForm(): void {
    this.clienteSearch = '';
    this.estilista = '';
    this.servicio = null;
    this.fecha = '';
    this.horaInicio = '';
    this.horaFin = '';
    this.anticipo = 0;
    this.notas = '';
  }
}