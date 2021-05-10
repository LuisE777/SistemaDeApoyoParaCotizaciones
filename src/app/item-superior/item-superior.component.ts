import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {FormBuilder,FormControl, FormGroup, Validators} from '@angular/forms'
import { ItemService } from 'src/app/services/item.service';
@Component({
  selector: 'app-item-superior',
  templateUrl: './item-superior.component.html',
  styleUrls: ['./item-superior.component.css']
})
export class ItemSuperiorComponent implements OnInit {

  constructor(private fb: FormBuilder, private itemS: ItemService) { }
  ngOnInit(): void {
  }
  miFormulario: FormGroup = this.fb.group({
    nombre: ['',[Validators.required]],
    detalle: ['',[Validators.required]]})


    campoNoValido(campo:string){
      return this.miFormulario.get(campo)?.invalid && this.miFormulario.get(campo)?.touched
    }
  
  
    guardar(){
      if(this.miFormulario.invalid){
        this.miFormulario.markAllAsTouched();
        return;
      }else if(!this.miFormulario.invalid){
      console.log(this.miFormulario.value)
      
      let nomitemSup  = this.miFormulario.controls.nombre.value
      let descripSup = this.miFormulario.controls.detalle.value
      this.itemS.addItemSup(nomitemSup , descripSup).subscribe
      (data=>{console.log(data), Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Item de area general registrado exitosamente',
        showConfirmButton: false,
        timer: 2000
      })},error=>{Swal.fire({
        icon: 'error',
        title: 'No se logro guardar la información',  
        showConfirmButton: false,
        timer: 2000
      })})
     
      //this.miFormulario.reset();
      }
    }
}
