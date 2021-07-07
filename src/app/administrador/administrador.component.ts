import { Component} from '@angular/core';

import { Router } from "@angular/router"
interface MenuItem{
  texto:string;
  ruta:string;
}
@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: [
    "./administrador.component.css"
  ]
})
export class AdministradorComponent {
  token:string;

  constructor (private router: Router){}
  ngOnInit(): void {     
    this.verificarToken();
  }

  verificarToken(){
    this.token = localStorage.getItem("token")+""; 
    console.log("token",this.token);
    if(this.token == "null"){
      console.log("Token no encontrado");
      localStorage.clear();
      this.router.navigate(['/login']);
    } else {
      console.log("token encontrado");
    }
  }

}
