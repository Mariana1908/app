import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Visita } from '../interfaces/visita.model';
import { PaginatedResponse } from '../interfaces/cliente.model';


@Injectable({
  providedIn: 'root',
})
export class VisitaService {
  private apiUrl = 'http://localhost:3000/api/visitas';

  constructor(private http: HttpClient) { }

  obtenerVisitasPorCliente(
    clienteId: number,
    page: number = 1,
    limit: number = 10,
    fecha: string = '',
    tipo: string = ''
  ): Observable<PaginatedResponse<Visita>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    if (fecha) {
      params = params.set('fecha', fecha);
    }
    if (tipo && tipo !== '') {
      params = params.set('tipo', tipo);
    }

    return this.http.get<PaginatedResponse<Visita>>(`${this.apiUrl}/cliente/${clienteId}`, { params });
  }

  obtenerVisitaPorId(id: number): Observable<Visita> {
    return this.http.get<Visita>(`${this.apiUrl}/${id}`);
  }

  crearVisita(clienteId: number, visita: Visita): Observable<any> {
    return this.http.post(`${this.apiUrl}/${clienteId}`, visita);
  }

  actualizarVisita(id: number, visita: Visita): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, visita);
  }

  eliminarVisita(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
