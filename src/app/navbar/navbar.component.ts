import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import {NavbarService} from './navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor( private router: Router) {
      
  }

  nameUser:string ;
  
  ngOnInit(): void {
    this.nameUser=localStorage.getItem("nombre")+"";
  }
  cerrar(){
    this.cerrando()
  }
  cerrando(){
    Swal.fire({
      title: '¿Cerrar Sesión?',
      showDenyButton: true,
      position: 'center',
      padding: '5em', 
      confirmButtonText: `Aceptar`,
      confirmButtonColor: `#003975`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        //window.open("//localhost:4200/login","_self"); 
        this.router.navigate(['login/']);
        localStorage.setItem("nombre"," ")
        localStorage.setItem("rol"," ")
        localStorage.setItem("unidaddegasto"," ")
        localStorage.setItem("facultad"," ")
        localStorage.setItem("unidad_id"," ")
        //agregando
        //this.recargar()
      } else if (result.isDenied) {

      }
    })
  }

  recargar(){
    window.location.reload()
  }

}
