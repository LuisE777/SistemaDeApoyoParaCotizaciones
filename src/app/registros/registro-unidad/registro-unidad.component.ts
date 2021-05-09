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
      console.log('error');
      return false;
    } else {
      this.unidadService.create(this.angForm.value).subscribe(res => {
        this.router.navigate(['unidades/']);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Unidad registrada exitosamente',
          showConfirmButton: false,
          timer: 2000
        })
      }, (error) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'No se pudo guardar la información',  
          showConfirmButton: false,
          timer: 2000
        })
      });
    }
    return true;
    }

}
