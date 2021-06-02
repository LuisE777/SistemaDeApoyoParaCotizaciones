import { Unidades2 } from './../models/Unidad2.interfaz';
import { element } from 'protractor';
import { NavbarComponent } from './../navbar/navbar.component';
import { Component, OnInit , ViewChild, ElementRef} from '@angular/core';
import { UsuarioService } from './../services/usuario.service';
import { DatePipe, DOCUMENT } from '@angular/common';
import { jsPDF } from 'jspdf'
import domtoimage from 'dom-to-image';
import { Cotizacion } from './../models/cotizacion.model';

@Component({
  selector: 'app-solicitud-cotizacion',
  templateUrl: './solicitud-cotizacion.component.html',
  styleUrls: ['./solicitud-cotizacion.component.css'],
  providers: [DatePipe]
})
export class SolicitudCotizacionComponent implements OnInit {
  myDate = new Date();
  fecha:any;
  iii:number=5;
  cotizacionLista:Cotizacion[];
  variable:any;
  empresaEle:any;
  unidad:any=localStorage.getItem("idUnidadSol")+"";
  unidadName:any=localStorage.getItem("unidadSol")+"";
  facultad:any;
  telefono:any;
  constructor( private datePipe: DatePipe, public _usuarioService:UsuarioService) { 
  }
  
  ngOnInit(): void {

    console.log("Probando")
    console.log(this.myDate)
    this.fecha=this.datePipe.transform(this.myDate, 'dd-MM-yyyy'); 
    console.log(this.fecha)
    console.log('app.component cargando'); 
    this.variable=localStorage.getItem("solicitud")+""
    this._usuarioService.getAllCotizaciones(this.variable).subscribe(data=>{
      //console.log(data);
      this.cotizacionLista=data;
      console.log(this.cotizacionLista);
    })
    this.empresaEle=localStorage.getItem("empresa")+""
    this.facultad=localStorage.getItem("facultadSol")+""
    this.telefono=localStorage.getItem("telefonoSol")+""
    



  }


  pdf(){
    var canvas = document.getElementById('imprimir3');
    domtoimage.toPng(canvas).then((dataUrl)=>{
        let imagen= new Image();
        imagen.src=dataUrl;/*obtengo el screenshot*/
        let pdf = new jsPDF('l','mm','A4');/* creamos el pdf con jspdf, l es de landscape, mm: medidas en milímetros, y A4 el formato*/
        pdf.addImage( imagen, 10, 10, 260,189); /*imagen: es la captura que insertaremos en el pdf, 18: margen izquierdo, 10: margen superior, 260:ancho, 189:alto, pueden jugar con estos valores, de esta forma me quedó prolijo en A4 horizontal*/
        pdf.save( 'cotizacion.pdf' ); /* descargamos el pdf con ese nombre.*/
    }
    );
  }
  esSolicitud(variable:any){
      return variable==localStorage.getItem("solicitud")+""
  }




}
