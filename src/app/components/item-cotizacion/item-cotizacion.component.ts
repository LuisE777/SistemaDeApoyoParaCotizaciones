import { Component, OnInit } from '@angular/core';
import { Empresa } from 'src/app/models/empresa.model';
import { empresaCot } from 'src/app/registros/cotizacion-items/cotizacion-items.component';
import { ItemCotizacionService } from 'src/app/services/item-cotizacion-service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-item-cotizacion',
  templateUrl: './item-cotizacion.component.html',
  styleUrls: ['./item-cotizacion.component.css']
})
export class ItemCotizacionComponent implements OnInit {

  items: any = [];
  empresas: Empresa[] = [];
  cotizaciones: empresaCot[] = [];

  constructor(
    private itemCot: ItemCotizacionService,
    private userService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.getItems('prueba');
    this.getEmpresas();
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


  getItems(id_cot: string) {
    // this.itemCot.getByEmpresaCot(id_cot).subscribe(data => {
    //   this.items = data;
    // });
  
    this.itemCot.getAll().subscribe(data => {
      this.items = data;
    });
  }

  selectedItem(id: string) {
    console.log("item seleccionado: " + id);
    
    //this.router.navigate(['/item/', id]);
  }

  removeItem(item: any, index: any) {
    Swal.fire({
      title: 'Seguro quiere eliminar este registro?',
      showDenyButton: true,
      confirmButtonText: `Eliminar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.itemCot.delete(item).subscribe(() => {
            this.items.splice(index, 1);
          });
        Swal.fire('Eliminado!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('No se eliminó el registro', '', 'info')
      }
    });
  }

}
