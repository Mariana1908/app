import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServicioService, Servicio } from '../../servicios/servicio.service';
// Ajusta la ruta relativa si varía

@Component({
  selector: 'app-agendar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './agendar.component.html',
  styleUrl: './agendar.component.css'
})
export class AgendarComponent implements OnInit {
  listaServicios: Servicio[] = [];
  servicioSeleccionado: number | null = null;

 constructor(private serviciosService: ServicioService) {}

  ngOnInit(): void {
    this.cargarServicios();
  }

  cargarServicios(): void {
    this.serviciosService.getServicios().subscribe({
      next: (data) => {
        this.listaServicios = data;
      },
      error: (err) => console.error('Error al cargar servicios:', err)
    });
  }
}