import { Component, OnInit } from '@angular/core';
import { Solicitud } from 'src/app/models/solicitud';
import { SolicitudService } from 'src/app/services/solicitud.service';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.css']
})
export class SolicitudesComponent implements OnInit {

  /*solicitudes=[
    {nombre: 'Computadoras', cantidad:'5', descripcion:'Computadoras de escritorio', precio:'2500 Bs.'},
    {nombre: 'Monitores', cantidad:'5', descripcion:'Monitores', precio:'1000 Bs.'},
    {nombre: 'Escritorios', cantidad:'5', descripcion:'Escritorios para computadoras', precio:'500 Bs.'}
  ]*/
  constructor(public solicitudService: SolicitudService) { }

  ngOnInit(): void {
    this.obtenerSolicitudes();
  }


  obtenerSolicitudes() {
    this.solicitudService.obtenerSolicitud().subscribe(
      res => {
        this.solicitudService.solicitudes = res; 
        console.log(res);
      },
      err => console.log(err)
    )
    this.solicitudService.obtenerSolicitudAceptada().subscribe(
      res => {
        this.solicitudService.solicitudesAprobadas = res; 
        console.log(res);
      },
      err => console.log(err)
    )
    this.solicitudService.obtenerSolicitudRechazada().subscribe(
      res => {
        this.solicitudService.solicitudesRechazadas = res; 
        console.log(res);
      },
      err => console.log(err)
    )
  }

  aceptarSolicitud(solicitud: Solicitud) {   
    //solicitud.estado = "Aceptada"; 
    this.solicitudService.actualizarEstado(solicitud, "Aceptada").subscribe(
      res => {    
        console.log(res);   
        //window.location.reload();     
        this.obtenerSolicitudes();
      },
      err => console.log(err)
    )
  }

  rechazarSolicitud(solicitud: Solicitud) {
    //solicitud.estado = "Rechazada";    
    this.solicitudService.actualizarEstado(solicitud, "Rechazada").subscribe(
      res => {    
        console.log(res);  
        //window.location.reload();      
        this.obtenerSolicitudes();
      },
      err => console.log(err)
    )
  }
}
