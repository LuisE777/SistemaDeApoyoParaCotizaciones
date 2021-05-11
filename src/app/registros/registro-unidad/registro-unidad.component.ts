import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UnidadService } from 'src/app/services/unidad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro-unidad',
  templateUrl: './registro-unidad.component.html',
  styleUrls: ['./registro-unidad.component.css']
})
export class RegistroUnidadComponent implements OnInit {

  angForm: FormGroup;
  submitted:boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private unidadService: UnidadService
    ) {
    }
    
  ngOnInit(): void {
      this.createForm();
  }

  // Creacion de formulario angForm
  createForm() {
    this.angForm = this.fb.group({
      nombre: ['', Validators.required],
      facultad: ['', Validators.required],
      presupuesto: ['', Validators.required],
      telefono: ['', Validators.required],
      user_id: ['', Validators.required],  
      secret_id: ['', Validators.required]     
    });
  }

  // Envio de formulario
  submitForm() {
    this.submitted = true;
    if (!this.angForm.valid) {
      return false;
    } else {
      this.unidadService.create(this.angForm.value).subscribe(res => {
        Swal.fire({
          icon: 'success', 
          text: 'Registrado!',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['unidades/']);
      }, (error) => {
        Swal.fire({
          icon: 'error', 
          text: 'Ups Algo salió mal!',
          showConfirmButton: false,
          timer: 1500
        });
      });
    }
    return true;
    }

}
