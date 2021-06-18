import { SeleccioneAnio2Component } from './../seleccione-anio2/seleccione-anio2.component';
import { Component, OnInit } from '@angular/core';
import { Fecha } from '../models/fecha';
import { FechaService } from '../services/fecha.service';
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: 'app-jefe',
  templateUrl: './jefe.component.html',
  styleUrls: ['./jefe.component.css']
})
export class JefeComponent implements OnInit {
  flag: boolean;
  fechas:Fecha[];
  constructor(public fechaService: FechaService,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.fechaService.obtenerUltimaFecha().subscribe(
      res => {       
        this.fechaService.fecha = res;  
      },
      err => console.log(err)
    )
    this.validarFecha();
  }
  cargar(){
    window.location.reload();
  }
  validarFecha(){   
    //obtiene la fecha actual
    var today = new Date();
    today.setHours(0,0,0,0);    

    //convierte las fechas de date a string    
    if(this.fechaService.fecha){
      var apertura: string = this.fechaService.fecha.apertura.toString() ;
      var cierre: string= this.fechaService.fecha.cierre.toString();

      if(apertura === undefined || cierre === undefined){
        return false;
      }
  
      //Transforma de formato Date Mysql a Date de javascript
      var jsApertura = new Date(Date.parse(apertura.replace(/[-]/g,'/')));
      var jsCierre = new Date(Date.parse(cierre.replace(/[-]/g,'/')));
      
      console.log("Flag ",((today >= jsApertura) && (today <= jsCierre)));
      //verifica si la fecha actual esta en rango de la fecha establecia      
      return ((today >= jsApertura) && (today <= jsCierre));
    } else {
      return false;
    }
    
  }

  toMysqlFormat(fecha: any) {
    return fecha.toISOString().slice(0, 19).replace('T', ' ');
  }
  abrirDialogo() {
    const dialogo1 = this.dialog.open(SeleccioneAnio2Component, {
    });

  }

}
