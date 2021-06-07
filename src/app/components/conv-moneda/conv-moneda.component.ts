import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-conv-moneda',
  templateUrl: './conv-moneda.component.html',
  styleUrls: ['./conv-moneda.component.css']
})
export class ConvMonedaComponent implements OnInit {
  
  dolares = new FormControl('', [Validators.pattern("^[\.a-zA-Z0-9,!? ]*$")]);
  flag: boolean = true;
  opcion = new FormControl('', [Validators.required]);
  constructor() { }

  ngOnInit(): void {
  }

  valorConvertido(){
    if(this.flag){
      return (this.dolares.value*6.96).toFixed(2) + ' Bs.';
    } else {
      return (this.dolares.value/6.96).toFixed(2) + ' $';
    }
    
  }

  getErrorMessage() {  
    return "Solo se admiten numeros";    
  }

  getTitulo(){
    if(this.flag){
      return "Dolares a bolivianos";
    } else {
      return "Bolivianos a dolares";
    }
  }

  getTasa(){
    if(this.flag){
      return "1 Dolar equivale a 6.96 bolivianos";
    } else {
      return "1 Boliviano equivale a " +(1/6.96).toFixed(2)+ " bolivianos";
    }
  }

  getLabel(){
    if(this.flag){
      return "Dolares";
    } else {
      return "Bolivianos";
    }
  }

}
