import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FechaService } from 'src/app/services/fecha.service';


@Component({
  selector: 'app-fecha-presupuesto',
  templateUrl: './fecha-presupuesto.component.html',
  styleUrls: ['./fecha-presupuesto.component.css']
})
export class FechaPresupuestoComponent implements OnInit {  

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  constructor(public fechaService: FechaService, private router:Router) { }

  ngOnInit(): void {
  }

  guardar() {
    console.log(this.toMysqlFormat(this.range.controls['start'].value));
    console.log(this.toMysqlFormat(this.range.controls['end'].value));
    let fecha={
      apertura:this.toMysqlFormat(this.range.controls['start'].value),
      cierre:this.toMysqlFormat(this.range.controls['end'].value),    
    }
    this.fechaService.crearFecha(fecha).subscribe(
      res=>{console.log(res)},err=>console.log(err)
    );
    

    //this.router.navigate(['/administrador']);
  }

  toMysqlFormat(fecha: any) {
    return fecha.toISOString().slice(0, 19).replace('T', ' ');
  }

  obtenerFechas(){
    this.fechaService.obtenerFecha().subscribe(
      res => {
        console.log(res);
        this.fechaService.fechas = res;  
      },
      err => console.log(err)
    )
  }
}
