import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Rol } from '../models/rol.model';
import { RolService } from '../services/rol.service';
import { Roles } from './../models/roles.interface';
import { UsuarioService } from './../services/usuario.service';

@Component({
  selector: 'app-lista-roles',
  templateUrl: './lista-roles.component.html',
  styleUrls: ['./lista-roles.component.css']
})
export class ListaRolesComponent implements OnInit {
  RolesUmss:Roles[];
  rolAEditar:Roles;
  constructor( public _usuarioService:UsuarioService, public rolService: RolService, public router: Router) { }

  nombreRol = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]);
  descripcionRol = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*') ]);
  

  ngOnInit(): void {
    this._usuarioService.getAllRoles().subscribe(data=>{
      console.log(data[0]);
      this.RolesUmss =data;
      console.log(this.RolesUmss);
    })
  }
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

  seleccionarRol(rol: Roles){
    this.rolAEditar=rol;
    this.nombreRol.setValue(this.rolAEditar.rolnom);
    this.descripcionRol.setValue(this.rolAEditar.descrip);
    console.log(this.rolAEditar);
  }

  editarRol(){
    if(!this.nombreRol.invalid && !this.descripcionRol.invalid){
      this.rolAEditar.rolnom = this.nombreRol.value;
      this.rolAEditar.descrip = this.descripcionRol.value
     /* this.nombreRol.setValue(this.rolAEditar.rolnom);
      this.descripcionRol.setValue(this.rolAEditar.descrip);*/
      console.log(this.rolAEditar.id);
      console.log(this.rolAEditar.rolnom);
      console.log(this.rolAEditar.descrip); 
      this.rolService.editarRol(this.rolAEditar).subscribe(
        res=>{
          console.log(res);
          Swal.fire({
            icon: 'success',
            title: 'Rol actualizado con exito',
            showConfirmButton: false,
          })
        },err=>{
          console.log(err);
          Swal.fire({
            icon: 'error',
            title: 'Algo salio mal',
            showConfirmButton: false,
          })
        }
      );
         
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Llene los campos correctamente',
        showConfirmButton: false,
      })
    }
  }
}
