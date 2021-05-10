import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Solicitud } from '../models/solicitud';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
  solicitudes: Solicitud[] = [];
  solicitudesAprobadas: Solicitud[] = [];
  solicitudesRechazadas: Solicitud[] = [];

  constructor(private http: HttpClient) { }

  URL_API='https://apiser-vicios.herokuapp.com/api/auth';
  //URL_API='http://127.0.0.1:8000/api/auth';

  obtenerSolicitud(){
    return this.http.get<Solicitud[]>(this.URL_API+ '/solicitudes-pendientes');
  }  
  obtenerSolicitudAceptada(){
    return this.http.get<Solicitud[]>(this.URL_API+ '/solicitudes-aceptadas');
  }
  obtenerSolicitudRechazada(){
    return this.http.get<Solicitud[]>(this.URL_API+ '/solicitudes-rechazadas');
  }

  actualizarEstado(solicitud: Solicitud) {
    return this.http.put(this.URL_API+ '/solicitudes', solicitud);
  }
}
