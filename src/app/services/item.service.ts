

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Item } from '../models/item.model';
import { ItemSup } from '../models/itemSup.model';
@Injectable({
  providedIn: 'root'
})
export class ItemService {

  // httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/json'
  //   })
  // };

  constructor(private httpClient: HttpClient) { }
  //
  //URL_API0='http://127.0.0.1:8000/api/auth/items';

  URL_API_LOCAL='http://127.0.0.1:8000/api/auth';
  URL_API='http://apiser-vicios.herokuapp.com/api/auth';

  URL1='http://apiser-vicios.herokuapp.com/api/auth/items';
  //usando in items superiores
  URL2='http://apiser-vicios.herokuapp.com/api/auth/itemSup';
  URL3='http://apiser-vicios.herokuapp.com/api/auth/itemSup';
  URL4='http://apiser-vicios.herokuapp.com/api/auth/itemSup';

  //Serv links
  
  // Crear un item
  create(item: any):Observable<any>{
    return this.httpClient.post(this.URL_API_LOCAL+"/items"+"?token="+localStorage.getItem('token'),item)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  getById(id: string): Observable<any> {
    return this.httpClient.get<any>(this.URL_API + '/items/' + id)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  // Obtener todos los items
  getAll(): Observable<any> {
    return this.httpClient.get<any[]>(this.URL_API_LOCAL + '/items')
    .pipe(
      catchError(this.errorHandler)
    );
  }

  // Editar item por su id
  update(id: any, item: any): Observable<any> {
    return this.httpClient.post<any>(this.URL_API + '/items/' + id+"?token="+localStorage.getItem('token'), item)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  // Eliminar item por su id
  delete(id: string): Observable<any> {
    return this.httpClient.delete<any>(this.URL_API_LOCAL + '/items/' + id+"?token="+localStorage.getItem('token'))
    .pipe(
      catchError(this.errorHandler)
    );
  }

  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = error.error.message;
    }
    console.log("error del servicio");
    return throwError(errorMessage);
  }
  
  //para guardar 
  addItem(nomitem:string, descrip:string,montoasig:string,periodo:string,unidaddegasto:string):Observable<any>{
    const obj =new FormData();
    obj.append("nomitem",nomitem);
    obj.append("descrip",descrip);
    obj.append("montoasig",montoasig);
    obj.append("periodo",periodo);
    obj.append("unidaddegasto",unidaddegasto);
    return this.httpClient.post(this.URL1+"?token="+localStorage.getItem('token'),obj)
  }
  //para guardar items superiores
  addItemSup(nomitemSup:string, descripSup):Observable<any>{
    const obj =new FormData();
    obj.append("nomitemSup",nomitemSup);
    obj.append("descripSup",descripSup);
    return this.httpClient.post(this.URL_API_LOCAL+"/itemSup"+"?token="+localStorage.getItem('token'),obj)
  }

  //recuperar items superiores de gastos previamente registrados 
  getAllItems():Observable<ItemSup[]>{
    return this.httpClient.get<ItemSup[]>(this.URL_API_LOCAL+"/itemSup")
  }

  getItemSupById(id): Observable<any>{
    return this.httpClient.get<any>(this.URL4 + '/' + id);
  }

  updateItemSup(id, item): Observable<any>{
    return this.httpClient.post<any>(this.URL4 + '/' + id+"?token="+localStorage.getItem('token'), item);
  }

  getAllItemsPresupuestados():Observable<ItemSup[]>{
    return this.httpClient.get<ItemSup[]>('http://apiser-vicios.herokuapp.com/api/auth/unidaditemsuper/'+localStorage.getItem('unidad_id'))
  }

  getAllItemsPresupuestadosActuales():Observable<ItemSup[]>{
    return this.httpClient.get<ItemSup[]>('http://apiser-vicios.herokuapp.com/api/auth/unidaditemsuper-actual/'+localStorage.getItem('unidad_id'))
  }



  // Eliminar item por su id
  deleteSup(id: string): Observable<any> {
    return this.httpClient.delete<any>(this.URL_API_LOCAL+"/itemSup" + '/' + id+"?token="+localStorage.getItem('token'))
    .pipe(
      catchError(this.errorHandler)
    );
  }

  //item superior
  getExiste(name): Observable<any>{
    return this.httpClient.get<any[]>(this.URL_API_LOCAL+ '/itemSuperiorVerificar' + '/' + name);
  }
   //item especifico
   getExiste1(name): Observable<any>{
    return this.httpClient.get<any[]>(this.URL_API_LOCAL+ '/verificarItem' + '/' + name);
  }
}

