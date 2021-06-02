import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Fecha } from '../models/fecha';
import { Presupuesto } from '../models/presupuesto';

@Injectable({
  providedIn: 'root'
})
export class FechaService {
  fechas:Fecha[] = [];
  fecha:Fecha;
  URL_API='http://127.0.0.1:8000/api/auth';
  //URL_API='https://apiser-vicios.herokuapp.com/api/auth';

  constructor(private http: HttpClient) { }

  crearFecha(fecha: any) {
    return this.http.post<any>(this.URL_API + '/fechas',fecha);
  }

  obtenerFecha(){
    return this.http.get<Fecha[]>('http://127.0.0.1:8000/api/auth/fechas');
  }

  obtenerUltimaFecha(){
    return this.http.get<Fecha>(this.URL_API + '/ultimafecha');
  }


  crearPresupuesto(presupuesto: any){
    return this.http.post<any>('http://127.0.0.1:8000/api/auth/presupuesto', presupuesto);
  }

  obtenerPresupuestos(){
    return this.http.get<Presupuesto[]>('http://127.0.0.1:8000/api/auth/presupuesto');
  }
  
}
