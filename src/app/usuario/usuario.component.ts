import { Component, OnInit } from '@angular/core';
import { FechaService } from '../services/fecha.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  flag: boolean;

  constructor(public fechaService: FechaService) { }

  ngOnInit(): void {    
    this.fechaService.obtenerFecha().subscribe(
      res => {
       
        this.fechaService.fechas = res;  
      },
      err => console.log(err)
    )
    this.validarFecha();
  }
  cargar(){
    window.location.reload();
  }

  validarFecha(){   
    //this.obtenerFecha();
    //console.log(this.fechaService.fechas);

    //obtiene la fecha actual
    var today = new Date();
    today.setHours(0,0,0,0);    
    //console.log("Hoy", today);
    
    //convierte las fechas de date a string
    var apertura = this.fechaService.fechas[this.fechaService.fechas.length-1].apertura.toString();
    var cierre = this.fechaService.fechas[this.fechaService.fechas.length-1].cierre.toString();

    //Transforma de formato Date Mysql a Date de javascript
    var jsApertura = new Date(Date.parse(apertura.replace(/[-]/g,'/')));
    var jsCierre = new Date(Date.parse(cierre.replace(/[-]/g,'/')));

    //console.log(jsApertura);
    //console.log(jsCierre);
    
    console.log("Flag ",((today >= jsApertura) && (today <= jsCierre)));
    //verifica si la fecha actual esta en rango de la fecha establecia
    //this.flag = ((today >= jsApertura) && (today <= jsCierre));
    return ((today >= jsApertura) && (today <= jsCierre));
  }

  toMysqlFormat(fecha: any) {
    return fecha.toISOString().slice(0, 19).replace('T', ' ');
  }

 /* obtenerFecha(){
    this.fechaService.obtenerFecha().subscribe(
      res => {
       
        this.fechaService.fechas = res;  
      },
      err => console.log(err)
    )
  }*/
}
