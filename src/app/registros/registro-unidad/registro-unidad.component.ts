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
      nombre: ['', [Validators.required, Validators.pattern('^[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$'), Validators.minLength(3)]],
      facultad: ['', [Validators.required, Validators.pattern('^[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$'), Validators.minLength(3)]],
      presupuesto: ['', [Validators.required, Validators.pattern('^[0-9 ]+$')]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9 ]+$')]],
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
      const form =new FormData();
      form.append("nombre",this.angForm.controls.nombre.value);
      form.append("facultad",this.angForm.controls.facultad.value);
      form.append("presupuesto",this.angForm.controls.presupuesto.value);
      form.append("telefono",this.angForm.controls.telefono.value);
      form.append("user_id",this.angForm.controls.user_id.value);
      form.append("secret_id",this.angForm.controls.secret_id.value);
      this.unidadService.create(form).subscribe(res => {
        this.router.navigate(['unidades/']);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Unidad registrada exitosamente',
          showConfirmButton: false,
          timer: 2000
        })
      }, (error) => {
        Swal.fire({
          icon: 'error', 
          text: 'Ups Algo salió mal!',
          showConfirmButton: false,
          timer: 2000
        });
      });
    }
    return true;
    }

}
