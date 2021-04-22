
import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormControl, FormGroup, Validators} from '@angular/forms'
import { GuardsCheckStart } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

  constructor(private fb: FormBuilder) { }
  bandera :number= 50;
  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  miFormulario: FormGroup = this.fb.group({
    correo: ['',[Validators.required,Validators.pattern(this.emailPattern)]],
    password: ['',[Validators.required]],
  })
  campoNoValido(campo:string){
    return this.miFormulario.get(campo)?.invalid && this.miFormulario.get(campo)?.touched
  }

  guardar(){
    if(this.miFormulario.invalid){
      this.miFormulario.markAllAsTouched();
      return;
    }else if(!this.miFormulario.invalid&&this.bandera > 50){
    console.log(this.bandera)
    console.log(this.miFormulario.value)
    //this.miFormulario.reset();
    }
  }

}
