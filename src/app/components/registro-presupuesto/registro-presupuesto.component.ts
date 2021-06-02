import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Unidad } from 'src/app/models/unidad.model';
import { FechaService } from 'src/app/services/fecha.service';
import { PresupuestoService } from 'src/app/services/presupuesto.service';
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
  UnidadSeleccionada: Unidad;  

  constructor(public fechaService: FechaService, private unidads: UnidadService, public presupuestoService: PresupuestoService) { }

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


  guardarPresupuesto(){
    if(!this.presupuesto.invalid && !this.unidad.invalid){
      //let id_unidad = this.unidad.value;
      let presupuestoUnidad={        
        id_unidad:this.unidad.value as string,
        presupuesto:this.presupuesto.value as string,
        gestion: new Date().getFullYear(),
      }
      this.fechaService.crearPresupuesto(presupuestoUnidad).subscribe(
      res=>{
          console.log(res);          
          Swal.fire('Presupuesto Guardado!!', '', 'success');
        },
        err=>{
          console.log('error ',err);
          Swal.fire('No se pudo verificar la unidad', '', 'error');
        }
      );    
      
    } else {
      Swal.fire('Verifique los campos!', '', 'error');
    }         
  }
}
