import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { RolService } from 'src/app/services/rol.service';
 

@Component({
  selector: 'app-registro-rol',
  templateUrl: './registro-rol.component.html',
  styleUrls: ['./registro-rol.component.css']
})
export class RegistroRolComponent implements OnInit {

  rol={
    id:'',
    rolnom:'',
    descrip:'',
  }

  constructor(public rolService: RolService) { }

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
      console.log(this.rol.rolnom);
      console.log(this.rol.descrip);
      this.crearRol();
    } else {
      alert('Llene los campos correctamente')
    }    
  }

  obtenerRoles() {
    this.rolService.obtenerRoles().subscribe(
      res => {
        this.rolService.roles = res;
        //this.usuarios=res;
        console.log(res)    
      },
      err => console.log(err)
    )
  }

  crearRol () {
    this.rolService.crearRol(this.rol).subscribe(
      res=>{console.log(res)},err=>console.log(err)
    );
  }

  verificarNombre (nombre: String) {
    console.log("NOMBRE", nombre);
    this.obtenerRoles();
    let flag : Boolean = true;
    this.rolService.roles.forEach(rol => {
      if(rol.rolnom.toUpperCase() === nombre.toUpperCase()){
        flag = false;        
        
      }
    });
    console.log("FLAG ", flag)
    if(flag) {
      alert("Rol creado exitosamente");
      this.guardarRol();
    }else{
      alert("El nombre ya existe");
    }
  }
}
