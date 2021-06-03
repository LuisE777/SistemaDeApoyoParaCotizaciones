import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Presupuesto } from 'src/app/models/presupuesto';
import { Unidad } from 'src/app/models/unidad.model';
import { FechaService } from 'src/app/services/fecha.service';
import { MonedaService } from 'src/app/services/moneda.service';
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
  iduni: string;
  pres: Presupuesto;
  constructor(public fechaService: FechaService, private unidads: UnidadService, public presupuestoService: PresupuestoService, private router:Router, public monedaService: MonedaService) { }

  ngOnInit(): void {
    this.unidads.getAll().subscribe(data => {
      this.UnidadesUmss = data.unidades;
    });
    this.monedaService.dollarABoliviano().subscribe(data => {
      console.log(data);
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

  getUnidadGasto (){
    return localStorage.getItem('unidaddegasto');
  }

  getUnidadId(){
    return localStorage.getItem('unidad_id');
  }

  getPresupuestoUnidad(id: any, gestion:any){
    
    this.presupuestoService.obtenerPresupuesto(id, gestion).subscribe(
      res=>{
          this.presupuestoService.presupuesto = res;     
          console.log(res);      
          
        },
        err=>{
          console.log('error ',err);
        }
      );      
  }

  getFlag(){
    return this;
  }

  guardarPresupuesto(){
    if(!this.presupuesto.invalid && !this.unidad.invalid){
      //let id_unidad = this.unidad.value;
      let presupuestoUnidad={  
        id:'',
        id_unidad:this.unidad.value as string,
        presupuesto:this.presupuesto.value as string,
        gestion: new Date().getFullYear(),
      }
      
      this.getPresupuestoUnidad(presupuestoUnidad.id_unidad, presupuestoUnidad.gestion); 
//      presupuestoUnidad.id = '7';     
      console.log(this.presupuestoService.presupuesto?.length);
      
      if(this.presupuestoService.presupuesto?.length != 0 ){   

        console.log("El presupuesto ya esta registrado");    
        Swal.fire('El presupuesto de esta unidad ya esta registrado', '', 'warning');
        
      } else{
        console.log("El presupuesto no esta registrado");
        Swal.fire({
          title: 'Seguro que quiere registrar este presupuesto',
          text: "No podra cambiar esto!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Confirmar'
        }).then((result) => {
          if (result.isConfirmed) {
            this.fechaService.crearPresupuesto(presupuestoUnidad).subscribe(
              res=>{
                  console.log(res);          
                  Swal.fire(
                    'Exito!',
                    'Presupuesto registrado con exito',
                    'success'
                  )
                  this.router.navigate(['/administrador']);
                },
                err=>{
                  console.log('error ',err);
                  Swal.fire('No se pudo verificar la unidad', '', 'error');
                }
              );
            
          }
        })   
        
      }            
    }else {
      Swal.fire('Verifique los campos!', '', 'error');
    }        
  }
}
