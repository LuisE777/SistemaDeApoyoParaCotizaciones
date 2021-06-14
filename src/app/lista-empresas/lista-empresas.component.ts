import { UsuarioService } from 'src/app/services/usuario.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Empresa } from 'src/app/models/empresa.model';
@Component({
  selector: 'app-lista-empresas',
  templateUrl: './lista-empresas.component.html',
  styleUrls: ['./lista-empresas.component.css']
})
export class ListaEmpresasComponent implements OnInit {
  empresas: Empresa[] = [];
  constructor(public _usuarioService:UsuarioService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private _location: Location) { }

  ngOnInit(): void {
    this.getEmpresas()
  }
  getEmpresas(){
    this._usuarioService.getAllEmpresas().subscribe(data => {
      this.empresas = data;
      console.log(data)
    })
  }
}
