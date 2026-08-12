import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reportes.html',
  styleUrl: './reportes.css'
})
export class ReportesComponent implements OnInit {

  // Variables para filtros de búsqueda
  fechaInicio: string = '';
  fechaFin: string = '';
  estilistaSeleccionado: string = 'todos';

  // Catálogo de estilistas
  estilistas: Array<{ id: number; nombre: string }> = [
    { id: 1, nombre: 'Administrador' },
    { id: 2, nombre: 'Jesus' },
    { id: 3, nombre: 'Mariana' }
  ];

  // Variables para almacenar la respuesta del Backend
  totalCitas: number = 0;
  clientesNuevos: number = 0;
  serviciosRealizados: Array<{ servicio: string; total: number }> = [];

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.seleccionarRangoRapido('mes'); // Inicializa con el rango del mes actual
  }

  cargarReporte(): void {
    this.cargarEstadisticas();
  }

  cargarEstadisticas(): void {
    let url = 'http://localhost:3000/api/reportes?';
    
    if (this.fechaInicio) url += `desde=${this.fechaInicio}&`;
    if (this.fechaFin) url += `hasta=${this.fechaFin}&`;
    if (this.estilistaSeleccionado) url += `estilistaId=${this.estilistaSeleccionado}`;

    this.http.get<any>(url).subscribe({
      next: (data) => {
        this.totalCitas = data.resumen ? data.resumen.totalCitas : 0;
        this.clientesNuevos = data.resumen ? data.resumen.clientesNuevos : 0;
        this.serviciosRealizados = data.serviciosRealizados || [];
      },
      error: (err) => {
        console.error('Error al consultar reportes:', err);
      }
    });
  }

  aplicarFiltros(): void {
    this.cargarEstadisticas();
  }

  // Navegación
  volverAlPanel(): void {
    this.router.navigate(['/app/dashboard']); // Ajusta la ruta a tu panel principal
  }

  // Nombre formateado para el subtítulo
  obtenerNombreEstilista(): string {
    if (this.estilistaSeleccionado === 'todos') {
      return 'Todos los estilistas';
    }
    const est = this.estilistas.find(e => e.id === Number(this.estilistaSeleccionado));
    return est ? est.nombre : 'Todos los estilistas';
  }

  // Filtros de fecha rápida
  seleccionarRangoRapido(rango: 'hoy' | 'semana' | 'mes'): void {
    const hoy = new Date();
    const formatearFecha = (d: Date) => d.toISOString().split('T')[0];

    if (rango === 'hoy') {
      this.fechaInicio = formatearFecha(hoy);
      this.fechaFin = formatearFecha(hoy);
    } else if (rango === 'semana') {
      const primerDiaSemana = new Date(hoy);
      const dia = hoy.getDay();
      const diff = hoy.getDate() - dia + (dia === 0 ? -6 : 1); // Lunes como primer día
      primerDiaSemana.setDate(diff);

      this.fechaInicio = formatearFecha(primerDiaSemana);
      this.fechaFin = formatearFecha(hoy);
    } else if (rango === 'mes') {
      const primerDiaMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
      this.fechaInicio = formatearFecha(primerDiaMes);
      this.fechaFin = formatearFecha(hoy);
    }

    this.cargarEstadisticas();
  }

  // Exportar datos
  generarExcel(): void {
    if (this.serviciosRealizados.length === 0) {
      alert('No hay datos para exportar.');
      return;
    }

    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += 'Servicio,Total\n';

    this.serviciosRealizados.forEach(item => {
      csvContent += `"${item.servicio}",${item.total}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `reporte_servicios_${this.fechaInicio}_al_${this.fechaFin}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}