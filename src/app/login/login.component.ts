
import { LoginService } from './../services/login.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {FormBuilder,FormControl, FormGroup, Validators} from '@angular/forms'
import { GuardsCheckStart } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { Usuario2 } from '../models/Usuario2.interfaz'
import { Usuario } from '../models/usuario.model'
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {
  URL4='https://apiser-vicios.herokuapp.com/api/auth/me?token=';
  URLP="";
  UsuarioUmss:Usuario2;
  constructor(private fb: FormBuilder
    , public _loginService:LoginService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute) { }
  bandera :number= 50;
  
  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  miFormulario: FormGroup = this.fb.group({
    correo: ['',[Validators.required,Validators.pattern(this.emailPattern)]],
    password: ['',[Validators.required]],
  })
  campoNoValido(campo:string){
    return this.miFormulario.get(campo)?.invalid && this.miFormulario.get(campo)?.touched
  }
s
  guardar(){
    if(this.miFormulario.invalid){
      this.miFormulario.markAllAsTouched(); 
      console.log("hay un error")
      return;
      
    }else {
    let email  = this.miFormulario.controls.correo.value
    let password  = this.miFormulario.controls.password.value
    this._loginService.loginUsuario(email,password).subscribe(data=>{console.log(data),
      console.log(data.access_token),console.log((this.http.get<Usuario[]>(this.URLP=this.URL4+data.access_token)).subscribe(data=>{
        console.log(data),this.guardar2(data),this.redirigir()
      })),Swal.fire({
      icon: 'success', 
      title: 'Bienvenido al sistema', 
      showConfirmButton: false,
      timer: 1500
      
    })},error=>{Swal.fire({
      icon: 'error',
      title: 'Usuario no registrado',  
      showConfirmButton: false,
      timer: 1000
    })})
    //this.miFormulario.reset();
    console.log("sale esto")
    console.log(this.URLP)
    
    }
    
  }
  guardar2(data :any){
    this.UsuarioUmss =data;
    console.log(this.UsuarioUmss.name)
    localStorage.setItem("nombre",this.UsuarioUmss.name+" "+this.UsuarioUmss.lastname)
    localStorage.setItem("rol",this.UsuarioUmss.rol)
    localStorage.setItem("unidaddegasto",this.UsuarioUmss.unidaddegasto)
    localStorage.setItem("facultad",this.UsuarioUmss.facultad)
  }

  redirigir(){
    if(this.UsuarioUmss.rol ==="Administrador del Sistema"){
          console.log(this.miFormulario.controls.correo.value)
          this.router.navigate(['administrador/'])
        

    }else{
      this.router.navigate(['usuario/'])
    }
  }

}
