import { SeleccionEmpresaComponent } from './seleccion-empresa/seleccion-empresa.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from '@angular/router';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { SolicitudItems } from 'src/app/models/solicituditems.model';


@Component({
  selector: 'app-cotizando',
  templateUrl: './cotizando.component.html',
  styleUrls: ['./cotizando.component.css']
})
export class CotizandoComponent implements OnInit {
 
  //DEFINIENDO CLASSES
  unaSolicitud:SolicitudItems;
  idobtenida;
  constructor(public dialog: MatDialog,
    private _Activatedroute:ActivatedRoute,
    private _router:Router,
    public solicitudService: SolicitudService) { }
  
  sub;
  ngOnInit(){
    
    //OBTENIENDO EL ID DE LA SOLICITUD del URL
    this.sub=this._Activatedroute.paramMap.subscribe(params => { 
      console.log(params);
       this.idobtenida = params.get('id');
       
       if(this.solicitudService.solicitudesitemspivot.length === 0){
          let recoverSolicitud:SolicitudItems;          
          recoverSolicitud = JSON.parse(sessionStorage.solicitudbody);
          this.unaSolicitud = recoverSolicitud;
          return;
       }
       let solicituds:SolicitudItems[] = this.solicitudService.solicitudesitemspivot;
       this.unaSolicitud=solicituds.find(p => p.id==this.idobtenida)!;    
   });
   
   console.log('Las massa',this.solicitudService.solicitudesitemspivot.length);
  }


  abrirDialogo() {
    const dialogo1 = this.dialog.open(SeleccionEmpresaComponent, {
  });

  }

}
