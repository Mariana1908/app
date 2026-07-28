import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estado } from '../interfaces/estado.model';

@Injectable({
  providedIn: 'root',
})
export class EstadoService {
  private apiUrl = 'http://localhost:3000/api/estado';

  constructor(private http: HttpClient) { }

  obtenerEstadoPorCliente(clienteId: number): Observable<Estado> {
    return this.http.get<Estado>(`${this.apiUrl}/${clienteId}`);
  }

  guardarEstado(clienteId: number, estado: Estado): Observable<any> {
    return this.http.post(`${this.apiUrl}/${clienteId}`, estado);
  }

  subirFotos(clienteId: number, formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/${clienteId}/fotos`, formData);
  }

  // Eliminar foto
  eliminarFoto(clienteId: number, fotoNumero: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${clienteId}/fotos/${fotoNumero}`);
  }

  // Obtener URL de foto
  obtenerUrlFoto(nombreFoto: string): string {
    return `http://localhost:3000/uploads/fotos/${nombreFoto}`;
  }
}
