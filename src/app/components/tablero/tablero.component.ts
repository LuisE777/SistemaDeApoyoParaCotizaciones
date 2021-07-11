import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css']
})
export class TableroComponent implements OnInit {

  privilegios: string = "{\"admin\":true,\"jefe\":false,\"cotizador\":true,\"usuario\":false}";
  privilegios_json: any;

  constructor() { }

  ngOnInit(): void {
    this.privilegiosToJson();
  }

  privilegiosToJson(){
    this.privilegios_json = JSON.parse(this.privilegios);
    console.log(this.privilegios_json);
  }
}
