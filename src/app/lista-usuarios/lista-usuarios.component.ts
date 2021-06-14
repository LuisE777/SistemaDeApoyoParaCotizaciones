import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { UsuarioService } from './../services/usuario.service';
import { Usuario } from '../models/usuario.model'


@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {
  UsuariosUmss:Usuario[];
  constructor( public _usuarioService:UsuarioService,
    private http: HttpClient) { }
  filterPost = '';
  ngOnInit(): void {
    this._usuarioService.getAllUser().subscribe(data=>{
      console.log(data);
      this.UsuariosUmss = data;
    })
  }

}
