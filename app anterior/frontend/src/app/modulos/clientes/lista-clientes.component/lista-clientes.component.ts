import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteService } from '../../../servicios/cliente.service';
import { Cliente } from '../../../interfaces/cliente.model';

@Component({
  selector: 'app-lista-clientes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lista-clientes.component.html',
  styleUrl: './lista-clientes.component.css',
})
export class ListaClientesComponent implements OnInit {
  clientes: Cliente[] = [];
  cargando = true;
  error = '';

  currentPage = 1;
  totalPages = 1;
  totalRecords = 0;
  limit = 10;
  hasNextPage = false;
  hasPrevPage = false;

  searchTerm = '';
  searching = false;

  constructor(
    private clienteService: ClienteService,
    private router: Router
  ) { }

  ngOnInit() {
    this.cargarClientes();
  }

  cargarClientes() {
    this.cargando = true;
    this.error = '';

    this.clienteService.obtenerClientes(this.currentPage, this.limit, this.searchTerm).subscribe({
      next: (response) => {
        this.clientes = response.clientes || [];

        // Actualizar información de paginación
        this.currentPage = response.pagination.currentPage;
        this.totalPages = response.pagination.totalPages;
        this.totalRecords = response.pagination.totalRecords;
        this.hasNextPage = response.pagination.hasNextPage;
        this.hasPrevPage = response.pagination.hasPrevPage;

        this.cargando = false;
      },
      error: (err) => {
        this.error = 'Error al cargar clientes';
        console.error(err);
        this.cargando = false;
      }
    });
  }

  buscar() {
    this.currentPage = 1; // Resetear a la primera página al buscar
    this.searching = true;
    this.cargarClientes();
  }

  limpiarBusqueda() {
    this.searchTerm = '';
    this.currentPage = 1;
    this.searching = false;
    this.cargarClientes();
  }

  irAPaginaSiguiente() {
    if (this.hasNextPage) {
      this.currentPage++;
      this.cargarClientes();
    }
  }

  irAPaginaAnterior() {
    if (this.hasPrevPage) {
      this.currentPage--;
      this.cargarClientes();
    }
  }

  irAPagina(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.cargarClientes();
    }
  }

  getPaginationNumbers(): number[] {
    const pages: number[] = [];
    const maxPagesToShow = 5;
    
    let startPage = Math.max(1, this.currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(this.totalPages, startPage + maxPagesToShow - 1);
    
    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  }

  // Navegación con el prefijo /app
  irAlMenu() {
    this.router.navigate(['/app/dashboard']);
  }

  verDetalle(id: number) {
    this.router.navigate(['/app/clientes', id]);
  }

  nuevoCliente() {
    this.router.navigate(['/app/clientes/nuevo']);
  }

  eliminarCliente(id: number, nombre: string) {
    if (confirm(`¿Estás seguro de eliminar al cliente ${nombre}?`)) {
      this.clienteService.eliminarCliente(id).subscribe({
        next: () => {
          alert('Cliente eliminado exitosamente');
          this.cargarClientes();
        },
        error: (err) => {
          alert('Error al eliminar cliente');
          console.error(err);
        }
      });
    }
  }
}