import { Component, OnInit } from '@angular/core';
import { Roles } from './../models/roles.interface';
import { UsuarioService } from './../services/usuario.service';

@Component({
  selector: 'app-lista-roles',
  templateUrl: './lista-roles.component.html',
  styleUrls: ['./lista-roles.component.css']
})
export class ListaRolesComponent implements OnInit {
  RolesUmss:Roles[];
  constructor( public _usuarioService:UsuarioService) { }
  filterPost = '';
  ngOnInit(): void {
    this._usuarioService.getAllRoles().subscribe(data=>{
      console.log(data[0]);
      this.RolesUmss =data;
      console.log(this.RolesUmss);
    })
  }

}
