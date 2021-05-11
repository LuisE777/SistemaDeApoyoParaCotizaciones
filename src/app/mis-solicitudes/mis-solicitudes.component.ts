import { Component, OnInit } from '@angular/core';
import { Solicitud } from 'src/app/models/solicitud';
import { SolicitudService } from 'src/app/services/solicitud.service';
@Component({
  selector: 'app-mis-solicitudes',
  templateUrl: './mis-solicitudes.component.html',
  styleUrls: ['./mis-solicitudes.component.css']
})
export class MisSolicitudesComponent implements OnInit {

  constructor(public solicitudService: SolicitudService) { }

  ngOnInit(): void {
    this.obtenerSolicitudes();
  }
  obtenerSolicitudes() {
    this.solicitudService.obtenerSolicitud1().subscribe(
      res => {
        this.solicitudService.solicitudes = res; 
        console.log(res);
      },
      err => console.log(err)
    )
  }

  esUsuario(usuario:String){
    return usuario==localStorage.getItem("nombre")+""
  }
}
