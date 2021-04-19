import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Rol } from '../models/rol.model'
@Injectable({
  providedIn: 'root'
})
export class RolService {

  constructor(private http: HttpClient) { }
  roles:Rol[];
  URL_API='http://127.0.0.1:8000/api/auth';

  obtenerRoles(){
    return this.http.get<Rol[]>(this.URL_API+ '/roles');
  }
  
  crearRol(rol: any) {
    return this.http.post<any>(this.URL_API + '/roles',rol);
  }

}

