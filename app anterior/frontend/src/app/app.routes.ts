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
  // Redirección inicial a /app/dashboard
  { path: '', redirectTo: 'app/dashboard', pathMatch: 'full' },

  // Agrupador con prefijo /app
  {
    path: 'app',
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'dashboard', component: DashboardComponent },
      
      // Agenda
      { path: 'agenda', component: ListaAgendaComponent },          // /app/agenda (Tabla)
      { path: 'agenda/nuevo', component: AgendarComponent },       // /app/agenda/nuevo (Formulario)
      
      // Clientes
      { path: 'clientes', component: ListaClientesComponent },
      { path: 'clientes/nuevo', component: FormClienteComponent },
      { path: 'clientes/editar/:id', component: FormClienteComponent },
      { path: 'clientes/:id', component: DetalleClienteComponent },
      
      // Reportes
      { path: 'reportes', component: ReportesComponent }
    ]
  },

  // Redirección comodín
  { path: '**', redirectTo: 'app/dashboard' }
];