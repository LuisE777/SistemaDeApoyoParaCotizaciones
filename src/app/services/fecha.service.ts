import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FechaService {
  //fechas:Rol[] = [];
  URL_API='http://127.0.0.1:8000/api/auth';
  //URL_API='https://apiser-vicios.herokuapp.com/api/auth';

  constructor(private http: HttpClient) { }

  crearRol(fecha: any) {
    return this.http.post<any>(this.URL_API + '/fechas',fecha);
  }
}
