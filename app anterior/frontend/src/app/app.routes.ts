import { Routes } from '@angular/router';
import { ListaClientesComponent } from './modulos/clientes/lista-clientes.component/lista-clientes.component';
import { FormClienteComponent } from './modulos/clientes/form-cliente.component/form-cliente.component';
import { DetalleClienteComponent } from './modulos/clientes/detalle-cliente.component/detalle-cliente.component';
import { AgendarComponent } from './modulos/agenda/agendar.component/agendar.component';
import { ReportesComponent } from './modulos/reportes/reportes';

export const routes: Routes = [
  { path: '', redirectTo: '/clientes', pathMatch: 'full' },
  { path: 'clientes', component: ListaClientesComponent },
  { path: 'clientes/nuevo', component: FormClienteComponent },
  { path: 'clientes/editar/:id', component: FormClienteComponent },
  { path: 'clientes/:id', component: DetalleClienteComponent },
  { path: 'agenda/nuevo', component: AgendarComponent },
  { path: 'reportes', component: ReportesComponent } // <-- Nueva ruta
];