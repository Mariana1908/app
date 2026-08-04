import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

// Importación manteniendo los 3 niveles de profundidad corregidos
import { ServicioService, Servicio } from '../../../servicios/servicio.service';

@Component({
  selector: 'app-agendar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './agendar.component.html',
  styleUrl: './agendar.component.css'
})
export class AgendarComponent implements OnInit {

  // Propiedades requeridas por la plantilla HTML
  clienteSearch: string = '';
  estilista: string = '';
  servicio: number | null = null;
  fecha: string = '';
  horaInicio: string = '';
  horaFin: string = '';
  notas: string = '';

  // Arreglo para mapear la respuesta del backend
  servicios: Servicio[] = [];

  // Lista estática provisional de estilistas (o puedes traerla luego de un servicio)
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

  // Consulta los servicios desde la API Express/MySQL
  cargarServicios(): void {
    this.serviciosService.getServicios().subscribe({
      next: (data) => {
        this.servicios = data;
      },
      error: (err) => console.error('Error al cargar servicios:', err)
    });
  }

  // Navega de regreso al panel general
  volverAlPanel(): void {
    this.router.navigate(['/agenda']);
  }

  // Envía el formulario de la cita
  agendarCita(): void {
    const nuevaCita = {
      cliente: this.clienteSearch,
      estilista: this.estilista,
      servicioId: this.servicio,
      fecha: this.fecha,
      horaInicio: this.horaInicio,
      horaFin: this.horaFin,
      notas: this.notas
    };

    console.log('Cita registrada:', nuevaCita);
    alert('¡Cita agendada con éxito!');
    this.resetForm();
  }

  // Restablece los campos del formulario
  resetForm(): void {
    this.clienteSearch = '';
    this.estilista = '';
    this.servicio = null;
    this.fecha = '';
    this.horaInicio = '';
    this.horaFin = '';
    this.notas = '';
  }
}