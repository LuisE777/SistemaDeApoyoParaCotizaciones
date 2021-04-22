import { Component, Directive, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';

import { Router } from "@angular/router"
import { MatTableDataSource } from '@angular/material/table';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Item } from './item';
import { DiagitemComponent } from './diagitem/diagitem.component';
import { NoticeallService } from './diagitem/noticeall.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';




@Component({
  selector: 'app-form-solicitud',
  templateUrl: './form-solicitud.component.html',
  styleUrls: ['./form-solicitud.component.css'],

})
export class FormSolicitudComponent implements OnInit {
  //Auto
  //Table
  columnas: string[] = ['id', 'nombre', 'descrip', 'cantidad', 'precio', 'borrar'];

  //datos: Item[] = [];
  datos: Item[] = [new Item(1, 'Material de escritorio', 'Lapiceros, hojas, minas 0.5 mm', 6, 55),
  new Item(2, 'PC conponentes', 'Varios', 4, 53),
  new Item(3, 'Tintas en polvo', 'Tintas en polvo para impresoras', 5, 25)];
  //A emty type class

  ds = new MatTableDataSource<Item>(this.datos);

  @ViewChild(MatTable) tabla1: MatTable<Item>;

  constructor(public dialog: MatDialog, public recivedName: NoticeallService, private http: HttpClient, private router: Router) {

  }

  abrirDialogo() {

    const dialogo1 = this.dialog.open(DiagitemComponent, {
      data: new Item(0,'', '', 0, 0)
    });

    dialogo1.afterClosed().subscribe(art => {

      if (art != undefined)
        this.agregar(art);
    });

  }

  borrarFila(cod: number) {    
    if (confirm("Realmente quiere borrarlo?")) {
      this.datos.splice(cod, 1);
      this.tabla1.renderRows();
    }
  }

  agregar(art: Item) {
    //console.log('AAAAAAAA', this.recivedName.getChange());
    //maybe here process the api data 
    this.datos.push(new Item(art.id, this.recivedName.nombreItem, art.descrip, art.cantidad, art.precio));
    this.tabla1.renderRows();
  }
  
    startEdit(i: number) {//Working on   
  
      console.log('HERERRERER', i);
      this.recivedName.nombreItem = this.datos[i].nombre;
      let massa: string = this.recivedName.nombreItem;
      const dialogRef = this.dialog.open(DiagitemComponent, {
        data: new Item(this.datos[i].id, massa, this.datos[i].descrip,this.datos[i].cantidad, this.datos[i].precio)
      });
  
    }
  
    
  ngOnInit(): void {
  }

  enviarSolicitud() {
    const massa={
      "responsable":"The massa Bro",
      "montoestimado":"55.55 Se tendra la suma",
      "estado":"Pendiente"
    };
    this.http.post("http://127.0.0.1:8000/api/auth/solicitudes", [massa,this.datos])
      .subscribe((val) => {
        console.log("POST call successful value returned in body", val);
      },
        response => {
          console.log("POST call in error", response);
        },
        () => {
          console.log("The message POST has been send | Completed.");
          this.router.navigate(['/login'])
        });
  }


}