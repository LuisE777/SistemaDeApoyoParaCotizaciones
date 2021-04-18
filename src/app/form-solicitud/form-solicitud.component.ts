import { Component, OnInit, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Item } from './item';
import { DiagitemComponent } from './diagitem/diagitem.component';


@Component({
  selector: 'app-form-solicitud',
  templateUrl: './form-solicitud.component.html',
  styleUrls: ['./form-solicitud.component.css']
})
export class FormSolicitudComponent implements OnInit {
  //Auto
 
  //Table
  columnas: string[] = ['id', 'descrip', 'precio', 'borrar'];

  datos: Item[] = [new Item(1, 'Tintas', 55),
  new Item(2, 'Pc cables', 53),
  new Item(3, 'Varios escritorio', 25),
  ];


  ds = new MatTableDataSource<Item>(this.datos);

  @ViewChild(MatTable) tabla1: MatTable<Item>;

  constructor(public dialog: MatDialog) { }

  abrirDialogo() {
    const dialogo1 = this.dialog.open(DiagitemComponent, {
      data: new Item(0, '', 0)
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
    this.datos.push(new Item(art.id, art.descrip, art.precio));
    this.tabla1.renderRows();
  }

  ngOnInit(): void {
  }

}
