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
  URL_API_LOCAL='http://127.0.0.1:8000/api/auth';
  URL_API='http://apiser-vicios.herokuapp.com/api/auth';

  constructor(private http: HttpClient) { }

  crearFecha(fecha: any) {
    return this.http.post<any>(this.URL_API_LOCAL + '/fechas'+"?token="+localStorage.getItem('token'),fecha);
  }

  obtenerFecha(){
    //return this.http.get<Fecha[]>('http://127.0.0.1:8000/api/auth/fechas');
    return this.http.get<Fecha[]>(this.URL_API_LOCAL+'/fechas');
  }

  obtenerUltimaFecha(){
    return this.http.get<Fecha>(this.URL_API_LOCAL + '/ultimafecha');
  }

  crearPresupuesto(presupuesto: any){
    return this.http.post<any>(this.URL_API_LOCAL+'/presupuesto'+"?token="+localStorage.getItem('token'), presupuesto);
  }

  obtenerPresupuestos(){
    return this.http.get<Presupuesto[]>(this.URL_API_LOCAL+'/presupuesto');
  }
  
}
