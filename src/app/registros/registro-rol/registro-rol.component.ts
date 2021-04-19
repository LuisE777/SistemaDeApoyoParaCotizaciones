import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
 

@Component({
  selector: 'app-registro-rol',
  templateUrl: './registro-rol.component.html',
  styleUrls: ['./registro-rol.component.css']
})
export class RegistroRolComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  nombreRol = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]);
  descripcionRol = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*') ]);

  getErrorMessage(c: Number) {
    switch (c) {
      case 1:
        if (this.nombreRol.hasError('required')) {
          return 'El valor es requerido';
        }     
        return 'Solo se admiten letras.'; 
        break;
      case 2:
        if (this.descripcionRol.hasError('required')) {
          return 'El valor es requerido';
        }     
        return 'Solo se admiten letras.'; 
        break;
      default:
        return '';
        break;
    }

               
  }

  guardarRol () {
    if(!this.nombreRol.invalid && !this.descripcionRol.invalid){
      console.log(this.nombreRol.value);
      console.log(this.descripcionRol.value);
    } else {
      alert('Llene los campos correctamente')
    }
    
  }
}
