import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Usuario } from '../models/usuario.model'

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }
    //URL='http://127.0.0.1:8000/api/auth/users';
    URL='http://apiser-vicios.herokuapp.com/api/auth/register';

    addUsuario(name:string, lastname:string,email:string,password:string,password_confirmation:string,cellphone:string,rol:string):Observable<any>{
      const obj =new FormData();
      obj.append("name",name);
      obj.append("lastname",lastname);
      obj.append("email",email);
      obj.append("password",password);
      obj.append("password_confirmation",password_confirmation);
      obj.append("cellphone",cellphone);
      obj.append("rol",rol);
      return this.http.post(this.URL,obj)
    }
}
