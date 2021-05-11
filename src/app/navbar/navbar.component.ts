import { Component, OnInit } from '@angular/core';
// import { MediaObserver, MediaChange } from '@angular/flex-layout';

import { Subscription } from 'rxjs';
import {NavbarService} from './navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(public UsuarioActual: NavbarService ) {

  }

  nameUser = this.UsuarioActual.nombreUsuario;
  opened = true;
  over = "side";
  expandHeight = '42px';
  collapseHeight = '42px';
  displayMode = 'flat';


  ngOnInit(): void {
  }

}
