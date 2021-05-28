import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FechaService } from 'src/app/services/fecha.service';
import { UnidadService } from 'src/app/services/unidad.service';

@Component({
  selector: 'app-registro-presupuesto',
  templateUrl: './registro-presupuesto.component.html',
  styleUrls: ['./registro-presupuesto.component.css']
})
export class RegistroPresupuestoComponent implements OnInit {
  formRol: FormGroup;
  gestion: any= new Date().getFullYear();
  UnidadesUmss: any = [];

  presupuestoUnidad={
    id:'',
    unidad_id:'',
    presupuesto:'',
  }

  constructor(fechaService: FechaService, private unidads: UnidadService) { }

  ngOnInit(): void {
    this.unidads.getAll().subscribe(data => {
      this.UnidadesUmss = data.unidades;
    });
  }
  presupuesto = new FormControl('', [Validators.required, Validators.max(10000), Validators.min(1000)]);
  unidad = new FormControl('', [Validators.required]);
  
  getErrorMessage(){
    if(this.presupuesto.hasError('required')){
      return 'El valor es requerido';
    }
    if( this.presupuesto.hasError('min')){
      return 'El valor minimo es de 1000 Bs.'
    }
    return 'Verifique los campos';
  }
  getErrorMessageUnidad(){
    
  }


  guardarPresupuesto(){
    this.presupuestoUnidad.presupuesto=this.presupuesto.value;
    
  }

}
