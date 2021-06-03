import { Empresa } from './../models/empresa.model';
import { Solicitud } from 'src/app/models/solicitud';
import { Unidades2 } from './../models/Unidad2.interfaz';
import { Cotizacion } from './../models/cotizacion.model';
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
  URL6='http://127.0.0.1:8000/api/auth/solicituditems2';
  URL7='http://127.0.0.1:8000/api/auth/unidades2';
  URL8='http://127.0.0.1:8000/api/auth/solicitud3';
  URL9='http://127.0.0.1:8000/api/auth/empresaCot';
  URL10='http://127.0.0.1:8000/api/auth/empresasInfo';

    addUsuario(name:string, lastname:string,email:string,password:string,password_confirmation:string,cellphone:string,rol:string,unidaddegasto:string):Observable<any>{
      const obj =new FormData();
      obj.append("name",name);
      obj.append("lastname",lastname);
      obj.append("email",email);
      obj.append("password",password);
      obj.append("password_confirmation",password_confirmation);
      obj.append("cellphone",cellphone);
      obj.append("rol",rol);
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

    getAllCotizaciones(valor:any):Observable<Cotizacion[]>{
      return this.http.get<Cotizacion[]>(this.URL6+"/"+valor)
    }
    //obtener info de una unidad
    getinfounidad(valor:any):Observable<Unidades[]>{
      return this.http.get<Unidades[]>(this.URL7+"/"+valor)
    }
    //obtener info de una solicitud
    getAllInfoSol(valor:any):Observable<Solicitud[]>{
      return this.http.get<Solicitud[]>(this.URL8+"/"+valor)
    }

    addEmpCot(id_solicitud:string, id_empresa:string):Observable<any>{
      const obj =new FormData();
      obj.append("id_solicitud",id_solicitud);
      obj.append("id_empresa",id_empresa);
      return this.http.post(this.URL9,obj)
    }

    getAllInfoEmpresa(valor:any):Observable<Empresa[]>{
      return this.http.get<Empresa[]>(this.URL10+"/"+valor)
    }
}
