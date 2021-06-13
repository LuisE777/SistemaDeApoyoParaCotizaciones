import { Component, OnInit } from '@angular/core';

/*IMPORTS EXTRA */
import { Solicitud } from '../../models/solicitud';
import {SolicitudSendInform} from '../../services/solicitud-rechazo.service'

@Component({
  selector: 'app-redactar-informe',
  templateUrl: './redactar-informe.component.html',
  styleUrls: ['./redactar-informe.component.css']
})
export class RedactarInformeComponent implements OnInit {
  
   //Text area chars
   maxChars:number = 300;
   role = '';
   chars = 0;

  constructor(public oneSolicitud: SolicitudSendInform) { }

  unaSolicitud: Solicitud;
  cotizador:string;
  rol:string;

 

  ngOnInit(): void {
    //Getting cotizador name
    this.cotizador=localStorage.getItem('nombre')!;
    this.rol = localStorage.getItem('rol')!;

    this.unaSolicitud = this.oneSolicitud.SolicitudOne;
    //console.log("RECIVED",this.oneSolicitud.SolicitudOne);
  }


  enviarInforme(){
   
  }

}

