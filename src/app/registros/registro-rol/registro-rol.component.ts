import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RolService } from 'src/app/services/rol.service';
import {MatInputModule} from '@angular/material/input'; 

@Component({
  selector: 'app-registro-rol',
  templateUrl: './registro-rol.component.html',
  styleUrls: ['./registro-rol.component.css']
})
export class RegistroRolComponent implements OnInit {
  formRol: FormGroup;

  rol={
    id:'',
    rolnom:'',
    descrip:'',
  }

  constructor(public rolService: RolService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.obtenerRoles();
  }

  
  nombreRol = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]);
  descripcionRol = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*') ]);
  
  getErrorMessage(c: Number) {   
    switch (c) {
      case 1:
        if (this.nombreRol.hasError('required')) {
          return 'El valor es requerido';
        }     
        return 'Solo se admiten letras.'; 
        break;
      case 2:
        if (this.descripcionRol.hasError('required')) {
          return 'El valor es requerido';
        }     
        return 'Solo se admiten letras.'; 
        break;
      default:
        return '';
        break;
    }               
  }

  guardarRol () {
    this.obtenerRoles();
    if(!this.nombreRol.invalid && !this.descripcionRol.invalid){
      this.rol.rolnom = this.nombreRol.value;
      this.rol.descrip = this.descripcionRol.value;
      this.crearRol();
    } else {
      alert('Llene los campos correctamente')
    }    
  }

  obtenerRoles() {
    this.rolService.obtenerRoles().subscribe(
      res => {
        this.rolService.roles = res;  
      },
      err => console.log(err)
    )
  }

  crearRol () {
    this.rolService.crearRol(this.rol).subscribe(
      res=>{console.log(res)},err=>console.log(err)
    );
  }

  verificarNombreUnico (nombre: String) {   
    this.descripcionRol.markAsTouched();
    if(this.descripcionRol.invalid){
      alert("Verifique los campos");
      return;
    }
    this.obtenerRoles();
    let flag : Boolean = true;
    this.rolService.roles.forEach(rol => {
      if(rol.rolnom.toUpperCase() === nombre.toUpperCase()){
        flag = false;                
      }
    });
    if(flag) {
      alert("Rol creado exitosamente");
      this.guardarRol();
    }else{
      alert("El nombre ya existe");
    }
  }
}
