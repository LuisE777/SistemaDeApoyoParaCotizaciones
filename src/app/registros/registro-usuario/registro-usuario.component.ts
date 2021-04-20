
import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormControl, FormGroup, Validators} from '@angular/forms'
import { GuardsCheckStart } from '@angular/router';
@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css']
})
export class RegistroUsuarioComponent  {
  constructor(private fb: FormBuilder) { }
  bandera :number= 50;
  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  nombreApellidoPattern: string ='([a-zA-Z- ]+)';

  miFormulario: FormGroup = this.fb.group({
    nombre: ['',[Validators.required,Validators.minLength(3),Validators.pattern(this.nombreApellidoPattern)]],
    apellido: ['',[Validators.required,Validators.minLength(3),Validators.pattern(this.nombreApellidoPattern)]],
    correo: ['',[Validators.required,Validators.pattern(this.emailPattern)]],
    celular: ['',[Validators.required, Validators.min(60000000),Validators.pattern("^[0-9]*$")]],
    password: ['',[Validators.required,Validators.minLength(6)]],
    password2: ['',[Validators.required]],
    rol: ['',[Validators.required]],
    facultad: ['',[Validators.required]],
    unidad: ['',[Validators.required]]})


    public passwordsMatch = (): boolean => {
    
      if (this.miFormulario.controls['password'].touched && this.miFormulario.controls['password2'].touched) {
          if (this.miFormulario.value.password === this.miFormulario.value.password2) {
            this.bandera=1000
            return true;
            
          } else {
              return false;
          }
      }
      return true;
  }

  campoEmailEsValido(){   
    return this.miFormulario.controls.correo.errors && this.miFormulario.controls.correo.touched 
  }

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
