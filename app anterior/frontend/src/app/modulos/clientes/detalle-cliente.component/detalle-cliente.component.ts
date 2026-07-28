import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ClienteService } from '../../../servicios/cliente.service';
import { EstadoService } from '../../../servicios/estado.service';
import { VisitaService } from '../../../servicios/visita.service';
import { Cliente } from '../../../interfaces/cliente.model';
import { Estado } from '../../../interfaces/estado.model';
import { Visita, TipoVisita, TipoCambio } from '../../../interfaces/visita.model';

@Component({
  selector: 'app-detalle-cliente.component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './detalle-cliente.component.html',
  styleUrl: './detalle-cliente.component.css',
})
export class DetalleClienteComponent implements OnInit {
  cliente?: Cliente;
  estado?: Estado;
  visitas: Visita[] = [];
  tabActiva = 'datos';
  cargando = true;
  mostrarFormEstado = false;
  mostrarFormVisita = false;

  // Opciones para los dropdowns
  tiposVisita: TipoVisita[] = ['Raiz', 'Largo', 'Matiz', 'Cambio de color'];
  tiposCambio: TipoCambio[] = ['Efecto de color', 'Limpieza de Color', 'Cambio de color'];

  // PAGINACIÓN DE VISITAS
  currentPageVisitas = 1;
  totalPagesVisitas = 1;
  totalRecordsVisitas = 0;
  limitVisitas = 10;
  hasNextPageVisitas = false;
  hasPrevPageVisitas = false;

  // FILTROS DE VISITAS
  filtroFecha = '';
  filtroTipo = '';
  filtrando = false;

  foto1File: File | null = null;
  foto2File: File | null = null;
  foto1Preview: string | null = null;
  foto2Preview: string | null = null;
  subiendoFotos = false;

  estadoForm: Estado = {
    cliente_id: 0,
    color_nat: '',
    porc_canas: 0,
    textura: '',
    colorimetrista: '',
    estructura: '',
    form_decol: '',
    pose_decol_largos: undefined,
    pose_decol_raiz: undefined,
    form_tinte: '',
    pose_tinte_largos: undefined,
    pose_tinte_raiz: undefined,
    observaciones: ''
  };

  visitaForm: Visita = {
    cliente_id: 0,
    fecha: new Date(),
    tipo: undefined,
    tipo_cambio: undefined
  };

  constructor(
    private clienteService: ClienteService,
    public estadoService: EstadoService,
    private visitaService: VisitaService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.cargarCliente(id);
  }

  cargarCliente(id: number) {
    this.clienteService.obtenerClientePorId(id).subscribe({
      next: (data) => {
        this.cliente = data;
        this.estadoForm.cliente_id = id;
        this.visitaForm.cliente_id = id;
        this.cargarEstado(id);
        this.cargarVisitas(id);
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar cliente', err);
        this.cargando = false;
      }
    });
  }

  cargarEstado(clienteId: number) {
    this.estadoService.obtenerEstadoPorCliente(clienteId).subscribe({
      next: (data) => {
        this.estado = data;
        this.estadoForm = { ...data };
      },
      error: () => {
        // No hay estado aún
      }
    });
  }

  cargarVisitas(clienteId: number) {
    this.visitaService.obtenerVisitasPorCliente(
      clienteId,
      this.currentPageVisitas,
      this.limitVisitas,
      this.filtroFecha,
      this.filtroTipo
    ).subscribe({
      next: (response) => {
        this.visitas = response.visitas || [];

        // Actualizar información de paginación
        this.currentPageVisitas = response.pagination.currentPage;
        this.totalPagesVisitas = response.pagination.totalPages;
        this.totalRecordsVisitas = response.pagination.totalRecords;
        this.hasNextPageVisitas = response.pagination.hasNextPage;
        this.hasPrevPageVisitas = response.pagination.hasPrevPage;
      },
      error: (err) => console.error('Error al cargar visitas', err)
    });
  }

  onFotoSeleccionada(event: Event, numeroFoto: 1 | 2) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      
      // Validar tamaño (5MB máximo)
      if (file.size > 5 * 1024 * 1024) {
        alert('La foto no debe superar los 5MB');
        return;
      }

      // Validar tipo
      if (!file.type.startsWith('image/')) {
        alert('Solo se permiten archivos de imagen');
        return;
      }

