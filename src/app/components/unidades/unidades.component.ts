import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UnidadService } from 'src/app/services/unidad.service';

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
    if (window.confirm('¿Esta seguro que quiere eliminar el registro?')) {
        this.unidads.delete(unidad.id).subscribe(() => {
          this.unidades.splice(index, 1);
        });
    }
  }


}
