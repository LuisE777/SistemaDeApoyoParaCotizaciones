import { Component} from '@angular/core';

import { Router } from "@angular/router"
interface MenuItem{
  texto:string;
  ruta:string;
}
@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent {

  templateMenu: MenuItem[] = [
    {texto:'Registrar usuario',ruta:'/registrousuario'},
    {texto:'Registrar rol',ruta:'/registroRol'}
  ]
}
