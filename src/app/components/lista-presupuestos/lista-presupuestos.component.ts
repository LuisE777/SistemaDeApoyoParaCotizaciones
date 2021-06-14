import { Component, OnInit } from '@angular/core';
import { PresupuestoService } from 'src/app/services/presupuesto.service';

@Component({
  selector: 'app-lista-presupuestos',
  templateUrl: './lista-presupuestos.component.html',
  styleUrls: ['./lista-presupuestos.component.css']
})
export class ListaPresupuestosComponent implements OnInit {
  filterPost = '';
  constructor(public presupuestoService: PresupuestoService) { }

  ngOnInit(): void {
    this.obtenerDatos();
  }

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

}
