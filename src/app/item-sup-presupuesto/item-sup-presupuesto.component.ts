import { SeleccioneAnioComponent } from './../presupuesto-actual/seleccione-anio/seleccione-anio.component';
import { ItemPresService } from './../services/itemPres.service';
import { ItemPresupuesto } from './../models/itemPresupuesto.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ItemService } from "../services/item.service";
import { ItemSup } from '../models/itemSup.model';
import { Location } from '@angular/common';
import { MatDialog } from "@angular/material/dialog";
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-item-sup-presupuesto',
  templateUrl: './item-sup-presupuesto.component.html',
  styleUrls: ['./item-sup-presupuesto.component.css']
})
export class ItemSupPresupuestoComponent implements OnInit {
  unidaddegasto:any;
  angForm: FormGroup;
  submitted:boolean = false;
  itemSup:ItemSup[];
  constructor( 
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private itemS: ItemService,
    private itemP:ItemPresService,
    private _location: Location,
    public dialog: MatDialog,
    private _Activatedroute: ActivatedRoute,
    private _router: Router,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.getItemsSup();
    this.createForm();
    
    this.unidaddegasto = localStorage.getItem("unidad_id");
  }

  getItemsSup(){
    this.itemS.getAllItems().subscribe(data=>{
      this.itemSup =data;
    });  
  }

  // Creacion de formulario angForm
  createForm() {
    this.angForm = this.fb.group({
      //unidad: ['', Validators.required],
      itemsuperior: ['', Validators.required],
      montoasig: ['', Validators.required],
      descrip: ['', Validators.required],
      periodo: ['', Validators.required]      
    });
  }


  // Envio de formulario
  submitForm() {
    this.submitted = true;
    if (!this.angForm.valid) {
      return false;
    } else {
      let unidad_id = this.unidaddegasto
      let itemsuperior_id = this.angForm.controls.itemsuperior.value
      let montoasig  = this.angForm.controls.montoasig.value
      let periodo  = this.angForm.controls.periodo.value
      console.log(unidad_id,itemsuperior_id,montoasig ,periodo)
      this.itemP.addItemPres(unidad_id,itemsuperior_id,montoasig,periodo).subscribe(res => {
          Swal.fire({
            icon: 'success', 
            title: 'Registrado!',
            showConfirmButton: false,
            timer: 1500
          });
          //this.router.navigate(['usuario/']);
          this.goBack()
        }, (error) => {
          console.log(error);
          Swal.fire({
            icon: 'error', 
            text: 'Ups algo salió mal!',
            showConfirmButton: false,
            timer: 1500
            
          });
        });
      return false;
    // } else {
    //     let nomitem = this.angForm.controls.nomitem.value
    //     let descrip  = this.angForm.controls.descrip.value
    //     let montoasig  = this.angForm.controls.montoasig.value
    //     let periodo  = this.angForm.controls.periodo.value
    //     let unidaddegasto  = this.unidaddegasto
    // this.itemS.addItem(nomitem, descrip,montoasig,periodo,unidaddegasto).subscribe
    // (data=>{console.log(data), Swal.fire({
    //   position: 'center',
    //   icon: 'success',
    //   title: 'Se guardo la información',
    //   showConfirmButton: false,
    //   timer: 2000
    // })},error=>{Swal.fire({
    //   icon: 'error',
    //   title: 'Ocurrio un error al guardar la información',  
    //   showConfirmButton: false,
    //   timer: 2000
    // })})
    //   }
    //   return true;
    }}
    goBack(){
      this._location.back();
    }
    abrirDialogo() {
      const dialogo1 = this.dialog.open(SeleccioneAnioComponent, {
      });
  
    }
  
}







  
  






