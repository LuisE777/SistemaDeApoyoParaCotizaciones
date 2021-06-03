import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Presupuesto } from '../models/presupuesto';

@Injectable({
  providedIn: 'root'
})
export class PresupuestoService {
  presupuesto: Presupuesto[];
  presupuestos: any[];
  idActual: string;
  
  //URL_API='http://127.0.0.1:8000/api/auth';
  URL_API='http://apiser-vicios.herokuapp.com/api/auth';

  constructor(private http: HttpClient) { }

  obtenerPresupuesto(id: any, gestion:any){
    //return this.http.get<Presupuesto[]>('http://127.0.0.1:8000/api/auth/presupuesto/'+id+'/'+gestion);
    return this.http.get<Presupuesto[]>(this.URL_API+'/presupuesto/'+id+'/'+gestion);
  }

  actualizarPresupuesto(presupuesto: any) {  
    presupuesto.id = this.idActual;  
    //return this.http.put('http://127.0.0.1:8000/api/auth/presupuesto/', presupuesto);
    return this.http.put(this.URL_API+'/presupuesto', presupuesto);
  }

  obtenerDatos(){
    //return this.http.get<any[]>('http://127.0.0.1:8000/api/auth/presupuestos/');
    return this.http.get<any[]>(this.URL_API+'/presupuestos');
  }
}
