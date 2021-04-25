import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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
    private route: ActivatedRoute
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
