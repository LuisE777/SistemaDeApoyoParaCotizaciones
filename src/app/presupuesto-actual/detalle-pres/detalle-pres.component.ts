import { Presupuesto } from './../../models/presupuesto';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-detalle-pres',
  templateUrl: './detalle-pres.component.html',
  styleUrls: ['./detalle-pres.component.css']
})
export class DetallePresComponent implements OnInit {
  unidad:String
  anio:String
  constructor(public _usuarioService:UsuarioService) { }
  detalle: any[] = [];
  importe:number
  importe2:Presupuesto
  importe3:number
  importe4:String
  ngOnInit(): void {
    this.getDetalle()
  }
  getDetalle(){
    this.unidad=localStorage.getItem("unidad_id")+"";
    this.anio=localStorage.getItem("anioPres")+"";
    this._usuarioService.getPres1( this.unidad,this.anio).subscribe(data => {
      console.log("esto salio pa")
      console.log(data)
      this.detalle=data
      console.log(this.detalle)
    })
    this._usuarioService.getPres2( this.unidad,this.anio).subscribe(data => {
      console.log("esto salio pa")
      console.log(data)
      this.importe=data.toFixed(2)
      
      console.log(this.importe)
    })
    this._usuarioService.getPres3( this.unidad,this.anio).subscribe(data => {
      console.log("esto salio pa3")
      console.log(data)
      this.importe2=data[0]
      this.importe3=this.importe2.presupuesto
      console.log(this.importe3)
    })
  }
}
