import { SeleccionEmpresaComponent } from './seleccion-empresa/seleccion-empresa.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { SolicitudItems } from 'src/app/models/solicituditems.model';
import { MatTableDataSource } from '@angular/material/table';
import { UsuarioService } from './../services/usuario.service';
import { Solicitud } from 'src/app/models/solicitud';


export interface empresaCot {
  "id": number,
  "nombreemp":string,
  "repnombre": string,
  "telefono": string,
  "diremp": string,
  "rubro": string,
  "nit": string,
  "created_at": string,
  "updated_at": string,
  "pivot": {
    "id_solicitud": string,
    "id_empresa": string,
    "id": string,
    "observaciones":string,
    "plazo_de_entrega": string,
    "validez_oferta": string,
    "total": string,
    "cotizacion_pdf": string,
    "eleccion": string
}
}

export interface itemscotizados {
            "id": number,
            "observaciones":string,
            "plazo_de_entrega":string,
            "validez_oferta": string,
            "total": string,
            "cotizacion_pdf": string,
            "eleccion": string,
            "created_at": string,
            "updated_at": string,
            "id_empresa": string,
            "id_solicitud": string,
            "itemscot": [
                {
                    "id": string,
                    "nombre": string,
                    "descripcion": string,
                    "cantidad": string,
                    "precioUnitario": string,
                    "total": string,
                    "created_at": string,
                    "updated_at": string,
                    "empresa_cotizacion_id": string
                }]
}


export interface SolicitudCotizacion {
  id: number,
  responsable: string,
  montoestimado: string,
  estado: string,
  supera: string,
  tipo: string,
  unidad_nombre: string,
  unidad_id: string,
  created_at: string,
  items: [{
    id: number,
    nomitem: string,
    descrip: string,
    item_general_id: number,
    created_at: string,
    updated_at: string,
    pivot: {
      solicitud_id: number,
      item_id: number,
      nombre: string,
      descrip: string,
      cantidad: number,
      precio: number,
    }
  }]
}

@Component({
  selector: 'app-cotizando',
  templateUrl: './cotizando.component.html',
  styleUrls: ['./cotizando.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class CotizandoComponent implements OnInit {

  //DEFINIENDO CLASSES para solicitud
  unaSolicitud: SolicitudItems;
  idobtenida;

  //Windows
  mostrarCotizacion: boolean = true;
  visible: boolean = false;

  //table item expadido
  isTableExpanded = false;

  //SOME DATA to WORK WITH
  dataToShow = new MatTableDataSource();
  columnsTable: string[] = ['id', 'name', 'age', 'address', 'actions'];
  DUMMYdata = [
    {
      id: 1,
      cotizacion_pdf:"..." ,
      id_solicitud: 4,
      id_empresa: 5,
      obeservaciones: "",
      plazo_de_entrega: "1 dia(s)",
      total: 53,
      validez_oferta: "",
      seleccion: "Si",
      created_at: "", 
      updated_at: "",
      items:[
        {
          id:1,
          nombre:"Lapiceros",
          descrip:"Con punta 0.5 disponibles en negro",
          cant:1,
          precio:38
        },
        {
          id:3,
          nombre:"Hojas",
          descrip:"De calidad Print paper",
          cant:100,
          precio:15

        }
      ],
      empresa:  {
        nombreemp: "Libreria SARA S.R.L",
        repnombre: "Don Juan",
        telefono: "78228148",
        diremp: "AV. La paz",
        rubro: "Tecnologia",
        nit: "781856"
      }    
    }
    
  ];
  idSoli:any=localStorage.getItem("solicitud")+"";
  solicitudInfo:Solicitud;
  constructor(public dialog: MatDialog,public _usuarioService:UsuarioService,
    private _Activatedroute: ActivatedRoute,
    private _router: Router,
    public solicitudService: SolicitudService,
    private http: HttpClient) { }

  sub;
  
  ngOnInit() {
    //GETTING THE API DATA here
     this.getOnes();
     this.getTwos();

       
     console.log("NO HAY NADA:",this.empDatos);
     console.log("NO HAY NADA:",this.cotitems);
     

     this._usuarioService.getAllInfoSol(this.idSoli).subscribe(data=>{   
     this.solicitudInfo=data[0];
    })
   
    //OBTENIENDO EL ID DE LA SOLICITUD del URL
    this.sub = this._Activatedroute.paramMap.subscribe(params => {
      //console.log(params);
    this.idobtenida = params.get('id');

      if (this.solicitudService.solicitudesitemspivot.length === 0) {
        let recoverSolicitud: SolicitudItems;
        recoverSolicitud = JSON.parse(sessionStorage.solicitudbody);
        this.unaSolicitud = recoverSolicitud;
      
        return;
      }
      let solicituds: SolicitudItems[] = this.solicitudService.solicitudesitemspivot;
      this.unaSolicitud = solicituds.find(p => p.id == this.idobtenida)!;
    });

    console.log('Las massa', this.solicitudService.solicitudesitemspivot.length);
  }

empDatos:empresaCot[];
cotitems:itemscotizados[];

  getOnes() {        
    return this.http.get<any>('http://127.0.0.1:8000/api/auth/solicitud-cotizacion-items/'+this.idobtenida).subscribe(
        data => { this.cotitems = data });
  } 
  
  getTwos() {        
    return this.http.get<any>('http://127.0.0.1:8000/api/auth/empresa-cotizacion/'+this.idobtenida).subscribe(
        data => { this.empDatos = data });
  } 

  abrirDialogo() {
    const dialogo1 = this.dialog.open(SeleccionEmpresaComponent, {
    });

  }

  mostrarCotizaciones() {    //Aqui


    this.mostrarCotizacion = !this.mostrarCotizacion;
    this.visible = !this.visible;
    this.cambiarEstado()
  }

  //TABLE METHODS

  toggleTableRows() {
    this.isTableExpanded = !this.isTableExpanded;

    this.dataToShow.data.forEach((row: any) => {
      row.isExpanded = this.isTableExpanded;
    })
  }

  cambiarEstado(){
    this.solicitudService.actualizarEstado(this.solicitudInfo, "Comparacion de cotizaciones").subscribe(
      res => {    
        console.log(res);   
      },
      err => console.log(err)
    )
  }
  
}
