import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Presupuesto } from '../models/presupuesto';

@Injectable({
  providedIn: 'root'
})
export class PresupuestoService {
   URL_API='http://127.0.0.1:8000/api/auth';
   presupuesto: Presupuesto[];
   presupuestos: any[];
   idActual: string;
   
   //URL_API='http://apiser-vicios.herokuapp.com/api/auth';

  constructor(private http: HttpClient) { }

  obtenerPresupuesto(id: any, gestion:any){
    return this.http.get<Presupuesto[]>('http://127.0.0.1:8000/api/auth/presupuesto/'+id+'/'+gestion);
  }

  actualizarPresupuesto(presupuesto: any) {  
    presupuesto.id = this.idActual;  
    return this.http.put('http://127.0.0.1:8000/api/auth/presupuesto/', presupuesto);
  }

  obtenerDatos(){
    return this.http.get<any[]>('http://127.0.0.1:8000/api/auth/presupuestos/');
  }
}
