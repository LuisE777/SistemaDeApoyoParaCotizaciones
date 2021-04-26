import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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
    private route: ActivatedRoute
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
      
      //return false;
    } else {
      //   this.itemService.create(this.angForm.value).subscribe(res => {
      //     this.router.navigate(['registroitems/');
      //   }, (error) => {
        //return true;
           console.log(this.angForm.value);
          
      //   });
       }
    }

}
