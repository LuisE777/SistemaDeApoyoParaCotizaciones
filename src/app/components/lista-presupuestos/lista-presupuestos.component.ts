import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Presupuesto } from 'src/app/models/presupuesto';
import { PresupuestoService } from 'src/app/services/presupuesto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-presupuestos',
  templateUrl: './lista-presupuestos.component.html',
  styleUrls: ['./lista-presupuestos.component.css']
})
export class ListaPresupuestosComponent implements OnInit {
  presAEditar:Presupuesto;
  filterPost = '';
  constructor(public presupuestoService: PresupuestoService) { }

  ngOnInit(): void {
    this.obtenerDatos();
  }
  presupuesto = new FormControl('', [Validators.required, Validators.max(1000000), Validators.min(1000)]);
  obtenerDatos(){
    this.presupuestoService.obtenerDatos().subscribe(
      res=>{
          this.presupuestoService.presupuestos = res;     
          console.log(res);                
        },
        err=>{
          console.log('error ',err);
        }
      );
  }
  getErrorMessage(){
    if(this.presupuesto.hasError('required')){
      return 'El valor es requerido';
    }
    if( this.presupuesto.hasError('min')){
      return 'El valor minimo es de 1000 Bs.'
    }
    return 'Verifique los campos';
  }

  seleccionarPresupuesto(presupuesto:any){
    console.log(presupuesto);
    this.presAEditar = presupuesto;
    this.presupuesto.setValue(this.presAEditar.presupuesto);
    
  }

  editarPresupuesto(){
    if(this.presupuesto.invalid){
      Swal.fire({
        icon: 'error',
        title: 'Llene los campos correctamente',
        showConfirmButton: false,
      })
    } else {
      this.presAEditar.presupuesto = this.presupuesto.value;

      this.presupuestoService.update(this.presAEditar).subscribe(
        res=>{
          console.log(res);
          Swal.fire({
            icon: 'success',
            title: 'Presupuesto actualizado con exito',
            showConfirmButton: false,
          })
        },err=>{
          console.log(err);
          Swal.fire({
            icon: 'error',
            title: 'Algo salio mal',
            showConfirmButton: false,
          })
        }
      );
    }
  }

}
