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

  angForm: FormGroup;
  submitted:boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private itemS: ItemService
    ) {
    }
    
  ngOnInit(): void {
      this.createForm();
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
      }
      return true;
    }

}
