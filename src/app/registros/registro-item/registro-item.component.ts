import { ItemSup } from './../../models/itemSup.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ItemService } from "../../services/item.service";
@Component({
  selector: 'app-registro-item',
  templateUrl: './registro-item.component.html',
  styleUrls: ['./registro-item.component.css']
})
export class RegistroItemComponent implements OnInit {
  unidaddegasto:any;
  angForm: FormGroup;
  submitted:boolean = false;
  itemSup:ItemSup[];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private itemS: ItemService
    ) {
    }
    
  ngOnInit(): void {
    this.itemS.getAllItems().subscribe(data=>{
      this.itemSup =data;
    })  
    this.createForm();
    
    this.unidaddegasto = localStorage.getItem("unidaddegasto")
    console.log(this.unidaddegasto)
  }
  
 
  // Creacion de formulario angForm
  createForm() {
    this.angForm = this.fb.group({
      nomitem: ['', Validators.required],
      descrip: ['', Validators.required],
      montoasig: ['', Validators.required],
      periodo: ['', Validators.required]      
    });
  }


  // Envio de formulario
  
  submitForm() {
    this.submitted = true;
    if (!this.angForm.valid) {
      return false;
    } else {
        this.itemS.create(this.angForm.value).subscribe(res => {
          Swal.fire({
            icon: 'success', 
            text: 'Registrado!',
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigate(['items/']);
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

}
