import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './reportes.html',
  styleUrl: './reportes.css'
})
export class ReportesComponent {
  // Rango de fechas por defecto (Hoy)
  fechaInicio: string = new Date().toISOString().slice(0, 10);
  fechaFin: string = new Date().toISOString().slice(0, 10);

  // Resumen de métricas del negocio
  resumen = {
    citasDelMes: 0,
    ingresosEstimados: 0.00,
    totalDia: 0.00,
    clientesNuevos: 0
  };

  constructor(private router: Router) {}

  volverAlPanel(): void {
    this.router.navigate(['/app/dashboard']);
  }

  // Atajos para selección rápida de fechas
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
  }

  // Generación y descarga del reporte en Excel
  generarExcel(): void {
    const datosExcel = [
      { Concepto: 'Fecha de Inicio', Valor: this.fechaInicio },
      { Concepto: 'Fecha de Fin', Valor: this.fechaFin },
      { Concepto: 'Citas del Mes', Valor: this.resumen.citasDelMes },
      { Concepto: 'Ingresos Estimados ($)', Valor: this.resumen.ingresosEstimados },
      { Concepto: 'Total del Día / Cierre ($)', Valor: this.resumen.totalDia },
      { Concepto: 'Clientes Nuevos', Valor: this.resumen.clientesNuevos }
    ];

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(datosExcel);
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Reporte General');

    XLSX.writeFile(workbook, `Reporte_Estetica_Leo_${this.fechaInicio}_al_${this.fechaFin}.xlsx`);
  }
}