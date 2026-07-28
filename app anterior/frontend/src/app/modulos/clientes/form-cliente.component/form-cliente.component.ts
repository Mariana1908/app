import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ClienteService } from '../../../servicios/cliente.service';
import { Cliente } from '../../../interfaces/cliente.model';


@Component({
  selector: 'app-form-cliente.component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form-cliente.component.html',
  styleUrl: './form-cliente.component.css',
})
export class FormClienteComponent implements OnInit{
  cliente: Cliente = {
    nombre: '',
    tel: '',
    fecha_nac: '1899-01-01',
    genero: ''
  };

  esEdicion = false;
  clienteId?: number;
  guardando = false;
  error = '';

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.clienteId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.clienteId) {
      this.esEdicion = true;
      this.cargarCliente();
    }
  }

  cargarCliente() {
    this.clienteService.obtenerClientePorId(this.clienteId!).subscribe({
      next: (data) => {
        this.cliente = data;
      },
      error: (err) => {
        this.error = 'Error al cargar cliente';
        console.error(err);
      }
    });
  }

  guardar() {
    if (!this.cliente.nombre || !this.cliente.tel) {
      this.error = 'Nombre y teléfono son obligatorios';
      return;
    }

    this.guardando = true;
    this.error = '';

    const operacion = this.esEdicion
      ? this.clienteService.actualizarCliente(this.clienteId!, this.cliente)
      : this.clienteService.crearCliente(this.cliente);

    operacion.subscribe({
      next: (response) => {
        alert(this.esEdicion ? 'Cliente actualizado' : 'Cliente creado');
        this.router.navigate(['/clientes']);
      },
      error: (err) => {
        this.error = err.error?.error || 'Error al guardar cliente';
        this.guardando = false;
      }
    });
  }

  cancelar() {
    this.router.navigate(['/clientes']);
  }
}
