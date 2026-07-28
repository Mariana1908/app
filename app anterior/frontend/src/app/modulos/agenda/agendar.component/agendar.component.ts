import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-agendar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './agendar.component.html',
  styleUrls: ['./agendar.component.css']
})
export class AgendarComponent implements OnInit {
  clienteSearch: string = '';
  estilista: string = '';
  fecha: string = '';
  horaInicio: string = '';
  horaFin: string = '';
  servicio: string = '';
  notas: string = '';

  servicios = [
    { id: 1, nombre: 'Corte de cabello' },
    { id: 2, nombre: 'Coloración' },
    { id: 3, nombre: 'Peinado' },
    { id: 4, nombre: 'Manicura' },
    { id: 5, nombre: 'Pedicura' },
    { id: 6, nombre: 'Facial' },
    { id: 7, nombre: 'Masaje' },
    { id: 8, nombre: 'Depilación' }
  ];

  estilistas = [
    { id: 0, nombre: '-- ¿Quién va a atender? --' },
    { id: 1, nombre: 'María' },
    { id: 2, nombre: 'Carmen' },
    { id: 3, nombre: 'Sandra' }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  volverAlPanel(): void {
    this.router.navigate(['/clientes']);
  }

  agendarCita(): void {
    if (!this.clienteSearch || !this.estilista || !this.fecha || !this.servicio) {
      alert('Por favor, completa todos los campos obligatorios');
      return;
    }

    const nuevaCita = {
      cliente: this.clienteSearch,
      estilista: this.estilista,
      fecha: this.fecha,
      horaInicio: this.horaInicio,
      horaFin: this.horaFin,
      servicio: this.servicio,
      notas: this.notas
    };
    
    console.log('Nueva cita:', nuevaCita);
    alert('Cita agendada exitosamente!');
    this.resetForm();
  }

  resetForm(): void {
    this.clienteSearch = '';
    this.estilista = '';
    this.fecha = '';
    this.horaInicio = '';
    this.horaFin = '';
    this.servicio = '';
    this.notas = '';
  }
}
