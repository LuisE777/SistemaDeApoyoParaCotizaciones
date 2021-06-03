import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UnidadService } from 'src/app/services/unidad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-unidades',
  templateUrl: './unidades.component.html',
  styleUrls: ['./unidades.component.css']
})
export class UnidadesComponent implements OnInit {

  unidades: any = [];

  constructor(
    private unidads: UnidadService,
    private router: Router,
  ) {
    this.getUnidades();
  }

  ngOnInit(): void {
  }

  getUnidades() {
    this.unidads.getAll().subscribe(data => {
      console.log(data);
      this.unidades = data.unidades;
    })
  }

  selectedUnidad(id: string) {
    console.log("unidad seleccionado: " + id);
    
    //this.router.navigate(['/item/', id]);
  }

  removeUnidad(unidad: any, index: any) {
    Swal.fire({
      title: 'Seguro quiere eliminar este registro?',
      showDenyButton: true,
      confirmButtonText: `Eliminar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.unidads.delete(unidad.id).subscribe(() => {
          this.unidades.splice(index, 1);
        });
        Swal.fire('Eliminado!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('No se eliminó el registro', '', 'info')
      }
    });
  }


}
