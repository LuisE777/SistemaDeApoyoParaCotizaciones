import { Component, OnInit } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  opened = true;
  over = "side";
  expandHeight = '42px';
  collapseHeight = '42px';
  displayMode = 'flat';



  ngOnInit(): void {
  }

}
