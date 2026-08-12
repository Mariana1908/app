import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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
    private http: HttpClient,
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

  // Redirige al panel de la agenda
  volverAlPanel(): void {
    this.router.navigate(['/app/agenda']);
  }

  cancelar(): void {
    this.router.navigate(['/app/agenda']);
  }

  agendarCita(): void {
    // 1. Validaciones de campos obligatorios
    if (!this.clienteSearch || !this.clienteSearch.trim()) {
      alert('Por favor, ingresa el nombre del cliente.');
      return;
    }

    if (!this.estilista) {
      alert('Por favor, selecciona un estilista.');
      return;
    }

    if (!this.servicio) {
      alert('Por favor, selecciona un servicio.');
      return;
    }

    if (!this.fecha) {
      alert('Por favor, selecciona la fecha.');
      return;
    }

    if (!this.horaInicio) {
      alert('Por favor, selecciona la hora de inicio.');
      return;
    }

    // 2. Construcción del objeto Cita ajustado a la BD
    const nuevaCita = {
      cliente: this.clienteSearch.trim(),
      estilista: this.estilista,
      servicioId: this.servicio,
      fecha: this.fecha,
      horaInicio: this.horaInicio,
      notas: this.notas
    };

    // 3. Envío al Backend
    this.http.post('http://localhost:3000/api/agenda', nuevaCita).subscribe({
      next: (res: any) => {
        alert('¡Cita agendada con éxito!');
        this.resetForm();
        this.router.navigate(['/app/agenda']);
      },
      error: (err) => {
        console.error('Error al guardar cita en backend:', err);
        alert('Ocurrió un error al guardar la cita en la base de datos.');
      }
    });
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