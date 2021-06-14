import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { UsuarioService } from './../services/usuario.service';
import { Usuario } from '../models/usuario.model'
import { FormControl, Validators } from '@angular/forms';
import { Roles } from '../models/roles.interface';
import { UnidadService } from '../services/unidad.service';


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
  
  /*getErrorMessage(c: Number) {   
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
  }*/
  editarUsuario(){

  }

}
