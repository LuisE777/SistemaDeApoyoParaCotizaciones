import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

//Recovered fileds [Nombre item, cantidad, Descripcion, precio unitario]
export class Service {
    constructor(private http: HttpClient) { }
    
    opts = [];
    supitems: any = [];
 

    getData() {
        return this.opts.length ?
            of(this.opts) :
            this.http.get<any>('http://alfasoft-api.herokuapp.com/productos').pipe(tap(data => this.opts = data))
    } 

}
