import { SeleccionEmpresaComponent } from './seleccion-empresa/seleccion-empresa.component';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatTable } from '@angular/material/table';
import { MatDialog } from "@angular/material/dialog";
@Component({
  selector: 'app-cotizando',
  templateUrl: './cotizando.component.html',
  styleUrls: ['./cotizando.component.css']
})
export class CotizandoComponent implements OnInit {
  constructor(public dialog: MatDialog) { }

  ngOnInit(){
  }
  abrirDialogo() {
    const dialogo1 = this.dialog.open(SeleccionEmpresaComponent, {
  });

  }

}
