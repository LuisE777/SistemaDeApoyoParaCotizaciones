import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { UsuarioService } from './../services/usuario.service';
import { Usuario } from '../models/usuario.model'
import { FormControl, Validators } from '@angular/forms';
import { Roles } from '../models/roles.interface';
import { UnidadService } from '../services/unidad.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {
  UsuariosUmss:Usuario[];
  usuarioAEditar: Usuario;
  RolesUmss:Roles[];
  UnidadesUmss: any = [];
  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  
  constructor( public _usuarioService:UsuarioService,
    private http: HttpClient, private unidads: UnidadService) { }
  
  nombre = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]);
  apellido = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*') ]);
  correo = new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]);
  celular = new FormControl('',[Validators.required, Validators.min(60000000), Validators.max(79999999),Validators.pattern("^[0-9]*$")]);
  rolform = new FormControl('', [Validators.required]);
  unidadgasto = new FormControl('', [Validators.required]);
  
  filterPost = '';

  ngOnInit(): void {
    this._usuarioService.getAllUser().subscribe(data=>{
      console.log(data);
      this.UsuariosUmss = data;
    });
    this._usuarioService.getAllRoles().subscribe(data=>{
      console.log(data[0]);
      this.RolesUmss =data;
      console.log(this.RolesUmss);
      console.log(this.RolesUmss);
    })

    this.unidads.getAll().subscribe(data => {
      console.log(data);
      
      this.UnidadesUmss = data.unidades;
    })
    
  }

  seleccionarUsuario(user: any){
    this.usuarioAEditar = user;
    console.log(this.usuarioAEditar);
    this.nombre.setValue(this.usuarioAEditar.name);;
    this.apellido.setValue(this.usuarioAEditar.lastname);
    this.correo.setValue(this.usuarioAEditar.email);
    this.celular.setValue(this.usuarioAEditar.cellphone);
    /*this.rolform.setValue(this.usuarioAEditar.rol);
    this.unidadgasto.setValue(this.usuarioAEditar.unidaddegasto);*/
  }

  eliminarUsuario(user: any, index: number){   
    Swal.fire({
      title: 'Seguro quiere eliminar este registro?',
      showDenyButton: true,
      confirmButtonText: `Eliminar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.UsuariosUmss.splice(index, 1);
        this.UsuariosUmss = [...this.UsuariosUmss];
        this._usuarioService.eliminarUsuario(user.id).subscribe(() => {

          });
        Swal.fire('Eliminado!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('No se eliminó el registro', '', 'info')
      }
    });
  }

  editarUsuario(){    
    if(!this.nombre.invalid && !this.apellido.invalid && !this.correo.invalid && !this.celular.invalid && !this.rolform.invalid && !this.unidadgasto.invalid ){
      this.usuarioAEditar.name = this.nombre.value;
      this.usuarioAEditar.lastname = this.apellido.value;
      this.usuarioAEditar.email = this.correo.value;
      this.usuarioAEditar.cellphone = this.celular.value;
      this.usuarioAEditar.rol = this.rolform.value;
      this.usuarioAEditar.unidaddegasto = this.unidadgasto.value;
      //console.log(this.usuarioAEditar);
      this._usuarioService.editarUser(this.usuarioAEditar).subscribe(
        res=>{     
          Swal.fire({
            icon: 'success',
            title: 'Usuario actualizado con exito',
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


