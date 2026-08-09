import { Routes } from '@angular/router';
import { LoginComponent } from './modulos/login/login';
import { DashboardComponent } from './modulos/dashboard/dashboard';
import { ListaClientesComponent } from './modulos/clientes/lista-clientes.component/lista-clientes.component';
import { FormClienteComponent } from './modulos/clientes/form-cliente.component/form-cliente.component';
import { DetalleClienteComponent } from './modulos/clientes/detalle-cliente.component/detalle-cliente.component';
import { ListaAgendaComponent } from './modulos/agenda/lista-agenda/lista-agenda';
import { AgendarComponent } from './modulos/agenda/agendar.component/agendar.component';
import { ReportesComponent } from './modulos/reportes/reportes';

export const routes: Routes = [
  // Redirección inicial a /login al abrir la app
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Ruta pública de autenticación
  { path: 'login', component: LoginComponent },

  // Agrupador con prefijo /app (Módulos protegidos del panel)
  {
    path: 'app',
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      
      // Agenda
      { path: 'agenda/nuevo', component: AgendarComponent },      // /app/agenda/nuevo
      { path: 'agenda', component: ListaAgendaComponent },          // /app/agenda
      
      // Clientes
      { path: 'clientes/nuevo', component: FormClienteComponent },
      { path: 'clientes/editar/:id', component: FormClienteComponent },
      { path: 'clientes/:id', component: DetalleClienteComponent },
      { path: 'clientes', component: ListaClientesComponent },
      
      // Reportes
      { path: 'reportes', component: ReportesComponent }
    ]
  },

  // Cualquier ruta no encontrada enviará al login
  { path: '**', redirectTo: 'login' }
];