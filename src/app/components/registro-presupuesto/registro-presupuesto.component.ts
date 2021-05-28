import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FechaService } from 'src/app/services/fecha.service';
import { UnidadService } from 'src/app/services/unidad.service';
import Swal from 'sweetalert2';

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
    gestion: ''
  }

  constructor(fechaService: FechaService, private unidads: UnidadService) { }

  ngOnInit(): void {
    this.unidads.getAll().subscribe(data => {
      this.UnidadesUmss = data.unidades;
    });
  }
  presupuesto = new FormControl('', [Validators.required, Validators.max(1000000), Validators.min(1000)]);
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
    if(!this.presupuesto.invalid && !this.unidad.invalid){
      this.presupuestoUnidad.presupuesto =this.presupuesto.value;
      this.presupuestoUnidad.unidad_id = this.unidad.value;
      this.presupuestoUnidad.gestion = this.gestion;
      console.log('Unidad ', this.presupuestoUnidad.unidad_id );
      console.log('Presupuesto ', this.presupuestoUnidad.presupuesto );
      console.log('Gestion ', this.presupuestoUnidad.gestion );
      Swal.fire('Presupuesto Guardado!!', '', 'success');
    } else {
      Swal.fire('Verifique los campos!', '', 'error');
    }
     
    
  }

}
