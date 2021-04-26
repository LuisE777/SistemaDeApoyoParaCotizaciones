import { LoginService } from './../services/login.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {FormBuilder,FormControl, FormGroup, Validators} from '@angular/forms'
import { GuardsCheckStart } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

  constructor(private fb: FormBuilder, public _loginService:LoginService) { }
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
      console.log("hay un error")
      return;
  
    }else {
    let email  = this.miFormulario.controls.correo.value
    let password  = this.miFormulario.controls.password.value
    this._loginService.loginUsuario(email,password).subscribe(data=>{console.log(data),Swal.fire({
      icon: 'success', 
      showConfirmButton: false,
      timer: 1500
    })},error=>{Swal.fire({
      icon: 'error',
      title: 'Usuario no registrado',  
      showConfirmButton: false,
      timer: 1000
    })})
    //this.miFormulario.reset();
    }
  }
}
