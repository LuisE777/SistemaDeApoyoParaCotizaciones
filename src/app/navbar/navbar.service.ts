import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  private subject = new Subject<any>();

  nombreUsuario: string=localStorage.getItem("nombre")+"";
  //The initial name set into the Fileld Autocomplete service
  

  send(){
    this.subject.next();
  }
  
  getChange():Observable<any>{
    return this.subject.asObservable();
  }
  constructor() { }
}
