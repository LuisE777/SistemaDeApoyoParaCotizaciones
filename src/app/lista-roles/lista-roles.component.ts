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
  public p:number;
  filterPost = '';
  RolesUmss:Roles[]=[];
  rolAEditar:Roles;
  rolAEliminar:Roles;
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
  }

  eliminarRol(rol: Roles, index: number){   
    Swal.fire({
      title: 'Seguro quiere eliminar este registro?',
      showDenyButton: true,
      confirmButtonText: `Eliminar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.RolesUmss.splice(index, 1);
        this.RolesUmss = [...this.RolesUmss];
        this.rolService.eliminarRol(rol.id).subscribe(() => {
            console.log(this.RolesUmss);
          });
        Swal.fire('Eliminado!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('No se eliminó el registro', '', 'info')
      }
    });
  }

  verificarRol(rol: string){
    
    if(rol === "Administrador del sistema") {
      console.log("rolnom ",rol," flag ",false)
      return false
    } else {
      console.log("rolnom ",rol," flag ",true)
      return true;
    }
  }
  

  editarRol(){
    if(!this.nombreRol.invalid && !this.descripcionRol.invalid){
      this.rolAEditar.rolnom = this.nombreRol.value;
      this.rolAEditar.descrip = this.descripcionRol.value
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
