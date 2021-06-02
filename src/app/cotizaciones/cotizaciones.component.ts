import { Component, OnInit } from '@angular/core';
import { Solicitud } from 'src/app/models/solicitud';
import { SolicitudService } from 'src/app/services/solicitud.service';
@Component({
  selector: 'app-cotizaciones',
  templateUrl: './cotizaciones.component.html',
  styleUrls: ['./cotizaciones.component.css']
})
export class CotizacionesComponent implements OnInit {

  constructor(public solicitudService: SolicitudService) { }

  ngOnInit(): void {
    this.obtenerSolicitudes();
  }
  obtenerSolicitudes() {
    this.solicitudService.obtenerSolicitud1().subscribe(
      res => {
        this.solicitudService.solicitudes = res; 
      },
      err => console.log(err)
    )
  }

  esAceptado(estado:String){
    return estado=="Aceptada" || estado=="Comparacion de cotizaciones" || estado=="Comparacion de cotizaciones"  || estado=="Solicitando cotizaciones" || estado=="Compra autorizada" || estado=="Compra rechazada" 
  }
  obteniendoSolicitud(idSol:any){
    console.log(idSol);
    localStorage.setItem("unidadSol",idSol.unidad_nombre)
    localStorage.setItem("idUnidadSol",idSol.unidad_id)
    localStorage.setItem("solicitud",idSol.id)
  }

}
