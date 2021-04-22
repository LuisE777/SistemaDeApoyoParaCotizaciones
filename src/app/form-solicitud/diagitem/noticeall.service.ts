import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoticeallService {
  private subject = new Subject<any>();

  nombreItem: string='Sin nombre';

  send(){
    this.subject.next();
  }
  
  getChange():Observable<any>{
    return this.subject.asObservable();
  }
}
