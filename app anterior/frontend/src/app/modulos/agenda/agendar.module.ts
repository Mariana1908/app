import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AgendarComponent } from './agendar.component/agendar.component';

const routes: Routes = [
  { path: 'nuevo', component: AgendarComponent }
];

@NgModule({
  declarations: [], // <-- Déjalo vacío o elimínalo
  imports: [
    CommonModule, 
    FormsModule, 
    RouterModule.forChild(routes),
    AgendarComponent // <-- Pásalo a imports aquí
  ],
  exports: [AgendarComponent]
})
export class AgendaModule {}