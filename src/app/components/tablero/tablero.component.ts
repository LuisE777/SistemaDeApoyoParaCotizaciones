import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css']
})
export class TableroComponent implements OnInit {

  privilegios: string = "{\"admin\":true,\"jefe\":true,\"cotizador\":true,\"usuario\":true}";
  privilegios_json: any;

  constructor() { }

  ngOnInit(): void {
    this.privilegiosToJson();
  }

  privilegiosToJson(){
    
    try{
      this.privilegios_json = JSON.parse(this.privilegios);
      localStorage.setItem('privilegios', JSON.stringify(this.privilegios_json));
      console.log(this.privilegios_json);
    } catch(error){
      console.log(error);
    }
  }
}
