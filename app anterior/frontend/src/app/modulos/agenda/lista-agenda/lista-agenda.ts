import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

// Interfaz para el manejo de citas en la lista
export interface Cita {
  id: number;
  fechaHora: string;
  clienteNombre: string;
  estilistaNombre: string;
  notas?: string;
  anticipo: number;
  estatusAnticipo: 'Pagado' | 'Pendiente';
  referenciaBancaria?: string;
  estatusCita: 'Pendiente' | 'Confirmada' | 'Completada' | 'Cancelada';
}

export interface Estilista {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-lista-agenda',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './lista-agenda.html',
  styleUrl: './lista-agenda.css'
})
export class ListaAgendaComponent implements OnInit {

  // Variables de Filtros
  filtroRango: 'hoy' | 'semana' | 'mes' = 'hoy';
  filtroFecha: string = '';
  filtroEstilista: string = '';
  filtroEstatus: string = '';

  // Catalogos de Apoyo
  listaEstilistas: Estilista[] = [
    { id: 1, nombre: 'Leo' },
    { id: 2, nombre: 'Ana' }
  ];

  // Listados de Citas
  citasOriginales: Cita[] = [];
  citas: Cita[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.cargarCitas();
  }

  // Carga inicial o llamada a servicio de la agenda
  cargarCitas(): void {
    // Aquí conectarás tu servicio REST / HTTP
    this.citasOriginales = [
      {
        id: 1,
        fechaHora: '2026-08-08 10:00 AM',
        clienteNombre: 'María López',
        estilistaNombre: 'Leo',
        notas: 'Corte y peinado',
        anticipo: 150,
        estatusAnticipo: 'Pagado',
        referenciaBancaria: 'REF123456',
        estatusCita: 'Confirmada'
      }
    ];

    this.aplicarFiltros();
  }

  // Navegación con rutas del agrupador /app
  irAlMenu(): void {
    this.router.navigate(['/app/dashboard']);
  }

  agendarCita(): void {
    this.router.navigate(['/app/agenda/nuevo']);
  }

  nuevoCliente(): void {
    this.router.navigate(['/app/clientes/nuevo']);
  }

  // Métodos para control de Filtros
  cambiarRango(rango: 'hoy' | 'semana' | 'mes'): void {
    this.filtroRango = rango;
    this.aplicarFiltros();
  }

  aplicarFiltros(): void {
    this.citas = this.citasOriginales.filter(cita => {
      const cumpleFecha = !this.filtroFecha || cita.fechaHora.includes(this.filtroFecha);
      const cumpleEstilista = !this.filtroEstilista || cita.estilistaNombre === this.obtenerNombreEstilista(+this.filtroEstilista);
      const cumpleEstatus = !this.filtroEstatus || cita.estatusCita === this.filtroEstatus;

      return cumpleFecha && cumpleEstilista && cumpleEstatus;
    });
  }

  limpiarFiltros(): void {
    this.filtroRango = 'hoy';
    this.filtroFecha = '';
    this.filtroEstilista = '';
    this.filtroEstatus = '';
    this.citas = [...this.citasOriginales];
  }

  // Acciones en la Tabla
  editarCita(id: number): void {
    this.router.navigate(['/app/agenda/editar', id]);
  }

  cancelarCita(id: number): void {
    if (confirm('¿Está seguro de que desea cancelar esta cita?')) {
      const cita = this.citasOriginales.find(c => c.id === id);
      if (cita) {
        cita.estatusCita = 'Cancelada';
        this.aplicarFiltros();
      }
    }
  }

  private obtenerNombreEstilista(id: number): string {
    const estilista = this.listaEstilistas.find(e => e.id === id);
    return estilista ? estilista.nombre : '';
  }
}