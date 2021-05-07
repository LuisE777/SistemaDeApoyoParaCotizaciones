

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

  URL_API='http://127.0.0.1:8000/api/auth';
  //URL_API='https://apiser-vicios.herokuapp.com/api/auth';
  URL2='http://127.0.0.1:8000/api/auth/itemSup';
  URL1='http://127.0.0.1:8000/api/auth/items';

  // Crear un item
  create(item: any): Observable<any> {
    return this.httpClient.post<any>( this.URL_API + '/items/', item)
    .pipe(
        catchError(this.errorHandler)
    );
  }

  // Encontrar por ID
  getById(id: string):  Observable<Item> {
    return this.httpClient.get<Item>(this.URL_API + '/items/' + id)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  // Obtener todos los items
  getAll(): Observable<any> {
    return this.httpClient.get<any[]>(this.URL_API + '/items')
    .pipe(
      catchError(this.errorHandler)
    );
  }

  // Editar item por su id
  update(id: string, item: any): Observable<any> {
    return this.httpClient.put<any>(this.URL_API + '/items/' + id, item)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  // Eliminar item por su id
  delete(id: string): Observable<any> {
    return this.httpClient.delete<any>(this.URL_API + '/items/' + id)
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
  //recuperar items de gastos previamente registrados 
  getAllItems():Observable<ItemSup[]>{
    return this.httpClient.get<ItemSup[]>(this.URL2)
  }
  //para guardar 
  addItem(nomitem:string, descrip:string,montoasig:string,periodo:string,unidaddegasto:string):Observable<any>{
    const obj =new FormData();
    obj.append("nomitem",nomitem);
    obj.append("descrip",descrip);
    obj.append("montoasig",montoasig);
    obj.append("periodo",periodo);
    obj.append("unidaddegasto",unidaddegasto);
    return this.httpClient.post(this.URL1,obj)
  }
}

