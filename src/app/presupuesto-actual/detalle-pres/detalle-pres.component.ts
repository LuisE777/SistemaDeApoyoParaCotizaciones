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
      this.importe=data
    
      console.log(this.importe)
    })
  }
}