      if (numeroFoto === 1) {
        this.foto1File = file;
        // Crear preview
        const reader = new FileReader();
        reader.onload = (e) => {
          this.foto1Preview = e.target?.result as string;
        };
        reader.readAsDataURL(file);
      } else {
        this.foto2File = file;
        const reader = new FileReader();
        reader.onload = (e) => {
          this.foto2Preview = e.target?.result as string;
        };
        reader.readAsDataURL(file);
      }
    }
  }

  subirFotos() {
    if (!this.foto1File && !this.foto2File) {
      alert('Selecciona al menos una foto para subir');
      return;
    }

    this.subiendoFotos = true;
    const formData = new FormData();

    if (this.foto1File) {
      formData.append('foto1', this.foto1File);
    }

    if (this.foto2File) {
      formData.append('foto2', this.foto2File);
    }

    this.estadoService.subirFotos(this.cliente!.id!, formData).subscribe({
      next: (response) => {
        alert('Fotos subidas exitosamente');
        this.cargarEstado(this.cliente!.id!);
        this.limpiarFormularioFotos();
        this.subiendoFotos = false;
      },
      error: (err) => {
        console.error('Error al subir fotos:', err);
        alert('Error al subir fotos');
        this.subiendoFotos = false;
      }
    });
  }

  eliminarFoto(numeroFoto: 1 | 2) {
    if (!confirm(`¿Estás seguro de eliminar la foto ${numeroFoto}?`)) {
      return;
    }

    this.estadoService.eliminarFoto(this.cliente!.id!, numeroFoto).subscribe({
      next: () => {
        alert(`Foto ${numeroFoto} eliminada exitosamente`);
        this.cargarEstado(this.cliente!.id!);
      },
      error: (err) => {
        console.error('Error al eliminar foto:', err);
        alert('Error al eliminar foto');
      }
    });
  }

  limpiarFormularioFotos() {
    this.foto1File = null;
    this.foto2File = null;
    this.foto1Preview = null;
    this.foto2Preview = null;
  }

  cancelarSubidaFotos() {
    this.limpiarFormularioFotos();
  }

  abrirImagenCompleta(url: string) {
    window.open(url, '_blank', 'width=800,height=600,resizable=yes,scrollbars=yes');
  }

  // MÉTODOS DE FILTRADO
  aplicarFiltros() {
    this.currentPageVisitas = 1; // Resetear a primera página
    this.filtrando = true;
    this.cargarVisitas(this.cliente!.id!);
  }

  limpiarFiltros() {
    this.filtroFecha = '';
    this.filtroTipo = '';
    this.currentPageVisitas = 1;
    this.filtrando = false;
    this.cargarVisitas(this.cliente!.id!);
  }

  // MÉTODOS DE NAVEGACIÓN DE VISITAS
  irAPaginaSiguienteVisitas() {
    if (this.hasNextPageVisitas) {
      this.currentPageVisitas++;
      this.cargarVisitas(this.cliente!.id!);
    }
  }

  irAPaginaAnteriorVisitas() {
    if (this.hasPrevPageVisitas) {
      this.currentPageVisitas--;
      this.cargarVisitas(this.cliente!.id!);
    }
  }

  irAPaginaVisitas(page: number) {
    if (page >= 1 && page <= this.totalPagesVisitas) {
      this.currentPageVisitas = page;
      this.cargarVisitas(this.cliente!.id!);
    }
  }

  getPaginationNumbersVisitas(): number[] {
    const pages: number[] = [];
    const maxPagesToShow = 5;

    let startPage = Math.max(1, this.currentPageVisitas - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(this.totalPagesVisitas, startPage + maxPagesToShow - 1);

    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }

  cambiarTab(tab: string) {
    this.tabActiva = tab;
  }

  editarCliente() {
    this.router.navigate(['/clientes/editar', this.cliente?.id]);
  }

  guardarEstado() {
    this.estadoService.guardarEstado(this.cliente!.id!, this.estadoForm).subscribe({
      next: () => {
        alert('Estado guardado exitosamente');
        this.cargarEstado(this.cliente!.id!);
        this.mostrarFormEstado = false;
      },
      error: (err) => {
        console.error('Error al guardar estado:', err);
        alert('Error al guardar estado');
      }
    });
  }

  guardarVisita() {
    // Validación: Limpiar tipo_cambio si tipo no es "Cambio de color"
    if (this.visitaForm.tipo !== 'Cambio de color') {
      this.visitaForm.tipo_cambio = undefined;
    }

    // Validación: Si es cambio de color, tipo_cambio es requerido
    if (this.visitaForm.tipo === 'Cambio de color' && !this.visitaForm.tipo_cambio) {
      alert('Debe seleccionar un tipo de cambio');
      return;
    }

    this.visitaService.crearVisita(this.cliente!.id!, this.visitaForm).subscribe({
      next: () => {
        alert('Visita registrada exitosamente');
        this.cargarVisitas(this.cliente!.id!);
        this.mostrarFormVisita = false;
        this.resetFormVisita();
      },
      error: (err) => {
        console.error('Error al registrar visita:', err);
        alert('Error al registrar visita');
      }
    });
  }

  resetFormVisita() {
    this.visitaForm = {
      cliente_id: this.cliente!.id!,
      fecha: new Date(),
      tipo: undefined,
      tipo_cambio: undefined
    };
  }

  debeMostrarTipoCambio(): boolean {
    return this.visitaForm.tipo === 'Cambio de color';
  }

  volver() {
    this.router.navigate(['/clientes']);
  }

  // Determinar cuál foto es más antigua
  esFotoMasAntigua(numeroFoto: 1 | 2): boolean {
    if (!this.estado) return false;

    const fecha1 = this.estado.fecha_foto1 ? new Date(this.estado.fecha_foto1).getTime() : 0;
    const fecha2 = this.estado.fecha_foto2 ? new Date(this.estado.fecha_foto2).getTime() : 0;

    // Si solo existe una foto, esa es la más antigua
    if (fecha1 > 0 && fecha2 === 0) return numeroFoto === 1;
    if (fecha2 > 0 && fecha1 === 0) return numeroFoto === 2;

    // Si ambas existen, comparar fechas
    if (fecha1 > 0 && fecha2 > 0) {
      if (numeroFoto === 1) return fecha1 < fecha2;
      if (numeroFoto === 2) return fecha2 < fecha1;
    }

    return false;
  }

  // Calcular antigüedad en días
  obtenerDiasAntiguedad(fecha: Date | string | undefined): number {
    if (!fecha) return 0;
    const fechaFoto = new Date(fecha);
    const hoy = new Date();
    const diferencia = hoy.getTime() - fechaFoto.getTime();
    return Math.floor(diferencia / (1000 * 60 * 60 * 24));
  }
}