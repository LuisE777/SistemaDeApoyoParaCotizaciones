import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PresupuestoService {
   URL_API='https://127.0.0.1:8000/api/auth';
   
   //URL_API='http://apiser-vicios.herokuapp.com/api/auth';

  constructor() { }


}
