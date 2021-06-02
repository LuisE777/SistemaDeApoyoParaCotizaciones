import { SeleccionEmpresaComponent } from './seleccion-empresa/seleccion-empresa.component';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatTable } from '@angular/material/table';
import { MatDialog } from "@angular/material/dialog";
import { UsuarioService } from './../services/usuario.service';
import { Unidades2 } from './../models/Unidad2.interfaz';
@Component({
  selector: 'app-cotizando',
  templateUrl: './cotizando.component.html',
  styleUrls: ['./cotizando.component.css']
})
export class CotizandoComponent implements OnInit {
  unidad:any=localStorage.getItem("idUnidadSol")+"";
  unidadInfo:Unidades2;
  constructor(public dialog: MatDialog, public _usuarioService:UsuarioService) { }

  ngOnInit(){
    this._usuarioService.getinfounidad(this.unidad).subscribe(data=>{   
      this.unidadInfo=data[0];
      console.log("perra")
      console.log(this.unidadInfo)
      localStorage.setItem("facultadSol",this.unidadInfo.facultad)
      localStorage.setItem("telefonoSol",this.unidadInfo.telefono)
    })
  }
  abrirDialogo() {
    const dialogo1 = this.dialog.open(SeleccionEmpresaComponent, {
  });

  }

}
