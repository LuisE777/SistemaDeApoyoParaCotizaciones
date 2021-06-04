import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Empresa } from 'src/app/models/empresa.model';
import { ItemCotizacionService } from 'src/app/services/item-cotizacion-service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
import { ItemCotiService } from './item-coti.service';

export interface Item
{
  "nombre": string,
  "descripcion": string,  
  "cantidad": number,   
  "precioUnitario":number,
  "total":number
  "empresa_cotizacion_id": string
}

export interface empresaCot {
  'id': number,
  'id_empresa': number,
  'id_solicitud': number,
  'observaciones': string,
  'plazo_de_entrega': string,
  'total': number,
  'validez_oferta': string,
  'cotizacion_pdf': string,
  'updated_at': Date,
  'created_at': Date
}

@Component({
  selector: 'app-cotizacion-items',
  templateUrl: './cotizacion-items.component.html',
  styleUrls: ['./cotizacion-items.component.css']
})
export class CotizacionItemsComponent implements OnInit {

  empresas: Empresa[] = [];
  cotizaciones: empresaCot[] = [];
  form: FormGroup;
  items: Item[] = [];
  empresa_id: number;
  empresa_cotizacion_id: number;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private arrayItem: ItemCotiService,
    private itemServ: ItemCotizacionService,
    private userService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.getEmpresas();
    this.getEmpresasCot();
    this.createFormCotizacion();
    this.getItems();
  }

  getItems(){
    this.items = this.arrayItem.getItem()
  }

  getEmpresas(){
    this.userService.getAllEmpresas().subscribe(data => {
      this.empresas = data;
    })
  }

  getEmpresasCot(){
    this.userService.getAllEmpresasCot().subscribe(data => {
      this.cotizaciones = data;
    })
  }

  selectEmpresa(event){
    this.empresa_id = event.target.value;
    
  }
  
  selectEmpresaCot(event){
    this.empresa_cotizacion_id = event.target.value;
  }

  createFormCotizacion(){
    this.form = this.fb.group({
      fechaValidez: ['', Validators.required],
      plazoEntrega: ['', Validators.required],
      total: ['', Validators.required],
      observaciones: ['', Validators.required]
    })
  }

  removeItem(item: Item, index: number) {
    Swal.fire({
      title: 'Seguro quiere eliminar este registro?',
      showDenyButton: true,
      confirmButtonText: `Eliminar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.items.splice(index, 1);
        Swal.fire('Eliminado!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('No se eliminó el registro', '', 'info')
      }
    });
  }

  submitForm(){
    if (!this.form.valid) {
      return false;
    } else {
      const obj = new FormData();
      obj.append('fechaValidez',this.form.controls.fechaValidez.value);
      obj.append('plazoEntrega',this.form.controls.plazoEntrega.value);
      obj.append('total',this.form.controls.total.value);
      obj.append('observaciones',this.form.controls.observaciones.value);

      // enviar array de items
      this.items.forEach(item => {
        const newitem = new FormData();
        newitem.append('nombre', item.nombre);
        newitem.append('descripcion', item.descripcion);
        newitem.append('cantidad', String(item.cantidad));
        newitem.append('precioUnitario', String(item.precioUnitario));
        newitem.append('total', String(item.total));
        newitem.append('empresa_cotizacion_id', String(this.empresa_cotizacion_id));
        this.itemServ.create(newitem).subscribe(res => {
        });
      });
      Swal.fire({
        icon: 'success', 
        title: 'Registrado!',
        showConfirmButton: false,
        timer: 1500
      });
      this.router.navigate(['/cotizacion/items-cotizados']);
      return true;
    }
  }

}
