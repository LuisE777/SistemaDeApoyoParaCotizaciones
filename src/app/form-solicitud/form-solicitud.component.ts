import { Component, Directive, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';

import { Router } from "@angular/router"
import { MatTableDataSource } from '@angular/material/table';
import { MatTable } from '@angular/material/table';
import { MatDialog } from "@angular/material/dialog";
import { Item } from './item';
import { DiagitemComponent } from './diagitem/diagitem.component';
import { NoticeallService } from './diagitem/noticeall.service';
import { HttpClient } from '@angular/common/http';
import { Service } from './diagitem/autocompletar/item.service'; //getting api data 
import { NavbarComponent } from '../navbar/navbar.component'
import { NavbarService } from '../navbar/navbar.service';

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
  
  datos: Item[] = 
    [new Item(1, 'Material de escritorio', 'Lapiceros, hojas, minas 0.5 mm', 6, 55),
  new Item(2, 'PC conponentes', 'Varios', 4, 53),
  new Item(3, 'Tintas en polvo', 'Tintas en polvo para impresoras', 5, 25)];

  
  //A emty type class

  ds = new MatTableDataSource<Item>(this.datos);

  @ViewChild(MatTable) tabla1: MatTable<Item>;

  constructor(public dialog: MatDialog,public getAPItems: Service, public recivedName: NoticeallService, private http: HttpClient, private router: Router,private getUser: NavbarService) {

  }

  abrirDialogo() {

    const dialogo1 = this.dialog.open(DiagitemComponent, {
      data: new Item(0, '', '', 0, 0)
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
    const getDataS = (items, query) =>
    [items.find(item => query === item.nombre)]
      .map(x => x && x.idproducto).shift(); //The id column name 
    
    let idRecived =getDataS(this.getAPItems.opts, this.recivedName.nombreItem); 
    //console.log("El Id del producto es:",idRecived);  //Done 
    this.datos.push(new Item(idRecived, this.recivedName.nombreItem, art.descrip, art.cantidad, art.precio));
    this.tabla1.renderRows();
  }


  startEdit(i: number) {//Working on   

    //console.log('HERERRERER', i);
    this.recivedName.nombreItem = this.datos[i].nombre;
    let massa: string = this.recivedName.nombreItem;
    const dialogRef = this.dialog.open(DiagitemComponent, {
      data: new Item(this.datos[i].id, massa, this.datos[i].descrip, this.datos[i].cantidad, this.datos[i].precio)
    });

  }


  ngOnInit(): void {
  }

  enviarSolicitud() {
    let IDs = new Array;
    IDs = this.datos.map(a=>a.id);
    console.log("eL TAMANIO DE;",this.datos.length);
    

    let sum: number = this.datos.map(a => a.precio).reduce(function(a, b)
    {
     return a + b;
    });
    console.log(sum);
    /*
      {   
        "responsable":"Mike",
        "montoestimado":"55.85",
        "estado":"Pendiente"
      ,
      "items":[ 
           1,2   
      ]
      }*/

    //Get the data into 
    const massa = {
      "responsable": this.getUser.nombreUsuario,
      "montoestimado": sum,
      "estado": "Pendiente",
      "items":IDs
    };
    console.log(massa);

    this.http.post("http://apiser-vicios.herokuapp.com/api/auth/solicitudes", massa)
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