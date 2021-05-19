import { Component, Directive, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from "@angular/router"
import { MatTableDataSource } from '@angular/material/table';
import { MatTable } from '@angular/material/table';
import { MatDialog } from "@angular/material/dialog";
import { Item } from './item';
import { DiagitemComponent } from './diagitem/diagitem.component';
import { NoticeallService } from './diagitem/noticeall.service';
import { HttpClient } from '@angular/common/http';
import { Service } from './diagitem/autocompletar/item.service'; //getting api data 

import {ItemService} from '../services/item.service';
import {ItemSup} from '../models/itemSup.model';
import { NavbarService } from '../navbar/navbar.service';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';





export interface Pivot{
  "unidad_id": number,
  "itemsuperior_id": number,
  "montoasig": number,
  "periodo": string
 }
export interface UnidadItemsAsing
  {
    "id": number,
    "nomitemSup":string,
    "descripSup": string,
    "created_at": string,
    "updated_at": string,
    "pivot": Pivot  
 }

 export interface ItemsArray
 {
   "id": number,
   "nomitem": string,  
   "descrip": string,   
   "item_general_id":number,
   "created_at":string,
   "update_at": string,
}

@Component({
  selector: 'app-form-solicitud',
  templateUrl: './form-solicitud.component.html',
  styleUrls: ['./form-solicitud.component.css'],

})
export class FormSolicitudComponent implements OnInit {
  //Auto
  //DROP down selection
  form: FormGroup;
  itemSup:ItemSup[];
  //carControl = new FormControl(this.itemSup[1].value);

    columnas: string[] = ['id', 'nombre', 'descrip', 'cantidad', 'precio', 'borrar'];

  datos: Item[] = [];
  
  /*
  datos: Item[] = 
    [new Item(1, 'Material de escritorio', 'Lapiceros, hojas, minas 0.5 mm', 6, 55),
    new Item(2, 'PC conponentes', 'Varios', 4, 53),
    new Item(3, 'Tintas en polvo', 'Tintas en polvo para impresoras', 5, 25)];
*/
  
  //A emty type class

  ds = new MatTableDataSource<Item>(this.datos);
 

  @ViewChild(MatTable) tabla1: MatTable<Item>;
 //Form control
  carControl = new FormControl();
  constructor(public dialog: MatDialog
    ,public getAPItems: Service
    ,public recivedName: NoticeallService
    ,private http: HttpClient
    ,private router: Router
    ,private getUser: NavbarService
    ,public itemSuperior:ItemService) {
      this.form = new FormGroup({
       
        car: this.carControl
      });
  }



  dataUnits:UnidadItemsAsing[];
  dataItems:ItemsArray[];
  IDunidadUser = localStorage.getItem('unidad_id');
  //Se guarda los datos de las unidades con presupuestos asignados 
  getUnidadAsigns() {        
      return this.http.get<any>('http://apiser-vicios.herokuapp.com/api/auth/unidaditemsuper/'+this.IDunidadUser).subscribe(
          data => { this.dataUnits = data });
} 

  abrirDialogo() {

    const dialogo1 = this.dialog.open(DiagitemComponent, {
      data: new Item(0, '', '', 0, 0)
    });

    dialogo1.afterClosed().subscribe(art => {

      if (art != undefined)
        this.agregar(art);
    });
  }

  borrarFila(cod: number) {
    if (confirm("Realmente quiere borrarlo?")) {
      this.datos.splice(cod, 1);
      this.tabla1.renderRows();
    }
  }

  agregar(art: Item) {
    //console.log('AAAAAAAA', this.recivedName.getChange());
    //maybe here process the api data 
    //Method to get the IDs
  /*
      const getDataS = (items, query) =>
    [items.find(item => query === item.nomitem)]
      .map(x => x && x.id).shift(); //The id column name 
  */
    //let casa = this.recivedName.nombreItem;
    this.getAPItems.getData;
    this.dataItems = this.getAPItems.opts;

    //console.log('LA PALBRA', this.recivedName.nombreItem);
    
    //let idRecived = getDataS(this.dataItems, this.recivedName.nombreItem);  

    const resultD = this.dataItems.filter(res=>res.nomitem===this.recivedName.nombreItem);
    console.log("El Id del producto es:",resultD[0].id);  //Done 
   
    console.log(this.dataItems);
    this.datos.push(new Item(resultD[0].id, this.recivedName.nombreItem, art.descrip, art.cantidad, art.precio));
    this.tabla1.renderRows();
    this.recivedName.nombreItem='';

  }


  startEdit(i: number) {//Working on   

    //console.log('HERERRERER', i);
    this.recivedName.nombreItem = this.datos[i].nombre;
    let massa: string = this.recivedName.nombreItem;
    const dialogRef = this.dialog.open(DiagitemComponent, {
      data: new Item(this.datos[i].id, massa, this.datos[i].descrip, this.datos[i].cantidad, this.datos[i].precio)
    });

  }
 
  ngOnInit(): void {
    this.itemSuperior.getAllItemsPresupuestados().subscribe(data=>{
      this.itemSup = data;
    })  
    this.getUnidadAsigns();   
  }
  
  supera:number;
  
  onSelectChange($event){    
    //Need the ID of the selected itemSup
    //We are sending this ID to get the items of this specific ItemSuperior
    let ID = (this.itemSup.find(i=>i.nomitemSup === this.carControl.value)?.id)!;
    console.log('EL TIPOOOO',typeof(this.carControl.value) );
    this.recivedName.itemGeneral=ID;
    
   //console.log(this.dataUnits);
    //let Objeto: Pivot;
    let Objeto = this.dataUnits.find(i=>i.nomitemSup === this.carControl.value)?.pivot.montoasig;
    //AD 
    console.log(typeof(Objeto));

    let montoAsig = parseInt(Objeto+'');
     this.supera=montoAsig;
    console.log(montoAsig);
  }

  enviarSolicitud() {
    let IDs = new Array;
    IDs = this.datos.map(a=>a.id);
   // console.log("eL TAMANIO DE;",this.datos.length);
   let sum: number = this.datos.map(a => a.precio).reduce(function(a, b)
    {
     return a + b;
    });
    //Supera its the th eAsgined value in the DB to that item Superior
    const SUPERS = sum >= this.supera ? "Si" : "No";
   console.log('LA SUMMMMMA',sum);
    //Get the data into 
    console.log();
    const massa = {
      "tipo":this.carControl.value,
      "responsable": localStorage.getItem("nombre"),
      "montoestimado": sum,
      "estado": "Pendiente",
      "supera":SUPERS,
      "items": IDs
    };
    console.log(massa);
    let seHaGuardado;
    this.http.post("http://apiser-vicios.herokuapp.com/api/auth/solicitudes", massa)
      .subscribe((val) => {        
        seHaGuardado = (Object.keys(val).length === 0) ? 0 : 1;
        console.log('The item: ',val);
        console.log("POST call successful value returned in body", val)

        //Maybe a if 
        , Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Se envió la solicitud',
          showConfirmButton: false,
          timer: 2000
        })
      },
        response => {
          console.log("POST call in error", response) , Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Ocurrio un error al enviar la solicitud',
            showConfirmButton: false,
            timer: 2000
          })
        },
        () => {
          console.log("The message POST has been send | Completed.");
          this.router.navigate(['/usuario'])
        });

        //Here 
  }
}