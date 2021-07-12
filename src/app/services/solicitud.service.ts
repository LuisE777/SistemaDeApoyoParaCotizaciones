import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Solicitud } from '../models/solicitud';
import { SolicitudItems } from '../models/solicituditems.model';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
  solicitudes: Solicitud[] = [];
  solicitudesitemspivot: SolicitudItems[] = [];
  solicitudesAprobadas: Solicitud[] = [];
  solicitudesRechazadas: Solicitud[] = [];

  constructor(private http: HttpClient) { }

  URL_API='https://apiser-vicios.herokuapp.com/api/auth';
  //URL_API='http://127.0.0.1:8000/api/auth';
  URL_API_LOCAL='http://127.0.0.1:8000/api/auth';
  //para "mis solicitudes" agregue esto
  URL_API1='https://apiser-vicios.herokuapp.com/api/auth/solicitudes';

  obtenerSolicitud(){
    return this.http.get<Solicitud[]>(this.URL_API_LOCAL+ '/solicitudes-pendientes');
  }  
  
  obtenerSolicitudAceptada(){
    return this.http.get<Solicitud[]>(this.URL_API_LOCAL+ '/solicitudes-aceptadas');
  }
  obtenerSolicitudRechazada(){
    return this.http.get<Solicitud[]>(this.URL_API_LOCAL+ '/solicitudes-rechazadas');
  }

  actualizarEstado(solicitud: Solicitud, estado: string) {
    solicitud.estado = estado;  
    return this.http.put(this.URL_API+ '/solicitudes'+"?token="+localStorage.getItem('token'), solicitud);
  }
  //para obtener por usuario en mis solicitudes agregue esto
  obtenerSolicitud1(){
    return this.http.get<Solicitud[]>(this.URL_API1);
  } 
  obtenerSolicitudItems(){
    //Mod--URL
    return this.http.get<SolicitudItems[]>('http://apiser-vicios.herokuapp.com/api/auth/solicituditemspivot');
  } 
}
