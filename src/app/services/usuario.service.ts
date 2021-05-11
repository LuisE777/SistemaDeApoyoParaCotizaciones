import { Unidades } from './../models/unidades.model';
import { Roles } from './../models/roles.interface';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Usuario } from '../models/usuario.model'


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }
  //URL='http://127.0.0.1:8000/api/auth/register';
  URL='http://apiser-vicios.herokuapp.com/api/auth/register';
  URL2='http://apiser-vicios.herokuapp.com/api/auth/roles';
  URL3='http://apiser-vicios.herokuapp.com/api/auth/unidades';
  URL4='http://apiser-vicios.herokuapp.com/api/auth/me?token=';
  URL5='https://apiser-vicios.herokuapp.com/api/auth/users';

    addUsuario(name:string, lastname:string,email:string,password:string,password_confirmation:string,cellphone:string,rol:string,facultad:string,unidaddegasto:string):Observable<any>{
      const obj =new FormData();
      obj.append("name",name);
      obj.append("lastname",lastname);
      obj.append("email",email);
      obj.append("password",password);
      obj.append("password_confirmation",password_confirmation);
      obj.append("cellphone",cellphone);
      obj.append("rol",rol);
      obj.append("facultad",facultad);
      obj.append("unidaddegasto",unidaddegasto);
      return this.http.post(this.URL,obj)
    }

    getAllRoles():Observable<Roles[]>{
      return this.http.get<Roles[]>(this.URL2)
    }
    getAllUnidades():Observable<Unidades[]>{
      return this.http.get<Unidades[]>(this.URL3)
    }
    getAllUser():Observable<Usuario[]>{
      return this.http.get<Usuario[]>(this.URL5)
    }
    
}
