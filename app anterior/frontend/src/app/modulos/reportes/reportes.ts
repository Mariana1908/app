import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';

export interface Estilista {
  id: number | string;
  nombre: string;
}

export interface DesgloseServicios {
  corte: number;
  tinte: number;
  retoque: number;
  peinado: number;
  tratamiento: number;
  otros: number;
  totalCitas: number;
}

export interface ReporteResponse {
  desglose: DesgloseServicios;
  clientesNuevos: number;
}

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './reportes.html',
  styleUrl: './reportes.css'
})
export class ReportesComponent implements OnInit {
  // Filtros
  fechaInicio: string = new Date().toISOString().slice(0, 10);
  fechaFin: string = new Date().toISOString().slice(0, 10);
  estilistaSeleccionado: string = 'TODOS';

  // Lista de estilistas
  estilistas: Estilista[] = [
    { id: 1, nombre: 'Administrador' },
    { id: 2, nombre: 'Jesus' },
    { id: 3, nombre: 'Maríana' },
    { id: 4, nombre: 'Carlos' }
  ];

  // Desglose de servicios
  desglose: DesgloseServicios = {
    corte: 15,
    tinte: 8,
    retoque: 6,
    peinado: 4,
    tratamiento: 3,
    otros: 2,
    totalCitas: 38
  };

  clientesNuevos: number = 5;

  private apiUrl = 'http://localhost:8080/api/reportes'; // Ajusta según el endpoint de tu API

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.cargarEstilistas();
    this.cargarReporte();
  }

  // Carga la lista de estilistas desde la API
  cargarEstilistas(): void {
    this.http.get<Estilista[]>(`${this.apiUrl}/estilistas`).subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          this.estilistas = data;
        }
      },
      error: () => {
        // Mantiene la lista por defecto si aún no existe el endpoint
      }
    });
  }

  // Petición HTTP para obtener las métricas según los filtros seleccionados
  cargarReporte(): void {
    const params = {
      fechaInicio: this.fechaInicio,
      fechaFin: this.fechaFin,
      estilistaId: this.estilistaSeleccionado
    };

    this.http.get<ReporteResponse>(`${this.apiUrl}/desglose`, { params }).subscribe({
      next: (res) => {
        if (res) {
          this.desglose = res.desglose;
          this.clientesNuevos = res.clientesNuevos;
        }
      },
      error: () => {
        // Si no responde el servidor, se mantienen los datos actuales
      }
    });
  }

  volverAlPanel(): void {
    this.router.navigate(['/app/dashboard']);
  }

  // Selección rápida de fechas
  seleccionarRangoRapido(tipo: 'hoy' | 'semana' | 'mes'): void {
    const hoy = new Date();
    this.fechaFin = hoy.toISOString().slice(0, 10);

    if (tipo === 'hoy') {
      this.fechaInicio = this.fechaFin;
    } else if (tipo === 'semana') {
      const inicioSemana = new Date(hoy);
      inicioSemana.setDate(hoy.getDate() - 7);
      this.fechaInicio = inicioSemana.toISOString().slice(0, 10);
    } else if (tipo === 'mes') {
      const inicioMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
      this.fechaInicio = inicioMes.toISOString().slice(0, 10);
    }

    // Actualiza la vista inmediatamente tras seleccionar rango rápido
    this.cargarReporte();
  }

  // Nombre legible del estilista seleccionado
  obtenerNombreEstilista(): string {
    if (this.estilistaSeleccionado === 'TODOS') return 'Todos los estilistas';
    const encontrado = this.estilistas.find(e => e.id.toString() === this.estilistaSeleccionado);
    return encontrado ? encontrado.nombre : 'Todos los estilistas';
  }

  // EXPORTACIÓN A EXCEL
  generarExcel(): void {
    const nombreEstilista = this.obtenerNombreEstilista();

    const datosExcel = [
      { Concepto: 'Filtro - Fecha Inicio', Cantidad: this.fechaInicio },
      { Concepto: 'Filtro - Fecha Fin', Cantidad: this.fechaFin },
      { Concepto: 'Estilista', Cantidad: nombreEstilista },
      { Concepto: '---', Cantidad: '---' },
      { Concepto: 'Cortes realizados', Cantidad: this.desglose.corte },
      { Concepto: 'Tintes aplicados', Cantidad: this.desglose.tinte },
      { Concepto: 'Retoques realizados', Cantidad: this.desglose.retoque },
      { Concepto: 'Peinados', Cantidad: this.desglose.peinado },
      { Concepto: 'Tratamientos', Cantidad: this.desglose.tratamiento },
      { Concepto: 'Otros Servicios', Cantidad: this.desglose.otros },
      { Concepto: 'TOTAL DE CITAS EN RANGO', Cantidad: this.desglose.totalCitas },
      { Concepto: 'Clientes Nuevos Registrados', Cantidad: this.clientesNuevos }
    ];

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(datosExcel);
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Reporte de Servicios');

    const tagEstilista = this.estilistaSeleccionado === 'TODOS' ? 'Todos' : `Estilista_${this.estilistaSeleccionado}`;
    XLSX.writeFile(workbook, `Reporte_Servicios_${tagEstilista}_${this.fechaInicio}_al_${this.fechaFin}.xlsx`);
  }
}