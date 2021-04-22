import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.css']
})
export class SolicitudesComponent implements OnInit {

  solicitudes=[
    {nombre: 'Computadoras', cantidad:'5', descripcion:'Computadoras de escritorio', precio:'2500 Bs.'},
    {nombre: 'Monitores', cantidad:'5', descripcion:'Monitores', precio:'1000 Bs.'},
    {nombre: 'Escritorios', cantidad:'5', descripcion:'Escritorios para computadoras', precio:'500 Bs.'}
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
