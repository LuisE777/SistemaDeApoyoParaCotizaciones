import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  private subject = new Subject<any>();

<<<<<<< HEAD
  nombreUsuario=localStorage.getItem('nombre');
  
=======
  nombreUsuario: string=localStorage.getItem("nombre")+"";
>>>>>>> 28c38a551decfb70d6cf0c1897a69661a535345e
  //The initial name set into the Fileld Autocomplete service
  

  send(){
    this.subject.next();
  }
  
  

  getChange():Observable<any>{
    return this.subject.asObservable();
  }
  constructor() { }
}
