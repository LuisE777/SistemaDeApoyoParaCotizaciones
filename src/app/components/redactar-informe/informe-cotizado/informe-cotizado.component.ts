import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SolicitudSendInform } from '../../../services/solicitud-rechazo.service';
import { Itemscotizados } from '../../../models/cotizacioncompleta.model';
import { Solicitud } from 'src/app/models/solicitud';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-informe-cotizado',
  templateUrl: './informe-cotizado.component.html',
  styleUrls: ['./informe-cotizado.component.css']
})
export class InformeCotizadoComponent implements OnInit {

   //Text area chars
   maxChars:number = 300;
   role = '';
   chars = 0;

  constructor(private router: Router,
              private http: HttpClient,
              private _Activatedroute: ActivatedRoute,
              public oneSolicitud: SolicitudSendInform) { }
  

   unaSolicitud: Solicitud;
   cotizador:string;
   rol:string;

   // selectedElement: itemscotizados;
   recivedCotizacion: Itemscotizados[]=[];

  ngOnInit(): void {
    //Getting cotizador name
    this.cotizador=localStorage.getItem('nombre')!;
    this.rol = localStorage.getItem('rol')!
    this.unaSolicitud = this.oneSolicitud.SolicitudOne;
    this.recivedCotizacion = this.oneSolicitud.itemCotizadosxEmpresas;
    //console.log("IN THE ACTUAL COMPONENT",this.recivedCotizacion);
    //console.log("the SERVICE ONE",this.oneSolicitud.itemCotizadosxEmpresas);
  }
  
  enviarInforme(){
    let idobtenida;
    this._Activatedroute.paramMap.subscribe(params => {
      //console.log(params);      
     idobtenida = params.get('id');
    });

    const massa = {
      "nombre_cotizador":localStorage.getItem('nombre'),
      "tipo_informe":"Aceptacion",
      "informe_escrito":this.role,
      "id_solicitud": idobtenida      
    };
    //this.unaSolicitud.estado = "Devuelto";

    //FINAL SOLICITUD STATE  __> for test --> Comparacion de cotizaciones
    //console.log(massa);
    let seHaGuardado;
    //http://apiser-vicios.herokuapp.com
    //http://127.0.0.1:8000
    this.http.post("http://apiser-vicios.herokuapp.com/api/auth/informe", massa)
      .subscribe((val) => {        
        seHaGuardado = (Object.keys(val).length === 0) ? 0 : 1;
        console.log("POST call successful value returned in body", val)

        //Maybe a if 
        ,Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Se envió el informe de aceptacion',
          showConfirmButton: false,
          timer: 1000
        })
   
      },
        response => {
          console.log("POST call in error", response) , Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Ocurrio un error al enviar el informe. Vuelva a intentarlo',
            showConfirmButton: false,
            timer: 1000
          })
        },
        () => {
          console.log("The message POST has been send | Completed.");
          if(seHaGuardado === 1){
            console.log("SE HA ENVIADO ");
            this.router.navigate(['/cotizacion']);
          }else {            
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Ha sucedido algo. No se ha enviado la solicitud',
              showConfirmButton: false,
              timer: 2000
            })
          }
        });
  }
}
